"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
  as?: "div" | "li" | "section" | "span";
};

/** threshold 0 + rootMargin so a fast scroll fling can never skip the fire. */
export default function Reveal({ children, className = "", delay = 0, scale, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={
        {
          transitionDelay: `${delay}ms`,
          ...(scale ? { "--reveal-scale": 0.96 } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
