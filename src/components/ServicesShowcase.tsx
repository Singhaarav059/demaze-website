"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/SectionLabel";
import { serviceCategories } from "@/content/services";

gsap.registerPlugin(ScrollTrigger);

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
    if (!section || cards.length === 0) return;

    gsap.set(cards.slice(1), { yPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=88",
        end: () => `+=${(cards.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: 0.5,
      },
    });

    cards.slice(1).forEach((card, i) => {
      tl.to(card, { yPercent: 0, ease: "none", duration: 1 }, i);
    });

    // Content above this section (project screenshots, the 3D texture in
    // FlagshipProject) loads asynchronously and can shift page height after
    // this trigger's start position was first measured. Refresh once things
    // have settled so the pin locks in at the right scroll offset instead of
    // drifting mid-scroll on GSAP's own resize-triggered refresh.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 1500);
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

    return () => {
      window.clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex h-screen flex-col px-6 pt-24 pb-10 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <SectionLabel index="004" label="Apps, Websites, AI & More" />
      </div>
      <div className="relative mx-auto mt-6 flex w-full max-w-6xl flex-1 items-center overflow-hidden">
        <div className="relative h-[280px] w-full">
          {serviceCategories.map((cat, i) => (
            <div
              key={cat.key}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col gap-3 overflow-y-auto rounded-3xl bg-ink-soft px-8 py-6 shadow-soft md:flex-row md:items-center md:px-14 md:py-10"
            >
              <div className="flex flex-1 flex-col gap-2">
                <span className="font-display text-sm text-accent">
                  0{i + 1} / 0{serviceCategories.length}
                </span>
                <h3 className="font-display text-2xl font-light text-paper md:text-3xl">
                  {cat.name}
                </h3>
                <p className="max-w-lg text-sm leading-snug text-paper-dim">{cat.summary}</p>
              </div>
              <ul className="grid flex-1 grid-cols-1 gap-x-6 gap-y-2 border-t border-paper/10 pt-3 md:grid-cols-2 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-paper-dim">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
