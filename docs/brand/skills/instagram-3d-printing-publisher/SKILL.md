---
name: "instagram-3d-printing-publisher"
description: "Use when the user wants a new Instagram post or Reel for their 3D-printing account: research trends/hooks, design it, write the caption, get approval, then publish via the built-in browser."
---

# Instagram 3D-printing publisher

The user runs an Instagram account about 3D printing (likely Kayan Maker Lab). They speak Levantine Arabic; reply in the same dialect. Workflow: research -> design -> caption -> full review -> publish. NEVER publish without an explicit "yes" after showing every detail.

## 1. Research (before designing)
- WebSearch (send several searches in one turn) for what is trending in 3D printing right now: new printers/filaments (Bambu Lab, Prusa, Creality, Elegoo), viral prints (articulated/fidget prints, cosplay, home organizers, gifts, lithophanes), seasonal hooks (holidays, back to school, Ramadan/Eid, Christmas), and Arabic-speaking maker content.
- If the Social Media Skills plugin is installed, use its skills: trend-jacking, viral-reverse-engineering, hook-writer, hashtag-strategy, instagram-growth, content-calendar.
- Propose 3 topic ideas, each with: format (single post / carousel / Reel), a hook (first line or first 2 seconds), and why it should perform. Let the user pick unless they already chose.

## 2. Design
- PRODUCT POSTS (user sends a product photo): use the approved Kayan product template, a 2-slide carousel at 1080x1350: slide 1 cover (real logo top-left, "جديد" pill, big photo in a cut-corner frame with offset outline, title + cyan accent word, "اسحب للتفاصيل"), slide 2 details (title, subtitle, diamond-bullet specs, color dots, WhatsApp CTA, photo frame on the left), footer pill with socials + 81424535.
  - Template lives on the user's computer: Pictures\Kayan Posts\_template\ (kayan_post.py, assets\logo.png, product-example.json). Fonts: IBMPlexArabic-*.ttf in AppData\Local\Microsoft\Windows\Fonts. Stage them into the workspace (assets/ next to the script), make products/<name>/product.json + photo.jpg, run `python3 kayan_post.py products/<name>` (Playwright + /usr/bin/google-chrome), then save the PNGs to Pictures\Kayan Posts\<name>\.
  - Ask for any missing product facts (material, size, colors, price) instead of inventing them.
- If the account is Kayan, follow the kayan-brand-posters skill for the visual identity.
- Image posts: 1080x1350 (4:5) for feed, 1080x1920 for Reels/Stories covers. Build in HTML/SVG and render to PNG, or write a Nano Banana / Flux prompt with pro-image-prompts when a photo-real image is needed.
- Every product gets THREE versions from the Kayan template (kayan_post.py writes all five files in one run): Instagram feed carousel insta-1-cover.png + insta-2-details.png (1080x1350); Instagram Story story.png (1080x1920, ~270px clear top and bottom); TikTok photo-mode tiktok-1-cover.png + tiktok-2-details.png (1080x1920, ~170px clear on the right for TikTok's buttons, ~440px clear at the bottom for the caption). The logo must always be clearly visible, and the footer shows the Facebook, TikTok and Instagram icons + WhatsApp 81424535.
- Reels: use the Remotion skills; keep 7-20 s, hook in the first 2 s, on-screen text, safe zones away from the top/bottom UI.
- Send the finished file to the user with SendUserFile.

## 3. Caption
- Line 1 = hook (must work before "...more").
- 2-5 short lines of value (tip, settings, filament, print time) + a clear CTA (save, share, comment a keyword, DM to order).
- Max 5 hashtags (Instagram's current limit), mixed niche + Arabic + brand (#KayanMakerLab), never the same block every post, no banned/spammy tags.
- Arabic by default; add an English line if the user wants reach outside the Arab world.

## 4. Review (mandatory)
Show the user, in one message: the file, full caption, hashtags, format, alt text, location (if any), and suggested posting time (Beirut time; evenings ~19:00-22:00 usually work best, verify with the account's insights). Wait for an explicit approval. Apply edits and re-show if anything changes.

## 5. Publish (built-in browser)
- Load the built-in-browser skill. Open https://www.instagram.com/ with preview_start. If a site-access error appears, call request_access for instagram.com with scope "site".
- If logged out, ask the user to log in themselves; never type their password.
- Click Create (+) -> Post, upload the file with the page's file input, choose crop 4:5 (or original), skip filters, paste the approved caption exactly, add alt text under Advanced settings, then Share only after approval.
- Confirm the post appears on the profile and report the link.

## Agreed rules (mandatory, owner 2026-11-15)
- Dialect: Lebanese colloquial in designs and captions, never formal Arabic.
- Website: kayanmakerlab.com (no https:// in designs). WhatsApp: 81424535 (wa.me/96181424535).
- Services: the shop (ready-made parts), send us a photo, we model your idea, or upload an STL to the calculator and see the price instantly. Delivery $5 anywhere in Lebanon, payment on delivery, Whish deposit for orders over $10.
- Icons: line icons in one colour, cyan #1DE5F5. No coloured emoji in designs.
- Logo: the real Kayan logo (from the PDF), medium size (68 px tall on posts), no effects on the logo.
- Carousel and Reel covers: the full logo centred inside a cyan ring with 4 dots.
- Profile picture: the full logo on #0F1A1E with a light grid, no ring.
- Every product: Instagram 1080x1350 (2 slides), Story 1080x1920, TikTok 1080x1920 (170 px clear on the right, 440 px clear at the bottom).
- Hashtags: exactly 5, always including #KayanMakerLab (overrides the hashtag guidance above).
- Files: Desktop\kayan\kayan maker lab\designs (posts, highlights, profile, _template); scripts and covers in videos\scripts and videos\covers.
- Publishing: never without explicit approval. The built-in browser cannot upload files: publish from the phone, with Claude in Chrome (it can upload), or Meta Business Suite for Stories.

## Anti-ban rules
- Only the official web UI, at a human pace; max 1-2 feed posts per day.
- No mass follow/like/comment, no automation tools that need the password.
- No repeated identical hashtag blocks, no suspicious links in captions.
