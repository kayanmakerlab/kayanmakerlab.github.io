# KAYAN MAKER LAB — Motion Graphics Style Guide

**Status: binding.** Every KAYAN MAKER LAB motion graphics video must follow this guide.
It was reverse-engineered from the master reference video (see
[`REFERENCE_ANALYSIS.md`](REFERENCE_ANALYSIS.md) for the evidence, timeline and measurement
method, and [`reference/`](reference/) for stills). Nothing here is a design opinion: every
value was measured from the reference frames or audio.

How to read the values:

- All pixel values are for a **1080 × 1920** canvas. All frame counts are at **30 fps**.
- "Measured" values are exact to about ±1 px / ±1 frame. Values marked **≈** are estimates.
- Items marked **NOT OBSERVED** were not in the reference material. Do not invent them
  silently: ask the user, or derive them from the nearest observed pattern and say so.

---

## 0. Pre-flight checklist (run before delivering any video)

1. Canvas 1080×1920, 30 fps, dark slate background with drifting 60 px grid and HUD frame.
2. All Arabic is **IBM Plex Sans Arabic**, correctly shaped and joined, RTL, letter-spacing 0.
3. Headlines reveal **word by word, right to left**, never letter by letter.
4. One accent colour only (`#00C8EF`), used on the key word(s) of each headline.
5. Every scene change is the **diagonal cyan wipe**, cut on a voice-over pause.
6. HUD shows `KAYAN MAKER LAB` (top-left) and the scene counter `NN / TT` (top-right).
7. The video ends with the **outro in section 8**, reproduced exactly.
8. Compare a few rendered frames against `reference/frames/` before delivering.

---

## 1. Format

| Property | Value |
|---|---|
| Canvas | 1080 × 1920 (9:16 vertical) |
| Frame rate | 30 fps, constant |
| Video codec | H.264 High, yuv420p, BT.709, limited range, ≈ 7–11 Mbps |
| Audio | AAC, 48 kHz, 128 kbps, voice centred (both channels identical) |
| Structure | Numbered scenes (the reference has 11); the last scene is the outro |

---

## 2. Colour

Only these colours exist in the reference. No second accent, no gradients on elements,
no warm colours.

| Token | Hex | Use |
|---|---|---|
| `accent` | `#00C8EF` | Key words, icons, strokes, buttons, progress, wipe line |
| `text` | `#FFFFFF` | Headline text, values, wordmark |
| `text-muted` | `#A4B1B9` | Tagline, secondary mono labels |
| `hud` | `#5D686E` | HUD label and counter |
| `hud-line` | `#465056` | HUD corner brackets, grid cross markers |
| `bg-center` | `#222E36` | Background at the centre of the frame |
| `bg-edge` | `#111A21` | Background at the corners (vignette) |
| `panel` | `#25313A` | Card / panel fill (only slightly lighter than the background) |
| `panel-inset` | `#19262C` | Darker inset rows and chips inside a card |
| `panel-border` | accent at ≈ 50 % (`≈ #418C9F` on the background) | Card border, 2 px |
| `on-accent` | `≈ #00324D` (dark navy) | Text and glyphs placed on an accent fill |

Rules:

- **Accent is for emphasis and "live" UI only.** In headlines it marks the key word or
  phrase; everything else is white.
- Accent headline words and accent line-art carry a **soft cyan glow** (halo fading out over
  ≈ 20–30 px, very low opacity). White text has **no** glow and no drop shadow.
- A struck-through word dims to ≈ 60 % with a slight blue tint (`≈ #9FC4EA`).

> Note: the website uses `#74D1E3` as its brand cyan. The video uses the more saturated
> `#00C8EF`. **For video, this guide wins on colour.**
>
> **Logo (owner decision, 2026-11-12):** videos use the **website's logo** — the "K" mark and
> the `Kayan / Maker Lab` wordmark, taken from the `logo-mark` and `logo-word` symbols in
> `index.html` — not the hexagonal cube mark of the original reference video. Shapes are
> used unchanged; the cyan parts are drawn in the video accent.

