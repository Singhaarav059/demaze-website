"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./clientFlags";

/** Counts up once, on first intersection. */
export default function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          // easeOutExpo, so it lands rather than stops.
          setN(Math.round(to * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, reduced]);

  return <span ref={ref}>{reduced ? to : n}</span>;
}
