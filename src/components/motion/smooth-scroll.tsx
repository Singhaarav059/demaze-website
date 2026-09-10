import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/motion";

// Client-only smooth-scroll provider built on lenis. It is a strict no-op on
// the server and under prefers-reduced-motion: in those cases it renders its
// children unchanged and never constructs a Lenis instance, so keyboard/AT and
// reduced-motion users keep native scrolling. When active it drives lenis from
// a single rAF loop and tears everything down on unmount. Route changes reset
// the scroll position (instantly) so TanStack Router navigation is unaffected.

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    // Guard SSR and honour reduced motion: no instance, native scroll intact.
    if (typeof window === "undefined" || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
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
  }, [reducedMotion]);

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