---

## 3. Background and HUD frame (present in every frame)

### Background
- Radial vignette: `bg-center` in the middle falling to `bg-edge` at the corners. Top and
  bottom edges are the darkest.
- **Grid:** thin lines every **60 px**, only ≈ 3–4 brightness levels above the background
  (barely visible).
- **Cross markers** ("+", `hud-line` colour, ≈ 16 px arms) at every 5th intersection
  (every 300 px).
- Very faint **concentric rings** centred on the frame.
- The grid **drifts continuously** on a slow wandering path, at most ≈ 0.5 px per frame
  (≈ 15 px/s), wrapping seamlessly. It never stops and never jumps at a scene change.

### HUD frame
- **Corner brackets:** four L-shapes, 40 × 40 px arms, 1–2 px, `hud-line`.
  Corners at x = 69 and x = 1010, y = 179 and y = 1720.
- **Top-left label:** `KAYAN MAKER LAB`, IBM Plex Mono, ≈ 22 px, `hud`, starting at x = 94,
  cap-height spanning y ≈ 204–218.
- **Top-right counter:** `NN / TT` (two digits each, e.g. `03 / 11`), same style,
  right edge at x ≈ 987. It changes at the moment the wipe line passes over it.
- The HUD never animates, scales or fades.

### Safe area
All content stays inside the brackets: x 69–1010, y 179–1720. Headlines sit in the upper
third; the visual sits below.

---

## 4. Typography

### 4.1 Font families (identified by overlaying candidate fonts on the frames)

| Role | Font | Evidence |
|---|---|---|
| Arabic headlines | **IBM Plex Sans Arabic Bold (700)** | 96 % shape overlap; next best family 65 % |
| Arabic sub-lines and UI labels | **IBM Plex Sans Arabic Medium (500)** / Regular | 91 % overlap |
| Large Latin digits, Latin names, wordmark | **IBM Plex Sans Bold (700)** | 90 % overlap on the phone number |
| Technical labels, file names, values, HUD | **IBM Plex Mono** (Regular; Bold for values) | 96 % overlap on values |

Use the IBM Plex family only. It is also the website's font.

### 4.2 Arabic rules (highest priority)

1. **Shaping:** letters are always fully joined with correct contextual forms. Never render
   Arabic with a tool or font that produces isolated letters. Verify on a rendered frame.
2. **Direction:** RTL. Words appear in reading order, **rightmost word first**.
3. **Letter-spacing is 0** on all Arabic. (Measured: line widths match the font's natural
   advance at round font sizes.) Never add tracking to Arabic.
4. **The animated unit is the whole word.** Never animate, split or stagger individual
   Arabic letters.
5. **Alignment:** headlines are horizontally centred on x = 540, every line centred.
6. **Size:** headline size scales with length, between **100 px and 156 px**:

   | Headline | Size |
   |---|---|
   | Two lines, 2–3 words each | 100–104 px |
   | One line, 4 words | 110 px |
   | One line, 2–3 words | 120–130 px |
   | One line, 2 short words | 140 px |
   | Single word hero | 150 px |
   | Outro headline | 156 px |

7. **Line height ≈ 1.2 ×** font size for two-line headlines (measured 1.17–1.26).
8. **Length:** at most 2 lines, 1–4 words per line. Break lines at a phrase boundary.
9. **Emphasis:** the key word or phrase is `accent`, the rest is white. On two-line
   headlines the second line is often entirely accent. A short punchline can be all accent.
10. **Vertical position:** headline block centred around y ≈ 420–440 (ink between
    y ≈ 320 and 560). A text-led scene may place it lower (≈ y 490–760) with the visual
    underneath.
11. **Sub-line** (optional): Medium weight, ≈ 40 % of the headline size (62 px under a
    156 px headline), white, directly below the headline, last key word in accent.
