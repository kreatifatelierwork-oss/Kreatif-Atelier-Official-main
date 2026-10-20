"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box } from "../artifacts/parts";
import { Bars, Card, CurveArrow, Gear, GoogleG, Label, Lines, Magnifier, Pedestal, Plinth, Tile, mat } from "./kit";

/** Search Engine Optimization: a search page with the Google mark, a number-one result, rankings rising and the magnifier. */
export function SeoArtifact() {
  return (
    <group>
      <Pedestal />
      <Plinth size={[1.8, 0.4, 1.0]} position={[0, 0.4, -0.4]} />
      {/* The search page */}
      <Card size={[1.7, 1.3]} position={[0, 1.27, -0.55]} bar={S.blue}>
        <Label text="SEO" height={0.42} color={S.navy} position={[-0.25, 0.12, 0.01]} weight={900} />
        <Bars heights={[0.12, 0.2, 0.28, 0.36]} colors={[S.blue, AU.maroon400, S.orange, S.red]} width={0.07} gap={0.03} depth={0.03} position={[0.52, -0.02, 0]} />
        <group position={[0, -0.36, 0.01]}>
          <Box size={[1.3, 0.2, 0.04]} radius={0.1} material={mat.shade()} />
          <Box size={[0.24, 0.2, 0.05]} radius={0.06} material={mat.plastic(S.blue)} position={[0.55, 0, 0.01]} />
        </group>
      </Card>
      {/* Result card with the G and a #1 flag */}
      <Card size={[1.0, 0.9]} position={[-1.35, 1.05, -0.1]} rotation={[0, 0.4, 0]}>
        <GoogleG scale={0.14} position={[-0.32, 0.2, 0]} />
        <Lines widths={[0.45, 0.35]} position={[-0.12, 0.25, 0.01]} gap={0.1} thick={0.035} color={S.blueLight} />
        <Box size={[0.7, 0.05, 0.02]} radius={0.02} material={mat.plastic(S.green)} position={[0, -0.05, 0.01]} />
        <Lines widths={[0.7, 0.6]} position={[-0.35, -0.18, 0.01]} gap={0.1} thick={0.035} />
      </Card>
      <Tile size={0.42} color={S.green} position={[-1.05, 1.75, 0.05]} rotation={[0, 0.4, 0]}>
        <Label text="#1" height={0.2} color={S.card} />
      </Tile>
      {/* Rising rankings */}
      <Card size={[1.15, 0.95]} position={[1.35, 1.25, -0.25]} rotation={[0, -0.4, 0]}>
        <Bars heights={[0.18, 0.28, 0.36, 0.5]} colors={[S.blue, AU.maroon500, S.green, S.orange]} width={0.13} gap={0.05} depth={0.06} position={[0, -0.38, 0]} />
        <CurveArrow points={[[-0.45, -0.05, 0.08], [-0.1, 0.05, 0.08], [0.2, 0.18, 0.08], [0.42, 0.38, 0.08]]} color={S.blue} r={0.025} />
      </Card>
      <Magnifier position={[0.2, 0.95, 0.55]} rotation={[0, -0.25, 0.1]} scale={0.95} />
      <Gear r={0.28} color={S.blue} position={[-1.0, 0.35, 0.55]} rotation={[-0.3, 0.4, 0]} />
      <Box size={[0.45, 0.45, 0.45]} radius={0.06} material={mat.plastic(S.orange)} position={[1.45, 0.43, 0.55]} />
      <Box size={[0.4, 0.4, 0.4]} radius={0.06} material={mat.plastic(S.blue)} position={[-1.55, 0.4, -0.6]} />
    </group>
  );
}
