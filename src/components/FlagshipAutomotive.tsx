import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "luxury-car-dealer-software")!;
const [statement, ...rest] = project.description.split(". ");

export function FlagshipAutomotive() {
  return (
    <section className="px-6 pt-24 pb-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="002" label="Product One / Automotive" />

        <Reveal className="mt-10">
          <h3 className="max-w-3xl font-display text-3xl leading-[1.15] font-normal text-paper md:text-5xl">
            {statement}.
          </h3>
        </Reveal>
      </div>

      <Reveal scale delay={100} className="relative mx-auto mt-14 aspect-[6/5] max-w-5xl overflow-hidden rounded-lg bg-ink-soft">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
          style={{ filter: "saturate(0.55) sepia(0.12) contrast(1.05)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, var(--color-ink) 135%)",
            opacity: 0.5,
          }}
        />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-[1fr_1px_1fr] md:gap-14">
        <Reveal className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-paper-dim md:text-base">
            {rest.join(". ")}
          </p>
          <Link
            href={`/projects#${project.slug}`}
            className="pt-2 text-sm text-accent transition-opacity hover:opacity-70"
          >
            View case study &rarr;
          </Link>
        </Reveal>

        <div className="hidden bg-paper/10 md:block" />

        <Reveal delay={120} className="flex flex-col gap-2">
          <span className="text-xs tracking-[0.3em] text-paper-dim uppercase">What it does</span>
          <ol className="mt-2 flex flex-col gap-3">
            {project.tags.map((tag, i) => (
              <li key={tag} className="flex gap-3 text-sm text-paper-dim">
                <span className="font-display text-accent">0{i + 1}</span>
                <span className="min-w-0 break-words">{tag}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
