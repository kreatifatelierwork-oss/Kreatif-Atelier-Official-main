"use client";

import { svc as S } from "../materials/palette";
import { Box, Tube } from "../artifacts/parts";
import { Card, mat } from "../services/kit";

/** Vector drawing: a card with a pen-tool nib, a bezier curve and its square anchor points. */
export function PenToolArtifact() {
  const navy = mat.plastic(S.navy);
  return (
    <group position={[0, 1.1, 0]} rotation={[0, -0.3, 0]}>
      <Card size={[1.7, 1.9]}>
        <Tube points={[[-0.55, -0.1, 0.04], [-0.3, 0.3, 0.04], [0.3, 0.3, 0.04], [0.55, -0.1, 0.04]]} r={0.022} material={mat.plastic(S.blue)} />
        {[-0.55, 0.55].map((x) => (
          <Box key={x} size={[0.12, 0.12, 0.05]} radius={0.02} material={navy} position={[x, -0.1, 0.05]} />
        ))}
        {/* Nib */}
        <group position={[0, -0.25, 0.06]}>
          <mesh rotation={[0, 0, Math.PI]} material={navy}>
            <coneGeometry args={[0.2, 0.5, 4]} />
          </mesh>
          <Box size={[0.3, 0.12, 0.06]} radius={0.03} material={navy} position={[0, 0.3, 0]} />
          <Box size={[0.02, 0.22, 0.03]} radius={0.008} material={mat.card()} position={[0, -0.05, 0.05]} />
        </group>
      </Card>
    </group>
  );
}
