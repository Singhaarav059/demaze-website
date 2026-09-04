"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scrubbed parallax. Uses GSAP rather than a raw scroll listener so it reads
 * from the same ticker Lenis drives and never judders against the smoothing.
 */
export default function Parallax({
  children,
  distance = 80,
  zoom = 0,
  className = "",
}: {
  children: React.ReactNode;
  distance?: number;
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      el,
      { y: distance, scale: 1 + zoom },
      {
        y: -distance,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [distance, zoom]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
