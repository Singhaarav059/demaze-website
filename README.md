# Demaze Technologies — marketing site

The public site for [Demaze Technologies](https://www.demazetech.com), an AI and
software studio in Ahmedabad. A scroll-driven single narrative on the homepage,
plus four supporting pages, built as a static Next.js app with no backend.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Styling | Tailwind CSS v4, configured in `src/app/globals.css` via `@theme` |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) for smoothing, GSAP ScrollTrigger for pins and scrubs |
| 3D | three.js via `@react-three/fiber` and `drei`, behind a dynamic import |
| Fonts | Bricolage Grotesque (display) and Inter Tight (body), self-hosted by `next/font` |

There is no database, API route or CMS. Copy lives in `src/content`, images in
`public`, and the contact form composes a `mailto:` draft rather than posting
anywhere.

## Getting started

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

Judge motion and scroll smoothness on a production build, not on `next dev` —
the dev server ships an unminified React, Turbopack instrumentation and
on-demand image optimisation, and is materially choppier than what deploys:

```bash
npm run build && npm start
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run optimize-images` | Dry run of the image pipeline below |

## Layout

```
src/
  app/            Routes. One page per directory, plus robots, sitemap and the OG image.
  components/     Every section is a component; the homepage composes them in order.
  content/        All copy and project data. Edit here, not in components.
public/
  projects/       Case-study imagery, .webp only.
scripts/
  optimize-images.mjs
```

## Conventions worth knowing

**Copy lives in `src/content`.** `site.ts` carries the studio's own details and
is the single source for metadata, the JSON-LD organisation schema and the
footer. Changing a headline should never mean touching a component.

**Images are committed as `.webp`.** Mockups arrive as 1–2MB PNG exports for
slots at most ~620 CSS px wide. Run the pipeline before committing new ones:

```bash
node scripts/optimize-images.mjs public/projects --apply
```

It caps width at 1600px, re-encodes at quality 86 and deletes the source PNG.
Dry-run it first — without `--apply` it only prints the savings.

**Every scroll set-piece has a fallback.** The three flagship chapters, the
process track and the WebGL hero all check `prefers-reduced-motion` and a
viewport width before they pin or animate, and render a static stacked layout
otherwise. The fallback is not an afterthought: it is what phones get.

**Pinned sections size against their container's height, not the column
width.** They are locked to `100vh`, so a stage sized only from its width
letterboxes on a short screen and its contents then overrun the copy around it.
The stages cap their width in container-query units (`cqh`) so they keep their
aspect ratio and fit instead of cropping.

**Scroll smoothing compounds.** Lenis damps the scroll position and every
scrubbed ScrollTrigger damps again on top of it. Both are tuned together in
`SmoothScroll.tsx` and the chapter components; raising one without looking at
the other is what makes the page feel slow rather than smooth.

## Deployment

Static output, deployable anywhere that runs Next.js. Set
`NEXT_PUBLIC_SITE_URL` in the environment so canonical URLs, the sitemap and the
OG image resolve against the right origin; it defaults to
`https://www.demazetech.com`.
