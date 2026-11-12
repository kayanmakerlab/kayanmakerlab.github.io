# Master reference video — analysis record

This is the evidence behind [`STYLE_GUIDE.md`](STYLE_GUIDE.md). The guide says what to do;
this file records what was observed, when, and how it was measured.

Analysed on 2026-11-12.

## 1. Source material

Two files were supplied under the same name (`VID_20261108_205257_179__.mp4`). They are
two different excerpts of one video. The original files are **not** stored in the
repository (33 MB); stills and contact sheets are in [`reference/`](reference/).

| | Clip A (main) | Clip B (outro) |
|---|---|---|
| SHA-256 | `3579ad9b…163bc` | `213c4e3d…9a1b` |
| Size | 27,997,399 bytes | 4,544,985 bytes |
| Video | H.264 High, 1080×1920, 30 fps, 589 frames, 19.62 s, 11.3 Mbps | H.264 High, 1080×1920, 30 fps, 149 frames, 4.97 s, 7.2 Mbps |
| Pixel format | yuv420p, BT.709, limited range | same |
| Audio | AAC 48 kHz stereo (L = R), 128 kbps | same |
| HUD counter | `03 / 11` → `08 / 11` | `11 / 11` |

So the full video has 11 scenes. **Scenes 01, 02, 09 and 10 were not supplied.** Clip A
starts mid-entrance of scene 03 and ends mid-scene 08. Clip B starts after the outro
headline had already landed and with the logo outline 13 % drawn.

## 2. Method

- Every frame was extracted as PNG (590 + 151 frames) and reviewed as contact sheets at
  0.2 s steps, then at every 2nd frame for the whole of clip A and every frame for the
  first 1.6 s of the outro.
- **Colours** were read from pixel values (most frequent accent value: `#00C8EF`, 11,073
  pixels in one outro frame). Values are after H.264 decoding, so expect ±2 levels.
- **Grid** spacing and drift were found from brightness peaks along empty rows/columns on
  every 10th frame.
- **Fonts** were identified by rendering the video's own words in 15 candidate Arabic
  families (and several Latin/mono families) in Chromium, scaling to the same ink width,
  and computing the overlap (IoU) with the video frame.
- **Font sizes** come from the ratio of the video's ink width to the width of the same
  line rendered at 200 px. They landed on round numbers (99.6, 103.5, 109.7, 119.7, 129.8,
  139.6, 149.2, 155.6), which also confirms letter-spacing 0.
- **Animation curves** were measured by tracking, per frame, the brightness (opacity) and
  the brightness-weighted vertical centroid (position) of individual words and digits.
- **Wipes** were measured by locating the accent line on rows y = 25 and y = 1895 on every
  frame.
- **Audio** was analysed numerically (loudness, per-frame level, silence detection,
  spectral-flux onsets, autocorrelation pitch, spectrogram). It was **not listened to or
  transcribed** — no speech recognition was available.

### Font identification results (overlap, higher is better)

| Sample | Best match | Runner-up |
|---|---|---|
| `جرّبها هلأ` (outro headline) | IBM Plex Sans Arabic 700 — **0.960** | Vazirmatn 800 — 0.645 |
| `وتواصل معنا على الرقم` | IBM Plex Sans Arabic 500 — **0.911** | IBM Plex Sans Arabic 600 — 0.790 |
| `ما بدك خبرة` | IBM Plex Sans Arabic 700 — **0.897** | Rubik 700 — 0.631 |
| `81 424 535` | IBM Plex Sans 700 — **0.901** | Liberation Sans Bold — 0.832 |
| `03:20 H` | IBM Plex Mono 700 — **0.963** | Space Mono 700 — 0.753 |

Rejected Arabic candidates: Rubik, Readex Pro, Alexandria, Tajawal, Cairo, Almarai,
Noto Kufi Arabic, Noto Sans Arabic, Changa, Baloo Bhaijaan 2, Vazirmatn, Kufam, Mada,
El Messiri. The `KAYAN` wordmark is consistent with IBM Plex Sans Bold but, at that size
and tracking, the overlap test alone could not separate it from Inter (0.793 vs 0.790).

