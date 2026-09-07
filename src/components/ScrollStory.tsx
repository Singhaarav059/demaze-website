"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "./ScrollStory.css";

const chapters = [
  {
    key: "automotive",
    index: "01",
    sector: "Automotive intelligence",
    title: "A car is valued the moment it arrives.",
    body: "Intake photographs, odometer and condition feed a valuation against live market comparables. The dealer sees the number and the reasoning behind it before the customer has finished their coffee.",
    href: "/projects/luxury-car-dealer-software",
    cta: "The dealership platform",
  },
  {
    key: "investigation",
    index: "02",
    sector: "Investigative context",
    title: "A case takes shape as its evidence is linked.",
    body: "Statements, stills, threads and notes become typed records. Link them and the timeline assembles itself, visible to the whole team rather than held in one investigator’s head.",
    href: "/projects/investigative-case-management",
    cta: "The case-file platform",
  },
  {
    key: "commerce",
    index: "03",
    sector: "Commerce that adapts",
    title: "A storefront rearranges itself for the person browsing.",
    body: "Search, recommendations and merchandising share one product graph, so what a customer sees is composed for them, and the operations team sees the same events on the other side.",
    href: "/projects/luxury-ecommerce-platform",
    cta: "The luxury storefront",
  },
];

// Anything below these thresholds gets the chapters as plain document flow.
const STATIC_QUERY =
  "(max-width: 900px), (max-height: 600px), (prefers-reduced-motion: reduce)";

/**
 * Three chapters against one sticky stage. Progress comes from native scroll:
 * each chapter's position in the viewport becomes a 0..1 custom property the
 * stage's CSS reads, so the scene advances exactly as far as the visitor has
 * scrolled and never runs ahead of them. A passive listener queues one frame at
 * a time; nothing scroll-jacks. When the media query says static, the effect
 * removes itself and the properties default to the finished composition.
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
        const progress = clamp(
          (start - rect.top) / (rect.height + start - end),
          0,
          1,
        );
        section.style.setProperty(`--c${i}`, progress.toFixed(4));
        // The stage shows whichever chapter is closest to the reading line.
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
          <span className="eyebrow">01 / Three worlds, one practice</span>
          <span className="eyebrow">Scroll to advance</span>
        </div>
        <h2 className="section-heading story-title" id="story-title">
          Different operations.
          <br />
          The same <em>discipline.</em>
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
                {chapter.index} / {chapter.sector}
              </p>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              <Link className="text-link" href={chapter.href}>
                {chapter.cta} <span aria-hidden>↗</span>
              </Link>
              <div className="story-inline-scene" aria-hidden>
                <Scene index={i} />
              </div>
            </article>
          ))}
        </div>
        <div className="story-stage" aria-hidden>
          <div className="story-stage-frame">
            {chapters.map((chapter, i) => (
              <div className={`story-scene story-scene-${i}`} key={chapter.key}>
                <Scene index={i} />
              </div>
            ))}
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

function Scene({ index }: { index: number }) {
  if (index === 0) return <VehicleScan />;
  if (index === 1) return <EvidenceLinks />;
  return <StorefrontComposition />;
}

function VehicleScan() {
  return (
    <div className="scene scene-vehicle">
      <div className="scene-top">
        <span>Intake · Bay 2</span>
        <span className="scene-reading scene-reading-3">Valuation ready</span>
      </div>
      <svg viewBox="0 0 320 150" className="scene-car">
        <path
          d="M30 108 L46 74 Q56 58 78 56 L178 54 Q206 54 228 72 L260 90 Q276 96 276 108 L276 114 H30 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M78 58 L72 82 H150 L152 58 M170 56 L176 82 H226 L206 62"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="82"
          cy="116"
          r="15"
          fill="#19241f"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="236"
          cy="116"
          r="15"
          fill="#19241f"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <g className="scene-scanline">
          <rect x="0" y="40" width="2" height="90" fill="#a8bcff" />
          <rect x="-14" y="40" width="14" height="90" fill="url(#scan)" />
        </g>
        <defs>
          <linearGradient id="scan" x1="0" x2="1">
            <stop offset="0" stopColor="#a8bcff" stopOpacity="0" />
            <stop offset="1" stopColor="#a8bcff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
      <ul className="scene-readings">
        <li className="scene-reading scene-reading-0">
          <span>Condition</span>
          <strong>B+</strong>
        </li>
        <li className="scene-reading scene-reading-1">
          <span>Comparables</span>
          <strong>214</strong>
        </li>
        <li className="scene-reading scene-reading-2">
          <span>Suggested buy</span>
          <strong>58.4L</strong>
        </li>
      </ul>
    </div>
  );
}

function EvidenceLinks() {
  const nodes = ["Statement", "CCTV still", "Email thread", "Field notes"];
  return (
    <div className="scene scene-evidence">
      <div className="scene-top">
        <span>Case 0417</span>
        <span>4 artefacts</span>
      </div>
      <div className="scene-evidence-canvas">
        <svg viewBox="0 0 320 200" preserveAspectRatio="none">
          <g fill="none" stroke="#c7d2b5" strokeWidth="1.25">
            <path pathLength="1" d="M66 44 Q120 100 160 100" />
            <path pathLength="1" d="M254 44 Q200 100 160 100" />
            <path pathLength="1" d="M66 156 Q120 100 160 100" />
            <path pathLength="1" d="M254 156 Q200 100 160 100" />
          </g>
        </svg>
        {nodes.map((node, i) => (
          <span className={`scene-node scene-node-${i}`} key={node}>
            {node}
          </span>
        ))}
        <span className="scene-hub">
          <strong>E-1</strong>
          <small>Entity of interest</small>
        </span>
      </div>
    </div>
  );
}

function StorefrontComposition() {
  const tiles = ["Coat", "Bag", "Boot", "Scarf", "Watch", "Belt"];
  return (
    <div className="scene scene-store">
      <div className="scene-top">
        <span>maison · storefront</span>
        <span className="scene-store-mode">
          <i>Default</i>
          <b>Composed for you</b>
        </span>
      </div>
      <div className="scene-store-grid">
        {tiles.map((tile, i) => (
          <div className={`scene-tile scene-tile-${i}`} key={tile}>
            <svg viewBox="0 0 60 44">
              <rect x="6" y="4" width="48" height="36" rx="2" />
              <path
                d={`M6 36 L${18 + i * 4} ${20 + (i % 3) * 4} L34 30 L46 22 L54 28`}
              />
            </svg>
            <span>{tile}</span>
          </div>
        ))}
      </div>
      <div className="scene-store-panel">
        <span>Because you looked at outerwear</span>
        <strong>Try on · Authenticated · Ships today</strong>
      </div>
    </div>
  );
}
