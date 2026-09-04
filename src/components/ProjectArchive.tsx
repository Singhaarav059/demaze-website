"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import { archiveProjects } from "@/content/projects";

/**
 * The floating preview tilts on the cursor's own velocity, so the card reads
 * as a physical panel being dragged through space rather than a tooltip.
 * Position is written straight to style on rAF, never through state.
 */
export default function ProjectArchive() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    const el = preview.current;
    if (!el) return;
    const x = e.clientX;
    const y = e.clientY;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const vx = Math.max(-26, Math.min(26, (x - last.current.x) * 1.6));
      const vy = Math.max(-20, Math.min(20, (y - last.current.y) * 1.4));
      last.current = { x, y };
      el.style.transform = `translate3d(${x + 28}px, ${y - 110}px, 0) perspective(700px) rotateY(${vx}deg) rotateX(${-vy}deg)`;
    });
  };

  return (
    <section
      className="bg-paper relative mx-auto max-w-6xl px-6 py-24 md:py-32"
      onPointerMove={onMove}
      onPointerLeave={() => setActive(null)}
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="005">Selected archive</SectionLabel>
          <h2 className="display d-lg mt-7 max-w-2xl">
            {archiveProjects.length} more systems, shipped and running.
          </h2>
        </div>
        <Link
          href="/projects"
          className="border-line hover:border-ink rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
        >
          View all projects
        </Link>
      </div>

      <ul className="border-line mt-14 border-t">
        {archiveProjects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects#${p.slug}`}
              onPointerEnter={() => setActive(i)}
              className="border-line group flex items-center justify-between gap-6 border-b py-6 md:py-7"
            >
              <span className="flex min-w-0 items-baseline gap-5 md:gap-8">
                <span className="text-muted/60 font-display shrink-0 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display d-md group-hover:text-accent block transition-[color,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">
                  {p.title}
                </span>
              </span>
              <span className="text-muted group-hover:text-accent shrink-0 text-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-tracked preview */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-56 w-80 origin-top-left overflow-hidden rounded-[20px] transition-[opacity,scale] duration-400 md:block"
        style={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.85 : 1 }}
      >
        {archiveProjects.map((p, i) => (
          <Image
            key={p.slug}
            src={p.image}
            alt=""
            fill
            sizes="320px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </section>
  );
}