## 3. Scene-by-scene timeline — clip A

Frame numbers are 1-based; time = (frame − 1) / 30. Scene boundaries are the middle frame
of each wipe.

| Scene | Frames | Time | Length |
|---|---|---|---|
| 03 | 1 – 95 | 0.00 – 3.13 s | ≥ 3.13 s (start cut off) |
| 04 | 95 – 182 | 3.13 – 6.03 s | 2.90 s |
| 05 | 182 – 344 | 6.03 – 11.43 s | 5.40 s |
| 06 | 344 – 449 | 11.43 – 14.93 s | 3.50 s |
| 07 | 449 – 494 | 14.93 – 16.43 s | 1.50 s |
| 08 | 494 – 590 | 16.43 – 19.63 s | ≥ 3.20 s (end cut off) |

### Scene 03 — "just go to the site"
Visual: phone mock-up (dark screen, `KAYAN MAKER LAB` mono label, Arabic UI, dashed upload
zone, accent pill button, three grey tiles).

| Frame | Event |
|---|---|
| 1–10 | Headline `فوت ع الموقع وبس` (110 px, `الموقع` accent) finishing its entrance; phone settling upward |
| 24–27 | Headline exits (4 frames) |
| 31–41 | `ما بدك خبرة` / `ولا برامج معقّدة` (100 px, all white) enters, one word every 2 frames |
| 51–59 | Accent strike-through drawn right→left over `خبرة`; word dims |
| 61–75 | Ghost "complex software" panel fades in, tilted, over the phone's lower right |
| 77–81 | Accent X drawn over the panel |
| 79–89 | Strike-through over `برامج معقّدة` |
| 91–94 | Panel and X fade |
| 92–98 | Wipe |

### Scene 04 — "upload any file"
Visual: large card with dashed drop zone and upload arrow.

| Frame | Event |
|---|---|
| 96–108 | Card rises ≈ 100 px into place (ease-out, no overshoot) |
| 100–106 | `ارفع أي ملف عندك` (110 px, `ملف` accent) |
| 101–111 | `.STL` file icon flies in from the top right, rotated ≈ 15°, lands in the drop zone and replaces the arrow |
| 103–113 | Chips `STL` `OBJ` `3MF` `STEP` appear left→right, ≈ 3 frames apart |
| 113–133 | `model_v2.stl` + progress bar 0 → 100 % with mono percentage |
| 135–137 | Headline exits |
| 139–145 | File dissolves into a large accent `?`; `وإذا ما عندك؟` (120 px, `ما عندك؟` accent) enters |
| 179–185 | Wipe |

### Scene 05 — "ready-made models, one click"
| Frame | Event |
|---|---|
| 185–207 | Text-only beat: `ولا يهمّك` (130 px, `يهمّك` accent) on the empty background |
| 207–211 | Headline exits |
| 213–219 | `حاطّينلك` / `مواقع جاهزة` (104 px, line 2 accent) |
| 215–231 | 3 × 2 grid of model cards appears **right→left, top row first** (gear, vase, icosphere, then torus, cube, pyramid). Each card: rotating accent wireframe, mono file name, download glyph |
| 263–265 | Headline exits |
| 267–277 | `رسومات` / `ثلاثية الأبعاد` (104 px, line 2 accent) |
| 275–305 | Cursor enters bottom-right and travels on a curve to the vase card |
| 311 | Vase card border brightens (hover) |
| 311–319 | Headline swap to `بكبسة زر` (140 px, all accent) |
| 319–321 | Click: ripple rings |
| 321–329 | Vase card expands into a large viewer card; other cards fade |
| 323–339 | Wireframe vase fills bottom→top into a solid light-grey mesh; labels `VASE_V2.STL`, `READY TO PRINT` |
| 341–347 | Wipe |

