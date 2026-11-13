# storyboard.json reference

All times are **frames at 30 fps on the final timeline** (frame 90 = 3.0 s). Coordinates in
`capture` and `zoom` are **website CSS pixels** inside the capture viewport (default 390 × 464,
the card's aspect). Working example: `examples/price-calculator/storyboard.json`.

```jsonc
{
  "slug": "kayan-reel-xyz",        // output file name
  "frames": 600,                   // total length (≤ maxFrames, default 600 = 20 s)
  "maxFrames": 600,                // optional: raise only if the user allows > 20 s
  "audio": "voice.mp3",            // optional, relative to the work dir; null = silent
  "audioOffset": 0,                // optional seconds to delay the voice
  "loudness": -23.6,               // optional LUFS target (reference level)
  "capture": { ... },              // only needed for "site" scenes
  "scenes": [ ... ]                // in order; the last one must be the outro
}
```

## scenes

Every scene: `start` (frame; it is the **middle frame of the wipe** into it — the wipe runs
start−3 … start+3; the first scene starts at 0) and `type`. A scene ends where the next starts.
The HUD counter shows `NN / TT` with TT = number of scenes.

```jsonc
{ "start": 90, "type": "site", "shot": "s2",
  "zoom": [[157, 1, 195, 430], [175, 1.17, 195, 430]],   // [frame, scale, focusX, focusY] eased between keys
  "panelIn": 87,                                          // optional: card entrance frame (default start-3; 0 for scene 1)
  "headlines": [ ... ] }

{ "start": 300, "type": "image", "src": "../../assets/products/215691.jpg", "zoom": [...], "headlines": [...] }
  // src is relative to the work dir (comp.html lives there) or absolute file:// path

{ "start": 200, "type": "text", "headlines": [ ... ] }    // headline-only beat on the background

{ "start": 0, "type": "photo",                // full-bleed picture (guide 5.7) — dark, cyan-lit pictures only
  "src": "photos/nozzle.jpg",                 // relative to the work dir; ask the user for real KAYAN photos
  "band": 600,                                // dark headline band height (0 = top gradient only, like master scene 09)
  "push": 0.0007,                             // push-in per frame (default = master scene 10)
  "kicker": ["KAYAN", "MAKER", "*LAB"],       // optional Latin line above the headline (master scene 10)
  "reveal": { "at": 24, "frames": 16 },       // optional scan-line reveal of the picture, bottom -> band edge
  "tag": { "at": 65, "text": "بلا وجع راس", "y": 640 },             // optional reassurance pill
  "callouts": [ { "at": 33, "x": 560, "y": 1240, "lx": 700, "ly": 1130, "label": "NOZZLE Ø 0.4 MM" } ],
                                              // point (x,y) -> label anchor (lx,ly), stage px; only true specs
  "status": { "at": 6, "n0": 108, "n1": 183, "total": 240, "label": "LAYER", "right": "PLA   0.2 MM" },
  "headlines": [ ... ] }

{ "start": 96, "type": "brand",               // brand intro (guide 5.8): website logo drawn on + wordmark
  "sub": ["مع", "كيان", "ميكر", "لاب"], "headline": ["*الحل", "عنّا!"], "headlineAt": 39 }

{ "start": 480, "type": "outro",
  "headline": ["ما", "*تعقّدها"],          // 156 px, one line
  "sub": ["اطلب", "*أونلاين"],             // 62 px Medium
  "phone": "81 424 535",                   // default
  "digits": [81,91,111,117,123,132,145,156], // offsets from outro start, one per digit, on the spoken digits (default 81 + 10k)
  "tagline": "3D PRINTING  ·  PROTOTYPING",   // default (owner decision: only services offered)
  "timing": "master" }                       // default: master timing (headline +4, sub +36, logo +48, digits from +81,
                                             // ~6.6 s with hold). "compact" = the shorter pre-2026-11-13 timing (deviation)
```

Zoom: keep scale ≤ 1.2 so text stays sharp (footage is captured at 4×). Focus Y around the
element you want centred; with scale 1 the focus is irrelevant, so change it while unzoomed.

## headlines

```jsonc
{ "start": 93,            // first word appears (then one word every 2 frames, right to left)
  "end": 142,             // optional: exit (4 frames). Omit for the scene's last headline — the wipe removes it.
  "size": 120,            // optional: auto from the guide table (2 lines 100, 4 words 110, 3 words 120, 2 words 130/140, 1 word 150)
  "y": 432,               // optional: vertical centre of the block (default 432; text-led scenes ~620)
  "lines": [["فوت", "على", "*الموقع"]] }   // words in reading order; "*" = accent colour

Add `"dir": "ltr"` for a Latin-only headline (e.g. a slogan) so words read and enter left to right.
Add `"lineStarts": [879, 923]` to make each line enter at its own frame (second line added
under a line that stays — master scene 10).
```

Leave ≥ 7 frames between one headline's `end` and the next `start` (guide 5.3). A "word" may
contain a space when it must stay together (`"*الـ STL"`).

## capture

```jsonc
"capture": {
  "url": "local",            // "local" = serve this repo on :8765; or a real URL
  "viewport": [390, 464], "scale": 4, "theme": "dark",
  "shots": [ { "id": "s1", "from": 0, "to": 94, "actions": [ ... ] } ]
}
```

A shot is recorded frame by frame for `from…to`; give it 4+ frames of overlap with the wipe
(the scene needs footage from start−3). Shots run in order on **one page**, so state
(uploaded file, chosen options) carries over.

| action | fields | does |
|---|---|---|
| `scroll` | `from`, `to`, and `y` **or** `target` + `offset` | eased scroll; `target` resolves to element top − offset at `from` (`from`=`to` jumps) |
| `cursor` | `at`, `x`, `y` | cursor appears there |
| `click` | `at`, `target`, `dx`, `dy`, `travel`, `real` | cursor glides (`travel` frames), click ring at `at`; real click unless `real:false` |
| `press` | same as click | mouse down without release — shows pressing a link button without leaving the page |
| `select` | `at`, `target`, `value` | real `<select>` change (pair with a `click` `real:false` for the cursor) |
| `check` | `at`, `target` | real checkbox/radio |
| `upload` | `at`, `input`, `file`, `ms` | real file upload (path relative to work dir), waits `ms` |
| `drag` | `at`, `to`, `target`, `dx`, `dy`, `by: [dx, dy, arc]` | real mouse drag (e.g. rotate the 3D preview) |
| `hide` | `at` | cursor fades out |
| `wait` | `at`, `ms` | real-time wait (page animations) |
| `record` | `at`, `name`, `target` | saves the element's text + box to `site/meta.json` `records` |

Any action can add `"log": "<selector>"` to print that element's value after it runs —
use it to read the real price instead of guessing.
