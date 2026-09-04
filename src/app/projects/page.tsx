import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: "The work we've delivered for clients across industries.",
};

export default function ProjectsPage() {
  return (
    <main className="px-6 pt-28 pb-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 pb-12">
        <SectionLabel index="001" label="Our Work" />
        <h1 className="max-w-3xl font-display text-4xl leading-tight font-normal text-paper md:text-6xl">
          The projects we&apos;ve delivered
        </h1>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            id={project.slug}
            className="grid scroll-mt-28 gap-8 md:grid-cols-2 md:items-center md:gap-14"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-soft ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-display text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-3xl font-normal text-paper md:text-4xl">
                {project.title}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-paper-dim">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="min-w-0 max-w-full rounded-full border border-paper/15 px-3 py-1 text-xs break-words text-paper-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
