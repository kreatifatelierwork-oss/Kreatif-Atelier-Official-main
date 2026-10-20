"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box } from "../artifacts/parts";
import { Gear, Laptop, Phone, Tile, mat } from "../services/kit";

const CODE: [number, string][] = [
  [0.5, AU.maroon500],
  [0.75, AU.gold300],
  [0.6, AU.maroon400],
  [0.4, AU.maroon400],
  [0.65, AU.gold300],
];

/** Building the product: a laptop with code on screen, a phone with the app, and a settings tile. */
export function DevLaptopArtifact() {
  return (
    <group>
      <Laptop width={2.0} position={[-0.1, 0, 0]} rotation={[0, -0.2, 0]}>
        <Box size={[1.86, 1.15, 0.004]} radius={0.015} material={mat.matte(AU.maroon950)} />
        <Box size={[0.4, 1.0, 0.006]} radius={0.015} material={mat.matte(AU.maroon900)} position={[-0.7, 0, 0.004]} />
        {CODE.map(([w, c], i) => (
          <Box key={i} size={[w, 0.05, 0.01]} radius={0.025} material={mat.plastic(c)} position={[-0.35 + w / 2 + (i % 2) * 0.1, 0.35 - i * 0.16, 0.008]} />
        ))}
      </Laptop>
      <Phone height={1.2} position={[1.05, 0.62, 0.45]} rotation={[0, -0.4, 0]}>
        <Box size={[0.48, 0.32, 0.01]} radius={0.04} material={mat.plastic(S.blueLight)} position={[0, 0.25, 0]} />
        <Box size={[0.48, 0.2, 0.01]} radius={0.04} material={mat.plastic(S.sky)} position={[0, -0.08, 0]} />
        <Box size={[0.48, 0.2, 0.01]} radius={0.04} material={mat.plastic(S.blueLight)} position={[0, -0.34, 0]} />
      </Phone>
      <Tile size={0.55} color={S.card} position={[-1.15, 0.45, 0.55]} rotation={[0, 0.3, 0]}>
        <Gear r={0.14} color={S.blue} position={[0, 0, -0.02]} />
      </Tile>
    </group>
  );
}
