"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useTexture, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Screen({ image }: { image: string }) {
  const texture = useTexture(image);
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    target.current.x = state.pointer.x * 0.28;
    target.current.y = state.pointer.y * 0.16;
    const g = group.current;
    if (!g) return;
    g.rotation.y += (target.current.x - 0.3 - g.rotation.y) * 0.04;
    g.rotation.x += (-target.current.y + 0.08 - g.rotation.x) * 0.04;
  });

  const img = texture.image as { width: number; height: number };
  const aspect = img ? img.width / img.height : 16 / 10;
  const width = 4.4;
  const height = width / aspect;

  return (
    <group ref={group} rotation={[0.08, -0.3, 0]}>
      <RoundedBox args={[width + 0.18, height + 0.18, 0.14]} radius={0.07} smoothness={4}>
        <meshStandardMaterial color="#111114" metalness={0.5} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function ProjectStage({ image }: { image: string }) {
  return (
    <div className="h-[70vh] w-full md:h-[80vh]">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} />
        <Sparkles count={100} scale={9} size={2.4} speed={0.3} color="#6f5bff" />
        <Suspense fallback={null}>
          <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.55}>
            <Screen image={image} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
