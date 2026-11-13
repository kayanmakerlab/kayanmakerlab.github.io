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

{ "start": 480, "type": "outro",
  "headline": ["ما", "*تعقّدها"],          // 156 px, one line
  "sub": ["اطلب", "*أونلاين"],             // 62 px Medium
  "phone": "81 424 535",                   // default
  "digits": [41,46,51,56,61,66,71,76],     // frame offsets from outro start, one per digit (default 41 + 5k)
  "tagline": "3D PRINTING  ·  PROTOTYPING" }  // default (owner decision: only services offered)
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
