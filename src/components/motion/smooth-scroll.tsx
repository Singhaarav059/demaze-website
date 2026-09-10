import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import { prefersReducedMotion, useHasMounted, useReducedMotion } from "@/lib/motion";

// Client-only smooth-scroll provider built on lenis. It is a strict no-op on
// the server and under prefers-reduced-motion: in those cases it renders its
// children unchanged and never constructs a Lenis instance, so keyboard/AT and
// reduced-motion users keep native scrolling. When active it drives lenis from
// a single rAF loop and tears everything down on unmount. Route changes reset
// the scroll position (instantly) so TanStack Router navigation is unaffected.

// Only run Lenis on fine-pointer, hover-capable (i.e. non-touch) devices. Touch
// devices already have excellent native momentum scrolling; overriding it with
// a JS rAF loop is the classic source of "heavy"/"laggy" feel on phones and
// tablets, and every other scroll listener (ScrollProgress, ScrollFocusStack,
// HeroVideo tilt, header condense) then piggybacks on the synthetic scroll.
// Mirrors the supportsFinePointer() probe used in magnetic.tsx/custom-cursor.tsx.
function supportsFinePointer(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  // Only ever true after the first client commit, so the lenis effect never
  // runs during SSR or the initial hydration render.
  const hasMounted = useHasMounted();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    // Guard SSR/pre-mount and honour reduced motion so no instance is ever
    // constructed for reduced-motion users: `reducedMotion` from the hook can
    // still read stale `false` on the very first commit, so we also read the
    // media query synchronously here before touching Lenis. Combined with the
    // mount gate this closes the init-then-teardown window entirely.
    if (
      typeof window === "undefined" ||
      !hasMounted ||
      reducedMotion ||
      prefersReducedMotion() ||
      !supportsFinePointer()
    ) {
      return;
    }

    const lenis = new Lenis({
      // Tightened from 1.05 -> 0.8 so the glide tracks the wheel/trackpad more
      // closely and feels native rather than floaty (less perceived lag).
      duration: 0.8,
      // Standard lenis easing (expo-out) for a natural, non-nauseating glide.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [hasMounted, reducedMotion]);

  useEffect(() => {
    // On route change, jump to the top so a new page never inherits the prior
    // scroll offset. `immediate` avoids animating the reset (which would fight
    // the router's own navigation). Falls back to window.scrollTo when lenis is
    // inactive (reduced motion / not yet mounted).
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
