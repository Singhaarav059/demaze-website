import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

// Composable scroll-reveal wrapper. It reuses the exact IntersectionObserver
// pattern already proven in site-shell.tsx (add `is-visible`, then unobserve),
// packaged as a primitive so pages can opt individual elements in without the
// ad-hoc querySelectorAll loop. Reduced-motion users see content immediately
// (rendered visible from the start, no transition), and the markup is SSR-safe:
// the element always renders, only the reveal class toggles on the client.

export interface RevealProps {
  children: ReactNode;
  /** Element/component to render as the wrapper. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Extra delay before the reveal transition, in ms (for manual staggering). */
  delay?: number;
  /**
   * Convenience index-based stagger. The applied delay is
   * `min(stagger, 3) * 55ms`, matching site-shell's cadence.
   */
  stagger?: number;
  /** IntersectionObserver threshold (0-1). */
  threshold?: number;
}

export function Reveal({
  children,
  as,
  className,
  delay,
  stagger,
  threshold = 0.08,
}: RevealProps) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  // Start hidden only when motion is allowed; reduced-motion users start visible
  // so nothing depends on the observer firing.
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const resolvedDelay = delay ?? (stagger != null ? Math.min(stagger, 3) * 55 : 0);

  return (
    <Component
      ref={ref}
      className={cn("scroll-reveal", visible && "is-visible", className)}
      style={
        !reduced && resolvedDelay
          ? ({ "--reveal-delay": `${resolvedDelay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Component>
  );
}
