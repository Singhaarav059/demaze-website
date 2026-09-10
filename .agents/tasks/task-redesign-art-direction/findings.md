# Art-direction findings (redesign baseline)

Branch: `redesign` (created off `main`). This document is the section-by-section
audit that the redesign work (FEAT-002 onward) is measured against. Every issue
below was read from the real source, not inferred: `src/styles.css` (~2240
lines, single global stylesheet), `src/components/*.tsx`, `src/routes/*.tsx`,
`src/lib/site-data.ts`, and `src/assets/images.ts`.

## Environment / baseline note

The sandbox is INTEGRATIONS_ONLY: the npm registry is unreachable, `node_modules`
is absent, and `npm install`/`npm ci` hang. So the usual "install deps, run
build/tests to confirm a green baseline" step cannot run here. All of
typecheck / lint / test / build are deferred to CI and the preview deploy (see
`verification-checklist.md`). Every `node`/`npm` invocation must also be
prefixed with `unset NODE_OPTIONS &&` because of a broken preload
(`proxy-bootstrap.js`) in this environment. Work is therefore correct-by-
construction: match Prettier (`.prettierrc`) and ESLint (`eslint.config.js`)
exactly, do not add external script/font/API hosts (CSP lives in
`src/server.ts`), and do not hand-edit generated files (`src/assets/images.ts`,
`src/routeTree.gen.ts`).

## Two known concrete defects (must be fixed)

1. **Empty `content:` separator — `src/styles.css` ~line 2122.**
   Inside the `<= 600px` responsive block, the industry solutions are flowed
   inline (`.industry-grid ul { display: flex; flex-wrap: wrap; ... }`) and a
   separator is added between items with:

   ```css
   .industry-grid li:not(:last-child)::after {
     content: ;
   }
   ```

   The `content` value is **empty**, which is invalid CSS — a vibe-coded
   artifact. A middot separator (`content: "\00B7";` rendered with a little
   horizontal margin) was clearly intended so the inline solution list reads as
   `Telemedicine Platforms · Electronic Health Records · ...` instead of the
   words running together with only a `0 0.3rem` gap. Fix: give it a real
   middot glyph and spacing.

2. **`object-fit: cover` on the pinned services visual — `src/styles.css` line 750.**
   `.pinned-services-visual img { object-fit: cover; ... }` is applied to the
   four homepage service illustrations. Those source images carry built-in
   whitespace and have very wide, inconsistent aspect ratios (from
   `src/assets/images.ts`): `service-ai` 937x400, `service-web` 422x400,
   `service-commerce` 512x400, `service-cloud` 1114x424. Because the visual box
   is a fixed rounded panel, `cover` crops and zooms each shot differently and
   awkwardly — exactly the "off" cropping the user is complaining about. The
   origin/test design handoff (`styles-additions.css`) explicitly uses
   `object-fit: contain` here, with the note that "these illustrations carry
   built-in whitespace; cover crops/zooms oddly." **Adopting `contain` (plus a
   little padding on the panel) is the single most important test idea to bring
   into FEAT-002.**

## Main-vs-test reconciliation decision

`main` is a **superset** of the origin/test design handoff (test is
reference-only and NOT merged; read via `git show origin/test:<path>`). Main
already implements the scroll progress bar, condensing header (`.is-condensed`),
count-up metrics, the infinite tech marquee (duplicated `.tech-band-track`), the
pinned services showcase, and the editorial asymmetric projects grid — all wired
through a bespoke `ScrollFocusStack` sticky-chapter motion system that the plain
test handoff does not have. Reconciliation of the three shared components:

- `scroll-progress.tsx` — identical to test; keep main.
- `projects-showcase-grid.tsx` — main is a superset (adds `decoding`/eager
  loading + optional `limit`); keep main.
- `pinned-services-showcase.tsx` — main diverged to drive progress off the
  ancestor `.motion-stage` rather than per-row rects; main's is more integrated,
  so keep main's JS but adopt test's `object-fit: contain` styling.

Condensing-header and marquee CSS are already present and better in main. So the
redesign takes **one** idea from test (contain fitting) and otherwise refines
main's existing system. Content is the source of truth in `src/lib/site-data.ts`
and its counts are guarded by `src/lib/site-data.test.ts` (services == 4,
projects >= 16, metrics == 4, technologies == 8, industries >= 15) — do not
remove any entries.

