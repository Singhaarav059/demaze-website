# Verification checklist (deferred)

Because the sandbox is INTEGRATIONS_ONLY (npm registry unreachable,
`node_modules` absent, `npm install`/`npm ci` hang), none of the automated gates
below can run in-sandbox. They are **deferred to CI and the preview deploy** and
must all pass there before the redesign is considered done. Every `node`/`npm`
command must be prefixed with `unset NODE_OPTIONS &&` to work around the broken
`proxy-bootstrap.js` preload in this environment.

## 1. Automated CI gate (exact command)

Run the repo's full gate, in this order, and require it to pass end to end:

```sh
unset NODE_OPTIONS && npm run typecheck && npm run lint && npm test && npm run build
```

- `typecheck` — TypeScript, no errors.
- `lint` — ESLint (`eslint.config.js`) + Prettier (`.prettierrc`) formatting must
  match exactly.
- `test` — vitest (jsdom) + @testing-library/react. In particular
  `src/lib/site-data.test.ts` must still pass: services == 4, projects >= 16,
  metrics == 4, technologies == 8, industries >= 15.
- `build` — Vite production build (Nitro node-server target) succeeds.

Do not hand-edit generated files (`src/assets/images.ts`, `src/routeTree.gen.ts`);
regenerate via the project's scripts if needed. Do not add external
script/font/API hosts (CSP is defined in `src/server.ts`).

## 2. Manual scroll-smoothness + prefers-reduced-motion device pass

Headless preview cannot confirm motion feel (flagged unverified per
`roadmap.md`), so do this on a real device / real browser:

- **Scroll smoothness (motion ON):** scroll every page top to bottom and confirm
  the progress bar, condensing header (`.is-condensed`), count-up metrics, tech
  marquee loop (no visible seam), pinned-services crossfade, `ScrollFocusStack`
  chapter pins, and projects image parallax are all smooth (rAF-gated,
  lerp-smoothed) with no jank, jump, or overlap when pins release.
- **prefers-reduced-motion: reduce (OS setting ON):** reload and confirm the
  heavier effects early-return / go static — hero video pauses, count-up shows
  final values immediately, marquee is static, pinned-services / services
  spatial effects and projects parallax are disabled — and the page is a clean
  static stacked layout.
- **Mobile motion gate:** confirm the same heavier effects are also disabled at
  `<= 900px` (and services spatial effects at `<= 700px`) even with motion on.

## 3. Per-breakpoint visual check

Check every page (`/`, `/projects`, `/services`, `/about-us`, `/contact-us`,
`/ai-dev-automation-playbook`, and the form / legal pages) at each breakpoint,
looking specifically for image fit/crop, spacing rhythm, and typography:

### >= 1200px (desktop)
- Two-column hero balanced; video 16:9 with no letterboxing.
- Pinned-services visual uses `contain` — illustrations centered, no crop/zoom.
- Editorial projects grid: asymmetric spans leave no awkward gaps / orphan cards.
- Services detailed cards, industries grid, values dark band, about split, and
  contact two-column layout all aligned; footer image fits cleanly.

### 901–1199px (large tablet / small laptop)
- Columns that are 2-up at desktop stay balanced (not lopsided) before collapsing.
- Metrics 4-up still aligned; tech marquee spacing even.
- Hero copy column vs video height not visually mismatched.

### 600–900px (tablet / large phone)
- Heavier motion is off (>= this range hits the `<=900px` gate).
- Multi-column sections begin stacking cleanly; keyword cloud and benefit row wrap
  without ragged rows; contact address does not overflow its card.

### < 600px (phone)
- Everything single-column and readable.
- **Industries inline solution list shows the middot separator** (verifies the
  empty-`content:` fix) — words are separated by `·`, not run together.
- Metrics 2-up balanced; founder portrait and footer image fit without distortion;
  faux playbook cover stacks below copy and stays proportioned.

## Sign-off

The redesign is complete only when: (1) the exact CI gate above passes green,
(2) the manual motion + reduced-motion device pass is clean, and (3) all four
breakpoints are visually verified with no image crop, spacing, or typography
regressions.
