import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { featuredProjects } from "@/content/projects";

const restOfShowcase = featuredProjects.slice(1);

export function ProjectsShowcase() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="003" label="More Work" />
          <Link
            href="/projects"
            className="hidden text-sm text-paper-dim transition-colors hover:text-paper md:block"
          >
            View all work →
          </Link>
        </div>

        <div className="grid gap-12">
          {restOfShowcase.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects#${project.slug}`}
              className="group grid gap-8 md:grid-cols-2 md:items-center md:gap-14"
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
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-display text-sm text-accent">0{i + 1}</span>
                <h3 className="font-display text-3xl font-light text-paper md:text-4xl">
                  {project.title}
                </h3>
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
            </Link>
          ))}
        </div>

        <Link
          href="/projects"
          className="mx-auto rounded-full border border-paper/30 px-7 py-3 font-display text-sm text-paper transition-colors hover:border-paper md:hidden"
        >
          View all work
        </Link>
      </div>
    </section>
  );
}