## Motion system conventions (do not break)

Heavier scroll/resize effects are rAF-gated and early-return under
`prefers-reduced-motion: reduce` AND `(max-width: 900px)`; smoothing is
lerp-toward-target (`current += (target - current) * factor`). `ScrollFocusStack`
pins `.stack-chapter` / `.motion-chapter` sections. Any spacing/typography fix
must respect these gates so reduced-motion and mobile stay static.

## Section-by-section audit

### Home hero (`.home-hero`, `routes/index.tsx` + `hero-video.tsx`)
- **Observed:** two-column copy + `HeroVideo` (960x540 mp4 with poster and a
  play/pause control). The eyebrow is `<span /> Expertise · Innovation ·
  Partnership`; `<h1>` mixes normal and `<em>` weight. Video autoplays muted /
  loops and correctly pauses under reduced-motion. Risk areas: vertical rhythm
  between eyebrow → h1 → intro → actions, and the video aspect box vs the copy
  column height at mid widths (901–1199) where the two columns can go visually
  lopsided before the single-column breakpoint.
- **Intended fix:** tighten `--heading-gap`-based spacing in the hero, verify the
  video frame keeps a clean 16:9 with no letterboxing, and confirm the
  play/pause control stays inside the rounded frame at every breakpoint.

### Metrics strip (`.metrics-strip`, `MetricsStrip` / `Metric`)
- **Observed:** four count-up metrics (`45+`, `$10M+`, `35+`, `6+`) that animate
  on intersection and fall back to static text under reduced-motion. On `<=600px`
  each cell is min-height 4.6rem with reduced strong size (1.45rem).
- **Intended fix:** ensure the four cells stay balanced (equal width, aligned
  baselines) as they wrap from 4-up to 2-up; check the `01`–`04` index labels do
  not crowd the value on the smallest breakpoint.

### Home stacked chapters (`ScrollFocusStack .home-stack` → `.stack-chapter`)
- **Observed:** work → services → tools → industries → values (dark band) →
  founder story → process → faq, each a sticky-pinned chapter with a
  `.chapter-doodle`. This is the main-only motion layer.
- **Intended fix:** confirm consistent `--section-gap` rhythm between chapters,
  that pins release cleanly (no overlap/jump) and that everything degrades to a
  plain stacked flow under reduced-motion / `<=900px`.

### Pinned services (`.pinned-services-*`, `PinnedServicesShowcase`)
- **Observed:** crossfading image panel + right-hand list; active row expands its
  description (`max-height` 0 → 7rem). Uses `object-fit: cover` — **defect #2**.
- **Intended fix:** switch to `object-fit: contain` with panel padding so the
  four differently-shaped illustrations sit centered without cropping; verify the
  crossfade opacity math still reads correctly with contained images.

### Tech marquee (`.tech-band`, `TechnologyBand`)
- **Observed:** 8 technology logos (148x148, python/tensorflow 148x149) in a
  duplicated `.tech-band-track` for a seamless loop; the duplicate is
  `aria-hidden`.
- **Intended fix:** confirm logo sizing/spacing is even, the seam is invisible,
  and the marquee is paused/static under reduced-motion; keep logos vertically
  centered on their row.

### Industries (`.industry-grid`, `IndustryGrid`)
- **Observed:** 8 on home (`limit={8}`), all 19 on `/services`. Each card is a
  numbered heading + 5-item solution list. On `<=600px` the solution list flows
  inline and relies on the **empty `content:` separator** — **defect #1**.
- **Intended fix:** real middot separator; verify the inline-flowed list reads
  cleanly on phones and the numbered cards keep an even grid at every breakpoint.

### Values dark band (`.dark-band` + `.values-grid`, `ValuesGrid`)
- **Observed:** 4 values on a dark band (used on home and about). Numbered
  `01`–`04` cards with title + copy.
- **Intended fix:** check contrast on the dark band, even card heights, and that
  the band's padding matches the `--section-gap` rhythm of neighboring light
  chapters.

### Founder story (`.founder-story`, `FounderStory`)
- **Observed:** founder portrait (895x980, tall) beside a pull-quote with
  attribution. Used on home and about.
