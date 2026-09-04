"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";

/**
 * A polished knot in the brand blue, lit entirely by lightformers so the
 * studio reflections need no external HDRI download.
 * "Demaze" is an untangling, so the form is literally a knot.
 *
 * Split out from HeroScene so three.js, @react-three/fiber and drei sit behind
 * a dynamic import. Together they are the single largest chunk in the build,
 * and nothing here is worth downloading on a viewport that will not show it.
 */
function Knot() {
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
    if (!group.current || !mesh.current) return;
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

export default function HeroKnot({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      resize={{ debounce: 0 }}
      // "never" stops the render loop outright while the hero is off screen.
      // The context and the compiled scene stay warm, so coming back is a
      // resumed loop rather than a rebuild.
      frameloop={active ? "always" : "never"}
    >
      <Knot />
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
  );
}
