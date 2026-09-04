"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useMediaQuery, useMounted, useReducedMotion } from "./clientFlags";

const HeroKnot = dynamic(() => import("./HeroKnot"), { ssr: false });

/**
 * Gate in front of the WebGL hero.
 *
 * The knot is framed for a landscape viewport. Below lg the camera's horizontal
 * field is narrower than the knot is wide, so it crops to an unreadable slice
 * that the hero's two scrims then bury completely — a megabyte of three.js
 * downloaded to render nothing anyone can see. Phones get the CSS glow behind
 * this instead, and the import never fires.
 */
export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const enabled = mounted && !reduced && wide;

  // Stop rendering frames once the hero has scrolled away.
  useEffect(() => {
    const el = wrap.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([e]) => (paused.current = !e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {enabled && <HeroKnot paused={paused} />}
    </div>
  );
}