12. **Language and orthography as used in the reference:**
    - Lebanese colloquial Arabic, short spoken phrases (e.g. `ولا يهمّك`, `بكبسة زر`).
    - **Shadda is written** where it matters (`معقّدة`, `يهمّك`, `تمّ`, `جرّبها`). No other
      diacritics.
    - Hamza is written properly (`أي`, `إذا`, `إشعار`, `الأبعاد`, `هلأ`).
    - Arabic question mark `؟`.
    - **Western digits** (0–9) for all numbers, prices and the phone number.
13. **Mixed-direction content:** Latin and technical strings (file names, units, prices,
    `OK`, `READY TO PRINT`) stay Latin, left-to-right, in Plex Mono or Plex Sans. In a
    label/value row, the **Arabic label is on the right** and the **value on the left**.
    Rows of Latin chips appear left to right; grids of cards appear **right to left**.

### 4.3 Latin and mono styles

| Element | Style |
|---|---|
| HUD label / counter | Plex Mono Regular ≈ 22 px, uppercase, `hud` |
| Card titles, file names | Plex Mono Bold ≈ 30 px, uppercase, white |
| Card meta lines | Plex Mono Regular ≈ 22 px, uppercase, `text-muted`; status lines in accent |
| Values in rows | Plex Mono Bold ≈ 50 px (first/hero value in accent, others white) |
| Chips (`STL`, `OBJ`…) | Plex Mono ≈ 24 px, white on `panel-inset`, pill shape, thin border |
| Button label | Plex Sans Bold, `on-accent` on an accent pill |

---

## 5. Animation

### 5.1 Principles
- **Fast in, faster out.** Entrances take 0.2–0.45 s; exits take ≈ 0.13 s.
- Movement is **vertical only** for text (rise in, lift out). No rotation or scale on text.
- Springs have a **small overshoot** (≈ 6–8 % of travel) and settle quickly. No bouncing.
- **No motion blur, no camera moves** over content. The only "camera" motion is the
  background grid drift (and the slow background push-in during the outro).
- Something small is always alive: grid drift, rotating wireframes, a scan line.
- Once settled, text is **completely static** until it exits.

### 5.2 Headline entrance (measured)
Per word, in RTL reading order:

| Property | Value |
|---|---|
| Stagger between words | **2 frames** (0.067 s), continuing across lines |
| Opacity | 0 → 100 % linearly over **6 frames** (0.2 s) |
| Position | starts **≈ 56 px below**, rises with a spring |
| Overshoot | ≈ 3–5 px above the final position at ≈ frame 9–11 |
| Fully settled | ≈ 15 frames (0.5 s) after the word starts |
| Colour | each word enters already in its final colour |

Measured rise of one word (px below final position, per frame): 58, 50, 41, 33, 24, 17, 10,
5, 1, −1, −3, −3, −3, −3, −2, −2, −1, 0.

### 5.3 Headline exit (measured)
- All words leave **together** (no stagger).
- **4 frames** (0.13 s): opacity 100 → 0 while lifting ≈ 25–30 px upward, accelerating
  (opacity per frame ≈ 95, 78, 43, 8 %).
- Then **≈ 3 empty frames** before the next headline's first word starts.
- Total swap from first fading frame to first new word: ≈ 7 frames (0.23 s).

### 5.4 Cards and panels
- Enter by **rising ≈ 100 px with a fade over ≈ 13 frames**, strong ease-out, **no
  overshoot** (per-frame steps: 15, 15, 13, 13, 11, 9, 7, 5, 4, 3, 3, 1, 1).
- Card style: `panel` fill, 2 px `panel-border`, corner radius ≈ 32 px. Dashed inner drop
  zones use an accent dashed stroke.
- Items inside a card appear **one after another** (rows ≈ 0.15–0.8 s apart, chips
  ≈ 3 frames apart).
- A scene's main card starts entering **during** the wipe, so it is already arriving when
  revealed.

