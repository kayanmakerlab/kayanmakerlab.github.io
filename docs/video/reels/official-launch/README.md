# Reel: trial launch (34.2 s, 1080×1920, 30 fps) — with ElevenLabs voice-over

Voice: ElevenLabs «Mimi – Lebanese Beirut» (`source/voice-elevenlabs-mimi.mp3`, 33.6 s), muxed
mono → stereo AAC 48 kHz, normalised to −23.6 LUFS (reference level). Built with the
`kayan-video` skill from `source/storyboard.json` (image `src` paths point to `assets/products/`).

## Script (as recorded)

> في شي ببالك؟... أو قطعة مش لاقيها بالسوق؟ / مع كيان ميكر لاب... حوّلها لواقع! / طباعة ثلاثية
> الأبعاد حسب طلبك: مجسّمات، نماذج، وهدايا. / هيدا انطلاقنا التجريبي... لنقدّملكن أفضل خدمة. /
> على موقعنا، ارفع ملف الإس تي إل، وشوف سعر تقريبي قبل ما تطلب. / في قطع جاهزة بالمتجر... والطلب
> عبر واتساب. / توصيل لكل لبنان، والدفع عبر ويش موني. / جرّبونا هلّق! فتحنا استقبال الطلبات.
> تمانية، واحد... أربعة، تنين، أربعة... خمسة، تلاتة، خمسة.

## Sync

The audio was measured, not heard (no speech recognition available): the voice's pauses
(`source/voice-timing.json`) were matched to the script — the 7 longest pauses fall between
the 8 sections and the number shows as 8 bursts with the two «...» gaps. Every wipe sits in a
pause (frames 103, 195, 347, 459, 598, 690, 784). Headlines start 1–2 frames after their
phrase; split points inside a phrase (e.g. «ارفع…» / «وشوف…») are estimated to ±5 frames.
Outro: «جرّبونا هلّق» at +4 and «فتحنا…» at +36 after the wipe (= master timing), digits on
the spoken digits, 26-frame still hold after the voice.

| # | Frames | On screen | Picture |
|---|---|---|---|
| 1 | 0–103 | في شي **ببالك؟** → أو قطعة / **مش لاقيها؟** | drill-guide print |
| 2 | 103–195 | مع كيان ميكر لاب → **حوّلها** لواقع | brand intro (website logo) |
| 3 | 195–347 | طباعة **3D** / حسب **طلبك** → مجسّمات ونماذج / **وهدايا** | dinosaur print |
| 4 | 347–459 | هيدا **انطلاقنا** / **التجريبي** → لنقدّملكن / **أفضل خدمة** | text beat |
| 5 | 459–598 | على **موقعنا** → ارفع ملف **STL** → وشوف **سعر تقريبي** / قبل ما تطلب | real site: upload, preview, `$14` |
| 6 | 598–690 | وقطع **جاهزة** / بالمتجر → والطلب عبر / **واتساب** | real site: shop → المطبخ |
| 7 | 690–784 | توصيل لكل **لبنان** → والدفع عبر / **Whish Money** | real site: hero chips |
| 8 | 784–1027 | جرّبونا **هلأ** / فتحنا استقبال **الطلبات** | outro 81 424 535 |

Deviations: 34.2 s instead of 30 s (the recorded voice is 33.6 s); bright product photos
inside the card rather than full-bleed; slight zooms on footage and photos.
