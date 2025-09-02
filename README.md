# Netflix-like Movies (Vite + React + TypeScript + SSR + SCSS)

A handcrafted, server‑side rendered React app bundled with Vite. It lets you browse movies by three categories (Popular, Top Rated, Now Playing), open a detail page with category‑specific styling, and manage a wishlist — all without UI libraries like Material UI, Tailwind, CSS Modules or Styled Components. Styling is done with plain SCSS.

> **Stack:** Vite, React 18, TypeScript, Express (for SSR + API proxy), SCSS.  
> **No full‑stack frameworks** (e.g., Next.js) are used. **No UI libraries** are used.

---

## Quick start

1. **Clone & install**

   npm install

2. **Run in development (SSR)**

   npm run dev

   Open `http://localhost:5173`.

3. **Production build & preview**
   npm run build
   npm run preview

---

## Why these choices?

- **Vite** for fast dev server + production bundling, and because it supports **native SSR** without imposing a framework.
- **React 18 + TypeScript** for a typed, modern UI stack.
- **Express** to wire up SSR and expose a tiny API proxy to TMDB so the API key never ships to the browser.
- **Plain SCSS** for styling to respect the rules and keep CSS readable and centralized. No CSS Modules/Tailwind/Styled‑Components.
- **No UI kit**: components (navbar, carousel, buttons) are hand‑crafted for full control.
- **Route‑aware SSR**: the server preloads data for `/`, `/movie/:id`, and `/wishlist` so the first paint is meaningful. The initial state is safely inlined and re‑used on hydrate.

---

## What’s implemented

- **Homepage with 3 carousels**: Popular, Top Rated, Now Playing.
- **Detail page**: poster, backdrop, description, rating, release date, and an **Add to wishlist** button.
- **Category‑specific differentiation**: the detail page uses different fonts and button accents based on the `cat` param (`popular`, `top_rated`, `now_playing`).
- **Wishlist section** that lists all saved titles with poster thumbnails.
- **SSR** both in dev and prod, with route‑aware data preloading and hydration.
- **SCSS** theme inspired by Netflix: dark backgrounds, red accent, bold typography.
- **Extra feature** Categories page — a new route that shows all movie genres with individual carousels for each genre. This allows browsing movies by genre dynamically using the TMDB API.

---

## How SSR works here

1. **Dev**: Express starts Vite in middleware mode. For each request:
   - It _preloads route data_ (TMDB lists or movie detail).
   - It loads `/src/entry-server.tsx` through Vite and renders the app via `renderToString` inside a `StaticRouter`.
   - It injects the rendered HTML into `index.html` and serializes the **initial state** into `window.__INITIAL_STATE__`.
2. **Client**: `entry-client.tsx` hydrates the server markup inside a `BrowserRouter`, reusing the initial state from a lightweight context.
3. **Prod**: `npm run build` emits `dist/client` and `dist/server/entry-server.js`. The same server file serves static assets and calls the built SSR module.

**Advantages**

- **Fast TTI** with HTML that already contains critical content.
- **SEO‑friendly** pages (metadata could be extended per route).
- **No API key leakage** thanks to the server proxy.
- **Simple data model**: Basic cookie persistence keeps wishlist across visits and is readable on the server for SSR.

---

## Styling decisions (SCSS)

- A small **design‑token** file (`variables.scss`) defines colors, radii, spacing and fonts.
- The **Netflix vibe** comes from a dark palette, a bold accent (#E50914), elevated cards, and large typography.
- **Category‑based styles**: `category-popular`, `category-top_rated`, `category-now_playing` switch fonts and button colors.
- **Categories page styling** each genre carousel inherits the same Netflix-inspired style and uses the genre title as a header for clarity.

---

## Running step‑by‑step

1. **Install Node 18+** (or 20+ recommended).
2. **Install dependencies**: `npm install`.
3. **Get a TMDB API key** (v3) and put it in `.env` as `TMDB_API_KEY`.
4. **Start dev server**: `npm run dev`.
5. **Open** `http://localhost:5173` and:
   - Browse the home page carousels.
   - Click a movie to open its details. The URL carries `?cat=popular|top_rated|now_playing` to style the page.
   - Click **Add to wishlist** and then open **Wishlist** from the top nav.
6. **Build for production**: `npm run build` → then `npm run preview`.

---

## Notes & trade‑offs

- **Cookie wishlist** is intentionally simple (no auth). For a real app use a backend/session and CSRF protection.
- This demo **doesn’t bundle a font license**; Google Fonts are referenced from the CDN.
- If you need pagination/infinite scroll, add API calls and intersection observers to the carousel.
- Error boundaries & skeletons can be added for richer UX.

---

## Scripts

- `npm run dev` – Start SSR dev server with Vite middleware.
- `npm run build` – Build client and SSR bundles.
- `npm run preview` – Start the production server (serves `dist/client` and SSR entry).

---

## Extending & testing

- Add unit tests with Vitest/RTL
- Add CI that runs `npm ci && npm run typecheck && npm run build`.
