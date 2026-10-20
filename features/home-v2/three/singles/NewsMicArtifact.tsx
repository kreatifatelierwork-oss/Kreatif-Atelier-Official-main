"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Ball, Box, Limb } from "../artifacts/parts";
import { Card, Label, Lines, Picture, mat } from "../services/kit";

/** The press: a NEWS page and a desk microphone on a round base with a red MEDIA flag. */
export function NewsMicArtifact() {
  return (
    <group position={[0, 0, 0]}>
      <Card size={[1.6, 1.9]} position={[-0.45, 1.05, -0.3]} rotation={[0, 0.2, 0]}>
        <Label text="NEWS" height={0.34} color={S.navy} position={[-0.2, 0.6, 0.01]} weight={900} />
        <Picture size={[0.6, 0.48]} position={[-0.38, 0.05, 0.01]} />
        <Lines widths={[0.5, 0.45, 0.5, 0.35]} position={[0.08, 0.22, 0.01]} gap={0.12} thick={0.04} />
        <Lines widths={[1.2, 1.0]} position={[-0.62, -0.5, 0.01]} gap={0.14} thick={0.04} />
      </Card>
      <group position={[0.75, 0, 0.45]} rotation={[0, -0.3, 0]}>
        <mesh position={[0, 0.06, 0]} material={mat.matte(AU.maroon950)}>
          <cylinderGeometry args={[0.4, 0.44, 0.12, 40]} />
        </mesh>
        <Limb a={[0, 0.1, 0]} b={[0, 1.05, 0]} r={0.08} material={mat.matte(AU.maroon950)} />
        <Ball r={0.3} material={mat.matte(AU.maroon950)} position={[0, 1.35, 0]} />
        <Box size={[0.66, 0.32, 0.36]} radius={0.06} material={mat.plastic(S.red)} position={[0, 0.9, 0]} />
        <Label text="MEDIA" height={0.15} color={S.card} position={[0, 0.9, 0.19]} weight={900} />
      </group>
    </group>
  );
}
