import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { supportsWebGL, useHasMounted, useReducedMotion } from "@/lib/motion";

// SSR-safe boundary for the WebGL hero. `three` / @react-three/fiber / drei are
// only ever pulled in through this lazy() dynamic import, and only after the
// component has mounted on the client (useHasMounted). That guarantees `three`
// never executes during server render (`npm run build`) — importing it at the
// top of an SSR-rendered module would crash the build because it touches
// window/document/WebGL. Everything else here renders the static `fallback`.
const HeroScene = lazy(() => import("@/components/three/hero-scene"));

export interface ClientCanvasProps {
  /**
   * Static, fully-functional stand-in shown on the server, before hydration,
   * when WebGL is unavailable, and under prefers-reduced-motion. Pass the hero
   * video or a CSS gradient here so the hero always works without WebGL.
   */
  fallback: ReactNode;
  /** Optional wrapper class for the fixed canvas layer. */
  className?: string;
}

export function ClientCanvas({ fallback, className }: ClientCanvasProps) {
  const hasMounted = useHasMounted();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // WebGL capability is only known on the client; start false so SSR and the
  // first client render agree, then detect after mount.
  const [webglReady, setWebglReady] = useState(false);
  // Pause the scene while the hero is scrolled out of view to save GPU/battery.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    setWebglReady(supportsWebGL());
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Decide whether the live canvas may render. Any failed gate falls back to
  // the static element, so the hero is always usable.
  const canRenderCanvas = hasMounted && webglReady && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className={`immersive-canvas-layer${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {/* The fallback is also the Suspense fallback, so there is never a blank
          frame while the three chunk loads. */}
      {canRenderCanvas && inView ? (
        <Suspense fallback={fallback}>
          <HeroScene />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
