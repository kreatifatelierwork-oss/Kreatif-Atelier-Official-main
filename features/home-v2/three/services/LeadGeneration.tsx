"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box, Limb } from "../artifacts/parts";
import { Bars, Card, CurveArrow, Funnel, Label, Lines, Pedestal, Person, Tile, mat } from "./kit";

/** A round avatar badge: a coloured disc with a white person on it. */
function Avatar({ color, position }: { color: string; position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(color)}>
        <cylinderGeometry args={[0.24, 0.24, 0.1, 36]} />
      </mesh>
      <Person color={S.card} position={[0, -0.13, 0.06]} scale={0.2} />
    </group>
  );
}

/** Lead Generation & Growth: prospects dropping into a funnel, the CRM, mail, and growth climbing. */
export function LeadGenerationArtifact() {
  return (
    <group>
      <Pedestal />
      <Funnel position={[-0.3, 0.25, 0]} scale={1.05} />
      <Avatar color={S.blue} position={[-0.75, 1.75, -0.1]} />
      <Avatar color={AU.maroon500} position={[-0.25, 2.05, 0.0]} />
      <Avatar color={S.blueLight} position={[0.25, 1.8, -0.15]} />
      {/* CRM card */}
      <Card size={[0.95, 1.1]} position={[-1.45, 0.85, 0.25]} rotation={[0, 0.4, 0]}>
        <Label text="CRM" height={0.2} color={S.navy} position={[-0.15, 0.38, 0.01]} weight={900} />
        <Person color={S.blue} position={[-0.25, -0.1, 0.02]} scale={0.24} />
        <Lines widths={[0.3, 0.24, 0.3]} position={[0.0, 0.08, 0.01]} gap={0.1} thick={0.035} />
      </Card>
      {/* Growth */}
      <Bars heights={[0.45, 0.65, 0.85, 1.1]} colors={[S.blue, AU.maroon600, S.blue, S.orange]} width={0.2} gap={0.07} position={[1.05, 0.2, -0.3]} />
      <CurveArrow points={[[0.4, 0.9, 0.0], [0.8, 1.1, 0.0], [1.2, 1.45, -0.1], [1.55, 1.95, -0.2]]} color={S.green} r={0.05} />
      <Tile size={0.48} color={S.card} position={[1.3, 0.5, 0.65]} rotation={[0, -0.3, 0]}>
        <Box size={[0.26, 0.18, 0.02]} radius={0.02} material={mat.plastic(S.blue)} />
        <Limb a={[-0.12, 0.07, 0.02]} b={[0, -0.01, 0.02]} r={0.014} material={mat.card()} />
        <Limb a={[0, -0.01, 0.02]} b={[0.12, 0.07, 0.02]} r={0.014} material={mat.card()} />
      </Tile>
      {/* Lead magnet: an orange target disc */}
      <group position={[0.35, 0.45, 0.75]}>
        {[
          [0.26, S.orange],
          [0.17, S.card],
          [0.08, S.orange],
        ].map(([r, c], i) => (
          <mesh key={i} position={[0, 0, (i as number) * 0.03]} rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(c as string)}>
            <cylinderGeometry args={[r as number, r as number, 0.1, 36]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
