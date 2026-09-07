"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "demaze:ambient-motion";
const ATTR = "data-motion";

/**
 * One place decides whether authored artwork moves. Every `[data-animated-visual]`
 * gets `data-motion="paused"` while it is offscreen or the tab is hidden, and
 * `data-motion="off"` when the visitor has switched ambient motion off, so the
 * stylesheet can hold an entrance for later or skip to the finished frame. A
 * system reduced-motion preference wins over all of it and the toggle is
 * hidden, because the CSS already disables animation and offering a switch
 * would be a lie. Without JavaScript nothing here runs, so the stylesheet
 * keeps motion off unless `html[data-js]` is present.
 */
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

export default function MotionControl() {
  // The layout persists across client navigations, so the set of visuals to
  // observe changes with the route rather than with this component's mount.
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
    ambient = readPreference();
    listeners.forEach((listener) => listener());
  }, []);

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
