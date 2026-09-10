# Handoff: Full Site Redesign — demazetech.com

## Overview
A production handoff for the full motion + layout redesign across every marketing page — Home, Projects, Services, About Us, Contact Us. **No copy, logo, image, or existing section is removed.** This supersedes the earlier `design_handoff_scroll_effects` / `design_handoff_homepage_redesign` packages (same code, now covering the whole site, not just the homepage).

## About the design reference
`reference/Website Redesign Preview.dc.html` is a **design reference** — open it in a browser and use its header nav (Projects / Services / About Us / Contact Us) to click through all 5 pages and scroll each one to see the intended motion and layout. It is built outside the app with the site's real copy, images, colors, and fonts, but it is **not code to ship** — implement it in this codebase's real stack (TanStack Start + React + Tailwind v4) using the files in `code/`.

## Fidelity
**High-fidelity.** All colors/type/spacing/copy come straight from this repo's own `src/styles.css` tokens and `src/lib/site-data.ts`. Motion defaults to **subtle** intensity (short travel distances, gentle easing) — configurable, see Design Tokens below.

## Pages & their story
- **Home** (`/`) — unchanged section order (hero → metrics → work → services → tools → industries → values → story → process → FAQ). New: scroll progress bar, condensing header, count-up metrics, a **pinned services showcase** (sticky image crossfades as the matching service row scrolls to center — the standout "large visual stays pinned while content transitions" moment), infinite tech-logo marquee, subtle parallax on hero video and project images.
- **Projects** (`/projects`) — new **editorial asymmetric grid**: large/small tiles in an uneven rhythm (not a uniform grid), dark gradient caption overlay per project, parallax image drift as each tile crosses the viewport. Tells the portfolio's story as a scannable wall of work rather than a repetitive list.
- **Services** (`/services`) — existing detailed service cards (image + description + checklist) get a hover-lift, plus the same infinite tech marquee and existing industries grid (already covered by `PageLayout`'s generic reveal).
- **About Us** (`/about-us`) — existing structure (team intro + keyword-cloud tags, dark values band, benefit row, compact FAQ, founder quote) already animates via `PageLayout`'s generic scroll-reveal — no structural change needed, just the shared header/progress bar.
- **Contact Us** (`/contact-us`) — existing contact options + form get a hover-lift; shared header/progress bar.

## Shared motion system (all pages)
1. **Scroll progress bar** — fixed 3px top bar, fills with scroll depth.
2. **Header condense** — translucent blurred background + shadow after 40px scroll.
3. **Generic scroll-reveal** — already existed in `site-shell.tsx`'s `PageLayout`; unchanged.
4. All new listeners are rAF-gated and skip under `prefers-reduced-motion: reduce`, matching this codebase's existing convention in `scroll-focus-stack.tsx`.

## Design tokens (already in `src/styles.css` — do not redefine)
Colors: `--raspberry`, `--raspberry-ink`, `--lavender`, `--sky`, `--mint`, `--butter`, `--ink`, `--line`, `--background`, `--muted-foreground`. Fonts: `--font-display` (Space Grotesk Variable), `--font-sans` (DM Sans Variable). Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.

## Assets
No new assets. Reuses `src/assets/images.ts` entries (`service-*`, `project-*`, `founder`, `about`, `footer`) and the existing hero video/poster.

## Files
- `reference/Website Redesign Preview.dc.html` — click through all 5 pages in a browser to see the intended behavior.
- `code/scroll-progress.tsx` → save as `src/components/scroll-progress.tsx`
- `code/pinned-services-showcase.tsx` → save as `src/components/pinned-services-showcase.tsx`
- `code/projects-showcase-grid.tsx` → save as `src/components/projects-showcase-grid.tsx`
- `code/styles-additions.css` → append to `src/styles.css`
- `code/PATCHES.md` → exact edits for `site-shell.tsx`, `content-sections.tsx`, `routes/index.tsx`, `routes/projects.tsx`

## Verification
After merging: `npm run typecheck && npm run lint && npm test && npm run build` (the repo's own CI gate), then a manual scroll-smoothness + `prefers-reduced-motion` pass on a real device (flagged as unverified in headless preview per `roadmap.md`).
