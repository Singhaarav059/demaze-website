import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "investigative-case-management")!;

export function FlagshipInvestigative() {
  return (
    <section className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="003" label="Product Two / Investigative" />

        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-10">
          <Reveal>
            <h3 className="font-display text-[12vw] leading-[0.9] font-normal text-paper md:text-[5.5vw]">
              A case file
              <br />
              that builds
              <br />
              itself.
            </h3>
          </Reveal>

          <Reveal delay={150} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-soft shadow-soft md:mt-16">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 border-t border-paper/10 pt-10 md:grid-cols-[1fr_1px_1fr] md:gap-14">
          <Reveal className="flex flex-col gap-4">
            <span className="font-display text-sm text-accent">{project.title}</span>
            <p className="max-w-xl text-sm leading-relaxed text-paper-dim md:text-base">
              {project.description}
            </p>
            <Link
              href={`/projects#${project.slug}`}
              className="pt-2 text-sm text-accent transition-opacity hover:opacity-70"
            >
              View case study &rarr;
            </Link>
          </Reveal>

          <div className="hidden bg-paper/10 md:block" />

          <Reveal delay={100} className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.3em] text-paper-dim uppercase">Built for</span>
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
      </div>
    </section>
  );
}
