"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function CncMachine() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.025;
  });

  return (
    <group ref={group} rotation={[0, -0.55, 0]} position={[0, -0.65, 0]}>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 2.25, 1.7]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.48} metalness={0.25} />
      </mesh>

      <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.5, 1.85]} />
        <meshStandardMaterial color="#27272a" roughness={0.5} metalness={0.45} />
      </mesh>

      <mesh position={[-0.32, 0.86, 0.861]}>
        <boxGeometry args={[1.7, 1.42, 0.035]} />
        <meshStandardMaterial color="#121214" roughness={0.2} metalness={0.65} />
      </mesh>
      <mesh position={[-0.32, 0.86, 0.885]}>
        <planeGeometry args={[1.48, 1.18]} />
        <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[-0.32, 0.86, 0.905]}>
        <planeGeometry args={[0.018, 1.14]} />
        <meshBasicMaterial color="#ff6b1a" transparent opacity={0.75} />
      </mesh>

      <mesh position={[1.04, 0.95, 0.9]} castShadow>
        <boxGeometry args={[0.42, 1.3, 0.22]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[1.04, 1.25, 1.02]}>
        <planeGeometry args={[0.27, 0.38]} />
        <meshBasicMaterial color="#111827" />
      </mesh>
      <mesh position={[1.04, 1.25, 1.026]}>
        <planeGeometry args={[0.19, 0.02]} />
        <meshBasicMaterial color="#3ddc97" />
      </mesh>

      {[0.82, 0.58, 0.34].map((y, index) => (
        <mesh key={y} position={[1.04, y, 1.025]}>
          <cylinderGeometry args={[0.055, 0.055, 0.025, 20]} />
          <meshStandardMaterial
            color={index === 0 ? "#ff4d4f" : index === 1 ? "#ffc53d" : "#3ddc97"}
            emissive={index === 0 ? "#ff4d4f" : "#000000"}
            emissiveIntensity={index === 0 ? 0.4 : 0}
          />
        </mesh>
      ))}

      <mesh position={[0, 1.98, 0]} castShadow>
        <boxGeometry args={[2.65, 0.18, 1.6]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.45} metalness={0.2} />
      </mesh>

      <mesh position={[-1.12, -0.93, 0.55]}>
        <boxGeometry args={[0.34, 0.25, 0.58]} />
        <meshStandardMaterial color="#111113" roughness={0.6} metalness={0.6} />
      </mesh>
      <mesh position={[1.12, -0.93, 0.55]}>
        <boxGeometry args={[0.34, 0.25, 0.58]} />
        <meshStandardMaterial color="#111113" roughness={0.6} metalness={0.6} />
      </mesh>
    </group>
  );
}

export function CncMachineModel({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Rotating 3D model of a CNC machine">
      <Canvas
        camera={{ position: [4.2, 2.7, 5.5], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 6, 5]} intensity={3.2} color="#fff7ed" />
        <directionalLight position={[-4, 2, -3]} intensity={1.4} color="#5b9dff" />
        <pointLight position={[1, 0, 4]} intensity={8} color="#ff6b1a" distance={8} />
        <CncMachine />
      </Canvas>
    </div>
  );
}
