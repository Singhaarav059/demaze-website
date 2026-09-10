import { useEffect, useRef } from "react";

const LINES = Array.from({ length: 46 }, (_, index) => {
  const offset = index * 12;
  const lift = Math.sin(index * 0.42) * 17;
  return {
    d: `M ${190 + offset * 0.18} ${-70 + offset * 0.72}
      C ${410 + offset * 0.2} ${65 + lift + offset * 0.22},
        ${405 + offset * 0.42} ${250 + lift + offset * 0.24},
        ${690 + offset * 0.48} ${295 + offset * 0.38}
      C ${945 + offset * 0.18} ${335 + lift + offset * 0.35},
        ${830 + offset * 0.23} ${600 + lift + offset * 0.48},
        ${1170 + offset * 0.48} ${790 + offset * 0.58}`,
    opacity: 0.16 + (index % 8) * 0.018,
  };
});

export function FlowField() {
  const fieldRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = window.scrollY;

    const isCompact = window.matchMedia("(max-width: 860px)").matches;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const animate = () => {
      currentX += (targetX - currentX) * 0.025;
      currentY += (targetY - currentY) * 0.025;
      const pointerScale = isCompact ? 4 : 13;
      const scrollScale = isCompact ? 0.025 : 0.045;
      field.style.setProperty("--field-x", `${currentX * pointerScale}px`);
      field.style.setProperty(
        "--field-y",
        `${currentY * pointerScale * 0.7 + scrollY * scrollScale}px`,
      );
      field.style.setProperty("--field-tilt", `${currentX * (isCompact ? 0.12 : 0.5)}deg`);
      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <svg
      ref={fieldRef}
      className="flow-field"
      viewBox="0 0 1440 960"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flowStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--flow-lilac)" stopOpacity="0" />
          <stop offset="0.28" stopColor="var(--flow-violet)" />
          <stop offset="0.66" stopColor="var(--flow-blue)" />
          <stop offset="1" stopColor="var(--flow-lilac)" stopOpacity="0" />
        </linearGradient>
        <filter id="flowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.18" />
        </filter>
      </defs>
      <g className="flow-field__lines" fill="none" filter="url(#flowSoft)">
        {LINES.map((line, index) => (
          <path
            key={index}
            d={line.d}
            stroke="url(#flowStroke)"
            strokeWidth={index % 9 === 0 ? 1.15 : 0.72}
            strokeOpacity={line.opacity}
            pathLength="1"
            className="flow-field__path"
            style={{ animationDelay: `${index * -0.19}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
