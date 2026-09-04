"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { process } from "@/content/about";

/**
 * The four phases travel sideways while the section is pinned. Deliberately a
 * different mechanic from the two vertical stacks earlier in the page, so this
 * stretch gets its own moment instead of being a fourth quiet grid.
 *
 * Below md it degrades to a native snap carousel: pinning a horizontal track
 * on a short touch viewport fights the user's own scroll direction.
 */
export default function ProcessTrack() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pin.current;
    const rail = track.current;
    if (!el || !rail) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(rail.scrollWidth - window.innerWidth, 0);

      gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: el,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    // The section stays put so React keeps owning main's child list. GSAP
    // wraps the inner div in its pin-spacer instead.
    <section className="bg-paper">
      <div
        ref={pin}
        className="overflow-hidden py-14 md:flex md:h-screen md:flex-col md:py-0 md:pt-24 md:pb-8"
      >
        <div className="mx-auto w-full max-w-5xl shrink-0 px-6">
          <SectionLabel index="005">How we work</SectionLabel>
          <h2 className="display d-lg mt-2.5 max-w-xl">Four phases, no handover cliff.</h2>
        </div>

        <div className="mt-8 flex snap-x snap-mandatory overflow-x-auto md:mt-0 md:flex-1 md:snap-none md:items-center md:overflow-visible">
          <div ref={track} className="flex gap-8 px-6 md:gap-14 md:pr-[18vw]">
            {process.map((phase) => (
              <article
                key={phase.step}
                className="w-[80vw] shrink-0 snap-start sm:w-[58vw] md:w-[46vw] lg:w-[38rem]"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span className="bg-line h-px flex-1" />
                  <span className="text-muted/70 font-display text-[0.65rem]">
                    {String(phase.step).padStart(2, "0")} / 04
                  </span>
                </div>

                <p
                  className="display text-ink/8 mt-5 text-[5.5rem] leading-none select-none"
                  aria-hidden
                >
                  {String(phase.step).padStart(2, "0")}
                </p>

                <h3 className="display d-md -mt-6">{phase.title}</h3>
                <p className="text-muted mt-3 text-[0.82rem] leading-relaxed font-medium">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
