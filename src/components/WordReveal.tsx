"use client";

import { useEffect, useRef, useState } from "react";

/** Word-by-word rise. Splits on spaces and staggers each word's transform. */
export default function WordReveal({
  text,
  className = "",
  stagger = 45,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  stagger?: number;
  as?: "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -100px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {text.split(" ").map((word, i) => (
        // The mask is exactly one line box tall, and display line-height is
        // 0.96, so the serif's descenders sit ~0.08em below it and get cut
        // ("g", "j", "p" all lost their tails). The padding gives the mask
        // room; the matching negative margin keeps the layout identical.
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
        >
          {/* No will-change: the browser promotes these for the duration of
              the transition anyway, and hinting a permanent layer per word
              leaves a dozen of them alive over the hero for the whole
              session. */}
          <span
            className="inline-block"
            style={{
              transform: shown ? "translateY(0)" : "translateY(105%)",
              opacity: shown ? 1 : 0,
              transition: `transform .9s cubic-bezier(.16,1,.3,1) ${i * stagger}ms, opacity .6s ease ${i * stagger}ms`,
            }}
          >
            {word}
          </span>
          {" "}
        </span>
      ))}
    </Tag>
  );
}
