# Portfolio — Setup Notes

A static site: just open `index.html` in a browser, or host the folder
anywhere (GitHub Pages, Netlify, any static host — no build step, no server).

## 1. Edit your content in one place
Everything — your name, WhatsApp number, LinkedIn URL, and every project,
image and service — lives in **`js/data.js`**. Search that file for `TODO`
and fill in:
- `meta.name`, `meta.whatsappNumber` (digits only, country code first, e.g. `2348012345678`), `meta.linkedinUrl`
- `meta.photo` — set to `"assets/images/headshot.jpg"` once you drop a photo
  in `assets/images/`. Leave it as `""` and the header/profile show your
  initials in a seal instead, so the layout never looks broken.
- `meta.bio` — an array of strings, one per paragraph, shown under your name.
- `meta.quickFacts` — the small label/value grid under your bio (location,
  years of experience, focus areas, availability). Add, remove, or rename rows freely.
- Real project descriptions under `software` and `embedded-automation`
- Swap image placeholders by setting `src: "assets/images/your-file.jpg"`
  once you drop the file into `assets/images/`. Leave `src: ""` and a
  labeled placeholder swatch renders automatically so nothing looks broken.

You never need to touch `index.html`, `style.css`, or `main.js` to update
content — they read everything from `data.js`.

## 2. Structure
- `index.html` — page shell (header title-block, WhatsApp button, app mount point)
- `css/style.css` — the blueprint/technical-drawing design system
- `js/data.js` — **your content** (edit this)
- `js/main.js` — rendering logic + hash router (`#/skill/graphic-design`, etc.)

## 3. How navigation works
The hub page lists all five skills as "sheets." Clicking one updates the URL
hash (e.g. `#/skill/cad-pcb`) and renders that skill's full detail view —
no page reload, and each skill has a shareable/bookmarkable link.

## 4. Adding a sixth skill later
Copy one of the objects in the `skills` array in `data.js`, give it a new
`id` and `designator`, and it will automatically appear on the hub and get
a working detail page — no other file needs changes.
