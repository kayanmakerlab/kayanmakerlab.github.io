---
name: kayan-video
description: Make a KAYAN MAKER LAB motion graphics video or reel (Arabic, 9:16, 15–20 s) in the brand's master style — headlines, real website screen recordings, diagonal wipes, and the mandatory phone-number outro — from a script and an optional ElevenLabs voice-over. Use for any request to create, re-time, edit or re-render a KAYAN video, reel, ad or motion graphic.
---

# KAYAN video

A storyboard-driven engine that already implements `docs/video/STYLE_GUIDE.md` (read the
guide first, as `CLAUDE.md` requires). You write **one JSON file**; the tools capture the real
website, compose, render, and check. Do not hand-build compositions or re-derive animation
values: they are measured and live in `engine/template.html`.

Paths: `K=.claude/skills/kayan-video` (from the repo root), `W` = a work directory in the
scratchpad (never inside the repo: footage is ~100 MB).

## Steps

1. **Set up** — `bash $K/engine/setup.sh $W [price-calculator]` (the optional example copies a
   complete working storyboard + `vase.stl` to start from).
2. **Audio (if supplied)** — Claude cannot hear audio. Run
   `python3 -I $K/engine/audio.py voice.mp3 [--align alignment.json] --json $W/timing.json`.
   Ask the user for ElevenLabs' *with-timestamps* JSON if they have it: it gives every word's
   frame. Without it, use the pauses list + the script. Put the file in `$W` and set
   `"audio"` in the storyboard.
3. **Write `$W/storyboard.json`** — see `storyboard.md` for every field. Rules:
   - Script → headlines: short Lebanese phrases, ≤ 2 lines, ≤ 4 words/line, key word(s) marked
     `*` (accent). Keep the user's wording; shorten only to fit.
   - Wipes = scene `start` frames. With audio, put each one on a pause marked "wipe OK".
   - Headline `start` = 1–2 frames after its first spoken word; text exits at the next headline.
   - `frames` ≤ 600 (20 s) unless the user allows more. Outro last, ≥ 24 frames still hold.
   - Outro digits: on the spoken digit onsets if the voice reads the number, else every 5 frames.
4. **Capture the real site** — `node $K/engine/capture.js $W`. It serves this repo locally
   (`"url":"local"`) because the live domain is often blocked in cloud sessions; use the live
   URL if it is reachable. Only perform actions the site really supports; read the logged
   values (prices etc.) and use them — never invent UI or numbers. WhatsApp links are blocked
   so nothing is sent. Re-capture all shots after changing any (page state carries over).
5. **Look before rendering** — `node $K/engine/render.js $W stills <frames…>` (one per scene
   + outro) and view the PNGs in `$W/out/`. Fix framing (zoom keyframes, scroll offsets).
6. **Render** — `node $K/engine/render.js $W video` (~3.5 min for 20 s). Muxes the voice,
   normalised to the reference loudness (−23.6 LUFS; set `"loudness"` e.g. −14 if the user
   wants social-media level).
7. **Check** — `python3 -I $K/engine/check.py $W`, then **open `out/check-sheet.jpg`**.
   Report the pre-flight list (guide §0) with any deviation stated plainly.
8. **Deliver** — copy the mp4 + `storyboard.json` (+ input files like the STL) to
   `docs/video/reels/<slug>/` with a short README (what is real footage, what was shortened,
   what deviates from the guide), commit, push, and send the mp4 to the user.

## Engine facts worth knowing

- Scene types: `site` (captured footage in the card), `image` (a still, e.g.
  `assets/products/*.jpg`, shown cover-fit in the card), `text` (headline-only beat),
  `outro` (fixed lock-up; only headline, sub-line, phone, digit times may change).
- The logo is read from `index.html` (`logo-mark`, `logo-word`) at render time — never
  redraw it. Cyan parts are drawn in the video accent `#00C8EF` (owner decision).
- `render.js` refuses storyboards that break hard rules (no outro last, > 2 lines, > 20 s,
  missing shots) and warns on soft ones (scene < 1.5 s, > 4 words, short outro hold);
  headlines wider than the safe area are shrunk automatically and reported.
- The example (`examples/price-calculator`) rebuilds the delivered reel within 0.3/255
  median pixel difference — use it as the template for site-journey reels.
- Known site selectors: `#file` (STL input), `#view` (drop zone), `#cv` (3D preview),
  `#mat`, `#unit`, `#inf`, `#qual`, `#colors`, `#scale`, `#qty` / `.stepper button`,
  `#sDim #sVol #sW #sT` (stats), `#sP` (price), `#bd` (price breakdown), `#send`
  (WhatsApp order), `#shop` / `#tiles` (ready-made shop), `#wa2` (contact button).
- Cursor speed: a click's `travel` is the glide length in frames (default 16; 24–46 reads
  as calm). The cursor then rests 4 frames before the click ring.

## Things that are NOT observed in the reference (say so if you use them)

Opening scenes, the transition into the outro, music/SFX, end fade-out, other aspect
ratios. Zooms on screen recordings were requested by the owner for site reels; the
reference itself has no camera moves.
