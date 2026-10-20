"use client";

import * as THREE from "three";
import { clay, metal } from "../materials/materials";
import { natural as N } from "../materials/palette";
import { extrude, memo } from "./geometry";
import { Box, Limb, Mesh } from "./parts";

/** A fountain-pen nib outline, tip at the origin, with its breather hole. */
function nibGeometry() {
  return memo("pen-nib", () => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.quadraticCurveTo(0.08, 0.2, 0.24, 0.52);
    s.quadraticCurveTo(0.27, 0.68, 0.2, 0.86);
    s.lineTo(-0.2, 0.86);
    s.quadraticCurveTo(-0.27, 0.68, -0.24, 0.52);
    s.quadraticCurveTo(-0.08, 0.2, 0, 0);
    const hole = new THREE.Path();
    hole.absarc(0, 0.5, 0.05, 0, Math.PI * 2, true);
    s.holes.push(hole);
    return extrude(s, 0.05, 0.018, 2, 10);
  });
}

const SWATCHES = [N.white, N.sky, N.blue, N.coral, N.yellow];

/** Branding & Creative Design: a steel pen nib in front of a fanned deck of brand colour swatches. */
export function PenNib() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Swatch fan, pinned at the bottom with a chrome rivet */}
      <group position={[-0.25, -0.85, -0.3]}>
        {SWATCHES.map((c, i) => (
          <group key={i} rotation={[0, 0, (i - 2) * -0.24]} position={[0, 0, i * 0.045]}>
            <Box size={[0.42, 1.65, 0.035]} radius={0.016} material={clay(c)} position={[0, 0.78, 0]} />
            <Box size={[0.3, 0.05, 0.01]} radius={0.005} material={clay(i === 0 ? N.coral : N.white)} position={[0, 0.16, 0.022]} />
          </group>
        ))}
        <mesh position={[0, 0.08, 0.14]} rotation={[Math.PI / 2, 0, 0]} material={metal()}>
          <cylinderGeometry args={[0.07, 0.07, 0.1, 24]} />
        </mesh>
      </group>
      {/* Nib and grip, pointing down-left */}
      <group position={[0.42, 0.05, 0.45]} rotation={[0.15, -0.35, 0.55]}>
        <Mesh geometry={nibGeometry()} material={metal()} />
        <Box size={[0.012, 0.42, 0.02]} radius={0.005} material={clay(N.slate)} position={[0, 0.22, 0.045]} />
        <Limb a={[0, 0.9, 0]} b={[0, 1.55, 0]} r={0.2} material={clay(N.slate, { roughness: 0.4, clearcoat: 0.5 })} />
        <mesh position={[0, 1.02, 0]} material={metal()}>
          <cylinderGeometry args={[0.215, 0.215, 0.08, 32]} />
        </mesh>
      </group>
    </group>
  );
}
