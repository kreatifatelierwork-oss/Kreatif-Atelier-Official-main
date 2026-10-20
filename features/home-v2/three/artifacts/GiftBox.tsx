"use client";

import * as THREE from "three";
import { clay, glossy, metal } from "../materials/materials";
import { natural as N } from "../materials/palette";
import { extrude, memo, roundedRect } from "./geometry";
import { Ball, Box, Mesh, Tube } from "./parts";

/** The price tag: a rounded card with a punched hole. */
function tagGeometry() {
  return memo("gift-tag", () => {
    const s = roundedRect(0.42, 0.62, 0.08);
    const hole = new THREE.Path();
    hole.absarc(0, 0.22, 0.045, 0, Math.PI * 2, true);
    s.holes.push(hole);
    return extrude(s, 0.03, 0.012, 2, 8);
  });
}

/** Promotions: a blue clay gift box with a glossy white ribbon and bow, and a price tag on a string. */
export function GiftBox() {
  const box = clay(N.blue);
  const ribbon = glossy(N.white, { roughness: 0.25 });
  return (
    <group position={[-0.1, -0.25, 0]} rotation={[0, 0.35, 0]}>
      <Box size={[1.3, 1.0, 1.3]} radius={0.08} material={box} position={[0, -0.12, 0]} />
      {/* Lid */}
      <Box size={[1.4, 0.24, 1.4]} radius={0.07} material={clay(N.blueDeep)} position={[0, 0.48, 0]} />
      {/* Ribbon bands over the lid and down the sides */}
      <Box size={[0.22, 1.28, 1.44]} radius={0.04} material={ribbon} position={[0, 0.0, 0]} />
      <Box size={[1.44, 1.28, 0.22]} radius={0.04} material={ribbon} position={[0, 0.0, 0]} />
      {/* Bow: two flattened loops and a knot */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.24, 0.74, 0]} rotation={[Math.PI / 2, 0, side * 0.35]} scale={[1, 1, 0.55]} material={ribbon} castShadow>
          <torusGeometry args={[0.2, 0.07, 12, 32]} />
        </mesh>
      ))}
      <Ball r={0.11} material={ribbon} position={[0, 0.7, 0]} />
      {/* Tag on a string from the knot */}
      <Tube points={[[0.05, 0.7, 0.08], [0.35, 0.55, 0.55], [0.62, 0.28, 0.82]]} r={0.012} material={clay(N.slate)} />
      <group position={[0.7, 0.04, 0.86]} rotation={[0.1, -0.5, -0.35]}>
        <Mesh geometry={tagGeometry()} material={clay(N.white)} />
        <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal()}>
          <torusGeometry args={[0.055, 0.014, 8, 24]} />
        </mesh>
        <Ball r={0.085} material={clay(N.coral)} position={[0, -0.02, 0.03]} scale={[1, 1, 0.3]} />
        <Box size={[0.24, 0.04, 0.02]} radius={0.01} material={clay(N.blue)} position={[0, -0.18, 0.025]} />
      </group>
    </group>
  );
}
