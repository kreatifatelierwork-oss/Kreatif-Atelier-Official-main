"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Ball, Box, Limb } from "../artifacts/parts";
import { Bubble, Card, Label, Lines, Pedestal, Person, Picture, mat } from "./kit";

/** Public Relations: the news page, a reporter's microphone, the people talking, and a press pass. */
export function PublicRelationsArtifact() {
  return (
    <group>
      <Pedestal />
      {/* Newspaper, two pages */}
      <Card size={[1.25, 1.6]} position={[-0.75, 1.1, -0.6]} rotation={[0, 0.2, 0.04]} color={S.shade} />
      <Card size={[1.25, 1.6]} position={[-0.5, 1.1, -0.45]} rotation={[0, 0.2, 0]}>
        <Label text="NEWS" height={0.3} color={S.navy} position={[-0.12, 0.55, 0.01]} weight={900} />
        <Picture size={[0.5, 0.42]} position={[-0.3, 0.06, 0.01]} />
        <Lines widths={[0.4, 0.38, 0.4, 0.3]} position={[0.08, 0.22, 0.01]} gap={0.1} thick={0.035} />
        <Lines widths={[1.0, 0.9, 0.95]} position={[-0.5, -0.38, 0.01]} gap={0.12} thick={0.035} />
      </Card>
      <Bubble color={S.blue} position={[0.35, 2.3, -0.5]} scale={1.1} />
      {/* Handheld microphone with a MEDIA flag */}
      <group position={[-1.45, 0.95, 0.35]} rotation={[0.1, 0.3, 0.32]}>
        <Limb a={[0, -0.6, 0]} b={[0, 0.25, 0]} r={0.09} material={mat.matte(AU.maroon950)} />
        <Ball r={0.26} material={mat.matte(AU.maroon950)} position={[0, 0.48, 0]} />
        <Box size={[0.62, 0.3, 0.34]} radius={0.06} material={mat.plastic(S.blue)} position={[0, 0.12, 0]} />
        <Label text="MEDIA" height={0.13} color={S.card} position={[0, 0.12, 0.18]} />
      </group>
      {/* The people */}
      <Person color={S.navy} position={[-0.25, 0.26, 0.4]} scale={1.0} />
      <Person color={S.blue} position={[0.35, 0.26, 0.55]} scale={0.95} />
      <Bubble color={S.navy} position={[1.0, 1.75, -0.1]} scale={0.7} />
      {/* Press pass on a lanyard */}
      <group position={[1.25, 0.9, 0.4]} rotation={[0, -0.35, -0.08]}>
        <mesh position={[0, 0.55, -0.05]} material={mat.matte(S.navy)}>
          <torusGeometry args={[0.32, 0.03, 10, 40, Math.PI]} />
        </mesh>
        <Card size={[0.8, 1.0]} color={S.card}>
          <Box size={[0.24, 0.06, 0.03]} radius={0.02} material={mat.matte(S.navy)} position={[0, 0.48, 0]} />
          <Label text="PRESS" height={0.17} color={S.navy} position={[0, 0.28, 0.01]} weight={900} />
          <Person color={S.blue} position={[-0.18, -0.25, 0.02]} scale={0.22} />
          <Lines widths={[0.24, 0.2, 0.24]} position={[0.03, -0.05, 0.01]} gap={0.09} thick={0.03} />
        </Card>
      </group>
    </group>
  );
}
