"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { flagshipProjects } from "@/content/projects";

/**
 * The three flagship builds, held in one pinned frame instead of three full
 * sections of ordinary scrolling. Each visual wipes up over the last while its
 * copy crossfades, so the sequence reads as one shot rather than three pages.
 *
 * Every source asset is a finished marketing mockup carrying its own
 * perspective and lighting, so none are re-tilted. They only get a per-project
 * crop and grade.
 */
const treatments = [
  "scale-[1.3] saturate-[0.45] sepia-[0.06] contrast-[1.05]",
  "scale-[1.02] saturate-[0.35] contrast-[1.08]",
  "scale-[1.04] saturate-[0.85]",
];

const statements = [
  "One system behind every valuation, EMI and refurbishment on the floor.",
  "Investigators running on evidence instead of paperwork.",
  "Luxury retail, rebuilt to personalise itself.",
];

export default function FlagshipSequence() {
  const section = useRef<HTMLElement>(null);
  const visuals = useRef<HTMLDivElement[]>([]);
  const copies = useRef<HTMLDivElement[]>([]);
  const rails = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const el = section.current;
    const vis = visuals.current.filter(Boolean);
    const txt = copies.current.filter(Boolean);
    const bars = rails.current.filter(Boolean);
    if (!el || vis.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(vis.slice(1), { yPercent: 100 });
      gsap.set(txt.slice(1), { autoAlpha: 0, y: 28 });
      gsap.set(bars.slice(1), { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * vis.length}`,
          pin: true,
          scrub: 0.5,
        },
      });

      for (let i = 1; i < vis.length; i++) {
        tl.to(vis[i], { yPercent: 0, ease: "none" }, i - 1);
        tl.to(txt[i - 1], { autoAlpha: 0, y: -28, ease: "none" }, i - 1);
        tl.to(txt[i], { autoAlpha: 1, y: 0, ease: "none" }, i - 1);
        tl.to(bars[i], { scaleX: 1, ease: "none" }, i - 1);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="bg-void text-void-fg grain flex h-screen flex-col overflow-hidden pt-24 pb-6"
    >
      <div className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between gap-4 px-6">
        <SectionLabel index="002" tone="void">
          Flagship work
        </SectionLabel>
        <Link
          href="/projects"
          className="text-void-dim hover:text-accent text-xs font-semibold transition-colors"
        >
          All projects
        </Link>
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-5xl flex-1 items-center gap-6 px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Copy, crossfading in place */}
        <div className="relative h-[15rem] md:h-[19rem]">
          {flagshipProjects.map((p, i) => (
            <div
              key={p.slug}
              ref={(node) => {
                if (node) copies.current[i] = node;
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="label text-accent">
                0{i + 1} / 0{flagshipProjects.length}
              </p>
              <h3 className="display d-lg mt-2.5">{statements[i]}</h3>
              <p className="text-void-fg/55 mt-3 line-clamp-4 text-[0.82rem] leading-relaxed font-medium">
                {p.description}
              </p>
              <Link
                href={`/projects#${p.slug}`}
                className="text-accent mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold hover:underline"
              >
                Read the full case <span aria-hidden>↗</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Visuals, wiping up over each other */}
        <div className="relative h-[15rem] overflow-hidden rounded-[24px] md:h-[19rem]">
          {flagshipProjects.map((p, i) => (
            <div
              key={p.slug}
              ref={(node) => {
                if (node) visuals.current[i] = node;
              }}
              className="bg-void absolute inset-0 overflow-hidden rounded-[24px]"
              style={{ zIndex: i + 1 }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                className={`object-cover ${treatments[i]}`}
              />
              <div className="from-void/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <p className="absolute inset-x-0 bottom-0 px-5 pb-4 text-xs font-semibold">
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress rail */}
      <div className="mx-auto flex w-full max-w-5xl shrink-0 items-center gap-2 px-6 pt-4">
        {flagshipProjects.map((p, i) => (
          <span key={p.slug} className="bg-void-fg/12 h-0.5 flex-1 overflow-hidden rounded-full">
            <span
              ref={(node) => {
                if (node) rails.current[i] = node;
              }}
              className="bg-accent block h-full w-full origin-left"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
