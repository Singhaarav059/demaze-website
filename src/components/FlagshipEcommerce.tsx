"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery, useReducedMotion } from "./clientFlags";
import { flagshipProjects } from "@/content/projects";

/**
 * Chapter 03. Personalisation is a claim that is easy to make and hard to show,
 * so the frame shows both halves of it at once: the storefront a shopper is
 * looking at, and the engine deciding what they get. A vertical divider travels
 * across the stage, holding at the midpoint where the two sit side by side.
 *
 * A split rather than a fade. Both screens stay at full opacity with a hard
 * edge between them, which is the same reason chapters 01 and 02 avoid
 * crossfading: two dense product UIs at half opacity read as a double exposure.
 * It is also the one mechanic here that shows two things at once rather than
 * replacing one with another, so it does not repeat either earlier chapter.
 *
 * Framed 16:9 off the top of a 3:2 source. That trims the least useful band of
 * both screens, and on the merchandising side it removes a product whose name
 * does not belong in a screenshot on a B2B site.
 */
const PDP = "/projects/flagship/ecommerce-pdp.webp";
const DASH = "/projects/flagship/ecommerce-personalization.webp";

/** Where the divider rests, as an inset from the left. */
const START = 100;
const PAIR = 50;
const END = 0;

const LEAD = 0.5;
const MOVE = 0.8;
const HOLD = 0.5;
const TAIL = 0.25;
const TRAVEL = LEAD + MOVE * 2 + HOLD + TAIL;

const inset = (left: number) => `inset(0% 0% 0% ${left}%)`;

/**
 * Crop centres for the phone layout, measured off the real assets. Clamped
 * because a centre near an edge asks for a window that runs past it, and the
 * origin that would produce it is outside 0-100%.
 */
const clamp = (n: number) => Math.max(0, Math.min(100, n));
const originFor = (centre: number, z: number) =>
  `${clamp(((centre - 1 / (2 * z)) / (1 - 1 / z)) * 100).toFixed(1)}%`;
const zoomStyle = (cx: number, cy: number, z: number) =>
  ({
    "--zoom": z,
    "--zoom-x": originFor(cx, z),
    "--zoom-y": originFor(cy, z),
  }) as React.CSSProperties;

const SIZES = "(max-width: 767px) 1536px, 1000px";

export default function FlagshipEcommerce() {
  const pin = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");

  // Half a phone screen each is useless, so below md the two surfaces stack and
  // each gets its own crop instead of being shown side by side.
  const flat = reduced || !wide;

  useEffect(() => {
    const el = pin.current;
    const sheet = top.current;
    if (!el || !sheet || flat) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(sheet, { clipPath: inset(START) });

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

      // Hold, open to the pair, hold there because that is the whole point of
      // the section, then finish on the engine alone.
      tl.to(sheet, { clipPath: inset(PAIR), duration: MOVE, ease: "power2.inOut" }, LEAD);
      tl.to(sheet, { clipPath: inset(END), duration: MOVE, ease: "power2.inOut" }, LEAD + MOVE + HOLD);
    }, el);

    return () => ctx.revert();
  }, [flat]);

  const heading = (
    <>
      <p className="label text-accent">03 / 0{flagshipProjects.length} · Luxe &amp; Co.</p>
      {/* Height-derived, like the other two chapters: a width clamp holds the
          headline at full size on exactly the short screens with least room. */}
      <h3 className="display mt-2 max-w-2xl text-[clamp(1.45rem,min(4.2vh,6.5vw),2.5rem)] leading-[1.02]">
        Luxury retail, rebuilt to personalise itself.
      </h3>
      <p className="text-void-fg/55 mt-3 max-w-xl text-[0.82rem] leading-relaxed font-medium">
        A sustainable luxury marketplace that personalises itself around each shopper, from search
        and try-on through to live selling.
      </p>
    </>
  );

  return (
    // The section stays put so React keeps owning main's child list. GSAP wraps
    // the inner div in its pin-spacer instead. relative because .grain's
    // overlay is absolute: without a positioned ancestor it sizes against the
    // initial containing block and lands as a viewport-sized blend layer over
    // the top of the document instead of over this section.
    <section className="bg-void text-void-fg grain relative">
      <div
        ref={pin}
        className={
          flat ? "section-y" : "flex h-screen flex-col overflow-hidden pt-[clamp(4.5rem,10vh,6rem)] pb-6"
        }
      >
        <div className="mx-auto flex w-full max-w-page shrink-0 items-start justify-between gap-6 px-6">
          <div>{heading}</div>
          <Link
            href="/projects"
            className="text-void-dim hover:text-accent shrink-0 text-xs font-semibold transition-colors"
          >
            All projects
          </Link>
        </div>

        {flat ? (
          <div className="mx-auto mt-8 w-full max-w-page space-y-6 px-6">
            {[
              { src: PDP, label: "What the shopper sees", z: 1.75, cx: 0.46, cy: 0.35,
                alt: "Product page showing the item, price, colour options and add to bag." },
              { src: DASH, label: "What the system knows", z: 2.4, cx: 0.87, cy: 0.4,
                alt: "Merchandising view showing AI product search and per-customer recommendations." },
            ].map((s) => (
              <div key={s.src}>
                <p className="text-void-dim mb-2 text-[0.7rem] font-semibold">{s.label}</p>
                <div className="border-void-fg/12 relative aspect-[16/9] overflow-hidden rounded-[14px] border">
                  <div className="zoom-focus absolute inset-0" style={zoomStyle(s.cx, s.cy, s.z)}>
                    <Image src={s.src} alt={s.alt} fill sizes={SIZES} className="object-cover object-top" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-page min-h-0 flex-1 flex-col justify-center px-6 [container-type:size]">
            {/* Fits inside the pinned frame instead of being cropped to it.
                `max-h-full` capped the height and left the width alone, so on a
                short screen the 16:9 frame flattened to nearly 3:1 and
                object-cover ate another third of the screenshot off the bottom
                — on the one section whose whole argument is what is on screen.
                cqh is this row's own height; the 2rem is the caption strip
                below, which shares the width so it stays under the frame's
                edges rather than the column's. */}
            <div className="mx-auto flex w-full max-w-[calc((100cqh-2rem)*1.7778)] flex-col">
              <div className="border-void-fg/12 relative aspect-[16/9] overflow-hidden rounded-[14px] border">
                <div className="absolute inset-0">
                  <Image
                    src={PDP}
                    alt="Product page showing the item, price, colour options and add to bag."
                    fill
                    sizes={SIZES}
                    priority
                    className="object-cover object-top"
                  />
                </div>
                {/* Clipped from the left, so the divider is simply the edge of
                    this layer. A separate line element would have to be
                    animated in step with it and can drift; this cannot. */}
                <div ref={top} className="absolute inset-0">
                  <Image
                    src={DASH}
                    alt="Merchandising view showing AI product search and per-customer recommendations."
                    fill
                    sizes={SIZES}
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="text-void-dim mt-3 flex shrink-0 items-center justify-between text-[0.7rem] font-semibold">
                <span>What the shopper sees</span>
                <span>What the system knows</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-void-dim mx-auto w-full max-w-page shrink-0 px-6 pt-4 text-[0.65rem] font-semibold">
          Interface shown is a representative build.
        </p>
      </div>
    </section>
  );
}
