"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { useReducedMotion } from "./clientFlags";
import { serviceCategories } from "@/content/services";

/**
 * One pin, one timeline. Every card is absolutely positioned on the same rect
 * and slides up over the previous one on scrub. A single trigger has one
 * start/end to get right, where chained per-card triggers have to agree with
 * each other and drift apart.
 *
 * Under reduced motion the cards fall back into normal flow. Skipping only the
 * animation would leave four cards stacked on one rect with the last one
 * winning, which silently hides three of the four practices.
 */
export default function ServicesStack() {
  const pin = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = pin.current;
    const list = cards.current.filter(Boolean);
    if (!el || list.length === 0 || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(list.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          // One screen of travel per transition, and there are n-1 of them.
          end: () => `+=${window.innerHeight * (list.length - 1)}`,
          pin: el,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // duration 1 at position i makes each move butt against the next, so no
      // stretch of the pin is spent holding a card completely still.
      list.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, duration: 1, ease: "none" }, i);
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    // The section stays put so React keeps owning main's child list. GSAP
    // wraps the inner div in its pin-spacer instead.
    <section className="bg-paper">
      <div
        ref={pin}
        className={
          reduced ? "section-y" : "flex h-screen flex-col overflow-hidden pt-24 pb-6"
        }
      >
        <div className="mx-auto w-full max-w-5xl shrink-0 px-6">
          <SectionLabel index="004">What we build</SectionLabel>
        </div>

        <div className="mx-auto mt-4 flex w-full min-h-0 max-w-5xl flex-1 items-center px-6">
          {/* The crop has to sit here, not on the section: cards parked below
              the box are still inside the screen and would show through.
              Height is explicit because every card inside is absolutely
              positioned, so the box has no content to be measured against. */}
          <div
            className={
              reduced
                ? "grid w-full gap-4"
                : "relative h-[clamp(20rem,56vh,30rem)] w-full overflow-hidden rounded-[24px]"
            }
          >
            {serviceCategories.map((cat, i) => (
              <div
                key={cat.key}
                ref={(node) => {
                  if (node) cards.current[i] = node;
                }}
                className={`bg-void text-void-fg grain flex items-center overflow-hidden rounded-[24px] px-6 py-7 md:px-9 md:py-9 ${
                  reduced ? "relative" : "absolute inset-0"
                }`}
                style={{ zIndex: i + 1 }}
              >
                {/* Sits fully inside the crop. Anchored past the corner it was
                    nicked by the border radius, which reads as a clipping
                    accident rather than a bleed. */}
                <span
                  className="display text-void-fg/[0.06] pointer-events-none absolute right-7 bottom-3 text-[7rem] leading-none select-none md:right-10"
                  aria-hidden
                >
                  0{i + 1}
                </span>

                <div className="relative flex w-full flex-col gap-5 md:flex-row md:gap-10">
                  <div className="flex min-w-0 flex-col md:w-[44%]">
                    <p className="label text-accent">
                      0{i + 1} / 0{serviceCategories.length}
                    </p>
                    <h3 className="display d-md mt-2.5">{cat.name}</h3>
                    <p className="text-void-fg/55 mt-3 text-[0.82rem] leading-relaxed font-medium">
                      {cat.summary}
                    </p>
                  </div>

                  <ul className="grid min-w-0 flex-1 content-center gap-x-5 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="border-void-fg/10 flex items-start gap-2.5 border-b py-2.5 text-[0.76rem] font-semibold"
                      >
                        <span className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-5xl shrink-0 items-center justify-between gap-4 px-6">
          <p className="text-muted text-xs font-semibold">Four practices, one delivery team.</p>
          <Link
            href="/services"
            className="border-line hover:border-ink rounded-full border px-5 py-2 text-xs font-semibold transition-colors"
          >
            All services
          </Link>
        </div>
      </div>
    </section>
  );
}
