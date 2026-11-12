# Reel: price calculator (20 s, 1080×1920, 30 fps)

`kayan-reel-price-calculator.mp4` — **silent**: no voice-over file was supplied, so timing
follows the script timestamps (scene changes at 3, 7, 12, 16 s). Re-time when the audio arrives.

Website footage is real: the site is driven by the `capture` section of
`source/storyboard.json` (same `index.html` as the live site, served locally because the live
domain was not reachable from the build machine) — scroll, real STL upload (`source/vase.stl`),
PLA → PETG, quality → دقيقة, colour → أبيض, quantity → 2, price `$14 → $29` read from the page,
press on the WhatsApp button. Cursor, click rings, zooms, headlines, wipes and outro are added by
the engine following `docs/video/STYLE_GUIDE.md`.

Rebuild with the project skill `.claude/skills/kayan-video` (see its SKILL.md): copy
`source/storyboard.json` and `source/vase.stl` to a work dir, then `capture.js` and `render.js`.
