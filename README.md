# Demaze Technologies: marketing site

The public site for [Demaze Technologies](https://www.demazetech.com), an AI and
software engineering studio in Ahmedabad. An editorial, product-led homepage is
supported by services, studio and contact pages, plus a searchable, sector-filtered
portfolio of 16 animated project studies with individual detail routes.

## Stack

- Next.js 16 App Router, React 19 and TypeScript.
- Tailwind CSS v4 and component CSS.
- Fraunces for display type, Inter Tight for body/UI text and JetBrains Mono for
  labels and indices, loaded through `next/font`.
- Authored CSS/SVG product animation, a three-chapter scroll-driven story,
  workflow tabs, an evidence diagram, portfolio filters and diagram inspection.

There is no database, CMS or contact-submission API. The contact form validates
input and prepares a local draft that visitors can review, copy or open in their
email app via `mailto:`. Nothing is submitted to a server or sent automatically;
without JavaScript, visitors are directed to email the studio directly.

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To check the production build:

```bash
npm run build
npm start
```

## Scripts and checks

| Command                          | Purpose                                                          |
| -------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                    | Development server with hot reloading                            |
| `npm run build`                  | Production build, including static project-detail generation     |
| `npm start`                      | Serve the production build with the Next.js runtime              |
| `npm run lint`                   | ESLint                                                           |
| `npm run check:copy`             | Reject em dashes and encoded equivalents in site source          |
| `npm run test:e2e`               | Browser tests using Playwright and axe accessibility checks      |
| `npm run format:check`           | Check formatting of source, scripts, tests and Playwright config |
| `npx prettier --write README.md` | Format this README                                               |
| `npm run prepare-studies`        | Regenerate archived reference crops outside the public site      |
| `npm run optimize-images`        | Dry-run the legacy image optimization utility                    |

Install the test browser with `npx playwright install chromium` before the first
browser test run. The test configuration starts a development server, or reuses
one already listening locally. Tests cover responsive containment, automated
accessibility checks, project routes and filtering, keyboard interactions,
contact drafts, no-JavaScript fallbacks and sitemap coverage. Automated checks
do not replace manual visual and accessibility review.

## Content and visuals

```text
src/app/                  Routes, metadata, sitemap and global styles
src/components/           Page sections, interactions and product illustrations
src/content/              Studio, services, project data and editorial summaries
public/                   Company logo and Krupal's unchanged original portrait
design/source-assets/     Original assets retained outside the public directory
scripts/                  Image preparation utilities
tests/                    Browser regression checks
```

Project records live in `src/content/projects.ts`; their editorial treatments
live in `src/content/editorial.ts`. `ProjectVisual.tsx` gives each project an
authored visual study. These are representative sample interfaces and illustrative
data, not live client screenshots or verified customer results; keep the visible
disclosures when changing them.

The public site no longer uses original product screenshots. `ProductDiagram.tsx`
supplies animated automotive workflow diagrams. `StudioVisual.tsx` accompanies the
company introduction as an original engineering-studio illustration, not a portrait
or a representation of the physical office. Krupal's exact original portrait,
existing display treatment, name and quote remain on the home, studio and contact
pages. Historical product images stay in `design/source-assets`, outside the public
directory. Being outside `public` prevents direct site serving; it does not make a
committed asset private to repository readers.

## Story and motion

`ScrollStory.tsx` connects automotive intelligence, investigative context and
commerce through three editorial chapters. At desktop sizes, a sticky visual
stage responds to native scroll progress: a vehicle scan advances, evidence
relationships draw in, and the product composition changes. It uses passive scroll
listeners and coalesced animation frames, without a scroll-jacking library.
Small screens, short viewports, reduced motion and no-JavaScript visits get all
three chapters as normal document content, with no artificial scroll space.

The direction is informed by the public [scroll-craft reference and demos](https://github.com/nateherkai/scroll-craft),
not a copy of its templates or an installation of its agent skill. No external
engine, media, API key, generated video service or animation dependency is shipped.

`MotionControl.tsx` pauses offscreen artwork using IntersectionObserver, stops
animation while the browser tab is hidden, and provides a persistent ambient-motion
toggle. System reduced-motion preferences always take priority. SVG animation
stays disabled without JavaScript. Keep the static final composition useful when
adding a new scene, and disclose illustrative data rather than implying a real
client account, performance result or financial recommendation.

## Deployment

Deploy to a host that supports the Next.js runtime. The 16 known
`/projects/[slug]` routes are statically generated through `generateStaticParams`,
but this is **not a static export**: `next.config.ts` does not set `output: "export"`,
the site uses Next.js image optimization and configured response headers, and
`npm start` runs the Next.js server rather than serving an `out/` directory.

Set `NEXT_PUBLIC_SITE_URL` before building to control canonical URLs, sitemap
entries and social metadata. It defaults to `https://www.demazetech.com`.