### Scene 06 — "everything calculated in seconds"
Visual: quote card — title `VASE_V2.STL`, `120 × 120 × 240 MM`, `INSTANT QUOTE` (accent),
running timer, small solid vase with a horizontal accent scan line moving up and down.

| Frame | Event |
|---|---|
| 347–357 | Card rises in; `بثواني` (150 px, all accent) |
| 357–365 | Sub-line `بيحسبلك كل شي` (small, white) |
| 349–370 | Timer counts `00:00 S` → `00:03 S` |
| 369–387 | Row `التكلفة`: value counts up to `$14.50` (accent) |
| 393–411 | Row `وقت الطباعة`: counts up to `03:20 H` |
| 421 | Row `المادة` — `PLA` |
| 425 | Row `الدقة` — `0.2 MM` |
| 446–452 | Wipe |

Rows: darker inset pill, Arabic label right-aligned, mono bold value left-aligned.

### Scene 07 — "without asking anyone"
Headline sits lower (ink y 491–760): `بلا ما تسأل` / `حدا` (128 px, `بلا` accent).

| Frame | Event |
|---|---|
| 453–463 | Headline; six `?` speech bubbles of different sizes pop in, staggered |
| 469–479 | Each bubble gets an accent diagonal slash, staggered |
| 479–489 | Bubbles shrink and fade, staggered |
| 491–497 | Wipe |

### Scene 08 — "press OK, get a WhatsApp notification, done"
| Frame | Event |
|---|---|
| 495–499 | Accent `OK` pill scales in; cursor arrives |
| 497–503 | `بتكبس أوكيه` (120 px, `أوكيه` accent) |
| 499–515 | Click: concentric ripple rings expand and fade |
| 513–519 | Headline exits; button fades down |
| 519–527 | `بيوصلك إشعار` / `ع الواتساب` (104 px; `إشعار`, `الواتساب` accent) |
| 521–531 | Notification card drops from the top and settles: `WHATSAPP · NOW` (mono, left), `KAYAN MAKER LAB` (Plex Sans Bold), `تمّ تأكيد طلبك`, accent round icon on the right |
| 563–565 | Headline exits |
| 565–571 | Notification card slides up |
| 567–571 | `الطلب تمّ` (140 px, `تمّ` accent) |
| 567–573 | Accent circle draws on |
| 573–581 | Check mark draws inside it, with glow |
| 590 | Clip ends (static) |

## 4. Headline animation — raw measurements

Word `ما` (scene 03, second headline), reference = settled position:

| Frame | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 46 | 48 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Opacity % | 4 | 22 | 37 | 54 | 70 | 86 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Offset px (+ = below) | — | +50 | +41 | +33 | +24 | +17 | +10 | +5 | +1 | −1 | −3 | −3 | −3 | −3 | −2 | 0 |

Word starts: `ما` f31, `بدك` f33, `خبرة` f35, `ولا` f37, `برامج` f39, `معقّدة` f41 →
2-frame stagger, continuous across the line break. During the hold (f48–f92) the measured
offset stays within ±1.6 px: static.

Exit of `فوت ع الموقع وبس` (all four words identical):

| Frame | 23 | 24 | 25 | 26 | 27 | 28 |
|---|---|---|---|---|---|---|
| Opacity % | 100 | 95 | 78 | 43 | 8 | 0 |
| Offset px | 0 | −2 | −7 | −19 | −26 | — |

## 5. Wipe — raw measurements

Identical at frames 92–98, 179–185, 341–347, 446–452, 491–497.

| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Line x at bottom edge (y = 1895) | 1076 | 960 | 721 | 318 | off | off | off |
| Line x at top edge (y = 25) | off | off | off | 762 | 358 | 120 | 3 |

Angle 13.4° from vertical, main line 4 px, secondary 1 px line ≈ 38 px to the right.

## 6. Outro — raw measurements (clip B)

