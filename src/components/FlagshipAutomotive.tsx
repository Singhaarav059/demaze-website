import Link from "next/link";
import { ProjectStage } from "@/components/ProjectStage";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "luxury-car-dealer-software")!;

export function FlagshipAutomotive() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-14 md:px-10">
      <div className="mx-auto mb-10 flex max-w-6xl items-end justify-between gap-6">
        <SectionLabel index="002" label="Product One / Automotive" />
        <span className="hidden text-xs text-paper-dim md:block">Drag to look around</span>
      </div>

      <Reveal>
        <ProjectStage image={project.image} />
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <Reveal className="flex flex-col gap-4">
          <h3 className="font-display text-3xl font-light text-paper md:text-5xl">
            {project.title}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-paper-dim md:text-base">
            {project.description}
          </p>
          <Link
            href={`/projects#${project.slug}`}
            className="pt-2 text-sm text-accent transition-opacity hover:opacity-70"
          >
            View case study &rarr;
          </Link>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-2 border-l border-paper/10 pl-6 md:pl-10">
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
