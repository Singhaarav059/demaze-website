# Handoff: Scroll & Motion Effects for demazetech.com

## Overview
Adds a premium scroll-driven motion layer to the existing homepage — scroll progress bar, header condense-on-scroll, count-up metrics, a pinned/crossfading services panel, subtle parallax on the hero video and project images, and an infinite tech-logo marquee. **No copy, logo, image, or section is removed or reworded** — this only adds motion behavior on top of what already renders.

## About these files
The attached `Homepage Scroll Effects Preview.dc.html` is a **design reference** built outside your app to demonstrate the effects with your real content/colors — it is not code to ship. The files below, by contrast, are **real, drop-in TypeScript/CSS for this repo**, written to match its existing conventions exactly (rAF-gated scroll listeners, `IntersectionObserver`, `prefers-reduced-motion` checks, passive listeners) — the same pattern already used in `scroll-focus-stack.tsx` and `content-sections.tsx`. Default motion intensity: **subtle** (short travel distances, gentle easing), per the client's tweak choice in the preview.

## Files in this package
- `files/scroll-progress.tsx` → new file, save as `src/components/scroll-progress.tsx`
- `files/pinned-services-showcase.tsx` → new file, save as `src/components/pinned-services-showcase.tsx`
- `files/styles-additions.css` → append to the end of `src/styles.css`
- `PATCHES.md` → exact edits to make in `site-shell.tsx`, `content-sections.tsx`, and `routes/index.tsx`

## Design tokens used (already in `src/styles.css`, unchanged)
- Colors: `--raspberry`, `--raspberry-ink`, `--lavender`, `--sky`, `--mint`, `--ink`, `--line`, `--background`
- Fonts: `--font-display` (Space Grotesk Variable), `--font-sans` (DM Sans Variable)
- Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`

## Behavior summary
1. **Scroll progress bar** — 3px fixed bar at the top, fills with scroll depth.
2. **Header condense** — header gains a translucent blurred background + shadow after 40px of scroll; logo/nav untouched.
3. **Count-up metrics** — the four homepage stats animate from 0 to their value once scrolled into view (once only).
4. **Pinned services showcase** — new homepage-only variant: a sticky image panel on the left crossfades between the 4 service images as the matching row on the right scrolls to center. Existing `ServicesGrid` (used on `/services`) is untouched.
5. **Parallax** — hero video drifts/scales slightly on scroll; project card images shift within their frame as the card crosses the viewport.
6. **Tech marquee** — the technology logo band becomes an infinite auto-scrolling strip (duplicated list, CSS `animation`, pauses under `prefers-reduced-motion`).

All effects respect `prefers-reduced-motion: reduce` (skip to end state, no listeners attached), matching the rest of the codebase.

## Assets
No new assets — reuses existing images in `src/assets/images.ts` (service images, project images) and the existing hero video/poster.

## Next steps for the implementer
1. Add the two new component files.
2. Append `styles-additions.css` to `styles.css`.
3. Apply the three edits in `PATCHES.md`.
4. Run `npm run typecheck && npm run lint && npm test && npm run build` (per the repo's own CI gate).
