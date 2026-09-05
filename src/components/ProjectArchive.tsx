"use client";

import Link from "next/link";
import { useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { archiveProjects } from "@/content/projects";

const INITIAL = 6;

/**
 * A typographic index, not a thumbnail grid.
 *
 * This section used to render sixteen stock marketing mockups — floating
 * monitors on lilac gradients, carrying another company's branding, cropped to
 * 4:3 at 240px wide, which turned each one into an illegible smear. It sat
 * directly after three art-directed flagship chapters, so the page's quality
 * curve fell off a cliff exactly where the work was supposed to speak.
 *
 * No image beats a bad image. A register of numbered rows reads as deliberate,
 * scans faster than a grid, and is honest about what we can actually show: the
 * client work is under NDA and described in words, and the three systems we can
 * show in full already have their own chapters above.
 */
export default function ProjectArchive() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? archiveProjects : archiveProjects.slice(0, INITIAL);
  const remaining = archiveProjects.length - INITIAL;

  return (
    <section className="bg-paper section-y mx-auto max-w-page px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel index="002">Selected work</SectionLabel>
          <h2 className="display d-lg mt-2.5 max-w-lg">Systems already running in production.</h2>
        </div>
        <Link
          href="/projects"
          className="border-line hover:border-ink rounded-full border px-5 py-2 text-xs font-semibold transition-colors"
        >
          View all
        </Link>
      </div>

      <ol className="border-line mt-10 border-t">
        {shown.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={Math.min(i, 6) * 50}>
            <Link
              href={`/projects#${p.slug}`}
              className="group border-line grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 border-b py-5 md:grid-cols-[3.5rem_minmax(0,1fr)_12rem_auto] md:gap-x-8 md:py-6"
            >
              <span className="text-muted/60 font-mono text-[0.7rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="group-hover:text-accent text-[0.95rem] leading-snug font-semibold transition-colors md:text-[1.05rem]">
                {p.title}
              </span>
              {/* Sector sits in its own column above md. Below it, a second line
                  under the title beats squeezing a third column into 390px. */}
              <span className="label text-muted/70 col-start-2 md:col-start-3 md:pt-0.5">
                {p.sector}
              </span>
              <span
                aria-hidden
                className="text-muted/50 group-hover:text-accent col-start-3 row-start-1 justify-self-end text-sm transition-colors md:col-start-4"
              >
                ↗
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>

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