### 5.5 Recurring motifs (all in accent line-art on dark panels)
| Motif | Behaviour |
|---|---|
| **Strike-through** | Accent line ≈ 6 px + glow, drawn **right to left** across a word in ≈ 8 frames (ease-out). The word dims and tints blue. |
| **X mark** | Two accent strokes drawn in ≈ 5 frames over a ghosted, slightly tilted (≈ 8°) panel that represents "the thing you don't need". |
| **Number count-up** | Values count from 0 to the target in ≈ 18 frames with ease-out (`$14.50`, `03:20 H`); progress bar 0 → 100 % in ≈ 20 frames with a mono percentage. |
| **Cursor** | White arrow with dark outline, travels on a curved path for ≈ 1 s, then clicks. |
| **Click ripple** | 2–3 thin accent rings expand from the click point and fade over ≈ 16 frames. |
| **Wireframe 3D** | Accent wireframe models rotating continuously; a selected model fills in from bottom to top as a solid light-grey mesh (like a print growing). |
| **Scan line** | Thin horizontal accent line sweeping up and down a 3D object. |
| **Pop-in icons** | Speech bubbles and similar icons scale in, staggered ≈ 2 frames; leave by shrinking and fading, staggered. |
| **Draw-on stroke** | Circles, check marks and the logo outline are drawn along their path (≈ 6–10 frames), then the inner detail appears. |
| **Notification card** | Drops in from the top with a small overshoot, then later slides up to make room. |

### 5.6 Scene transition — diagonal wipe (identical every time, measured)
- A straight **accent line, 4 px wide with glow**, tilted **13.4° from vertical** (leaning
  like "/"), sweeps **right to left** across the whole frame.
- A second, 1 px dim accent line follows ≈ 38 px behind it (to the right).
- The **new scene is revealed to the right** of the line; the old scene remains to the left.
- Duration: **7 frames** (0.23 s), symmetric ease-in-out. Horizontal position of the line
  at the bottom edge per frame: 1076, 960, 721, 318, then at the top edge: 358, 120, 3.
- The scene counter changes on the middle frame.
- **No other transition type is used between scenes.** Inside a scene, only the headline
  swap (5.3) and element animations are used.

---

## 6. Pacing and structure

- A scene is one idea with one visual. Scene lengths in the reference: **1.5 s to 5.4 s**.
- A scene holds 1–4 headlines. A headline stays on screen ≈ **1.0–2.2 s**.
- Every headline has a matching visual event (strike, upload, click, count-up…) that
  starts 0.3–0.8 s after the headline lands.
- A short **text-only beat** (headline alone on the background, ≈ 0.75 s) is allowed for a
  punchline.
- Layout: headline on top, **one** centred visual below it. Nothing else on screen except
  the HUD.

---

## 7. Sound

Measured from the reference audio (it could be analysed but not listened to or transcribed):

- The track is **voice-over only**: a single voice (median pitch ≈ 260 Hz), centred.
- **No music bed and no sound effects were detected** — pauses drop to digital silence,
  including under the wipes.
- Loudness of the main section: ≈ **−23.6 LUFS**, true peak ≈ −9 dBTP (quiet master).
- **Sync rules:**
  - Each headline's first word lands within ≈ 1–2 frames of the start of its spoken phrase.
  - **Scene wipes are placed in voice-over pauses** (4 of the 5 wipes sit inside a
    0.19–0.33 s silence).
  - In the outro, **each phone digit appears on the onset of its spoken digit**.
  - The voice ends ≈ 0.7 s before the final frame; the picture holds still under silence.

Do not add music or sound effects unless the user asks for them.

---

## 8. Outro (mandatory, reproduce exactly)

The outro is the last scene; the counter reads `TT / TT` (reference: `11 / 11`).
Stills: `reference/frames/outro-f140-final-hold.jpg` (original reference, hexagon logo) and
`reference/frames/outro-website-logo-lockup.jpg` (current lock-up with the website logo).

### 8.1 Final layout (top to bottom, everything centred on x = 540)

