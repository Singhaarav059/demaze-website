"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";

/**
 * The accent block does not just start, it swallows the page: a circle grows
 * out of the paper until it has covered the transition zone entirely. Content
 * always sits on solid accent, so no text ever has to change colour mid-tween.
 */
export default function ContactSection() {
  const zone = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = zone.current;
    const c = circle.current;
    if (!el || !c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      c,
      { scale: 0.08 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 1 },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    // Ink, not accent: the closer bookends the dark hero instead of
    // introducing a third full-bleed surface at the bottom of the page.
    <section className="bg-ink text-void-fg">
      <div ref={zone} className="bg-paper relative h-[26vh] overflow-hidden">
        <div
          ref={circle}
          className="bg-ink absolute bottom-0 left-1/2 aspect-square w-[150vw] -translate-x-1/2 translate-y-1/2 rounded-full"
        />
      </div>

      <div className="mx-auto max-w-page px-6 pt-2 pb-14 md:pb-20">
        {/* Two columns: the headline alone left half of a wide viewport empty,
            which read as an unfinished block rather than a deliberate pause. */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-end md:gap-12">
          <h2 className="display d-xl">Tell us what you are trying to build.</h2>
          <p className="max-w-sm text-sm leading-relaxed font-medium text-void-dim">
            No pitch deck required. Describe the problem and the constraints, and we will tell you
            honestly whether we are the right team for it.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <Link
            href="/contact-us"
            className="text-ink rounded-full bg-void-fg px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a project
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-void-fg/30 px-6 py-3 text-sm font-semibold transition-colors hover:border-void-fg"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-12 grid gap-6 border-t border-void-fg/15 pt-6 md:grid-cols-3">
          <div>
            <p className="label text-void-dim">Studio</p>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 block max-w-xs text-xs leading-relaxed font-semibold hover:underline"
            >
              {site.address}
            </a>
          </div>
          <div>
            <p className="label text-void-dim">Response time</p>
            <p className="mt-2 text-xs leading-relaxed font-semibold">
              We reply to every project enquiry within one working day.
            </p>
          </div>
          <div>
            <p className="label text-void-dim">Team</p>
            <p className="mt-2 text-xs leading-relaxed font-semibold">
              {site.stats[2].value}
              {site.stats[2].suffix} engineers, designers and strategists in Ahmedabad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
