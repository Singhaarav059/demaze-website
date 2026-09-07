"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "./ScrollStory.css";

/**
 * The chapter behind the hero. Section 1 shows the dealership platform from
 * the front, one vehicle moving through four stages; this section shows what
 * that journey runs on. Every claim comes from the dealership case study in
 * `editorial.ts`, and every figure matches the hero so the visitor recognises
 * the same car.
 */
const chapters = [
  {
    key: "before",
    index: "01",
    label: "Before",
    title: "Four tools, and a lot of WhatsApp.",
    body: "A used car was valued by instinct, refurbished on a paper estimate and sold from a spreadsheet nobody trusted. Each department held a piece of the same vehicle. None of them held the vehicle.",
  },
  {
    key: "model",
    index: "02",
    label: "The model",
    title: "Start with the vehicle, not the department.",
    body: "We began with the data model for a vehicle’s life inside the dealership: intake, inspection, valuation, reconditioning, listing, sale. Every screen is designed against that record rather than against a team, so the stages above are views of one object, not four systems.",
  },
  {
    key: "reasoning",
    index: "03",
    label: "The reasoning",
    title: "A valuation that shows its working.",
    body: "Valuation pulls live market comparables and adjusts for condition and region, then shows the reasoning. A sales manager can override the number with a record of why, so the figure is explained rather than asserted.",
  },
  {
    key: "shared",
    index: "04",
    label: "Shared",
    title: "The number the customer hears is the one finance approves.",
    body: "Refurbishment costing and EMI calculation read the same vehicle record, so sales, finance and the workshop work from the same screen. That discipline, applied to fifteen other operations, is the work that follows.",
    href: "/projects/luxury-car-dealer-software",
    cta: "Read the dealership case study",
  },
];

// Anything below these thresholds gets the chapters as plain document flow.
const STATIC_QUERY =
  "(max-width: 900px), (max-height: 600px), (prefers-reduced-motion: reduce)";