- **Intended fix:** ensure the tall portrait is fitted without distortion beside
  the quote, quotation marks/typography look intentional, and the layout stacks
  gracefully on mobile.

### Process (`.process-grid`, `ProcessGrid`)
- **Observed:** 4 steps (Discover & Define → Launch & Scale), numbered
  `01`–`04`.
- **Intended fix:** consistent step-number treatment and even spacing so the four
  steps read as a sequence; verify 4-up → wrap behavior.

### FAQ (`.faq-list` / `.faq-section`, `FaqSection`)
- **Observed:** radix accordion; full 5 FAQs on home/services, `compact` (2) on
  about. Single-open (`type="single" collapsible`).
- **Intended fix:** trigger/expanded-state typography and spacing, chevron
  alignment, and comfortable tap targets on mobile.

### Projects editorial grid (`.project-grid` + `ProjectsShowcaseGrid`)
- **Observed:** home shows `ProjectsGrid limit={4}`; `/projects` shows the full
  16 via `ProjectsShowcaseGrid` (asymmetric SPANS + image parallax, superset of
  test). Project images are large near-square-ish (mostly 1240xN).
- **Intended fix:** verify the asymmetric spans do not leave awkward gaps or
  orphan cards across breakpoints, image parallax is disabled under
  reduced-motion, and card body typography (index / title / description / feature
  checklist) is consistent.

### Services detailed cards (`.service-grid.service-grid-detailed`, `ServicesGrid detailed`)
- **Observed:** `/services` renders all 4 services as detailed cards with the
  animated `service-live-visual` (orbit + scan + parallax on fine pointers) and a
  6-item capability list each; home uses the pinned variant instead. Cards are
  `h3` under an `sr-only` `h2` (outline fix). The live visual `<img>` uses
  `object-fit: contain` already (line 585/1240) — good, keep that.
- **Intended fix:** confirm the detailed-card list spacing, the animated visual
  box sizing, and that the spatial/active-card effects degrade under
  reduced-motion and `<=700px` (the `compactLayout` gate in `ServicesGrid`).

### About split + keyword cloud + benefit row (`routes/about-us.tsx`)
- **Observed:** `.about-split` = `images.about` (533x403) beside intro copy + a
  10-tag `.keyword-cloud`; then a dark-band `ValuesGrid`, a 3-up `.benefit-row`,
  a compact FAQ, and a founder story — all `.motion-chapter`s in an
  `interior-motion-stack`.
- **Intended fix:** verify the split image fits without distortion, the keyword
  cloud tags wrap evenly (no ragged last row), and the 3-up benefit row balances
  and stacks cleanly on mobile.

### Contact options + form (`.contact-layout`, `routes/contact-us.tsx` + `ContactForm`)
- **Observed:** `.contact-options` = three icon links (email, meeting request
  anchor, Google Maps office link opening in a new tab) beside `ContactForm`.
  The office-address link holds a long string.
- **Intended fix:** confirm the two-column options/form layout balances, the long
  address does not overflow its card, icons align with their text, and the layout
  stacks to one column on mobile.

### Playbook (`.resource-hero` + `.playbook-cover`, `routes/ai-dev-automation-playbook.tsx`)
- **Observed:** resource hero with a CSS-drawn `.playbook-cover` mock (label,
  big `AI`, multi-line title, `01`) and a download CTA to the form route.
- **Intended fix:** verify the faux cover's internal typography scales and stays
  proportioned beside the copy column, and that it stacks below the copy on
  mobile.

### Footer (`SiteFooter`, `site-shell.tsx`)
- **Observed:** shared footer with the brand mark and `images.footer` (1344x420,
  wide). Present on every page.
- **Intended fix:** confirm the wide footer image fits without awkward crop,
  columns/links align, and spacing matches the site rhythm at every breakpoint.

## Summary of intended changes for the redesign

- Fix the empty `content:` industry separator (real middot).
- Switch `.pinned-services-visual img` to `object-fit: contain` (+ padding).
- Do a fit/crop pass on every image-bearing section (hero video, founder
  portrait, about split, footer, service visuals) so nothing is distorted or
  awkwardly cropped.
- Tighten spacing/typography rhythm using existing `:root` tokens — never
  redefine tokens — and keep all motion gated on reduced-motion + width.
- Keep content counts intact (`site-data.test.ts`) and formatting Prettier/ESLint
  clean.
