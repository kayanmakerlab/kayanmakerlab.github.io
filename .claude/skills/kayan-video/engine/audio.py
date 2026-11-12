#!/usr/bin/env python3
"""Voice-over timing for KAYAN videos (guide section 7). Claude cannot listen to audio;
this gives the numbers needed to sync headlines, wipes and outro digits.

  python3 -I audio.py <voice.mp3|wav> [--align alignment.json] [--json out.json]

- Always: duration, loudness, every pause >= 80 ms as frame ranges, and the pauses that
  can hold a wipe (>= 150 ms; the wipe's middle frame should sit inside one).
- With --align (ElevenLabs "with timestamps" output: either the whole response or just its
  `alignment` / `normalized_alignment` object, keys characters + character_start_times_seconds
  + character_end_times_seconds): every spoken word with its start/end frame. Headline words
  should land 1-2 frames after the word's start frame (guide 7).
"""
import sys, json, subprocess, re, argparse
import numpy as np

FPS = 30
ap = argparse.ArgumentParser(); ap.add_argument('audio'); ap.add_argument('--align'); ap.add_argument('--json')
a = ap.parse_args()

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.audio, '-ac', '1', '-ar', '48000', '-f', 's16le', '-'],
                     capture_output=True, check=True).stdout
x = np.frombuffer(raw, dtype=np.int16).astype(float) / 32768
sr = 48000; dur = len(x) / sr
ln = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', a.audio, '-af', 'loudnorm=print_format=summary', '-f', 'null', '-'],
                    capture_output=True, text=True).stderr
lufs = re.search(r'Input Integrated:\s+(-?[\d.]+)', ln); tp = re.search(r'Input True Peak:\s+([-+]?[\d.]+)', ln)

# pauses: 10 ms RMS windows below -42 dBFS (same threshold as the reference analysis)
hop = sr // 100
rms = np.array([np.sqrt((x[i:i + hop] ** 2).mean() + 1e-12) for i in range(0, len(x) - hop, hop)])
quiet = 20 * np.log10(rms) < -42
pauses = []; s = None
for i, q in enumerate(list(quiet) + [False]):
    if q and s is None: s = i
    if not q and s is not None:
        if (i - s) >= 8: pauses.append((s / 100, i / 100))
        s = None
f = lambda t: int(round(t * FPS))
out = {'duration_s': round(dur, 3), 'frames': f(dur), 'lufs': float(lufs.group(1)) if lufs else None,
       'true_peak': float(tp.group(1)) if tp else None,
       'pauses': [{'start_s': round(p0, 3), 'end_s': round(p1, 3), 'frames': [f(p0), f(p1)], 'len_ms': int((p1 - p0) * 1000),
                   'wipe_ok': (p1 - p0) >= 0.15, 'wipe_mid_frame': f((p0 + p1) / 2)} for p0, p1 in pauses]}
speech = [p for p in out['pauses'] if p['start_s'] > 0.05]
out['speech_starts_frame'] = f(pauses[0][1]) if pauses and pauses[0][0] < 0.05 else 0
out['speech_ends_frame'] = f(pauses[-1][0]) if pauses and pauses[-1][1] >= dur - 0.05 else f(dur)

if a.align:
    d = json.load(open(a.align, encoding='utf-8'))
    al = d.get('normalized_alignment') or d.get('alignment') or d
    ch, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
    words = []; cur = None
    for c, t0, t1 in zip(ch, st, en):
        if c.strip() == '' or c in '،,.!؟?…':
            if cur: words.append(cur); cur = None
            continue
        if cur is None: cur = {'word': '', 'start_s': t0}
        cur['word'] += c; cur['end_s'] = t1
    if cur: words.append(cur)
    for w in words: w['start_frame'] = f(w['start_s']); w['end_frame'] = f(w['end_s'])
    out['words'] = words

print(f"duration {out['duration_s']} s = {out['frames']} frames | loudness {out['lufs']} LUFS, true peak {out['true_peak']} dBTP")
print(f"speech from frame {out['speech_starts_frame']} to {out['speech_ends_frame']} (outro needs >= 24 frames of still hold after the voice)")
print('pauses (frames):')
for p in out['pauses']:
    print(f"  {p['frames'][0]:4d}-{p['frames'][1]:4d}  {p['len_ms']:4d} ms" + (f"   <- wipe OK, middle frame {p['wipe_mid_frame']}" if p['wipe_ok'] else ''))
if 'words' in out:
    print('words (start-end frame):')
    print('  ' + '  '.join(f"{w['word']}[{w['start_frame']}-{w['end_frame']}]" for w in out['words']))
if a.json: json.dump(out, open(a.json, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); print('wrote', a.json)