/**
 * Four chapters against one sticky stage. Progress comes from native scroll:
 * each chapter's position in the viewport becomes a 0..1 custom property the
 * stage's CSS reads, so the scene advances exactly as far as the visitor has
 * scrolled and never runs ahead of them. A passive listener queues one frame at
 * a time; nothing scroll-jacks. When the media query says static, the effect
 * removes itself and each chapter renders its own finished frame inline.
 */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const media = matchMedia(STATIC_QUERY);
    let frame = 0;
    let attached = false;

    const measure = () => {
      frame = 0;
      const viewport = window.innerHeight;
      let active = 0;
      let nearest = Infinity;
      chapterRefs.current.forEach((chapter, i) => {
        if (!chapter) return;
        const rect = chapter.getBoundingClientRect();
        // 0 when the chapter's top reaches 80% of the viewport, 1 when its
        // bottom passes 35%: the reading zone, not the whole viewport.
        const start = viewport * 0.8;
        const end = viewport * 0.35;
        // The last chapter has nothing after it to scroll against, so it
        // resolves as its heading reaches the reading line rather than as it
        // leaves; otherwise the stage unsticks before the scene finishes.
        const isLast = i === chapterRefs.current.length - 1;
        const progress = isLast
          ? clamp((start - rect.top) / (start - end), 0, 1)
          : clamp((start - rect.top) / (rect.height + start - end), 0, 1);
        section.style.setProperty(`--c${i}`, progress.toFixed(4));
        const distance = Math.abs(rect.top + rect.height / 2 - viewport * 0.5);
        if (distance < nearest) {
          nearest = distance;
          active = i;
        }
      });
      section.dataset.chapter = String(active);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      section.dataset.scrollDriven = "";
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", schedule);
      schedule();
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      delete section.dataset.scrollDriven;
      delete section.dataset.chapter;
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (let i = 0; i < chapters.length; i++) {
        section.style.removeProperty(`--c${i}`);
      }
    };

    const sync = () => (media.matches ? detach() : attach());
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      detach();
    };
  }, []);

  return (
    <section className="scroll-story" ref={root} aria-labelledby="story-title">
      <div className="shell">
        <div className="section-kicker">
          <span className="eyebrow">01 / Behind the journey</span>
          <span className="eyebrow">Scroll to advance</span>
        </div>
        <h2 className="section-heading story-title" id="story-title">
          Behind every stage,
          <br />
          one <em>record.</em>
        </h2>
      </div>
      <div className="shell story-layout">
        <div className="story-chapters">
          {chapters.map((chapter, i) => (
            <article
              className="story-chapter"
              key={chapter.key}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              data-index={i}
            >
              <p className="eyebrow">
                {chapter.index} / {chapter.label}
              </p>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              {chapter.href && (
                <Link className="text-link" href={chapter.href}>
                  {chapter.cta} <span aria-hidden>↗</span>
                </Link>
              )}
              <div
                className="story-inline-scene"
                aria-hidden
                style={frameAt(i)}
              >
                <RecordScene />
              </div>
            </article>
          ))}
        </div>
        <div className="story-stage" aria-hidden>
          <div className="story-stage-frame">
            <RecordScene />
            <div className="story-stage-labels">
              {chapters.map((chapter, i) => (
                <span key={chapter.key} data-index={i}>
                  {chapter.label}
                </span>
              ))}
            </div>
            <div className="story-stage-meta">
              <span className="eyebrow">Product study</span>
              <span className="eyebrow">Illustrative data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// The finished frame of chapter i: everything up to it complete, nothing after.
function frameAt(i: number) {
  return {
    "--c0": i >= 0 ? 1 : 0,
    "--c1": i >= 1 ? 1 : 0,
    "--c2": i >= 2 ? 1 : 0,
    "--c3": i >= 3 ? 1 : 0,
  } as React.CSSProperties;
}

const fragments = [
  { source: "Spreadsheet", owner: "Sales", note: "Velar 2021 · 61L?" },
  { source: "Paper estimate", owner: "Workshop", note: "Refurb, approx 1.5L" },
  { source: "WhatsApp", owner: "14 unread", note: "is 58 final or 61??" },
  { source: "Instinct", owner: "Valuation", note: "Feels like 60" },
];

const fields = [
  ["Intake", "Day 0 · Bay 2"],
  ["Inspection", "38 photographs · B+"],
  ["Valuation", "58.4L suggested"],
  ["Reconditioning", "1.18L approved"],
  ["Listing", "64.9L · day 7"],
  ["Sale", "3 enquiries"],
];

const reasoning = [
  ["214 live comparables", "Median 61.2L"],
  ["Condition B+", "−1.9L"],
  ["Delhi region", "−0.9L"],
  ["Suggested buy", "58.4L"],
  ["Override", "Reason required · logged"],
];

const roles = [
  ["Sales", "Quotes 64.9L · EMI 1.42L"],
  ["Finance", "Approves 64.9L · EMI 1.42L"],
  ["Workshop", "Refurb 1.18L on record"],
];

/**
 * One composition driven by four progress values. Fragments arrive with --c0
 * and converge with --c1 as the record appears; --c2 folds the record down to
 * its valuation and unfolds the reasoning; --c3 folds the reasoning away,
 * restores the whole record and connects the three roles to it.
 */
function RecordScene() {
  return (
    <div className="scene">
      {fragments.map((fragment, i) => (
        <div
          className={`scene-fragment scene-fragment-${i}`}
          key={fragment.source}
        >
          <span>
            {fragment.source} · {fragment.owner}
          </span>
          <strong>{fragment.note}</strong>
        </div>
      ))}
      <div className="scene-slot">No record of the vehicle</div>

      <div className="scene-record">
        <div className="scene-record-head">
          <span>Vehicle record · VLR-0412</span>
          <strong>2021 Range Rover Velar R-Dynamic</strong>
        </div>
        <ul className="scene-fields">
          {fields.map(([name, value], i) => (
            <li
              key={name}
              className={
                name === "Valuation" ? "scene-field-anchor" : undefined
              }
              style={{ "--i": i } as React.CSSProperties}
            >
              <span>{name}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
        <ul className="scene-reasoning">
          {reasoning.map(([name, value], i) => (
            <li key={name} style={{ "--i": i } as React.CSSProperties}>
              <span>{name}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </div>

      <ul className="scene-roles">
        {roles.map(([name, value], i) => (
          <li key={name} style={{ "--i": i } as React.CSSProperties}>
            <i />
            <span>{name}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
