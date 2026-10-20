"use client";

import { svc as S } from "../materials/palette";
import { Box } from "../artifacts/parts";
import { Card, Label, Lines, Picture, mat } from "../services/kit";

/** An ad unit: the AD badge, a creative, an orange swatch and copy lines. */
export function AdCardArtifact() {
  return (
    <group position={[0, 1.1, 0]} rotation={[0, -0.3, 0]}>
      <Card size={[2.2, 1.6]}>
        <Box size={[0.6, 0.42, 0.05]} radius={0.08} material={mat.plastic(S.blue)} position={[-0.6, 0.38, 0.02]} />
        <Label text="AD" height={0.28} color={S.card} position={[-0.6, 0.38, 0.05]} weight={900} />
        <Box size={[0.36, 0.36, 0.04]} radius={0.06} material={mat.plastic(S.orange)} position={[-0.72, -0.18, 0.02]} />
        <Lines widths={[0.4, 0.3]} position={[-0.45, -0.1, 0.02]} gap={0.13} thick={0.05} color={S.blue} />
        <Picture size={[0.85, 0.75]} position={[0.5, 0.12, 0.02]} />
        <Lines widths={[1.6, 1.2]} position={[-0.8, -0.5, 0.01]} gap={0.13} thick={0.04} />
      </Card>
    </group>
  );
}
