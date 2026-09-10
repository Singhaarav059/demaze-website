# Asset drop-in checklist (full-site redesign)

The redesign is built correct-by-construction against the assets that actually
exist in `public/`:

```
public/demaze-logo.png
public/hero-stat-mascot-projects.png
public/hero-stat-mascot-value.png
public/hero-transform.mp4
public/krupal-chaudhary.jpg
public/vehicle/
```

Every prototype filename that does NOT exist has been substituted with an
existing asset, an inline SVG, or a CSS gradient so nothing 404s. This document
maps each prototype asset to its current substitute and to the exact place a
real file would drop in later.

To adopt a real asset: add the file to `public/`, then replace the substitute
at the location listed below with a `next/image` `<Image>` (or `<video>` for
the mp4) whose `src` points at the new `public/` path. Keep decorative visuals
`aria-hidden` / `alt=""`.

## Video / poster

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `demaze-robot-studio.mp4` | Existing `/hero-transform.mp4` (already an ambient studio clip) | `src/app/page.tsx` home hero `<video><source src="/hero-transform.mp4">` (the `.home-hero-frame` block) |
| `demaze-robot-studio-poster.webp` | No poster; the `.home-hero-frame` uses a CSS border/frame and the video itself. No `poster=` attribute is emitted | Add `poster="/<poster>"` to the `<video>` in `src/app/page.tsx` home hero |

## Logo

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `demaze-logo.png` | Exists: `/demaze-logo.png` | `src/components/Nav.tsx` header brand `<Image src="/demaze-logo.png">` |

## Tech / platform logos (home + services marquees)

All eight are substituted with plain text wordmarks in the scrolling marquees.
There are no `<img>` logo srcs to swap; to use real logos, render `<Image>`
tags inside each marquee item instead of the text label.

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `tech-langchain.png` | Text wordmark | `src/content/services.ts` `techStackFlat` -> `src/app/page.tsx` home `.home-marquee-item`; and `techWordmarks` in `src/app/services/page.tsx` `.services-marquee-item` |
| `tech-python.png` | Text wordmark | same marquees as above |
| `tech-tensorflow.png` | Text wordmark | same marquees as above |
| `tech-openai.png` | Text wordmark | same marquees as above |
| `tech-huggingface.png` | Text wordmark | same marquees as above |
| `tech-pinecone.png` | Text wordmark | same marquees as above |
| `tech-kafka.png` | Text wordmark | same marquees as above |
| `tech-elastic.png` | Text wordmark | same marquees as above |

## Project imagery (home "Our Work" + projects bento)

Substituted with pastel CSS-gradient tiles (no `<img>` srcs).

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `project-car.webp` | Pastel gradient tile | Home: `src/app/page.tsx` `.home-work-media` (tint from `homeWorkCards` in `src/content/editorial.ts`). Projects: `src/app/projects/page.tsx` `.projects-tile-media` (`.projects-tile-pastel-*` in `globals.css`) |
| `project-investigation.webp` | Pastel gradient tile | same home/projects tiles |
| `project-luxury.webp` | Pastel gradient tile | same home/projects tiles |
| `project-sukoon.webp` | Pastel gradient tile | same home/projects tiles |
| `project-marketplace.webp` | Pastel gradient tile | same home/projects tiles |
| `project-grocery.webp` | Pastel gradient tile | same home/projects tiles |
| `project-cma.webp` | Pastel gradient tile | same home/projects tiles |
| `project-recruitment.webp` | Pastel gradient tile | same home/projects tiles |

To use real tiles, replace the `<span className="...-media" aria-hidden>`
placeholder with an `<Image>` inside the tile link/article.

## Service imagery (home services stage + services cards)

Substituted with gradient / inline placeholders (no `<img>` srcs).

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `service-ai.webp` / `service-ai.png` | Gradient/label placeholder | Home: `src/app/page.tsx` `.home-service-img` stage. Services: `src/app/services/page.tsx` `.services-card-media` (`.services-card-pastel-1` in `globals.css`) |
| `service-web.webp` / `service-web.png` | Gradient/label placeholder | same home stage / `.services-card-pastel-2` |
| `service-commerce.webp` / `service-commerce.png` | Gradient/label placeholder | same home stage / `.services-card-pastel-3` |
| `service-cloud.webp` / `service-cloud.png` | Gradient/label placeholder | same home stage / `.services-card-pastel-4` |

To use real art, replace the `.services-card-media` span (and the home
`.home-service-img` block) with an `<Image>`.

## About imagery

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `about.webp` | `/krupal-chaudhary.jpg` inside a pastel-gradient framed panel (`aria-hidden`, `alt=""`) | `src/app/about-us/page.tsx` `.about-who-media` `<Image src={site.founder.photo}>`; swap the `src` to `/about.<ext>` and give it a descriptive `alt` once available |

## Founder portrait

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `founder.webp` | Existing `/krupal-chaudhary.jpg` | Home: `src/app/page.tsx` `.home-founder-photo` `<Image src={site.founder.photo}>`. About: `src/app/about-us/page.tsx` `.about-founder-photo` `<Image src={site.founder.photo}>`. Source is `site.founder.photo` in `src/content/site.ts` |

## Footer mark

| Prototype file | Substitute | Location where a real asset drops in |
| --- | --- | --- |
| `footer.png` | Inline SVG mark in the CTA band (`.cta-band-mark svg`) plus the shared `/demaze-logo.png` brand | `src/components/Footer.tsx` CTA band. Replace the inline `<svg>` in `.cta-band-mark` with `<Image src="/footer.<ext>">` once available |
