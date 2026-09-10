# Demaze Technologies

The public site for [Demaze Technologies](https://www.demazetech.com), an AI and
software engineering studio.

## Tech stack

- **Framework:** TanStack Start v1 + React 19 + Vite
- **Styling:** Tailwind CSS v4 + `src/styles.css` (raspberry-pastel design system)
- **UI primitives:** shadcn/ui components in `src/components/ui/`
- **Backend:** Supabase (contact and playbook-download forms via `src/lib/forms.functions.ts`)
- **Icons:** `lucide-react`
- **Fonts:** Space Grotesk (headings), DM Sans (body), loaded via Google Fonts in `src/routes/__root.tsx`

## Development

```bash
npm install
npm run dev
```

Create a `.env` file at the project root with Supabase credentials for the
contact and playbook forms to work locally:

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

`SUPABASE_SERVICE_ROLE_KEY` is only needed for server-side admin operations.
Apply the migration in `supabase/migrations/` to create the
`contact_submissions` and `playbook_downloads` tables before testing forms.

## Route map

| File                                             | Route                              |
| ------------------------------------------------ | ---------------------------------- |
| `src/routes/index.tsx`                           | `/`                                |
| `src/routes/projects.tsx`                        | `/projects`                        |
| `src/routes/services.tsx`                        | `/services`                        |
| `src/routes/about-us.tsx`                        | `/about-us`                        |
| `src/routes/contact-us.tsx`                      | `/contact-us`                      |
| `src/routes/blogs.tsx`                           | `/blogs`                           |
| `src/routes/inside-project.tsx`                  | `/inside-project`                  |
| `src/routes/ai-dev-automation-playbook.tsx`      | `/ai-dev-automation-playbook`      |
| `src/routes/ai-dev-automation-playbook-form.tsx` | `/ai-dev-automation-playbook-form` |

## Important files

- `src/lib/site-data.ts` — all copy, project/service/technology/industry content
- `src/styles.css` — full design system, animations, and stack-card styles
- `src/components/site-shell.tsx` — navigation, footer, and global reveal animation system
- `src/components/content-sections.tsx` — animated service visuals
- `src/lib/forms.functions.ts` — server functions for contact and playbook forms

## Deployment

Deployed on Railway via `railway.json` (Nixpacks): `npm run build`, then
`node .output/server/index.mjs`. `vite.config.ts` sets the Nitro preset to
`node-server` since this is self-hosted rather than run inside Lovable's
Cloudflare-backed sandbox. Set the Supabase environment variables above on
the Railway service for the contact and playbook forms to work in production.
