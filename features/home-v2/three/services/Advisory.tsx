"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box, Limb } from "../artifacts/parts";
import { Bars, Bubble, Bulb, Card, Compass, CurveArrow, Donut, Gear, Lines, Pedestal, Person, Plinth, mat } from "./kit";

/** Advisory & Transformation: the plan on the board, the people, the idea, growth with direction, and the compass. */
export function AdvisoryArtifact() {
  return (
    <group>
      <Pedestal />
      {/* Strategy board on an easel: a start ring, a curved move and a target cross */}
      <group position={[-1.2, 0.2, -0.45]} rotation={[0, 0.35, 0]}>
        <Limb a={[-0.35, 0, 0.15]} b={[0, 0.9, 0]} r={0.025} material={mat.matte(S.navy)} />
        <Limb a={[0.35, 0, 0.15]} b={[0, 0.9, 0]} r={0.025} material={mat.matte(S.navy)} />
        <Card size={[1.25, 0.95]} position={[0, 1.15, 0.05]}>
          <Box size={[1.25, 0.07, 0.05]} radius={0.03} material={mat.matte(S.navy)} position={[0, 0.48, 0]} />
          <Lines widths={[0.4, 0.3]} position={[-0.5, 0.28, 0.01]} gap={0.1} thick={0.035} />
          <mesh position={[-0.3, -0.25, 0.02]} material={mat.matte(S.navyDeep)}>
            <torusGeometry args={[0.08, 0.025, 10, 28]} />
          </mesh>
          <CurveArrow points={[[-0.18, -0.25, 0.03], [0.0, -0.18, 0.03], [0.1, 0.0, 0.03], [0.14, 0.12, 0.03]]} color={S.navyDeep} r={0.018} />
          <Limb a={[0.24, 0.32, 0.03]} b={[0.4, 0.16, 0.03]} r={0.02} material={mat.matte(S.navyDeep)} />
          <Limb a={[0.24, 0.16, 0.03]} b={[0.4, 0.32, 0.03]} r={0.02} material={mat.matte(S.navyDeep)} />
        </Card>
      </group>
      <Bubble color={S.card} dot={S.navy} position={[-0.95, 0.55, 0.45]} scale={0.6} />
      <Person color={S.navy} position={[-1.55, 0.2, 0.55]} scale={0.7} />
      <Person color={S.navy} position={[-1.15, 0.2, 0.8]} scale={0.55} />
      {/* Growth with direction */}
      <Plinth size={[1.9, 0.12, 0.9]} position={[0.3, 0.26, 0.15]} color={S.shade} />
      <Bars heights={[0.4, 0.6, 0.85, 1.15]} colors={[S.card, AU.cream200, AU.maroon400, AU.maroon600]} width={0.36} gap={0.08} depth={0.36} position={[0.4, 0.32, 0.15]} />
      <CurveArrow points={[[-0.55, 0.45, 0.4], [0.0, 0.9, 0.3], [0.5, 1.45, 0.2], [0.95, 2.0, 0.05]]} color={S.navyDeep} r={0.08} />
      <Bulb position={[-0.1, 1.85, -0.5]} scale={0.95} />
      {/* Dashboard and settings cards */}
      <Card size={[1.25, 0.8]} position={[1.4, 1.7, -0.55]} rotation={[0, -0.4, 0]}>
        <Donut r={0.22} inner={0.11} depth={0.07} parts={[[200, S.blue], [80, AU.maroon400], [80, AU.maroon500]]} position={[-0.3, 0.02, 0.02]} />
        <Bars heights={[0.06, 0.12, 0.18, 0.26, 0.32]} colors={[AU.maroon600]} width={0.05} gap={0.035} depth={0.03} position={[0.25, -0.25, 0.02]} />
      </Card>
      <Card size={[0.95, 0.42]} position={[1.55, 0.95, -0.15]} rotation={[0, -0.4, 0]}>
        <Gear r={0.1} color={S.blue} position={[-0.3, 0, 0]} />
        <Lines widths={[0.4, 0.3]} position={[-0.12, 0.06, 0.01]} gap={0.1} thick={0.03} />
      </Card>
      <Compass position={[1.35, 0.4, 0.65]} rotation={[0.5, 0, -0.15]} scale={0.75} />
    </group>
  );
}
