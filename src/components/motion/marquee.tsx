import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Accessible, pausable horizontal marquee for the technology band. The track is
// duplicated to create a seamless loop, with the duplicate marked aria-hidden so
// screen readers announce the content once. A visible pause/play control lets
// keyboard and pointer users stop the motion, and the whole animation is driven
// by CSS that is neutralised under prefers-reduced-motion (see styles.css), so
// reduced-motion users get a static, readable row. Under reduced motion the
// pause/play control is not rendered at all: the animation is already frozen,
// so the control would be a no-op. `useReducedMotion()` starts `false` (server
// and first client render) and only flips after mount, so the button renders
// identically during SSR/hydration and is simply removed on the client for
// reduced-motion users, avoiding any hydration mismatch. SSR-safe (no direct
// window access).

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. Higher = slower. */
  speed?: number;
  /** Scroll direction. */
  direction?: "left" | "right";
  /** Accessible label describing what is scrolling. */
  label?: string;
}

export function Marquee({
  children,
  className,
  speed = 32,
  direction = "left",
  label = "Scrolling content",
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const regionId = useId();

  return (
    <div
      className={cn("immersive-marquee", paused && "is-paused", className)}
      role="group"
      aria-label={label}
      style={
        {
          "--marquee-duration": `${speed}s`,
          "--marquee-direction": direction === "right" ? "reverse" : "normal",
        } as CSSProperties
      }
    >
      <div className="immersive-marquee-viewport" id={regionId}>
        <div className="immersive-marquee-track">{children}</div>
        {/* Duplicate for the seamless loop; hidden from assistive tech so the
            content is not announced twice. */}
        <div className="immersive-marquee-track" aria-hidden="true">
          {children}
        </div>
      </div>
      {/* The animation is frozen by the reduced-motion CSS guard, so the
          control has nothing to pause; omit it for reduced-motion users. */}
      {!reducedMotion && (
        <button
          type="button"
          className="immersive-marquee-toggle"
          aria-pressed={paused}
          aria-controls={regionId}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> scrolling technologies</span>
        </button>
      )}
    </div>
  );
}
