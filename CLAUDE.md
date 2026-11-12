# KAYAN MAKER LAB — project instructions

This repository is the KAYAN MAKER LAB website (static site served by GitHub Pages:
`index.html`, `assets/`). It also holds the brand's motion graphics reference.

## Motion graphics videos — mandatory

**Before planning, writing, rendering or editing any video, animation or motion graphic for
KAYAN MAKER LAB, read [`docs/video/STYLE_GUIDE.md`](docs/video/STYLE_GUIDE.md) in full.**
Do this every time, even for a small change. It is the binding style, reverse-engineered
from the master reference video.

Then:

1. Follow the guide exactly. The highest priorities are **Arabic typography** (section 4.2)
   and the **outro** (section 8), which must be reproduced as specified.
2. Do not invent values. If the guide marks something **NOT OBSERVED** (section 9) or does
   not cover it, ask the user, or derive it from the nearest observed pattern and say so.
3. Look at the stills in `docs/video/reference/frames/` (the master videos themselves are
   in `docs/video/reference/source/`) and compare your rendered frames against them before
   delivering. Check Arabic shaping on a real rendered frame.
4. Run the pre-flight checklist (section 0 of the guide) and report the result.
5. For the evidence behind any rule, or exact per-frame timings, see
   [`docs/video/REFERENCE_ANALYSIS.md`](docs/video/REFERENCE_ANALYSIS.md).

Quick reminders (the guide is the authority):

- 1080 × 1920, 30 fps. Dark slate background, drifting 60 px grid, HUD frame with
  `KAYAN MAKER LAB` and the scene counter.
- Fonts: IBM Plex Sans Arabic (Bold headlines), IBM Plex Sans, IBM Plex Mono. Nothing else.
- Single accent colour `#00C8EF`. (The website's `#74D1E3` is not used in video.)
- Arabic: RTL, fully joined, letter-spacing 0, revealed **word by word from the right**,
  never letter by letter.
- Scene changes: the diagonal cyan wipe only, placed on a voice-over pause.

If the user supplies a new master reference, re-analyse it and update the guide rather than
working from memory.

## Website

- Prices and settings live at the top of the script in `index.html`, in the `CFG` object.
- Site copy and commit messages are in Arabic.
