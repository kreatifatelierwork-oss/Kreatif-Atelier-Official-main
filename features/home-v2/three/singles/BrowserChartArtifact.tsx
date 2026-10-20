"use client";

import { svc as S } from "../materials/palette";
import { Box } from "../artifacts/parts";
import { Bars, Card, CurveArrow, Lines, Picture, mat } from "../services/kit";

/** A browser window: search bar, a picture, copy lines and a rising chart with an arrow. */
export function BrowserChartArtifact() {
  return (
    <group position={[0, 1.2, 0]} rotation={[0, -0.25, 0]}>
      <Card size={[2.6, 1.9]} bar={S.navy}>
        <group position={[-0.3, 0.55, 0.01]}>
          <Box size={[1.6, 0.18, 0.03]} radius={0.09} material={mat.shade()} />
          <mesh position={[-0.68, 0, 0.03]} material={mat.plastic(S.blue)}>
            <torusGeometry args={[0.04, 0.012, 8, 20]} />
          </mesh>
        </group>
        <Picture size={[0.75, 0.55]} position={[-0.75, 0.0, 0.01]} />
        <Lines widths={[0.5, 0.4, 0.45]} position={[-1.1, -0.45, 0.01]} gap={0.12} thick={0.045} />
        <Bars heights={[0.25, 0.4, 0.55, 0.75]} colors={[S.orange, S.orange, S.blue, S.blue]} width={0.14} gap={0.06} depth={0.06} position={[0.6, -0.75, 0.02]} />
        <CurveArrow points={[[-0.05, -0.35, 0.08], [0.3, -0.15, 0.08], [0.65, 0.05, 0.08], [0.95, 0.35, 0.08]]} color={S.orange} r={0.028} />
      </Card>
    </group>
  );
}