Element opacity by frame (percentage of final brightness):

| Element | Starts | Reaches ≈ 100 % |
|---|---|---|
| Hexagon logo | already 13 % at f1; growing from f4 | f20 (outline done ≈ f14) |
| `KAYAN` | f12 | f22 |
| Call button / phone card | f15 | f24 (card top edge final at f26) |
| `MAKER LAB` | f19 | f26 |
| Tagline | f26 | f35 |

Digits (slot x-ranges in the final frame: 176–231, 239–295, 328–385, 392–446, 452–510,
545–600, 606–661, 670–724; gaps 8, **33**, 7, 6, **35**, 6, 9 px → grouping 2-3-3):

| Digit | Appears (frame / s) | Turns white (frame) | Gap to previous |
|---|---|---|---|
| 8 | 35 / 1.13 | 51 | — |
| 1 | 45 / 1.47 | 60 | 10 f |
| 4 | 65 / 2.13 | 81 | 20 f |
| 2 | 71 / 2.33 | 86 | 6 f |
| 4 | 77 / 2.53 | 93 | 6 f |
| 5 | 86 / 2.83 | 101 | 9 f |
| 3 | 99 / 3.27 | 114 | 13 f |
| 5 | 110 / 3.63 | 126 | 11 f |

Each digit's vertical offset after appearing (px): +30, +26, +22, +16, +10, +5, +1, −2,
−3, −3/−4, then back to 0 over ≈ 8 more frames.

Background grid scale in the outro: 60.2 px (f1) → 61.1 (f41) → 62.1 (f81) → 62.4 (f121
onward), i.e. ×1.00 → ×1.04, easing out. In clip A the grid spacing is a constant 60.0 px.

## 7. Audio — raw measurements

| | Clip A | Clip B |
|---|---|---|
| Integrated loudness | −23.6 LUFS | −28.6 LUFS |
| True peak | −9.1 dBTP | −13.5 dBTP |
| Loudness range | 3.2 LU | 3.0 LU |
| Channels | L and R identical (correlation 1.0) | same |

- Spectrogram: harmonic, formant-moving content throughout = speech. Median pitch
  ≈ 261 Hz (10th–90th percentile 198–340 Hz).
- Pauses fall to ≈ −86 dBFS, so there is no continuous music bed. No impulsive or
  noise-like events were found under the wipes.
- Silences ≥ 0.08 s in clip A (s): 0.89–1.03, 2.66–2.77, **2.98–3.31**, 4.52–4.68,
  5.44–5.54, **5.95–6.15**, 6.78–6.86, **11.34–11.59**, 12.72–12.82, 13.61–13.69,
  **16.28–16.51**, 16.62–16.72, 17.15–17.27, 19.13–19.23.
  Bold = contains a wipe (wipes at 3.13, 6.03, 11.43, 16.43 s). The wipe at 14.93 s falls
  during speech.
- Headline swaps also sit on pauses: the first swap (frames 24–31, 0.77–1.00 s) coincides
  with the 0.89–1.03 s silence; speech resumes at 1.03 s as the first new word appears.
- Clip B: speech resumes at 1.17 s (digit `8` at 1.13 s), after a pause at 2.07–2.18 s
  (digit `4` at 2.13 s), after 3.17–3.26 s (digit `3` at 3.27 s); onsets at 2.57, 2.77 and
  3.65 s match digits at 2.53, 2.83 and 3.63 s. Speech ends at 4.30 s; digital silence from
  4.53 s to the end.

## 8. Limits of this analysis

- Only scenes 03–08 and 11 were seen.
- The audio was measured, not heard: the script, the language of the voice-over, and the
  voice's character are unknown. "No music / no SFX" means none were detectable in the
  signal.
- Corner radii, glow radius, sub-line sizes inside cards and letter-spacing of the Latin
  wordmark are estimates (marked ≈ in the guide).
- Easing is described by measured per-frame positions; the original tool and its exact
  spring parameters are unknown.
