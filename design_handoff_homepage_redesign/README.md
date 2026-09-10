# Handoff: Homepage Motion Redesign — demazetech.com

## Overview
The homepage (`src/routes/index.tsx`) keeps every existing section, all copy, the logo, and all imagery exactly as they are today. This handoff adds a scroll-driven motion layer on top: a scroll progress indicator, a condensing header, count-up stats, a pinned/crossfading services showcase, subtle parallax, and an infinite tech-logo marquee.

## About the design reference
`reference/Homepage Scroll Effects Preview.dc.html` is a **design reference**, built outside the app, showing the intended motion using the site's real copy/images/colors/fonts. It is **not code to ship as-is** — open it in a browser to see and scroll through the intended behavior, then implement it in this codebase's existing stack (TanStack Start + React + Tailwind v4, per `README.md`) using the real, ready-to-merge files in `code/`.

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy in the reference are pulled directly from this repo (`src/styles.css` tokens, `src/lib/site-data.ts` content) — nothing invented. Motion values (distances, durations, easing) are tuned to "subtle" per the client's own choice while reviewing the reference.

## Screens / Views
Single view: the homepage (`/`), rendered by `src/routes/index.tsx` inside `PageLayout` (`src/components/site-shell.tsx`). Section order, unchanged:
1. Header (logo, nav, "Book a call" CTA)
2. Hero (`home-hero`): eyebrow, `<h1>`, intro paragraph, two CTAs, hero video
3. Metrics strip (4 stats)
4. `ScrollFocusStack` chapters, unchanged section content, in order: Our Work (4 project cards + CTA), Services (4 services), Tools & Technologies (8 tech logos), Industries (8 industries + CTA), Why Choose Us (4 values, dark band), Who We Are (founder quote), How We Work (4 process steps), FAQ
5. Footer CTA + footer nav

## Components & behavior added
- **`ScrollProgress`** (`code/scroll-progress.tsx`) — fixed 3px top bar, `linear-gradient(90deg, var(--raspberry), var(--lavender))`, width tracks `scrollY / (scrollHeight - innerHeight)`. Mounted once in `PageLayout`.
- **Header condense** — `site-shell.tsx`'s `SiteHeader` gains a ref + rAF-gated scroll listener toggling `.is-condensed` past 40px scroll (translucent blurred background + shadow; see `code/styles-additions.css`). Logo, nav links, CTA markup untouched.
- **Count-up metrics** — each `MetricsStrip` stat animates 0 → value (`cubic-bezier` ease-out, ~1.1s) once its `IntersectionObserver` fires, then disconnects. Exact patch in `code/PATCHES.md`.
- **`PinnedServicesShowcase`** (`code/pinned-services-showcase.tsx`) — homepage-only replacement for `ServicesGrid` inside the `stack-services` chapter: sticky image panel (left) crossfades between the 4 service images as the matching text row (right) crosses viewport-center. `/services` page keeps the existing `ServicesGrid` — not touched.
- **Parallax** — hero video (`hero-video.tsx`'s frame) drifts/scales slightly with scroll; project card images shift within their fixed-aspect frame as each card crosses the viewport (implemented inline in the reference; port using the same rAF-gated `getBoundingClientRect` pattern as `scroll-focus-stack.tsx`).
- **Tech marquee** — `TechnologyBand` renders its 8 logos twice inside a `.tech-band-track` with a CSS `animation: tech-marquee 26s linear infinite`, masked at both edges.

All new listeners check `window.matchMedia("(prefers-reduced-motion: reduce)")` first and skip entirely when set, matching the existing codebase convention in `scroll-focus-stack.tsx` and `content-sections.tsx`.

## State management
No global/app state. Each effect is local `useRef` + `useEffect` + native scroll/IntersectionObserver, mirroring the existing `ScrollFocusStack` / `ServicesGrid` implementations — no new dependencies.

## Design tokens (already defined in `src/styles.css` — do not redefine)
Colors: `--raspberry`, `--raspberry-ink`, `--lavender`, `--sky`, `--mint`, `--butter`, `--ink`, `--line`, `--background`, `--muted-foreground`.
Fonts: `--font-display` (Space Grotesk Variable), `--font-sans` (DM Sans Variable).
Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`. Radii: `--radius`, `--radius-lg`.

## Assets
No new assets. Reuses `src/assets/images.ts` entries (`service-*`, `project-*`, `founder`, `footer`) and the existing `demaze-robot-studio.mp4` / poster.

## Files
- `reference/Homepage Scroll Effects Preview.dc.html` — open in a browser to see/scroll the intended motion.
- `code/scroll-progress.tsx` — new component, save as `src/components/scroll-progress.tsx`.
- `code/pinned-services-showcase.tsx` — new component, save as `src/components/pinned-services-showcase.tsx`.
- `code/styles-additions.css` — append to `src/styles.css`.
- `code/PATCHES.md` — exact edits for `site-shell.tsx`, `content-sections.tsx`, `routes/index.tsx`.

## Verification
After merging, run the repo's own gate: `npm run typecheck && npm run lint && npm test && npm run build`, then check scroll smoothness and `prefers-reduced-motion` behavior manually (noted as unverified in headless preview per `roadmap.md`).
