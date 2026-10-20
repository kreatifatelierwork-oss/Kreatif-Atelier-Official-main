"use client";

import * as THREE from "three";
import { clay, glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { extrude, memo, roundedTriangle } from "./geometry";
import { Box, Mesh } from "./parts";

const c = palette.clapper;
const STICK: [number, number, number] = [1.7, 0.3, 0.3];

/** A slanted white bar: a parallelogram the height of the stick face. */
function barGeometry() {
  return memo("clapper-bar", () => {
    const h = STICK[1] - 0.06;
    const s = new THREE.Shape();
    s.moveTo(-0.12, -h / 2);
    s.lineTo(0.06, -h / 2);
    s.lineTo(0.16, h / 2);
    s.lineTo(-0.02, h / 2);
    s.closePath();
    return extrude(s, 0.02, 0.008, 2, 4);
  });
}

/** One stick: dark bar with four white slants on its front. */
function Stick({ position }: { position: [number, number, number] }) {
  const bar = barGeometry();
  const white = clay(c.stripe, { roughness: 0.4 });
  return (
    <group position={position}>
      <Box size={STICK} radius={0.06} material={clay(c.body, { roughness: 0.45, clearcoat: 0.4 })} />
      {[-0.54, -0.18, 0.18, 0.54].map((x) => (
        <Mesh key={x} geometry={bar} material={white} position={[x, 0, STICK[2] / 2 + 0.002]} />
      ))}
    </group>
  );
}

/** ref-clapperboard.jpg: a soft-gloss black slate, open clapper, gold hinge and a raised red play mark. */
export function Clapperboard() {
  const body = clay(c.body, { roughness: 0.45, clearcoat: 0.45, clearcoatRoughness: 0.3, sheen: 0 });
  const play = memo("clapper-play", () => extrude(roundedTriangle(0.27, 0.05), 0.05, 0.03, 4));
  return (
    <group rotation={[0, 0, 0.05]} position={[0, -0.1, 0]}>
      <Box size={[1.7, 1.15, 0.36]} radius={0.12} material={body} position={[0, -0.25, 0]} />
      <Stick position={[0, 0.5, 0]} />
      {/* Upper clapper, hinged at the left and lifted open. */}
      <group position={[-0.8, 0.68, 0]} rotation={[0, 0, 0.32]}>
        <Stick position={[0.85, 0.16, 0]} />
      </group>
      <mesh position={[-0.82, 0.7, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={glossy(c.hinge)} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.42, 32]} />
      </mesh>
      <mesh position={[-0.82, 0.7, 0.27]} rotation={[Math.PI / 2, 0, 0]} material={glossy(c.pin)} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.06, 32]} />
      </mesh>
      <Mesh geometry={play} material={glossy(c.play)} position={[0.08, -0.32, 0.2]} />
    </group>
  );
}
