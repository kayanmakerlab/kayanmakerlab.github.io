#!/usr/bin/env python3
"""Pre-flight check for a rendered KAYAN video (guide section 0).

  python3 -I check.py <workdir> [video.mp4]

Checks format, length, audio, and builds <workdir>/out/check-sheet.jpg (one frame from the
middle of every scene + the last frame) to LOOK AT before delivering. Also compares the
outro's fixed lower part (card, logo, tagline) with the approved still
docs/video/reference/frames/outro-website-logo-lockup.jpg.
"""
import sys, json, subprocess, os
import numpy as np
from PIL import Image, ImageDraw

W = os.path.abspath(sys.argv[1]); sb = json.load(open(os.path.join(W, 'storyboard.json'), encoding='utf-8'))
vid = sys.argv[2] if len(sys.argv) > 2 else os.path.join(W, 'out', sb.get('slug', 'reel') + '.mp4')
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..'))
ok = True
def res(cond, msg):
    global ok; ok &= bool(cond); print(('PASS ' if cond else 'FAIL ') + msg)

pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', vid], capture_output=True, text=True).stdout)
v = [s for s in pr['streams'] if s['codec_type'] == 'video'][0]; au = [s for s in pr['streams'] if s['codec_type'] == 'audio']
dur = float(pr['format']['duration'])
res(v['width'] == 1080 and v['height'] == 1920, f"canvas {v['width']}x{v['height']}")
res(v['r_frame_rate'] == '30/1', f"frame rate {v['r_frame_rate']}")
res(v['codec_name'] == 'h264' and v.get('pix_fmt') == 'yuv420p', f"codec {v['codec_name']} {v.get('pix_fmt')}")
res(dur <= sb.get('maxFrames', 600) / 30 + 0.05, f"duration {dur:.2f} s (max {sb.get('maxFrames', 600) / 30:.0f} s)")
if sb.get('audio'):
    res(bool(au) and au[0]['codec_name'] == 'aac' and au[0]['sample_rate'] == '48000', 'audio AAC 48 kHz' if au else 'audio track missing')
else:
    print('NOTE silent video (storyboard has no audio)')

# contact sheet
N = len(sb['scenes']); ends = [s['start'] for s in sb['scenes'][1:]] + [sb['frames']]
picks = [(s['start'] + e) // 2 for s, e in zip(sb['scenes'], ends)] + [sb['frames'] - 1]
frames = []
for fr in picks:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', vid, '-vf', f"select=eq(n\\,{fr})", '-vsync', '0', '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'], capture_output=True).stdout
    open('/dev/null', 'wb')
    import io; frames.append((fr, Image.open(io.BytesIO(raw)).convert('RGB')))
w, h = 360, 640; sheet = Image.new('RGB', (w * len(frames), h))
for i, (fr, im) in enumerate(frames):
    t = im.resize((w, h), Image.LANCZOS); d = ImageDraw.Draw(t); d.rectangle((0, 0, 120, 16), fill=(0, 0, 0)); d.text((3, 2), f'f{fr} {fr / 30:.2f}s', fill=(255, 255, 0))
    sheet.paste(t, (i * w, 0))
sp = os.path.join(W, 'out', 'check-sheet.jpg'); sheet.save(sp, quality=88); print('LOOK  ' + sp)

# outro lock-up vs approved still (y 740-1560 is identical in every video when the phone number is unchanged)
ref = os.path.join(REPO, 'docs/video/reference/frames/outro-website-logo-lockup.jpg')
last = np.asarray(frames[-1][1]).astype(float)[740:1560]; r = np.asarray(Image.open(ref).convert('RGB')).astype(float)[740:1560]
diff = np.abs(last - r).mean()
if sb['scenes'][-1].get('phone', '81 424 535') == '81 424 535':
    res(diff < 6, f'outro lock-up matches approved still (mean diff {diff:.1f}/255)')
else:
    print(f'NOTE phone number changed; outro diff {diff:.1f}/255 not judged')
print('RESULT ' + ('all checks passed' if ok else 'FAILED'))
sys.exit(0 if ok else 1)
