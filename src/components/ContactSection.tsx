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
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.4 },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-accent text-white">
      <div ref={zone} className="bg-paper relative h-[40vh] overflow-hidden">
        <div
          ref={circle}
          className="bg-accent absolute bottom-0 left-1/2 aspect-square w-[150vw] -translate-x-1/2 translate-y-1/2 rounded-full"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-4 pb-24 md:pb-32">
        <h2 className="display d-xl max-w-4xl">Tell us what you are trying to build.</h2>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            href="/contact-us"
            className="text-accent rounded-full bg-white px-7 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a project
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-white"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-3">
          <div>
            <p className="label text-white/60">Studio</p>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 block max-w-xs text-sm leading-relaxed font-semibold hover:underline"
            >
              {site.address}
            </a>
          </div>
          <div>
            <p className="label text-white/60">Response time</p>
            <p className="mt-3 text-sm leading-relaxed font-semibold">
              We reply to every project enquiry within one working day.
            </p>
          </div>
          <div>
            <p className="label text-white/60">Team</p>
            <p className="mt-3 text-sm leading-relaxed font-semibold">
              {site.stats[2].value}
              {site.stats[2].suffix} engineers, designers and strategists in Ahmedabad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
