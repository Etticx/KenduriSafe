# SecureKenduri — Next.js site

The landing, About and For caterers pages, ported from the static HTML files in the repo root.
They look and behave the same; the shared parts now live in one place.

## Run it

```
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all three pages are prerendered as static)
```

## Where things are

| Path | What |
| --- | --- |
| `app/page.jsx`, `app/home.css` | Landing page (`/`) |
| `app/about/` | About page (`/about`) |
| `app/for-caterers/` | For caterers page (`/for-caterers`) |
| `app/globals.css` | Shared styles: colours, nav, Caterers menu, buttons, footer |
| `components/Nav.jsx` | Nav with the Caterers mega menu |
| `components/HeroScene.jsx`, `lib/heroScene.js` | Fireworks and feast-table hero art |
| `components/DitherArt.jsx`, `lib/dither.js`, `lib/arts.js` | Dotted shield, phone and kawah |
| `components/Rotator.jsx`, `ChatPhone.jsx`, `Planner.jsx` | Rotating word, chat phone, headcount planner |
| `public/assets/` | Photos (Pexels, free licence) |

Each page's own styles are wrapped in `.p-home`, `.p-about` or `.p-caterers` (CSS nesting),
so they never clash when you move between pages.