| Element | Geometry (px) | Style |
|---|---|---|
| Headline `جرّبها هلأ` | ink x 255–823, y 362–545 | Plex Sans Arabic Bold **156 px**; `جرّبها` white, `هلأ` accent with glow |
| Sub-line `وتواصل معنا على الرقم` | ink y ≈ 575–632, width 541 | Plex Sans Arabic Medium **62 px**; white, `الرقم` accent |
| Phone card | x 98–981, y 758–981 (884 × 224) | `panel` fill, 2 px `panel-border`, radius ≈ 32 px |
| Phone number `81 424 535` | ink x 176–723, y 835–909, left-aligned inside the card | Plex Sans Bold **≈ 105 px**, white, grouped 2-3-3 |
| Call button | circle Ø 132, centre (870, 870), at the right of the card | accent fill, dark handset glyph |
| Logo mark | 150 × 150 at x 465–615, y 1122–1272 | **website "K" mark** (`logo-mark` symbol): white tile, accent K |
| Wordmark | 330 × 106 at x 375–705, y 1302–1408 | **website wordmark** (`logo-word` symbol): `Kayan` white, `Maker Lab` accent |
| Tagline `3D PRINTING · CNC · LASER · PROTOTYPING` | ink x 244–834, y 1486–1500 | Plex Mono ≈ 22 px, `text-muted` |

Before a digit is typed, its slot shows a dim underscore placeholder (`__ ___ ___`).

### 8.2 Animation order (times relative to the first frame of the reference outro clip)

| Time | Event |
|---|---|
| before 0.00 | Headline and sub-line are already settled (their entrance is **NOT OBSERVED** — use the standard headline entrance, section 5.2) |
| 0.10 – 0.47 s | Logo mark outline **draws on** in accent; the white tile and the K fade in by ≈ 0.63 s and the outline fades away |
| 0.37 – 0.70 s | `Kayan` wordmark fades in (grey → white) |
| 0.47 – 0.83 s | Phone card rises and fades in with empty placeholders and the call button |
| 0.60 – 0.83 s | `Maker Lab` part of the wordmark fades in |
| 0.83 – 1.13 s | Tagline fades in |
| 1.13 s | Digit `8` |
| 1.47 s | Digit `1` |
| 2.13 s | Digit `4` |
| 2.33 s | Digit `2` |
| 2.53 s | Digit `4` |
| 2.83 s | Digit `5` |
| 3.27 s | Digit `3` |
| 3.63 s | Digit `5` |
| 4.17 s | Last digit turns white; everything is final |
| ≈ 4.30 s | Voice-over ends |
| 4.17 – 5.00 s | **Static hold** (≥ 0.8 s) under silence |

Digit behaviour (measured, identical for all 8 digits):
- Appears **in accent colour, 30 px below** its final position.
- Springs up to place in ≈ 8 frames with a 3–4 px overshoot.
- Switches from accent to **white 15–16 frames (0.5 s)** after it appeared.
- Digit timing is **not a fixed interval** — it follows the spoken digits (gaps of
  6–20 frames in the reference). Re-time to the new voice-over.

Background during the outro: the grid keeps drifting and additionally **scales slowly from
1.00 to 1.04** over the 5 s (ease-out). Content and HUD do not scale.

### 8.3 What may change
Only the phone number, and the headline wording if the user asks. Layout, fonts, colours,
order, digit behaviour and the logo lock-up stay as specified.

---

## 9. Not observed in the reference

The supplied material covers scenes **03–08** and the outro (**11**) of an 11-scene video.
The following were not seen and must not be assumed:

- Scenes 01–02 (the opening / hook) and scenes 09–10.
- The transition **into** the outro and the outro headline's entrance.
- Any end fade-out after the outro hold (the clip ends on a static frame).
- Music and sound effects (none detected in the supplied clips).
- The spoken script (the audio could not be transcribed here).
- A 16:9 or 1:1 version of the layout.
