"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/**
 * The single site-wide motion controller for the redesign. It keeps the legacy
 * ambient-motion toggle and `[data-animated-visual]` observation intact, and
 * adds the scroll-driven behaviours every ported page relies on:
 *
 *   - scroll-progress bar width
 *   - sticky-header `[data-scrolled]` toggle past 40px (owned here, not Nav)
 *   - reveal-on-scroll for `[data-reveal]`
 *   - metric count-up for `[data-metric]` (data-target/data-prefix/data-suffix)
 *   - hero frame parallax on `[data-hero-frame]`
 *   - services sticky-stage focus (#services-stage rows/images)
 *   - top-shift parallax for `[data-parallax-img]`
 *
 * Every behaviour is rAF-throttled, uses passive listeners, and is safe with no
 * JavaScript (content is visible, count-up shows its final value) and under a
 * `prefers-reduced-motion` preference (no animation, instant count-up). Motion
 * defaults are hardcoded: contain / subtle / autoplay-on. Nothing runs unless
 * `html[data-js]` is set, which this component sets on mount.
 */
const STORAGE_KEY = "demaze:ambient-motion";
const ATTR = "data-motion";

// Hardcoded motion defaults (no prop editor).
const SERVICE_IMAGE_FIT = "contain";
const MOTION_INTENSITY = "subtle";
const AUTOPLAY_HERO_VIDEO = true;
const REVEAL_SHIFT = 14; // subtle
const SAFETY_TIMEOUT = 1500;

function readPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

const listeners = new Set<() => void>();
let ambient = true;
function setAmbient(next: boolean) {
  ambient = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Storage may be unavailable; the session still honours the choice.
  }
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function SiteMotion() {
  // The layout persists across client navigations, so the observed set of
  // elements changes with the route rather than with this component's mount.
  const pathname = usePathname();
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const enabled = useSyncExternalStore(
    subscribe,
    () => ambient,
    () => true,
  );
  const reduced = useSyncExternalStore(
    (notify) => {
      const query = matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-js", "");
    if (AUTOPLAY_HERO_VIDEO) {
      document.documentElement.setAttribute("data-autoplay-hero", "");
    }
    document.documentElement.setAttribute("data-service-fit", SERVICE_IMAGE_FIT);
    document.documentElement.setAttribute("data-motion-intensity", MOTION_INTENSITY);
    ambient = readPreference();
    listeners.forEach((listener) => listener());
  }, []);

  // Legacy ambient-motion behaviour: pause/park authored artwork offscreen or
  // when the visitor has switched ambient motion off. Unchanged from before.
  useEffect(() => {
    const visuals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animated-visual]"),
    );
    const visible = new WeakSet<Element>();

    const apply = () => {
      for (const visual of visuals) {
        if (!enabled) visual.setAttribute(ATTR, "off");
        else if (document.hidden || !visible.has(visual))
          visual.setAttribute(ATTR, "paused");
        else visual.removeAttribute(ATTR);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        apply();
      },
      { rootMargin: "80px" },
    );
    visuals.forEach((visual) => observer.observe(visual));
    document.addEventListener("visibilitychange", apply);
    apply();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
      visuals.forEach((visual) => visual.removeAttribute(ATTR));
    };
  }, [enabled, pathname]);

  // Scroll behaviours. Re-bound per route so query results stay fresh. Under a
  // reduced-motion preference everything is shown immediately with no animation
  // and the loop never starts.
  useEffect(() => {
    const progress = document.getElementById("scroll-progress");
    const header = document.querySelector<HTMLElement>(".site-header");
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const metrics = Array.from(
      document.querySelectorAll<HTMLElement>("[data-metric]"),
    );
    const heroFrames = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hero-frame]"),
    );
    const parallaxImgs = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-img]"),
    );
    const stage = document.getElementById("services-stage");
    const serviceRows = stage
      ? Array.from(stage.querySelectorAll<HTMLElement>("[data-service-row]"))
      : [];
    const serviceImgs = stage
      ? Array.from(stage.querySelectorAll<HTMLElement>("[data-service-img]"))
      : [];

    const revealAll = () => {
      reveals.forEach((el) => el.setAttribute("data-revealed", ""));
    };
    const fillMetric = (el: HTMLElement) => {
      const target = Number(el.dataset.target ?? "0");
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      el.textContent = `${prefix}${target}${suffix}`;
    };

    // Reduced motion / no-JS-equivalent: show everything, count-up instant.
    if (reduced) {
      revealAll();
      metrics.forEach(fillMetric);
      serviceRows.forEach((row) => (row.dataset.focused = "true"));
      if (serviceImgs[0]) serviceImgs[0].dataset.active = "true";
      return;
    }

    // (c) Reveal-on-scroll. Above-fold elements reveal synchronously; a safety
    // timeout force-reveals everything so nothing can stay hidden.
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-revealed", "");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.setAttribute("data-revealed", "");
      else revealObserver.observe(el);
    });
    const safety = window.setTimeout(revealAll, SAFETY_TIMEOUT);

    // (d) Metric count-up.
    const metricObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          obs.unobserve(el);
          const target = Number(el.dataset.target ?? "0");
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const duration = 1100;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const value = Math.round(easeOutCubic(t) * target);
            el.textContent = `${prefix}${value}${suffix}`;
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    metrics.forEach((el) => metricObserver.observe(el));

    // rAF-throttled scroll loop for progress, header, hero parallax, img
    // parallax and the services sticky-stage focus (lerp-smoothed).
    const focus = serviceRows.map(() => 0);
    let raf = 0;
    let pending = false;

    const render = () => {
      pending = false;
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // (a) scroll-progress width.
      if (progress) {
        const ratio = docHeight > 0 ? scrollY / docHeight : 0;
        progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
      }

      // (b) header scrolled state.
      if (header) {
        if (scrollY > 40) header.setAttribute("data-scrolled", "");
        else header.removeAttribute("data-scrolled");
      }

      // (e) hero frame parallax.
      for (const frame of heroFrames) {
        const shift = Math.min(scrollY * 0.08, 60);
        const scale = Math.max(0.96, 1 - scrollY * 0.00008);
        frame.style.transform = `translateY(${shift}px) scale(${scale})`;
      }

      // (g) parallax-img top shift.
      for (const img of parallaxImgs) {
        const rect = img.getBoundingClientRect();
        const centred = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `translateY(${(-centred * 0.06).toFixed(2)}px)`;
      }

      // (f) services sticky-stage focus. Each row's focus is driven by how
      // close its centre is to the viewport centre (subtle falloff), lerped so
      // the crossfade between rows and their sticky images stays smooth.
      if (serviceRows.length) {
        const viewportCentre = window.innerHeight / 2;
        let best = 0;
        let bestScore = -Infinity;
        serviceRows.forEach((row, i) => {
          const rect = row.getBoundingClientRect();
          const centre = rect.top + rect.height / 2;
          const distance = Math.abs(centre - viewportCentre);
          const score = 1 - Math.min(1, distance / (window.innerHeight * 0.6));
          const targetFocus = Math.max(0, score);
          focus[i] += (targetFocus - focus[i]) * 0.12;
          if (focus[i] > bestScore) {
            bestScore = focus[i];
            best = i;
          }
          const f = focus[i];
          row.style.opacity = `${(0.32 + 0.68 * f).toFixed(3)}`;
          row.style.transform = `translateY(${((1 - f) * 12).toFixed(2)}px) scale(${(0.98 + 0.02 * f).toFixed(3)})`;
          if (f > 0.5) row.dataset.focused = "true";
          else delete row.dataset.focused;
        });
        // Exactly one sticky image shows: crossfade opacity/translate/blur.
        serviceImgs.forEach((img, i) => {
          const on = i === best;
          img.style.opacity = on ? "1" : "0";
          img.style.transform = on ? "translateY(0)" : "translateY(14px)";
          img.style.filter = on ? "blur(0)" : "blur(8px)";
          if (on) img.dataset.active = "true";
          else delete img.dataset.active;
        });
      }
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    render();

    return () => {
      revealObserver.disconnect();
      metricObserver.disconnect();
      window.clearTimeout(safety);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, pathname]);

  if (!isHydrated || reduced) return null;

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={enabled}
      onClick={() => setAmbient(!enabled)}
    >
      <span className="motion-toggle-dot" aria-hidden />
      Ambient motion {enabled ? "on" : "off"}
    </button>
  );
}
