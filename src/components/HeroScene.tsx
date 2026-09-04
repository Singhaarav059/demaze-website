"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";
import { useMounted, useReducedMotion } from "./clientFlags";

/**
 * A polished knot in the brand blue, lit entirely by lightformers so the
 * studio reflections need no external HDRI download.
 * "Demaze" is an untangling, so the form is literally a knot.
 */
function Knot({ paused }: { paused: React.RefObject<boolean> }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(window.innerHeight, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (paused.current || !group.current || !mesh.current) return;
    const t = state.clock.elapsedTime;

    // Continuous slow tumble, accelerated by scroll depth.
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * (0.16 + scroll.current * 0.5);

    // Cursor parallax, eased so it never snaps.
    group.current.rotation.y += (pointer.current.x * 0.32 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (pointer.current.y * 0.2 - group.current.rotation.x) * 0.04;

    // Drift down and away as the hero scrolls off.
    group.current.position.y = Math.sin(t * 0.4) * 0.12 - scroll.current * 1.6;
    group.current.scale.setScalar(1 - Math.min(scroll.current, 1) * 0.25);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.05, 0.34, 340, 48, 2, 3]} />
        <meshStandardMaterial color="#5271f6" metalness={1} roughness={0.16} envMapIntensity={1.5} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const enabled = mounted && !reduced;

  // Stop rendering frames once the hero has scrolled away.
  useEffect(() => {
    const el = wrap.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([e]) => (paused.current = !e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);

    // R3F sizes the drawing buffer from its own ResizeObserver, and that first
    // measurement can be missed while the container is still settling. Nothing
    // re-triggers it afterwards, so the renderer stays stuck at the 300x150
    // canvas default and the hero paints nothing. A window resize makes it
    // re-measure, so nudge until the buffer is actually sized.
    // ponytail: bounded poll, drop it if R3F stops missing the first entry.
    let tries = 0;
    const nudge = window.setInterval(() => {
      const canvas = el.querySelector("canvas");
      const sized = canvas && canvas.width > 1 && el.clientWidth > 1;
      if (sized && canvas.width >= el.clientWidth) {
        window.clearInterval(nudge);
        return;
      }
      window.dispatchEvent(new Event("resize"));
      if (++tries > 10) window.clearInterval(nudge);
    }, 150);

    return () => {
      io.disconnect();
      window.clearInterval(nudge);
    };
  }, [enabled]);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {enabled && (
        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 42 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          resize={{ debounce: 0 }}
        >
          <Knot paused={paused} />
          <Environment resolution={256}>
            <Lightformer intensity={5} position={[0, 3, 2]} scale={[8, 3, 1]} color="#ffffff" />
            <Lightformer
              intensity={3}
              position={[-4, 1, 1]}
              scale={[3, 6, 1]}
              color="#5271f6"
              form="rect"
            />
            <Lightformer
              intensity={2.2}
              position={[4, -1, 1]}
              scale={[3, 6, 1]}
              color="#f4f2ec"
              form="rect"
            />
            <Lightformer intensity={1.2} position={[0, -3, -2]} scale={[10, 4, 1]} color="#2c3fc4" />
          </Environment>
        </Canvas>
      )}
    </div>
  );
}
