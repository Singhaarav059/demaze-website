"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import Glyph, { type GlyphName } from "./Glyph";
import { process } from "@/content/about";

const PHASE_GLYPHS: GlyphName[] = ["discover", "design", "build", "scale"];

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
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pin.current;
    const rail = track.current;
    const box = frame.current;
    if (!el || !rail || !box) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Measured against the grid column, not the window. The track starts on
      // the same gutter as every other section and ends with the last card's
      // right edge back on that gutter, so the run stays inside the layout
      // instead of sliding out to touch the bare screen edge.
      const distance = () => Math.max(rail.scrollWidth - box.clientWidth, 0);

      gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: el,
          scrub: 0.8,
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
        className="overflow-hidden py-14 md:flex md:h-screen md:flex-col md:py-0 md:pt-24 md:pb-10"
      >
        <div className="mx-auto w-full max-w-page shrink-0 px-6">
          <SectionLabel index="004">How we work</SectionLabel>
          <h2 className="display d-lg mt-2.5 max-w-xl">Four phases, no handover cliff.</h2>
        </div>

        {/* items-center is what keeps this dense. Left to fill the pinned
            frame, the track took the whole remaining viewport height and the
            card text anchored to the bottom of it, which pooled every pixel of
            slack into one empty band across the middle of the screen. The card
            is sized to its own content instead, and the leftover height splits
            evenly above and below it. */}
        <div className="mt-8 flex snap-x snap-mandatory overflow-x-auto md:mt-8 md:min-h-0 md:flex-1 md:snap-none md:items-center md:overflow-visible">
          {/* This box is the measuring stick: its width is the grid column, so
              the track can align to the gutter at both ends. */}
          <div ref={frame} className="mx-auto w-full max-w-page px-6">
            <div ref={track} className="flex gap-8 md:gap-14">
              {process.map((phase) => (
                <article
                  key={phase.step}
                  className="flex w-[80vw] shrink-0 snap-start flex-col sm:w-[58vw] md:w-[46vw] md:pb-2 lg:w-[34rem]"
                >
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
                    <span className="bg-line h-px flex-1" />
                    <span className="text-muted/70 font-mono text-[0.65rem]">
                      {String(phase.step).padStart(2, "0")} / 04
                    </span>
                  </div>

                  {/* mt-auto bottom-aligns the shorter cards against the
                      tallest one, so titles and descriptions share a baseline
                      across the run. It only reads as a hole when the card is
                      forced to a viewport height instead of its content's, so
                      the cards carry no explicit height and the leftover frame
                      space is centred outside the track instead. */}
                  <div className="mt-6 md:mt-auto md:pt-10">
                    {/* The ghost numeral said nothing the mono counter above it
                        had not already said. The mark diagrams the phase, which
                        is the one thing on this card that is not a sentence. */}
                    <Glyph
                      name={PHASE_GLYPHS[phase.step - 1]}
                      className="text-accent h-[clamp(2.75rem,6.5vh,4rem)] w-[clamp(2.75rem,6.5vh,4rem)]"
                    />
                    <h3 className="h-card mt-5">{phase.title}</h3>
                    <p className="text-muted mt-3 max-w-md text-[0.82rem] leading-relaxed font-medium">
                      {phase.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
