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
 * Chapter 01. Three outputs of one platform, accumulating rather than
 * replacing: each figure lights as its screen arrives and then stays lit, so by
 * the last stage the whole ledger reads as a single column. That is the
 * section's own claim made structural, and it is deliberately not the slide
 * mechanic the remaining flagship sequence uses.
 *
 * The figures are live text, not pixels. Every source screen is 1536x1024, so
 * cropping in far enough to read a number off the image itself would render it
 * soft, and text can be selected, translated and read aloud.
 */
const stages = [
  {
    shot: "/projects/flagship/automotive-valuation.webp",
    alt: "Vehicle valuation screen showing an estimated market value, condition assessment and market comparison.",
    label: "Market valuation",
    value: "₹38,50,000",
    note: "Condition-scored and benchmarked against live listings, with a range the floor can defend to a customer.",
    // Centre of the card carrying this row's figure, as a fraction of the
    // source. Measured by cropping the real asset, not estimated: each screen
    // puts its headline number somewhere different, and two of the three keep
    // it in the right-hand column.
    focus: [0.62, 0.34],
  },
  {
    shot: "/projects/flagship/automotive-emi.webp",
    alt: "EMI calculator screen showing a monthly instalment, loan breakdown and year-wise payment schedule.",
    label: "Finance, in the same session",
    value: "₹72,848",
    unit: "/ month",
    note: "Forty-eight months at 8.75%, pre-qualified before the customer has left the showroom.",
    focus: [0.84, 0.3],
  },
  {
    shot: "/projects/flagship/automotive-refurbishment.webp",
    alt: "Refurbishment management screen showing task progress and estimated against actual cost.",
    label: "Refurbishment held to estimate",
    value: "−5.1%",
    note: "₹1,42,300 actual against a ₹1,50,000 estimate, tracked task by task through to handover.",
    focus: [0.85, 0.33],
  },
];

/**
 * Beats, in multiples of a viewport height.
 *
 * LEAD is the important one. Without it the first wipe begins the instant the
 * pin engages, so by the time the section has finished settling at the top of
 * the screen the sequence is already running and stage 01 is never actually
 * seen at rest. HOLD gives each later stage the same courtesy, and TAIL keeps
 * the last one on screen instead of releasing the pin the moment it lands.
 */
const LEAD = 0.5;
const MOVE = 0.8;
const HOLD = 0.35;
const TAIL = 0.25;
const TRAVEL = LEAD + MOVE * (stages.length - 1) + HOLD * (stages.length - 2) + TAIL;

const ZOOM = 4;

/**
 * Scaling about a transform-origin holds that point still, so the window it
 * leaves visible is not centred on it. This converts the crop centre I actually
 * measured into the origin that produces it.
 */
const originFor = (centre: number) =>
  `${(((centre - 1 / (2 * ZOOM)) / (1 - 1 / ZOOM)) * 100).toFixed(1)}%`;

const zoomStyle = (focus: number[]) =>
  ({
    "--zoom": ZOOM,
    "--zoom-x": originFor(focus[0]),
    "--zoom-y": originFor(focus[1]),
  }) as React.CSSProperties;

// The phone frame shows the asset at 4x, so it needs the full-size source. A
// slot-width `sizes` would have Next serve a ~390px variant and then magnify
// that, which is where the blur would come from.
const SIZES = "(max-width: 767px) 1536px, 620px";

