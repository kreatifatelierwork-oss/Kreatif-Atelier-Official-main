"use client";

import { clay, glossy, metal } from "../materials/materials";
import { BRAND, natural as N, palette } from "../materials/palette";
import { extrude, memo, roundedTriangle, youtubeShape } from "./geometry";
import { Box, Limb, Mesh } from "./parts";

/** Advertising: a clay billboard on legs with a glossy red YouTube logo on its face and two chrome lamps. */
export function Billboard() {
  const black = clay(N.slate, { roughness: 0.5 });
  const tile = memo("billboard-tile", () => extrude(youtubeShape(0.78), 0.12, 0.04, 3, 8));
  const play = memo("billboard-play", () => extrude(roundedTriangle(0.15, 0.03), 0.03, 0.012, 2));
  return (
    <group position={[0, 0.2, 0]}>
      {/* Frame and face */}
      <Box size={[2.3, 1.38, 0.14]} radius={0.07} material={clay(N.slate)} />
      <Box size={[2.1, 1.18, 0.04]} radius={0.03} material={clay(N.white)} position={[0, 0, 0.07]} />
      {/* The YouTube logo in its own red, and copy lines */}
      <Mesh geometry={tile} material={glossy(palette.socials.youtube)} position={[-0.52, 0.02, 0.17]} />
      <Mesh geometry={play} material={glossy(BRAND.glyph, { roughness: 0.3 })} position={[-0.5, 0.02, 0.26]} />
      <Box size={[0.8, 0.12, 0.03]} radius={0.03} material={clay(N.slate)} position={[0.42, 0.2, 0.1]} />
      <Box size={[0.62, 0.07, 0.03]} radius={0.02} material={clay(N.grey)} position={[0.33, 0.0, 0.1]} />
      <Box size={[0.7, 0.07, 0.03]} radius={0.02} material={clay(N.grey)} position={[0.37, -0.14, 0.1]} />
      <Box size={[0.4, 0.14, 0.04]} radius={0.06} material={glossy(N.yellow)} position={[0.22, -0.36, 0.1]} />
      {/* Lamps on arms over the top edge */}
      {[-0.6, 0.6].map((x) => (
        <group key={x}>
          <Limb a={[x, 0.69, -0.02]} b={[x, 0.86, 0.3]} r={0.025} material={black} />
          <mesh position={[x, 0.86, 0.36]} rotation={[0.9, 0, 0]} material={metal()} castShadow>
            <cylinderGeometry args={[0.06, 0.12, 0.16, 20]} />
          </mesh>
        </group>
      ))}
      {/* Legs, brace and a walkway rail */}
      {[-0.7, 0.7].map((x) => (
        <Limb key={x} a={[x, -0.69, -0.04]} b={[x * 1.05, -1.6, -0.04]} r={0.06} material={black} />
      ))}
      <Limb a={[-0.7, -1.05, -0.04]} b={[0.7, -1.05, -0.04]} r={0.03} material={black} />
      <Box size={[2.2, 0.05, 0.3]} radius={0.02} material={black} position={[0, -0.74, 0.12]} />
    </group>
  );
}
