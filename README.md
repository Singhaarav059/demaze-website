# DEMAze Technologies website

Complete production-ready source export of the DEMAze website, including all local images, the animated robot video, public metadata, tests, and the Lovable Cloud database migration.

## Run locally

Recommended: Bun 1.2+ and Node.js 20+.

```bash
bun install
bun run dev
```

Open the local URL printed by Vite.

Alternative npm commands:

```bash
npm install
npm run dev
```

## Quality checks

```bash
bun run test
bun run lint
bun run build
```

## Environment variables

The archive intentionally excludes `.env` and all secrets. To connect forms and analytics to a backend outside the original Lovable project, configure:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

The website still renders locally without private secrets. The database schema and policies are in `supabase/migrations/`.

## Important launch notes

See `roadmap.md` for the completed production pass and remaining business approvals. The privacy policy and terms are drafts and require legal review before launch.

## Deployment

Deployed on Railway via `railway.json` (Nixpacks): `npm run build`, then
`node .output/server/index.mjs`. `vite.config.ts` sets the Nitro preset to
`node-server` since this is self-hosted rather than run inside Lovable's
Cloudflare-backed sandbox, and `package.json` pins an `engines.node` range
so Nixpacks doesn't default to an EOL Node version. Set the Supabase
environment variables above on the Railway service for the contact and
playbook forms to work in production.

## Included

- All site pages and reusable interface code
- Responsive styling and scroll-driven animation
- Local project, service, technology, founder, footer, and hero media
- Contact and playbook forms
- Privacy-friendly analytics consent
- Accessibility and reduced-motion behavior
- SEO metadata, sitemap, robots file, manifest, social preview, and structured data
- Unit tests and database migration
