"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box, Limb, Tube } from "../artifacts/parts";
import { Bars, Bulb, Card, Cloud, CurveArrow, Database, Gear, Label, Laptop, Lines, Pedestal, Phone, Picture, Tile, mat } from "./kit";

/** Technology & Product: the product on laptop and phone, the code behind it, the cloud and the data, all wired together. */
export function TechnologyArtifact() {
  const wire = mat.plastic(S.blueLight);
  return (
    <group>
      <Pedestal />
      <Laptop width={1.7} position={[0.2, 0.2, 0.05]} rotation={[0, -0.15, 0]}>
        <Picture size={[0.7, 0.55]} position={[-0.15, 0.08, 0]} color={AU.maroon500} sky={AU.cream200} />
        <Lines widths={[0.3, 0.25, 0.3]} position={[0.28, 0.25, 0]} gap={0.09} thick={0.035} />
        <Box size={[0.4, 0.1, 0.02]} radius={0.05} material={mat.plastic(AU.maroon600)} position={[0.42, -0.3, 0]} />
      </Laptop>
      <Phone height={1.2} position={[-0.75, 0.8, 0.55]} rotation={[0, 0.25, 0.04]}>
        <Picture size={[0.45, 0.36]} position={[0, 0.22, 0]} color={AU.maroon500} sky={AU.cream200} />
        <Box size={[0.36, 0.09, 0.02]} radius={0.04} material={mat.plastic(AU.maroon600)} position={[0, -0.2, 0]} />
      </Phone>
      {/* Code window */}
      <Card size={[1.25, 0.95]} position={[-1.35, 1.55, -0.55]} rotation={[0, 0.4, 0]} color={AU.maroon950} bar={AU.maroon900}>
        {(
          [
            [0.35, AU.maroon500],
            [0.55, AU.gold300],
            [0.45, AU.maroon400],
            [0.4, AU.maroon500],
          ] as const
        ).map(([w, c], i) => (
          <Box key={i} size={[w, 0.05, 0.02]} radius={0.025} material={mat.plastic(c)} position={[-0.38 + w / 2 + (i % 2) * 0.1, 0.15 - i * 0.13, 0.01]} />
        ))}
      </Card>
      <Tile size={0.48} color={S.card} position={[-1.65, 0.85, 0.15]} rotation={[0, 0.45, 0]}>
        <Label text="</>" height={0.2} color={S.navy} weight={900} />
      </Tile>
      <Cloud position={[0.25, 2.2, -0.75]} scale={0.7}>
        <CurveArrow points={[[0, -0.12, 0], [0, 0.12, 0]]} color={S.blue} r={0.035} />
      </Cloud>
      <Card size={[0.95, 0.8]} position={[1.4, 1.5, -0.4]} rotation={[0, -0.45, 0]}>
        <Bars heights={[0.12, 0.18, 0.26, 0.34]} colors={[S.blue, AU.maroon600]} width={0.1} gap={0.05} depth={0.04} position={[0.05, -0.3, 0.02]} />
        <CurveArrow points={[[-0.3, -0.02, 0.06], [0.0, 0.08, 0.06], [0.3, 0.25, 0.06]]} color={AU.gold300} r={0.022} />
      </Card>
      <Tile size={0.45} color={S.card} position={[1.7, 0.85, 0.1]} rotation={[0, -0.45, 0]}>
        <Gear r={0.12} color={S.navy} position={[0, 0, -0.02]} />
      </Tile>
      <Database position={[-1.45, 0.2, 0.6]} scale={0.55} />
      <group position={[1.35, 0.2, 0.55]}>
        <Box size={[0.7, 0.62, 0.62]} radius={0.06} material={mat.matte(S.navyDeep)} position={[0, 0.31, 0]} />
        <Box size={[0.71, 0.02, 0.63]} radius={0.005} material={mat.plastic(S.blue)} position={[0, 0.3, 0]} />
      </group>
      <Tile size={0.42} color={S.card} position={[0.7, 0.42, 0.85]} rotation={[0, -0.2, 0]}>
        <Bulb scale={0.3} rays={false} position={[0, -0.09, 0]} />
      </Tile>
      {/* Wires between the parts */}
      <Tube points={[[-0.9, 1.3, -0.3], [-0.85, 1.0, -0.1], [-0.5, 0.95, 0.0]]} r={0.012} material={wire} />
      <Tube points={[[0.25, 1.95, -0.6], [0.25, 1.6, -0.5], [0.4, 1.35, -0.3]]} r={0.012} material={wire} />
      <Tube points={[[1.0, 1.45, -0.3], [0.9, 1.2, -0.1], [0.85, 0.95, 0.1]]} r={0.012} material={wire} />
      <Limb a={[1.55, 1.15, -0.1]} b={[1.65, 0.95, 0.05]} r={0.012} material={wire} />
    </group>
  );
}
