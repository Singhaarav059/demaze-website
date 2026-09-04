"use client";

import { useRef, useEffect, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  scale = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : scale
            ? "translate-y-0 scale-95 opacity-0"
            : "translate-y-8 scale-100 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
