# Reel: price calculator (20 s, 1080×1920, 30 fps)

`kayan-reel-price-calculator.mp4` — **silent**: no voice-over file was supplied, so timing
follows the script timestamps (scene changes at 3, 7, 12, 16 s). Re-time when the audio arrives.

Website footage is real: `source/capture.js` drives the site (same `index.html` as the live
site, served locally because the live domain was not reachable from the build machine) and
saves one screenshot per video frame — scroll, real STL upload (`source/stl/vase.stl`),
PLA → PETG, quality → دقيقة, colour → أبيض, quantity → 2, price `$14 → $29`, hover on the
WhatsApp button. The cursor, click rings, zooms, headlines, wipes and outro are added in
`source/comp.html` following `docs/video/STYLE_GUIDE.md`.

Rebuild: serve the repo on port 8765, `npm i playwright three@0.128.0 @fontsource/ibm-plex-sans-arabic
@fontsource/ibm-plex-sans @fontsource/ibm-plex-mono`, link `fs` → `node_modules/@fontsource`,
run `node capture.js` then `node render.js video out.mp4`.
