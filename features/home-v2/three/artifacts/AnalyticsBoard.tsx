"use client";

import { clay, custom } from "../materials/materials";
import { palette } from "../materials/palette";
import * as THREE from "three";
import { Ball, Box, Limb, Tube } from "./parts";

const a = palette.analytics;

/** ref-analytics-board.png: a white chart board, blue bars, an orange trend line and a big blue magnifier. */
export function AnalyticsBoard() {
  const axis = clay(a.axis);
  const bars = clay(a.bars, { roughness: 0.45, clearcoat: 0.4 });
  const line = clay(a.line);
  const ring = clay(a.ring, { roughness: 0.4, clearcoat: 0.5 });
  const glass = custom("analytics-glass", () => new THREE.MeshPhysicalMaterial({ color: a.glass, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.72 }));
  const pts: [number, number, number][] = [[-0.42, 0.12, 0.1], [-0.12, 0.3, 0.1], [0.05, 0.22, 0.1], [0.32, 0.58, 0.1]];
  return (
    <group position={[-0.1, 0, 0]}>
      <group rotation={[0.05, 0.35, 0.06]}>
        <Box size={[1.5, 1.8, 0.12]} radius={0.1} material={clay(a.board)} />
        <Limb a={[-0.58, 0.55, 0.07]} b={[-0.58, -0.6, 0.07]} r={0.02} material={axis} />
        <Limb a={[-0.58, -0.6, 0.07]} b={[0.4, -0.6, 0.07]} r={0.02} material={axis} />
        {[0.35, 0.5, 0.68].map((h, i) => (
          <Box key={h} size={[0.16, h, 0.08]} radius={0.03} material={bars} position={[-0.38 + i * 0.25, -0.55 + h / 2, 0.1]} />
        ))}
        <Tube points={pts} r={0.022} material={line} />
        {pts.map((q) => (
          <Ball key={q.join()} r={0.055} material={line} position={q} />
        ))}
      </group>
      {/* Magnifier: ring, glass, handle toward the lower right */}
      <group position={[0.48, -0.05, 0.42]} rotation={[0.15, -0.35, 0]}>
        <mesh material={ring} castShadow>
          <torusGeometry args={[0.42, 0.085, 16, 48]} />
        </mesh>
        <mesh material={glass} scale={[1, 1, 0.22]}>
          <sphereGeometry args={[0.36, 32, 16]} />
        </mesh>
        <Limb a={[0.32, -0.32, 0]} b={[0.72, -0.82, 0.05]} r={0.1} material={ring} />
      </group>
    </group>
  );
}
