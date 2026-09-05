"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery, useReducedMotion } from "./clientFlags";
import { flagshipProjects } from "@/content/projects";

/**
 * Chapter 02. The section's claim is evidence instead of paperwork, so the
 * composition performs it: eight incompatible artifacts arrive as one untidy
 * pile, open out into an ordered set on scroll, and are then absorbed by the
 * case file that holds them.
 *
 * The ordered state is just the CSS grid these cards already sit in, and the
 * chaos is a transform offset on top of it. Animating the offset back to zero
 * is cheaper than animating layout, and it means the resting layout is the one
 * the browser would have produced anyway.
 *
 * On sand rather than void on purpose. Chapter 01 and the remaining sequence
 * are both dark, and three dark sections in a row is the flat rhythm the whole
 * exercise is meant to fix. A warm surface also reads as a desk, which is where
 * documents belong.
 *
 * The disordered state is a stack, not a scatter. Scattering outward meant
 * throwing cards into the margins, where they covered the headline on some
 * viewports and were never safe to tune blind; it also left every card sitting
 * at a permanent angle, and rotating a small raster of UI text resamples it
 * into mush. Collapsing inward to a pile is bounded by construction (nothing
 * can leave the grid it came from), reads as the paperwork the section is about
 * replacing, and resolves to zero rotation so the resting state is pixel-crisp.
 */
const artifacts = [
  { src: "bank-statement", alt: "Bank statement PDF in the evidence library." },
  { src: "email", alt: "Archived email correspondence." },
  { src: "office-exterior", alt: "Photograph of a company's registered premises." },
  { src: "cctv", alt: "Timestamped CCTV video still." },
  { src: "invoice", alt: "Commercial invoice PDF." },
  { src: "whatsapp", alt: "Captured messaging thread." },
  { src: "notes", alt: "Photographed handwritten meeting notes." },
  { src: "audio", alt: "Recorded interview audio file." },
];

/** Angles for the stacked state only. Every card resolves to 0. */
const TILT = [-5, 3, -2, 6, 4, -6, 2, -3];

/**
 * Pixel jitter around the pile's centre. Collapsing every card to the exact
 * same point stacks them so squarely that only the top one is visible, which
 * reads as one file rather than a heap of eight. Small and fixed, so the pile
 * still cannot reach the copy above it and the layout is deterministic between
 * server and client.
 */
const JITTER = [
  [-22, -14],
  [16, -24],
  [-10, 20],
  [26, 10],
  [-28, 4],
  [8, 26],
  [20, -8],
  [-6, -20],
];

/**
 * Beats, in multiples of a viewport height. LEAD holds the strewn state after
 * the pin engages, so the pile is actually seen before it starts tidying
 * itself; without it the collapse is already underway by the time the section
 * has settled at the top of the screen. TAIL leaves the finished case file up
 * rather than releasing the pin the instant it resolves.
 */
const LEAD = 0.45;
const TAIL = 0.25;
const TRAVEL = LEAD + 2 + TAIL;

