import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Purely decorative custom cursor. It is aria-hidden, never removes the native
// cursor (so keyboard/AT and reduced-motion users are unaffected), and is only
// activated on fine-pointer, hover-capable devices when reduced motion is off.
// On touch/coarse-pointer devices and under prefers-reduced-motion it renders
// nothing. All DOM access is gated behind the mount effect, so it is SSR-safe.

function supportsFinePointer(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(supportsFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // The dot tracks the pointer 1:1; the ring eases toward it for a soft trail.
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let visible = false;

    // Self-idling loop: the ring eases toward the pointer, but once it has
    // settled within ~0.1px AND the cursor is hidden (pointer left the window),
    // we stop scheduling frames so no rAF runs on the main thread while the user
    // is reading and not moving the mouse. onMove restarts the loop.
    const ensureRunning = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      if (!visible) {
        visible = true;
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
      }
      // Grow the ring over interactive targets for affordance feedback.
      const target = event.target as Element | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select");
      ring.classList.toggle("is-hovering", interactive != null);
      // Movement may require re-easing the ring toward the new pointer position.
      ensureRunning();
    };

    const onLeave = () => {
      visible = false;
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
      // Keep easing the ring to rest even after the pointer leaves; tick() will
      // self-stop once it has settled and the cursor is hidden.
      ensureRunning();
    };

    const tick = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      const settled = Math.abs(pointerX - ringX) <= 0.1 && Math.abs(pointerY - ringY) <= 0.1;
      // Once the ring has caught up to the pointer there is nothing new to
      // paint, so snap it exactly onto the pointer and stop scheduling frames.
      // The next onMove (or onLeave) call restarts the loop. This removes the
      // permanent idle rAF while the user is reading with the mouse stationary
      // (a key source of continuous main-thread work), and also once the ring
      // has fully eased to rest after the pointer left the window.
      if (settled) {
        ringX = pointerX;
        ringY = pointerY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        frame = 0;
      } else {
        frame = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={ringRef} className="immersive-cursor-ring" />
      <div ref={dotRef} className="immersive-cursor-dot" />
    </div>
  );
}
