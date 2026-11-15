# Master video, updated (39.2 s, 1080×1920, 30 fps)

`kayan-master-updated.mp4` = the master reference (`docs/video/reference/source/master-full-39s.mp4`)
with two owner changes (2026-11-15):

1. **Kayan's own logo** (the website's `logo-mark` + `logo-word`) replaces the hexagon logo and
   the KAYAN / MAKER LAB lettering — in scene 02 (brand intro) and scene 11 (outro).
2. Outro tagline is **3D PRINTING · PROTOTYPING** (CNC and LASER removed).

How: scenes 02 and 11 were re-rendered with the `kayan-video` engine (`source/storyboard.json`,
same texts, master timing, digits on the original spoken digits, `accent: #00c8ef` so they
match the rest of this video), then spliced into the original frames exactly along the
diagonal wipe line (`source/splice.py`). The other 9 scenes and the audio are untouched
(audio stream copied).

Differences from the original in the replaced scenes: the engine's background grid drifts on
its own path (barely visible), and the brand-intro layout follows the guide's measured
positions with the website logo, whose shape differs from the hexagon.
