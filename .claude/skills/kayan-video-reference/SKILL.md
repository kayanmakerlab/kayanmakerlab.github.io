---
name: kayan-video-reference
description: Reverse-engineer a motion graphics reference video (frames, Arabic font identification, word-by-word animation curves, wipes, layout, audio pauses) and update docs/video/STYLE_GUIDE.md. Use when the user supplies a new or additional master/reference video for KAYAN MAKER LAB, or asks to re-check the guide against a reference.
---

# Analyse a reference video

The current guide was built this way; `docs/video/REFERENCE_ANALYSIS.md` shows the expected
depth and format. Measure, don't assume: every value in the guide must come from pixels or
samples, and anything not visible is listed as NOT OBSERVED.

Scripts (`R=.claude/skills/kayan-video-reference/scripts`), all on 1080×1920 frames named
`f_NNNN.png` (1-based); work in the scratchpad:

1. `bash $R/extract.sh video.mp4 $W/A` — probe, loudness, every frame, timecoded contact
   sheets (`sheet_*.jpg` — look at all of them first), spectrogram, pauses.
2. `python3 -I $R/strip.py $W A <first> <last> <step> x0 y0 x1 y1 <scale> <cols> out.jpg` —
   frame-by-frame strips of a region (headline entrances, transitions, the outro).
3. `python3 -I $R/track.py $W A <settledFrame> <first> <last> <box per word…>` — opacity and
   vertical offset per word per frame → stagger, duration, overshoot, exit.
4. `python3 -I $R/wipe.py $W/A` — accent line position/angle per frame for line wipes.
5. Fonts: `node $R/fontcands.js $W/cand "<exact words from the frame>" [families…]` then
   `python3 -I $R/fontmatch.py $W/A/f_NNNN.png x0,y0,x1,y1 $W/cand` → IoU ranking + implied
   size. > 0.9 is a match. Do it for headline, sub-line, digits and mono labels.
6. Colours: sample pixels with numpy (most frequent accent value, background at centre and
   corners); grid spacing from brightness peaks.
7. Audio: `python3 -I .claude/skills/kayan-video/engine/audio.py video.mp4` for pauses; relate
   pauses to transitions (were wipes in pauses?).

Then: update `STYLE_GUIDE.md` (keep owner decisions such as the website logo), append the
evidence to `REFERENCE_ANALYSIS.md`, save stills to `docs/video/reference/frames/` and the
source video to `docs/video/reference/source/`, and if timings/geometry changed, update
`.claude/skills/kayan-video/engine/template.html` and re-run its example to confirm the
engine still matches. Tell the user which rules changed.
