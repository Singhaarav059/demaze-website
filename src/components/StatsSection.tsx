"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useReducedMotion } from "./clientFlags";

function Counter({ to }: { to: number }) {
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

export default function StatsSection() {
  return (
    <section className="bg-void text-void-fg grain relative overflow-hidden py-24 md:py-32">
      <div className="bg-accent/12 pointer-events-none absolute bottom-0 left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="lede text-void-fg/50 max-w-2xl">
          Six years, one delivery team, and a record we can point at.
        </p>

        <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="border-void-fg/12 border-t pt-6">
              <dd className="display text-[clamp(3rem,7vw,5.5rem)] leading-none">
                {stat.prefix}
                <Counter to={stat.value} />
                <span className="text-accent">{stat.suffix}</span>
              </dd>
              <dt className="text-void-dim mt-4 text-sm font-semibold">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
