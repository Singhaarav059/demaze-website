"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { archiveProjects } from "@/content/projects";

export function ProjectArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="005" label="The Archive" />
          <Link
            href="/projects"
            className="hidden text-sm text-paper-dim transition-colors hover:text-paper md:block"
          >
            View all work &rarr;
          </Link>
        </div>

        <div
          ref={containerRef}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          className="relative flex flex-col border-t border-paper/10"
        >
          {archiveProjects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects#${project.slug}`}
              onMouseEnter={() => setHovered(project.slug)}
              onMouseLeave={() => setHovered(null)}
              className="group flex flex-col gap-2 border-b border-paper/10 py-5 transition-colors hover:bg-ink-soft/50 md:flex-row md:items-baseline md:gap-6 md:px-4"
            >
              <span className="font-display text-sm text-accent md:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display flex-1 text-xl font-light text-paper md:text-2xl">
                {project.title}
              </h3>
              <div className="hidden max-w-xs flex-wrap justify-end gap-x-3 gap-y-1 text-right text-xs text-paper-dim md:flex">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}

          <div
            aria-hidden
            className="pointer-events-none absolute z-10 hidden overflow-hidden rounded-xl shadow-soft transition-opacity duration-200 md:block"
            style={{
              left: pos.x + 24,
              top: pos.y - 90,
              opacity: hovered ? 1 : 0,
              width: 220,
              height: 150,
            }}
          >
            {archiveProjects.map((project) => (
              <Image
                key={project.slug}
                src={project.image}
                alt=""
                fill
                sizes="220px"
                className={`object-cover transition-opacity duration-200 ${
                  hovered === project.slug ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
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
