"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { useReducedMotion } from "./clientFlags";
import { flagshipProjects } from "@/content/projects";

/**
 * The three flagship builds, held in one pinned frame instead of three full
 * sections of ordinary scrolling. Each visual wipes up over the last while its
 * copy hands over, so the sequence reads as one shot rather than three pages.
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

/**
 * Written to fit the frame. The full project descriptions are marketing
 * paragraphs, and clamping them mid-sentence reads as a truncation bug rather
 * than an edit.
 */
const blurbs = [
  "Used-car valuation, new-car EMI and refurbishment tracking for one of India's largest luxury dealerships, in one backend the sales floor actually uses.",
  "Case files, media and chain of custody in one place, with AI tooling doing the paperwork private investigators used to do by hand.",
  "A sustainable luxury marketplace that personalises itself around each shopper, from search and try-on through to live selling.",
];

export default function FlagshipSequence() {
  const pin = useRef<HTMLDivElement>(null);
  const visuals = useRef<HTMLDivElement[]>([]);
  const copies = useRef<HTMLDivElement[]>([]);
  const rails = useRef<HTMLSpanElement[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = pin.current;
    const vis = visuals.current.filter(Boolean);
    const txt = copies.current.filter(Boolean);
    const bars = rails.current.filter(Boolean);
    if (!el || vis.length === 0 || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(vis.slice(1), { yPercent: 100 });
      gsap.set(txt.slice(1), { autoAlpha: 0, y: 28 });
      gsap.set(bars.slice(1), { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          // One screen of travel per transition, and there are n-1 of them.
          end: () => `+=${window.innerHeight * (vis.length - 1)}`,
          pin: el,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Each transition owns exactly one unit of the timeline, so the whole pin
      // is spent moving. Within a unit the outgoing copy clears out before the
      // incoming one starts: crossfading two display headlines on the same rect
      // leaves both legible at half opacity through the middle of the move,
      // which reads as a double exposure rather than a transition.
      for (let i = 1; i < vis.length; i++) {
        const at = i - 1;
        tl.to(vis[i], { yPercent: 0, duration: 1, ease: "none" }, at);
        tl.to(bars[i], { scaleX: 1, duration: 1, ease: "none" }, at);
        tl.to(txt[i - 1], { autoAlpha: 0, y: -28, duration: 0.4, ease: "none" }, at);
        tl.to(txt[i], { autoAlpha: 1, y: 0, duration: 0.4, ease: "none" }, at + 0.45);
      }
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    // The section stays put so React keeps owning main's child list. GSAP
    // wraps the inner div in its pin-spacer instead.
    <section className="bg-void text-void-fg grain">
      <div
        ref={pin}
        className={
          reduced ? "section-y" : "flex h-screen flex-col overflow-hidden pt-24 pb-6"
        }
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

        {/* Reduced motion gets three ordinary blocks. Skipping only the
            animation would leave all three copies stacked on one rect with the
            last one winning, hiding two of the three projects entirely. */}
        {reduced ? (
          <div className="mx-auto mt-8 grid w-full max-w-5xl gap-12 px-6">
            {flagshipProjects.map((p, i) => (
              <article
                key={p.slug}
                className="grid items-center gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
              >
                <div>
                  <p className="label text-accent">
                    0{i + 1} / 0{flagshipProjects.length}
                  </p>
                  <h3 className="display d-lg mt-2.5">{statements[i]}</h3>
                  <p className="text-void-fg/55 mt-3 text-[0.82rem] leading-relaxed font-medium">
                    {blurbs[i]}
                  </p>
                  <Link
                    href={`/projects#${p.slug}`}
                    className="text-accent mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold hover:underline"
                  >
                    Read the full case <span aria-hidden>↗</span>
                  </Link>
                </div>
                <div className="bg-void relative aspect-[4/3] overflow-hidden rounded-[24px]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 620px"
                    className={`object-cover ${treatments[i]}`}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Height is capped rather than stretched. Every source mockup is
          // landscape, and letting the panel fill a tall frame crops it to a
          // portrait strip of background.
          <div className="mx-auto mt-4 grid min-h-0 w-full max-w-5xl flex-1 content-center items-center gap-6 px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Copy, handing over in place */}
            <div className="relative min-h-[13rem] md:h-[clamp(18rem,54vh,29rem)]">
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
                  <p className="text-void-fg/55 mt-3 text-[0.82rem] leading-relaxed font-medium">
                    {blurbs[i]}
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
            <div className="relative aspect-[16/11] overflow-hidden rounded-[24px] md:aspect-auto md:h-[clamp(18rem,54vh,29rem)]">
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
                  {/* Deep enough to carry white text: these mockups are pale at
                      the bottom edge, so a light scrim leaves the caption grey
                      on grey. */}
                  <div className="from-void/95 via-void/45 absolute inset-0 bg-gradient-to-t to-transparent to-55%" />
                  <p className="absolute inset-x-0 bottom-0 px-5 pb-4 text-xs font-semibold">
                    {p.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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
      </div>
    </section>
  );
}
