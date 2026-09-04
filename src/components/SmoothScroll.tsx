"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Lenis drives the scroll, GSAP ScrollTrigger reads from it. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    // lerp, not duration. A duration runs a fixed easing curve per wheel event,
    // so a burst of events restarts the curve repeatedly and the page moves in
    // little shoves. lerp damps continuously toward the target instead, which
    // is what reads as gliding rather than stepping.
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // sort() before refresh() matters as much as the refresh itself. Triggers
    // are refreshed in creation order, and the sections that swap layout at a
    // breakpoint only create theirs once hydration has resolved the media
    // query, which lands them after components further down the page. Every
    // trigger created before them then measures against a document still
    // missing their pin-spacers, and re-refreshing in the same wrong order
    // never recovers: a section pins thousands of pixels early, on top of
    // whatever is actually on screen.
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 2000);

    // Fixed timers only cover the settles that happen to land before them.
    // Watching the document's own height catches late ones (a breakpoint swap,
    // a font, an image) whenever they occur. Re-reading the height after the
    // refresh absorbs the spacer resize the refresh itself causes, so this
    // converges instead of feeding back.
    let last = document.body.scrollHeight;
    let queued = false;
    const settle = () => {
      queued = false;
      const h = document.body.scrollHeight;
      if (Math.abs(h - last) < 2) return;
      last = h;
      refresh();
      last = document.body.scrollHeight;
    };
    const ro = new ResizeObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(settle);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
