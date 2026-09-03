import Link from "next/link";
import { ProjectStage } from "@/components/ProjectStage";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/content/projects";

const flagship = projects[0];

export function FlagshipProject() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-14 md:px-10">
      <div className="mx-auto mb-10 flex max-w-6xl items-end justify-between gap-6">
        <SectionLabel index="002" label="Featured Build" />
        <span className="hidden text-xs text-paper-dim md:block">Drag to look around</span>
      </div>

      <ProjectStage image={flagship.image} />

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4">
        <h3 className="font-display text-3xl font-light text-paper md:text-5xl">
          {flagship.title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-paper-dim md:text-base">
          {flagship.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {flagship.tags.map((tag) => (
            <span
              key={tag}
              className="min-w-0 max-w-full rounded-full border border-paper/15 px-3 py-1 text-xs break-words text-paper-dim"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/projects#${flagship.slug}`}
          className="pt-2 text-sm text-accent transition-opacity hover:opacity-70"
        >
          View case study →
        </Link>
      </div>
    </section>
  );
}
