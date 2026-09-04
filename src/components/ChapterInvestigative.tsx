import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import SectionLabel from "./SectionLabel";
import { flagshipProjects } from "@/content/projects";

/**
 * Chapter 02. This asset is a wide, near-monochrome studio composite with a
 * genuinely empty band across the top, so it takes the opposite treatment to
 * chapter 01: no card, no radius, edge to edge, type sitting in the image's
 * own negative space.
 */
export default function ChapterInvestigative() {
  const p = flagshipProjects[1];

  return (
    <section id={p.slug} className="bg-paper relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index="003">Flagship / Investigations</SectionLabel>
      </div>

      <div className="relative mt-10 w-full overflow-hidden bg-[#8f9195]">
        <Parallax distance={40} zoom={0.08}>
          <div className="relative aspect-[16/11] w-full md:aspect-[16/8]">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="100vw"
              className="object-cover object-center saturate-[0.35] contrast-[1.08]"
            />
          </div>
        </Parallax>

        <div className="from-void/85 via-void/25 absolute inset-0 bg-gradient-to-b to-transparent" />

        <div className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 pt-10 md:pt-16">
          <Reveal>
            <h2 className="display d-lg text-void-fg max-w-2xl">
              Private investigators,
              <br />
              <span className="text-accent">running on evidence</span>
              <br />
              instead of paperwork.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal>
          <p className="lede text-muted">{p.description}</p>
          <Link
            href={`/projects#${p.slug}`}
            className="text-accent mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            Read the full case <span aria-hidden>↗</span>
          </Link>
        </Reveal>

        <ul className="flex flex-wrap content-start gap-2">
          {p.tags.map((tag, i) => (
            <Reveal as="li" key={tag} delay={i * 70}>
              <span className="border-line text-muted block rounded-full border px-4 py-2 text-xs font-semibold">
                {tag}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
