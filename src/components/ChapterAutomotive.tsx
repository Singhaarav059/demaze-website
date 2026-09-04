import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import SectionLabel from "./SectionLabel";
import { flagshipProjects } from "@/content/projects";

/**
 * Chapter 01. The source asset is a finished marketing mockup: the phones
 * already carry their own perspective and shadows, so it is never re-tilted.
 * It is cropped in past the mockup's own purple margin, graded toward the
 * site palette, and vignetted into the void instead.
 */
export default function ChapterAutomotive() {
  const p = flagshipProjects[0];
  const [opening, ...rest] = p.description.split(/(?<=\.)\s+/);

  return (
    <section
      id={p.slug}
      className="bg-void text-void-fg grain relative overflow-hidden py-24 md:py-32"
    >
      <div className="bg-accent/18 pointer-events-none absolute top-1/3 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionLabel index="002" tone="void">
          Flagship / Automotive
        </SectionLabel>

        <Reveal>
          <h2 className="display d-lg mt-7 max-w-4xl">{opening}</h2>
        </Reveal>
      </div>

      <Parallax distance={50} zoom={0.06} className="relative mt-14">
        <Reveal scale className="mx-auto max-w-5xl px-6">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[30px] md:aspect-[16/10]">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="scale-[1.32] object-cover saturate-[0.45] sepia-[0.06] contrast-[1.06]"
            />
            {/* Feathered vignette. An inset box-shadow fills flat, a radial
                gradient actually falls off. */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--color-void)_128%)]" />
            <div className="ring-void-fg/10 absolute inset-0 rounded-[30px] ring-1 ring-inset" />
          </div>
        </Reveal>
      </Parallax>

      <div className="relative mx-auto mt-16 grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal>
          <p className="lede text-void-fg/65 max-w-lg">{rest.join(" ")}</p>
          <Link
            href={`/projects#${p.slug}`}
            className="text-accent mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            Read the full case <span aria-hidden>↗</span>
          </Link>
        </Reveal>

        <ol className="border-void-fg/10 border-t">
          {p.tags.map((tag, i) => (
            <Reveal as="li" key={tag} delay={i * 70}>
              <div className="border-void-fg/10 flex items-baseline gap-5 border-b py-4">
                <span className="text-void-dim font-display text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.98rem] font-semibold">{tag}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
