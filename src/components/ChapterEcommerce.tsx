import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { flagshipProjects } from "@/content/projects";

/**
 * Chapter 03. Rather than re-staging the mockup, this inspects it: the detail
 * tiles are CSS background crops of the exact same file, zoomed into real
 * regions of the interface. No new assets needed.
 */
const crops = [
  { label: "Storefront", pos: "34% 44%", size: "330%" },
  { label: "Brand discovery", pos: "70% 38%", size: "330%" },
  { label: "Merchandising", pos: "32% 82%", size: "330%" },
];

export default function ChapterEcommerce() {
  const p = flagshipProjects[2];

  return (
    <section id={p.slug} className="bg-sand relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="004">Flagship / Commerce</SectionLabel>

        <div className="mt-7 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
          <Reveal>
            <h2 className="display d-lg max-w-2xl">
              Luxury retail, rebuilt as a system that personalises itself.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede text-muted">{p.description}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <Reveal scale>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] md:aspect-auto md:h-full md:min-h-[30rem]">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover object-center saturate-[0.8]"
              />
            </div>
          </Reveal>

          <div className="grid gap-5">
            {crops.map((crop, i) => (
              <Reveal key={crop.label} delay={140 + i * 120}>
                <figure className="group relative h-40 overflow-hidden rounded-[20px] md:h-[calc((30rem-2.5rem)/3)]">
                  <div
                    className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${p.image})`,
                      backgroundPosition: crop.pos,
                      backgroundSize: crop.size,
                    }}
                  />
                  <figcaption className="from-void/80 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-4 pt-8 pb-3">
                    <span className="label text-void-fg">{crop.label}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="border-line mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {p.tags.map((tag) => (
              <li key={tag} className="text-muted max-w-xs text-xs font-semibold">
                {tag}
              </li>
            ))}
          </ul>
          <Link
            href={`/projects#${p.slug}`}
            className="text-accent inline-flex shrink-0 items-center gap-2 text-sm font-semibold hover:underline"
          >
            Read the full case <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
