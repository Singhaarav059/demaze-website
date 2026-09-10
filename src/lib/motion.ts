import { useEffect, useState } from "react";

// Shared client-capability + motion helpers for the immersive 3D/scroll layer.
// Every function that touches the DOM is SSR-safe: it guards `typeof window` /
// `typeof document` so it returns a stable, conservative default on the server
// (no motion, no WebGL) and only reads real capabilities in the browser.

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reads the user's reduced-motion preference once, synchronously.
 * Returns `false` on the server (and wherever matchMedia is unavailable) so the
 * default is "motion allowed" and hydration matches the pre-mount markup.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Subscribes to the reduced-motion media query and re-renders when it changes.
 * Starts as `false` so server and first client render agree, then syncs to the
 * real preference after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Returns `true` only after the component has mounted on the client.
 * Use this to gate browser-only work (WebGL canvases, blob workers) so it never
 * runs during SSR and never causes a hydration mismatch.
 */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Alias of {@link useHasMounted} for call sites that read more naturally. */
export const useIsMounted = useHasMounted;

/**
 * Feature-detects WebGL support without holding onto the probe context.
 * Returns `false` on the server or whenever a context cannot be created (old
 * browsers, blocklisted GPUs, headless environments), so callers can fall back
 * to a static, no-canvas experience.
 */
export function supportsWebGL(): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return context != null;
  } catch {
    return false;
  }
}