export default function FlagshipAutomotive() {
  const pin = useRef<HTMLDivElement>(null);
  const rows = useRef<HTMLLIElement[]>([]);
  const shots = useRef<HTMLDivElement[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = pin.current;
    const ledger = rows.current.filter(Boolean);
    const frames = shots.current.filter(Boolean);
    if (!el || frames.length === 0 || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Dimmed, not hidden. The ledger holds its full shape from the first
      // frame, so nothing reflows as rows light and the column reads as one
      // object rather than three arriving separately.
      gsap.set(ledger.slice(1), { opacity: 0.22 });
      gsap.set(frames.slice(1), { clipPath: "inset(0% 0% 100% 0%)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * TRAVEL}`,
          pin: el,
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });

      // Each screen is stacked over the last on a rising z-index and wipes down
      // over it, so both are at full opacity with a hard edge between them at
      // every point in the move. Crossfading instead leaves two dense product
      // UIs sitting at half opacity on the same rect through the middle of the
      // transition, which reads as a double exposure rather than a change of
      // screen. The wipe runs top to bottom to match the ledger's own reading
      // direction.
      for (let i = 1; i < frames.length; i++) {
        const at = LEAD + (i - 1) * (MOVE + HOLD);
        tl.to(frames[i], { clipPath: "inset(0% 0% 0% 0%)", duration: MOVE, ease: "power2.inOut" }, at);
        // The row lights a beat into its own wipe, so the figure arrives with
        // the screen that evidences it rather than ahead of it.
        tl.to(ledger[i], { opacity: 1, duration: MOVE * 0.6, ease: "power1.inOut" }, at + MOVE * 0.3);
      }
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const heading = (
    <>
      <p className="label text-accent">01 / 0{flagshipProjects.length} · Demaze Automotive</p>
      {/* Not .d-lg. That clamp is width-derived, so on a short wide screen the
          headline stays at its maximum while the frame it has to fit inside is
          the one thing that shrank. Height-derived here, same ceiling. */}
      <h3 className="display mt-2 max-w-2xl text-[clamp(1.45rem,4.2vh,2.5rem)] leading-[1.02]">
        One system behind every valuation, EMI and refurbishment on the floor.
      </h3>
    </>
  );

  const ledgerList = (
    <ol className="flex flex-col">
      {stages.map((stage, i) => (
        <li
          key={stage.label}
          ref={(node) => {
            if (node) rows.current[i] = node;
          }}
          // Sized against the viewport's height, not its width. This panel is
          // pinned at exactly 100vh, so on a short laptop screen a
          // width-derived scale overruns the frame and the last row lands on
          // top of the caption below it.
          className="border-void-fg/12 border-t py-[clamp(0.45rem,1.5vh,1rem)] first:border-t-0 first:pt-0"
        >
          <p className="text-void-dim text-[0.7rem] font-semibold tracking-[0.04em]">
            0{i + 1} · {stage.label}
          </p>
          <p className="display mt-1 text-[clamp(1.4rem,3.6vh,2.15rem)] leading-none">
            {stage.value}
            {stage.unit && (
              <span className="text-void-dim ml-1.5 text-[0.5em] tracking-normal">{stage.unit}</span>
            )}
          </p>
          <p className="text-void-fg/55 mt-1.5 max-w-sm text-[0.78rem] leading-relaxed font-medium">
            {stage.note}
          </p>
        </li>
      ))}
    </ol>
  );

  return (
    // The section stays put so React keeps owning main's child list. GSAP wraps
    // the inner div in its pin-spacer instead.
    <section className="bg-void text-void-fg grain">
      <div
        ref={pin}
        className={reduced ? "section-y" : "flex h-screen flex-col overflow-hidden pt-[clamp(4.5rem,10vh,6rem)] pb-6"}
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

        {reduced ? (
          <div className="mx-auto mt-8 w-full max-w-5xl px-6">
            {heading}
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              {ledgerList}
              {/* Every stage gets its own frame here. Skipping only the
                  animation would leave three screens stacked on one rect with
                  the last one winning, hiding two of the three. */}
              <div className="flex flex-col gap-5">
                {stages.map((stage) => (
                  <div
                    key={stage.shot}
                    className="border-void-fg/10 relative aspect-[3/2] overflow-hidden rounded-[18px] border"
                  >
                    <div className="zoom-focus absolute inset-0" style={zoomStyle(stage.focus)}>
                      <Image src={stage.shot} alt={stage.alt} fill sizes={SIZES} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col justify-center px-6">
            <div className="shrink-0">{heading}</div>

            <div className="mt-[clamp(1rem,2.6vh,1.75rem)] grid min-h-0 gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10">
              {ledgerList}

              {/* Aspect-locked to the 3:2 source so the frame never crops the
                  chrome off a screen that is already only 1536px wide. */}
              <div className="border-void-fg/10 relative aspect-[3/2] self-center overflow-hidden rounded-[18px] border">
                {stages.map((stage, i) => (
                  <div
                    key={stage.shot}
                    ref={(node) => {
                      if (node) shots.current[i] = node;
                    }}
                    className="bg-void absolute inset-0"
                    style={{ zIndex: i + 1 }}
                  >
                    <div className="zoom-focus absolute inset-0" style={zoomStyle(stage.focus)}>
                      <Image
                        src={stage.shot}
                        alt={stage.alt}
                        fill
                        sizes={SIZES}
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-void-dim mx-auto w-full max-w-5xl shrink-0 px-6 pt-5 text-[0.65rem] font-semibold">
          Interface shown is a representative build.
        </p>
      </div>
    </section>
  );
}
