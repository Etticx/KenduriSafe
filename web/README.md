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

## App prototype (`/prototype`)

A clickable phone app for the report's 2.4.4 prototype, Round 2 concept test and test-marketing pilot.
On a computer it shows a 390x844 phone with demo controls beside it; on a phone it fills the screen.

- **Host:** browse without an account, sign up (phone + one-time code) when booking, agree to the
  digital booking agreement, pay the 50% deposit (held by Curlec), track receipts, pay the balance,
  tap *Makanan Diterima*, raise a dispute, leave a verified review.
- **Caterer:** sign up, eKYC (IC + live face check), SSM/LHDN, bank name match, PDPA consent,
  then "under review"; once verified: dashboard, ingredient receipt upload, delivery photos, headcount planner.
- **Admin:** verification checklist; Semak Mule and the background scan need a person to tick them.
- **Demo controls:** view as Host / Caterer / Admin, move the clock (14 days before, event day, 48 hours after),
  jump to any screen for screenshots, reset.

Nothing is real: any phone number and any 6-digit code work, and no payment is made. The demo is kept in the
viewer's own browser (localStorage). The money rules (deposit, invoice cap, auto-release, 80/20 split,
dispute freeze, headcount lock) live in `components/prototype/reducer.js` and are checked by:

```
node components/prototype/reducer.check.mjs
```
