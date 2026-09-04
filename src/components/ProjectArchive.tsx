"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { archiveProjects } from "@/content/projects";

const INITIAL = 4;

export default function ProjectArchive() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? archiveProjects : archiveProjects.slice(0, INITIAL);
  const remaining = archiveProjects.length - INITIAL;

  return (
    <section className="bg-paper section-y mx-auto max-w-5xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel index="003">Selected work</SectionLabel>
          <h2 className="display d-lg mt-2.5 max-w-lg">Systems already running in production.</h2>
        </div>
        <Link
          href="/projects"
          className="border-line hover:border-ink rounded-full border px-5 py-2 text-xs font-semibold transition-colors"
        >
          View all
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4">
        {shown.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={Math.min(i, 7) * 60}>
            <Link href={`/projects#${p.slug}`} className="group block">
              <div className="bg-sand relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 45vw, 240px"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
              </div>
              <p className="text-muted/60 font-display mt-2.5 text-[0.65rem]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="group-hover:text-accent mt-0.5 text-[0.82rem] leading-snug font-semibold transition-colors">
                {p.title}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>

      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="border-line hover:border-ink mx-auto mt-8 flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition-colors"
        >
          {expanded ? "Show less" : `Show ${remaining} more`}
          <span
            aria-hidden
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </button>
      )}
    </section>
  );
}