export default function FlagshipInvestigative() {
  const pin = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLLIElement[]>([]);
  const sheet = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");

  // The pile is a desktop composition and does not survive being shrunk: the
  // stage is only a couple of hundred pixels tall at phone width, so eight
  // cards collapsed onto its centre would be a smudge rather than a stack.
  // Below md the section falls back to reading the artifacts as an ordinary
  // two-column grid with the case file under them.
  const flat = reduced || !wide;

  useEffect(() => {
    const el = pin.current;
    const strewn = cards.current.filter(Boolean);
    const file = sheet.current;
    if (!el || !file || strewn.length === 0 || flat) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Offsets are measured, not guessed. offsetLeft/offsetTop are layout
      // values that transforms do not affect, so these stay correct however the
      // grid reflows, and GSAP re-evaluates them on refresh because the trigger
      // sets invalidateOnRefresh.
      const toCentreX = (el: HTMLElement) =>
        el.parentElement!.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2);
      const toCentreY = (el: HTMLElement) =>
        el.parentElement!.offsetHeight / 2 - (el.offsetTop + el.offsetHeight / 2);

      gsap.set(file, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * TRAVEL}`,
          pin: el,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // from(), so the pile is the state the cards hold through LEAD and the
      // grid is simply where they already live. Eased rather than linear: a
      // scrubbed tween with ease "none" maps scroll straight to position, so
      // every card starts and stops dead. Staggered from the centre outwards so
      // the pile opens rather than all eight releasing at once.
      tl.from(
        strewn,
        {
          x: (i: number, el: HTMLElement) => toCentreX(el) + JITTER[i][0],
          y: (i: number, el: HTMLElement) => toCentreY(el) + JITTER[i][1],
          rotate: (i: number) => TILT[i],
          scale: 0.86,
          ease: "power2.inOut",
          duration: 1.1,
          stagger: { each: 0.05, from: "center" },
        },
        LEAD,
      );

      // The two moves run together, and they have to. Bringing the case file up
      // first and dissolving the cards afterwards avoids a crossfade, but the
      // cards only cover the middle of the stage, so the file spent half a
      // screen of scroll sitting at full opacity around them: it read as a
      // second image arriving behind the first rather than as a transition.
      // The cards land by LEAD+1.45, hold, and then hand over.
      tl.to(file, { autoAlpha: 1, ease: "power1.inOut", duration: 0.4 }, LEAD + 1.6);
      tl.to(
        strewn,
        {
          autoAlpha: 0,
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.3,
          stagger: { each: 0.03, from: "random" },
        },
        LEAD + 1.6,
      );
    }, el);

    return () => ctx.revert();
  }, [flat]);

  const grid = (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-3.5">
      {artifacts.map((a, i) => (
        <li
          key={a.src}
          ref={(node) => {
            if (node) cards.current[i] = node;
          }}
          className="relative aspect-[218/197] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_28px_-12px_rgba(20,18,12,0.45)]"
        >
          <Image
            src={`/projects/flagship/evidence/${a.src}.webp`}
            alt={a.alt}
            fill
            sizes="(max-width: 768px) 46vw, 230px"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );

  const heading = (
    <>
      <p className="label text-accent">
        02 / 0{flagshipProjects.length} · Demaze Investigative
      </p>
      {/* Height-derived rather than .d-lg, for the same reason as chapter 01:
          a width clamp holds the headline at full size on exactly the short
          wide screens where the pinned frame has least room. */}
      <h3 className="display mt-2 max-w-2xl text-[clamp(1.45rem,min(4.2vh,6.5vw),2.5rem)] leading-[1.02]">
        Investigators running on evidence instead of paperwork.
      </h3>
      <p className="text-muted mt-3 max-w-xl text-[0.82rem] leading-relaxed font-medium">
        Case files, media and chain of custody in one place, with AI tooling doing the paperwork
        private investigators used to do by hand.
      </p>
    </>
  );

  return (
    // The section stays put so React keeps owning main's child list. GSAP wraps
    // the inner div in its pin-spacer instead.
    <section className="bg-sand">
      <div
        ref={pin}
        className={flat ? "section-y" : "flex h-screen flex-col overflow-hidden pt-[clamp(4.5rem,10vh,6rem)] pb-6"}
      >
        <div className="mx-auto flex w-full max-w-page shrink-0 items-start justify-between gap-6 px-6">
          <div>{heading}</div>
          <Link
            href="/projects"
            className="text-muted hover:text-accent shrink-0 text-xs font-semibold transition-colors"
          >
            All projects
          </Link>
        </div>

        {flat ? (
          <div className="mx-auto mt-8 w-full max-w-page space-y-5 px-6">
            {grid}
            {/* Same reasoning as chapter 01's phone crop: the whole case file
                at 342px is an unreadable thumbnail, so below md it zooms to the
                summary and entity block that carries the point. Gentler than
                chapter 01's 4x because here the structure is the argument, and
                cropping to a single figure would lose it. */}
            <div className="border-line relative aspect-[3/2] overflow-hidden rounded-[18px] border">
              <div
                className="zoom-focus absolute inset-0"
                style={
                  { "--zoom": 2.2, "--zoom-x": "40.9%", "--zoom-y": "35.4%" } as React.CSSProperties
                }
              >
                <Image
                  src="/projects/flagship/investigative-casefile.webp"
                  alt="Case file overview showing an AI summary, key entities and a case timeline."
                  fill
                  sizes="(max-width: 767px) 1536px, 1150px"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-page min-h-0 flex-1 items-center justify-center px-6 [container-type:size]">
            {/* The stage takes the column width, but never more than its own
                height allows, so it stays 16:9 instead of being squashed into a
                letterbox on a short screen. `max-h-full` did the opposite: it
                capped the height and left the width alone, so at 1280x590 the
                frame flattened to 2.7:1 while the card grid inside it kept
                sizing off the full 976px and overran the copy above by 18px.
                cqh is the containing row's own height, so this is the same
                "fit, don't crop" rule the box would have had with `object-fit`
                — expressed for a box rather than an image. */}
            <div className="relative aspect-[16/9] w-[min(100%,177.78cqh)]">
              {/* Case file first, so it sits *under* the artifacts. It reaches
                  full opacity while the opaque cards still cover most of it,
                  and the cards then dissolve to reveal it. Fading it in on top
                  instead leaves two dense interfaces at half opacity on the
                  same rect, which is the double exposure chapter 01 already
                  had to solve. */}
              <div
                ref={sheet}
                className="border-line absolute inset-0 overflow-hidden rounded-[14px] border bg-white shadow-[0_20px_60px_-24px_rgba(20,18,12,0.5)]"
              >
                <Image
                  src="/projects/flagship/investigative-casefile.webp"
                  alt="Case file overview showing an AI summary, key entities and a case timeline."
                  fill
                  sizes="(max-width: 768px) 100vw, 1150px"
                  className="object-cover object-top"
                />
              </div>

              {/* Near the full stage width, so each card renders at roughly the
                  218px its source tile actually is. Anything narrower is
                  downscaling fine UI text for no reason. */}
              <div className="absolute inset-x-[5%] top-1/2 -translate-y-1/2">{grid}</div>
            </div>
          </div>
        )}

        <p className="text-muted mx-auto w-full max-w-page shrink-0 px-6 pt-5 text-[0.65rem] font-semibold">
          Interface shown is a representative build.
        </p>
      </div>
    </section>
  );
}
