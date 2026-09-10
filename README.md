# DEMAze Technologies website

Marketing site for DEMAze Technologies. TanStack Start (SSR) on Vite, Tailwind v4,
deployed to Railway on the Nitro `node-server` preset.

## Run locally

Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

The dev server listens on http://localhost:8080.

## Quality checks

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

CI runs exactly these four on every push and pull request (`.github/workflows/ci.yml`).

## Environment variables

Copy `.env.example` to `.env` (git-ignored) and set the values on the Railway service.

| Variable                   | Required | Purpose                                       |
| -------------------------- | -------- | --------------------------------------------- |
| `SUPABASE_URL`             | yes      | Contact and playbook form inserts             |
| `SUPABASE_PUBLISHABLE_KEY` | yes      | Same, publishable/anon key (server-side only) |
| `RESEND_API_KEY`           | no       | Sends a notification email per submission     |
| `NOTIFY_EMAIL`             | no       | Where those notifications go                  |
| `NOTIFY_FROM`              | no       | Sender, must be a domain verified in Resend   |

Without the Supabase pair the forms return an error. Without the Resend trio the row
is still saved, but nobody is notified, so set them before launch.

The database schema and RLS policies are in `supabase/migrations/`.

## Images

Source art lives in `src/assets/original/`. After adding or replacing anything there:

```bash
npm run images
```

That resizes to 1240px wide, converts to WebP when smaller than the source, and
regenerates `src/assets/images.ts`, which pairs each URL with its intrinsic
width and height. Components spread those onto `<img>`, which is what keeps the
layout from shifting as images load. Do not hand-edit `src/assets/images.ts`.

## Deployment

Railway builds with Nixpacks via `railway.json`: `npm run build`, then
`node .output/server/index.mjs`. `vite.config.ts` sets the Nitro preset to
`node-server` because this is self-hosted rather than running inside Lovable's
Cloudflare sandbox, and `package.json` pins an `engines.node` range so Nixpacks
does not fall back to an EOL Node version.

Security headers (CSP, HSTS, Referrer-Policy, Permissions-Policy,
X-Content-Type-Options, COOP) and immutable caching for `/assets/**` are applied in
`src/server.ts`, because the Lovable Vite config wrapper does not expose Nitro
`routeRules`. Adding a new third-party script, font, or API host means widening the
CSP there first.

## Launch checklist

See `roadmap.md`.
