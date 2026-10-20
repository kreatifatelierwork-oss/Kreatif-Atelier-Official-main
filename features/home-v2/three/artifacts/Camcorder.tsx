"use client";

import * as THREE from "three";
import { clay, glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { extrude, memo, roundedRect } from "./geometry";
import { Box, Limb, Mesh } from "./parts";

const c = palette.camcorder;

/** ref-camcorder.png: a dark matte camcorder on a short tripod, square lens hood, red, cream and gold buttons. */
export function Camcorder({ tripod = true }: { tripod?: boolean }) {
  const body = clay(c.body, {
    roughness: 0.42,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
  });
  const trim = clay(c.trim, { roughness: 0.45, clearcoat: 0.4 });
  const hood = memo("cam-hood", () => {
    const s = roundedRect(0.62, 0.56, 0.1);
    s.holes.push(new THREE.Path(roundedRect(0.48, 0.42, 0.06).getPoints(6)));
    return extrude(s, 0.16, 0.025, 2, 6);
  });
  return (
    <group position={[0.1, 0.15, 0]}>
      {/* Body and battery */}
      <Box size={[1.0, 0.72, 0.62]} radius={0.08} material={body} position={[0.1, 0.1, 0]} />
      <Box size={[0.32, 0.66, 0.56]} radius={0.07} material={trim} position={[0.74, 0.12, 0]} />
      {/* Side panel and buttons */}
      <Box size={[0.5, 0.32, 0.04]} radius={0.04} material={trim} position={[0.22, 0.18, 0.32]} />
      {(
        [
          [glossy(c.orange, { roughness: 0.3 }), -0.08],
          [glossy(c.blue, { roughness: 0.3 }), 0.08],
          [glossy(c.gold), 0.24],
        ] as const
      ).map(([m, x]) => (
        <Box key={x} size={[0.11, 0.11, 0.05]} radius={0.025} material={m} position={[0.06 + (x as number), -0.07, 0.33]} />
      ))}
      {/* Handle and microphone */}
      <Box size={[0.08, 0.26, 0.12]} radius={0.035} material={body} position={[-0.12, 0.55, 0]} />
      <Box size={[0.08, 0.26, 0.12]} radius={0.035} material={body} position={[0.32, 0.55, 0]} />
      <Box size={[0.56, 0.1, 0.14]} radius={0.045} material={body} position={[0.1, 0.7, 0]} />
      <Limb a={[-0.12, 0.62, 0]} b={[-0.48, 0.62, 0]} r={0.035} material={trim} />
      <Limb a={[-0.52, 0.62, 0]} b={[-1.0, 0.62, 0]} r={0.085} material={trim} />
      {/* Lens barrel, rings, hood and glass, pointing -x */}
      <mesh position={[-0.55, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={body} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.42, 28]} />
      </mesh>
      <mesh position={[-0.47, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={trim} castShadow>
        <cylinderGeometry args={[0.235, 0.235, 0.07, 28]} />
      </mesh>
      <mesh position={[-0.68, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={trim} castShadow>
        <cylinderGeometry args={[0.235, 0.235, 0.06, 28]} />
      </mesh>
      <Mesh geometry={hood} material={body} position={[-0.84, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh position={[-0.77, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={glossy(c.glass, { roughness: 0.05, clearcoat: 1 })}>
        <sphereGeometry args={[0.2, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
      </mesh>
      {/* Tripod head, pan handle and legs (left off when the camera is mounted on something else) */}
      {tripod && (
        <>
          <Box size={[0.5, 0.08, 0.4]} radius={0.03} material={trim} position={[0.1, -0.3, 0]} />
          <Box size={[0.26, 0.16, 0.26]} radius={0.05} material={body} position={[0.1, -0.42, 0]} />
          <Limb a={[0.2, -0.42, 0.08]} b={[0.62, -0.5, 0.3]} r={0.03} material={trim} />
          <Limb a={[0.64, -0.5, 0.31]} b={[0.86, -0.56, 0.42]} r={0.07} material={trim} />
          <mesh position={[0.1, -0.62, 0]} material={body} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.28, 24]} />
          </mesh>
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((a) => (
            <Limb key={a} a={[0.1, -0.7, 0]} b={[0.1 + Math.cos(a + 0.5) * 0.26, -1.0, Math.sin(a + 0.5) * 0.26]} r={0.065} material={body} />
          ))}
        </>
      )}
    </group>
  );
}
