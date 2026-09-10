## Production readiness

### Done

- [x] Fixed both forms reporting failure on success (`event.currentTarget` was read after an await).
- [x] Removed the unused Supabase auth scaffold that broke every server function when the `VITE_` env pair was absent at build time.
- [x] Documented the env vars the code actually reads, and git-ignored `.env`.
- [x] Wired optional Resend notifications so a submission reaches a human.
- [x] Added per-IP rate limiting to both public server functions, with tests.
- [x] Compressed images: 19.1 MB of source PNGs down to 1.7 MB of WebP, with intrinsic dimensions on every `<img>`.
- [x] Re-encoded the hero video 3.7 MB to 428 KB and dropped the redundant WebM.
- [x] Self-hosted both fonts, removing the render-blocking Google Fonts request.
- [x] Security headers and immutable asset caching in `src/server.ts`.
- [x] WCAG AA: zero contrast failures and zero sub-24px tap targets across all ten routes.
- [x] Mobile menu takes the page `inert`, and its close button is keyboard reachable.
- [x] rAF-gated the two scroll handlers that forced layout on every scroll event.
- [x] Deleted 42 unused UI components and 35 unused dependencies.
- [x] Type scale rebalanced and vertical rhythm tightened.
- [x] CI running typecheck, lint, test, and build.

### Before public launch

- [ ] Have legal counsel approve the privacy policy and terms drafts.
- [ ] Set `RESEND_API_KEY`, `NOTIFY_EMAIL`, and `NOTIFY_FROM` on Railway, then submit
      a test enquiry and confirm the email arrives.
- [ ] Write the AI development pipeline playbook PDF, or change the form copy. The
      success message currently promises a guide that has to be sent by hand.
- [ ] Substantiate the homepage metrics: "45+ Projects Delivered", "$10M+ Client Value
      Generated", "35+ Expert Team Members", "6+ Years of Excellence".
- [ ] Decide on analytics. The consent banner now only appears when a tracker is
      actually present, which on Railway means never, so nothing is currently measured.
- [ ] Run Lighthouse against the deployed URL and do a manual keyboard and screen
      reader pass on real devices. Frame timing could not be measured in the headless
      preview, so verify scroll smoothness on a mid-range Android.

### Known deferrals

- Rate limiting is an in-process map (`src/lib/submission-guards.ts`). It is correct
  for one Railway replica and needs moving to Postgres or Redis before scaling out.
- No dark mode. `@custom-variant dark` is declared but no `.dark` token set exists.
- Images ship at a single 1240px width, no `srcset`. Add one if the projects page
  becomes a measured problem on mobile data.
