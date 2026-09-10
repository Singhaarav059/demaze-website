import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

// This module is the ONLY place `three` / @react-three/fiber / drei may be
// imported. It is reached exclusively through a dynamic import() inside
// client-canvas.tsx, which is itself gated behind a client-mount guard, so this
// code never executes during SSR (`npm run build`) and `three` never enters the
// server bundle path. Do not statically import this file from a route or layout.

// Brand palette, mirrored from the oklch tokens in src/styles.css
// (--raspberry / --lavender / --mint / --sky) as sRGB hex so the WebGL layer
// stays visually consistent with the CSS design system without a colour library.
const BRAND_COLORS = ["#e6396d", "#e7d4f2", "#d6f2e2", "#d5edf6"] as const;

// Kept small and instanced so the scene stays cheap on low-end GPUs. Each node
// gets a stable random seed for its resting position, drift, and colour.
const NODE_COUNT = 42;

type SceneNode = {
  basePosition: THREE.Vector3;
  scale: number;
  colorIndex: number;
  driftSpeed: number;
  driftPhase: number;
};

function createNodes(): SceneNode[] {
  // Deterministic-ish spread using a seeded pseudo-random so the layout is
  // pleasant but does not require any external asset fetch.
  const nodes: SceneNode[] = [];
  let seed = 1337;
  const random = () => {
    // Mulberry32-style tiny PRNG: no deps, stable across renders.
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 0; i < NODE_COUNT; i += 1) {
    const radius = 2.4 + random() * 4.4;
    const theta = random() * Math.PI * 2;
    const y = (random() - 0.5) * 5.2;
    nodes.push({
      basePosition: new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius - 2),
      scale: 0.12 + random() * 0.34,
      colorIndex: Math.floor(random() * BRAND_COLORS.length),
      driftSpeed: 0.2 + random() * 0.5,
      driftPhase: random() * Math.PI * 2,
    });
  }
  return nodes;
}

/**
 * Slowly rotating, pointer- and scroll-reactive field of floating brand-tinted
 * nodes. All animation happens in useFrame so it pauses automatically when the
 * parent Canvas is not rendering (frameloop is throttled from client-canvas).
 */
function NodeField({
  pointer,
  scroll,
}: {
  pointer: RefObject<THREE.Vector2>;
  scroll: RefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => createNodes(), []);

  // Shared geometry + one material per brand colour keeps draw setup minimal.
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const materials = useMemo(
    () =>
      BRAND_COLORS.map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 0.35,
            metalness: 0.1,
            flatShading: true,
          }),
      ),
    [],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const clamped = Math.min(delta, 0.05); // guard against tab-refocus jumps
    const pointerVec = pointer.current;
    const scrollProgress = scroll.current ?? 0;

    // Whole-field rotation eased toward the pointer position, plus a constant
    // slow spin so it never looks frozen when the pointer is still.
    const targetRotY = (pointerVec?.x ?? 0) * 0.5;
    const targetRotX = (pointerVec?.y ?? 0) * 0.35;
    group.rotation.y += (targetRotY - group.rotation.y) * clamped * 2 + clamped * 0.08;
    group.rotation.x += (targetRotX - group.rotation.x) * clamped * 2;

    // Scroll pushes the field back and down slightly, revealing content depth.
    group.position.z = -scrollProgress * 3.5;
    group.position.y = scrollProgress * 1.2;

    const time = state.clock.elapsedTime;
    group.children.forEach((child, index) => {
      const node = nodes[index];
      if (!node) return;
      child.position.y =
        node.basePosition.y + Math.sin(time * node.driftSpeed + node.driftPhase) * 0.35;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={materials[node.colorIndex]}
          position={node.basePosition}
          scale={node.scale}
        />
      ))}
    </group>
  );
}

/** Soft, slowly distorting core sphere that anchors the composition. */
function CoreOrb({ scroll }: { scroll: RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    mesh.rotation.y = time * 0.12;
    mesh.rotation.z = Math.sin(time * 0.2) * 0.15;
    const pulse = 1 + Math.sin(time * 0.8) * 0.03 - (scroll.current ?? 0) * 0.15;
    mesh.scale.setScalar(Math.max(0.6, pulse));
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, -1]}>
        <icosahedronGeometry args={[1.35, 4]} />
        <meshStandardMaterial
          color={new THREE.Color("#e6396d")}
          emissive={new THREE.Color("#e6396d")}
          emissiveIntensity={0.18}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-5, -2, 2]} intensity={0.5} color="#e7d4f2" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#d5edf6" />
    </>
  );
}

/**
 * Bridges DOM pointer + scroll into the refs the useFrame loops read. The
 * canvas itself has `pointer-events: none` (so it never intercepts clicks meant
 * for content), which means we listen on `window` for pointer + scroll instead
 * of using R3F pointer events. Registered/cleaned up on mount; only ever runs
 * on the client because the Canvas is dynamically imported behind a mount gate.
 */
function InteractionDriver({
  pointer,
  scroll,
}: {
  pointer: RefObject<THREE.Vector2>;
  scroll: RefObject<number>;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPointerMove = (event: PointerEvent) => {
      // Map viewport coordinates to a symmetric -1..1 range.
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };

    const readScroll = () => {
      const max = Math.max(1, window.innerHeight * 1.4);
      scroll.current = Math.min(1, (window.scrollY || 0) / max);
    };

    readScroll();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", readScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", readScroll);
    };
  }, [pointer, scroll]);

  return null;
}

/**
 * The exported R3F hero scene. `client-canvas.tsx` dynamically imports this and
 * renders it only after mount, only when WebGL is available, and only when the
 * user has not requested reduced motion.
 */
export default function HeroScene() {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const scroll = useRef(0);

  return (
    <Canvas
      className="immersive-canvas-inner"
      // dpr cap keeps fill-rate sane on high-density displays / weak GPUs.
      dpr={[1, 1.75]}
      // "demand" would freeze useFrame; "always" with a low base is fine because
      // client-canvas pauses the whole canvas when the hero scrolls offscreen.
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 8], fov: 42 }}
      // Never steal pointer events meant for the DOM content sitting above.
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <SceneLights />
      <CoreOrb scroll={scroll} />
      <NodeField pointer={pointer} scroll={scroll} />
      <InteractionDriver pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
