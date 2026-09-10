import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

// Pointer-follow "magnetic" hover for buttons and cards. The wrapped element
// eases toward the cursor while hovered and springs back on leave. It is fully
// disabled under prefers-reduced-motion and on coarse/touch pointers (where a
// hover offset makes no sense and could offset tap targets), in which cases the
// child renders untouched. SSR-safe: capability detection runs after mount.

export interface MagneticProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** How far, in px, the element may travel toward the pointer. */
  strength?: number;
}

function supportsFinePointer(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Magnetic({ children, as, className, strength = 18 }: MagneticProps) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(supportsFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    const setOffset = (x: number, y: number) => {
      node.style.setProperty("--magnetic-x", `${x}px`);
      node.style.setProperty("--magnetic-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const rect = node.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        // Normalise by half-size so pull is proportional, then cap by strength.
        setOffset((relX / (rect.width / 2)) * strength, (relY / (rect.height / 2)) * strength);
      });
    };

    const onLeave = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      setOffset(0, 0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled, strength]);

  return (
    <Component ref={ref} className={cn("immersive-magnetic", enabled && "is-active", className)}>
      {children}
    </Component>
  );
}
