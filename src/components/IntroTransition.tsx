"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { whoWeAre, whatWeAreTags } from "@/content/about";

gsap.registerPlugin(ScrollTrigger);

const statement = whoWeAre.paragraphs.join(" ");
const words = statement.split(" ");

export function IntroTransition() {
  const pinRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const pinTarget = pinRef.current;
    const panel = panelRef.current;
    const text = textRef.current;
    if (!pinTarget || !panel || !text) return;

    const wordEls = text.querySelectorAll("span");

    gsap.set(panel, { yPercent: 100 });
    gsap.set(wordEls, { opacity: 0.12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinTarget,
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: 0.6,
      },
    });

    tl.to(panel, { yPercent: 0, ease: "none" }, 0);
    tl.to(wordEls, { opacity: 1, stagger: 0.04, ease: "none" }, 0.4);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 1500);

    return () => {
      window.clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <section ref={pinRef} className="relative h-screen overflow-hidden bg-void">
        <div ref={panelRef} className="absolute inset-0 bg-ink" />
        <div className="relative flex h-full items-center px-6 md:px-10">
          <p
            ref={textRef}
            className="mx-auto max-w-5xl font-display text-3xl leading-[1.25] font-medium text-paper md:text-5xl"
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block">
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="px-6 pt-4 pb-20 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <SectionLabel index="001" label="Who We Are" />
          <div className="flex flex-wrap gap-3">
            {whatWeAreTags.map((tag, i) => (
              <Reveal key={tag} delay={i * 40} className="inline-block">
                <span className="min-w-0 max-w-full rounded-full border border-paper/15 px-4 py-2 text-xs break-words text-paper-dim">
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
