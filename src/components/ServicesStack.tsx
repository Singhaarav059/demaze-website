"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { serviceCategories } from "@/content/services";

/**
 * One pin, one timeline. Every card is absolutely positioned on the same rect
 * and slides up over the previous one on scrub. A single trigger has one
 * start/end to get right, where chained per-card triggers have to agree with
 * each other and drift apart.
 */
export default function ServicesStack() {
  const pin = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = pin.current;
    const list = cards.current.filter(Boolean);
    if (!el || list.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(list.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * list.length}`,
          pin: el,
          scrub: 0.5,
        },
      });

      list.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, ease: "none" }, i);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    // The section stays put so React keeps owning main's child list. GSAP
    // wraps the inner div in its pin-spacer instead.
    <section className="bg-paper">
      <div ref={pin} className="flex h-screen flex-col overflow-hidden pt-24 pb-6">
        <div className="mx-auto w-full max-w-5xl shrink-0 px-6">
          <SectionLabel index="004">What we build</SectionLabel>
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-5xl flex-1 items-center px-6">
          {/* The crop has to sit here, not on the section: cards parked below
              the box are still inside the screen and would show through. */}
          <div className="relative h-[19rem] w-full overflow-hidden rounded-[24px]">
            {serviceCategories.map((cat, i) => (
              <div
                key={cat.key}
                ref={(node) => {
                  if (node) cards.current[i] = node;
                }}
                className="bg-void text-void-fg grain absolute inset-0 overflow-hidden rounded-[24px] px-6 py-6 md:px-9 md:py-7"
                style={{ zIndex: i + 1 }}
              >
                <span
                  className="display text-void-fg/5 pointer-events-none absolute -right-3 -bottom-8 text-[8rem] leading-none select-none"
                  aria-hidden
                >
                  0{i + 1}
                </span>

                <div className="relative flex h-full flex-col gap-5 md:flex-row md:gap-10">
                  <div className="flex min-w-0 flex-col md:w-[44%]">
                    <p className="label text-accent">
                      0{i + 1} / 0{serviceCategories.length}
                    </p>
                    <h3 className="display d-md mt-2.5">{cat.name}</h3>
                    <p className="text-void-fg/55 mt-3 text-[0.82rem] leading-relaxed font-medium">
                      {cat.summary}
                    </p>
                  </div>

                  <ul className="grid min-w-0 flex-1 content-start gap-x-5 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="border-void-fg/10 flex items-start gap-2.5 border-b py-1.5 text-[0.76rem] font-semibold"
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

        <div className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between gap-4 px-6 pt-4">
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
