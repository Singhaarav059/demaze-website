# Kiro Agent Skills

Frontend design skills vendored from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
(MIT), imported at upstream commit `ccbc156`.

Kiro discovers skills at `.kiro/skills/*/SKILL.md` — one level deep. Upstream nests them under
`skills/`, so each skill folder was lifted to the top level here.

## Local modification

Upstream targets Claude Code, which does not require a skill's frontmatter `name` to match its
folder. Kiro does. Ten skills were renamed on import; only the `name:` line changed, and all
descriptions and bodies are byte-identical to upstream.

| folder | upstream `name` |
| ------ | --------------- |
| `taste-skill` | `design-taste-frontend` |
| `taste-skill-v1` | `design-taste-frontend-v1` |
| `brutalist-skill` | `industrial-brutalist-ui` |
| `minimalist-skill` | `minimalist-ui` |
| `soft-skill` | `high-end-visual-design` |
| `output-skill` | `full-output-enforcement` |
| `redesign-skill` | `redesign-existing-projects` |
| `stitch-skill` | `stitch-design-taste` |
| `image-to-code-skill` | `image-to-code` |
| `gpt-tasteskill` | `gpt-taste` |

Folder names were kept as the canonical names because upstream's own registry (`skill.sh`,
`skills/llms.txt`) refers to the skills that way.

## Skills

| skill | purpose |
| ----- | ------- |
| `taste-skill` | Default anti-slop skill for landing pages, portfolios, and redesigns |
| `taste-skill-v1` | Previous version, kept for work depending on its exact behaviour |
| `gpt-tasteskill` | Awwwards-level frontend design and GSAP motion |
| `image-to-code-skill` | Generate a reference image, analyse it, then implement matching code |
| `imagegen-frontend-web` | Website design reference images only — writes no code |
| `imagegen-frontend-mobile` | Mobile screen concepts and flows — writes no code |
| `brandkit` | Brand-kit overview images: logo, palette, type, mockups — writes no code |
| `redesign-skill` | Audit and fix design problems in an existing project |
| `soft-skill` | Soft, premium look: whitespace, depth, smooth animation |
| `output-skill` | Stops placeholder comments and skipped code blocks |
| `minimalist-skill` | Editorial monochrome interfaces (Notion/Linear style) |
| `brutalist-skill` | Raw mechanical layouts, Swiss type, extreme scale contrast (beta) |
| `stitch-skill` | Google Stitch semantic design rules; bundles a `DESIGN.md` template |

## Usage

Skills load at session start. Kiro activates one automatically when a request matches its
description, or on demand via `/<skill-name>` — for example `/taste-skill`.

Custom agents do not auto-load skills; they need an explicit entry:

```json
{ "resources": ["skill://.kiro/skills/*/SKILL.md"] }
```

## Updating

Re-copy the folder from upstream, reapply the `name:` change in the table above, then check the
result:

```bash
node scripts/verify-kiro-skills.mjs
```

That script enforces the contract Kiro requires — `name` matching the folder, lowercase-hyphen
names, and the 64/1024-character limits — so a re-import cannot silently reintroduce the upstream
mismatch. It is not part of CI; run it by hand after touching this folder.
