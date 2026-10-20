"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box, Limb, Tube } from "../artifacts/parts";
import { Bars, Card, Donut, Lines, Pedestal, Plinth, mat } from "./kit";

/** A gauge: a half ring in red, yellow and green with a navy needle. Face toward +z. */
function Gauge({ position, rotation }: { position?: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Donut r={0.42} inner={0.28} depth={0.1} start={0} parts={[[60, S.green], [60, S.yellow], [60, S.red]]} />
      <Limb a={[0, 0, 0.08]} b={[0.22, 0.24, 0.08]} r={0.03} material={mat.plastic(S.navy)} />
      <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(S.navy)}>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 24]} />
      </mesh>
    </group>
  );
}

/** Analytics & Performance: a reporting dashboard with a donut and climbing bars, a trend line, a gauge and KPI cards. */
export function AnalyticsArtifact() {
  return (
    <group>
      <Pedestal />
      <Plinth size={[2.6, 0.32, 0.9]} position={[0, 0.36, -0.5]} />
      <Card size={[2.4, 1.45]} position={[0, 1.27, -0.65]}>
        <Donut r={0.34} inner={0.18} depth={0.1} parts={[[150, S.blue], [90, S.red], [120, AU.maroon400]]} position={[-0.75, 0.15, 0.02]} />
        <Lines widths={[0.55, 0.45, 0.5]} position={[-0.3, 0.42, 0.01]} gap={0.11} thick={0.04} />
        <Bars heights={[0.12, 0.2, 0.26, 0.36, 0.48]} colors={[S.blue, AU.maroon600, AU.maroon600]} width={0.12} gap={0.06} depth={0.06} position={[0.55, -0.55, 0.02]} />
      </Card>
      {/* Trend card */}
      <Card size={[1.1, 0.8]} position={[-1.15, 0.85, 0.2]} rotation={[0, 0.35, 0]}>
        <Tube points={[[-0.4, -0.15, 0.03], [-0.2, 0.08, 0.03], [0.0, -0.05, 0.03], [0.2, 0.15, 0.03], [0.4, 0.05, 0.03]]} r={0.03} material={mat.plastic(S.blue)} />
      </Card>
      <Gauge position={[0.35, 0.7, 0.55]} rotation={[-0.15, -0.2, 0]} />
      <Card size={[0.7, 0.75]} position={[1.4, 0.9, 0.1]} rotation={[0, -0.4, 0]}>
        <Bars heights={[0.12, 0.2, 0.3]} colors={[S.blue]} width={0.1} gap={0.05} depth={0.04} position={[0, -0.28, 0.02]} />
      </Card>
      <Box size={[0.4, 0.6, 0.4]} radius={0.06} material={mat.matte(S.navy)} position={[1.0, 0.5, 0.75]} />
      <Box size={[0.38, 0.5, 0.38]} radius={0.06} material={mat.plastic(S.green)} position={[-1.6, 0.45, -0.5]} />
    </group>
  );
}
