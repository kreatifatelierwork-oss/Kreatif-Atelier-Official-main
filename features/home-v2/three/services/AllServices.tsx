"use client";

import { svc as S } from "../materials/palette";
import { Box } from "../artifacts/parts";
import { Ball } from "../artifacts/parts";
import { Bars, Gear, Label, Pedestal, Play, Tile, mat } from "./kit";

/** All Services: an open tray holding a row of app tiles, one per kind of work, with a plant beside it. */
export function AllServicesArtifact() {
  const back: [string, React.ReactNode][] = [
    [S.blue, <Bars key="b" heights={[0.08, 0.13, 0.18]} colors={[S.card]} width={0.05} gap={0.03} depth={0.03} position={[0, -0.09, 0]} />],
    [S.orange, <Label key="m" text="AD" height={0.16} color={S.card} />],
    [S.navy, <Label key="c" text="</>" height={0.15} color={S.card} />],
    [S.green, <Gear key="g" r={0.09} color={S.card} position={[0, 0, -0.01]} />],
  ];
  const front: [string, React.ReactNode][] = [
    [S.red, <Play key="p" size={0.08} position={[0.01, 0, 0]} />],
    [S.blueLight, <Label key="a" text="NEWS" height={0.11} color={S.card} />],
    [S.yellow, <Label key="pc" text="MAIL" height={0.11} color={S.navy} />],
    [S.blue, <Label key="at" text="SEO" height={0.13} color={S.card} />],
  ];
  return (
    <group position={[0.2, 0, 0]}>
      <Pedestal />
      {/* Tray */}
      <Box size={[2.6, 0.8, 1.5]} radius={0.16} material={mat.white()} position={[0.05, 0.66, 0]} />
      {back.map(([c, icon], i) => (
        <Tile key={i} size={0.68} color={c} position={[-0.85 + i * 0.6, 1.55 + (i % 2) * 0.12, -0.3]} rotation={[-0.1, 0, (i - 1.5) * 0.08]}>
          {icon}
        </Tile>
      ))}
      {front.map(([c, icon], i) => (
        <Tile key={i} size={0.68} color={c} position={[-0.75 + i * 0.6, 1.25 - (i % 2) * 0.08, 0.25]} rotation={[-0.16, 0, (1.5 - i) * 0.07]}>
          {icon}
        </Tile>
      ))}
      {/* A 3 × 3 dot grid on the tray front, and a round menu button */}
      {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <Ball key={`${r}${c}`} r={0.045} material={mat.plastic(S.navy)} position={[-0.2 + c * 0.13, 0.8 - r * 0.13, 0.76]} scale={[1, 1, 0.5]} />))}
      <group position={[0.95, 0.55, 0.82]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(S.navy)}>
          <cylinderGeometry args={[0.28, 0.28, 0.16, 40]} />
        </mesh>
        {[0.07, 0, -0.07].map((y) => (
          <Box key={y} size={[0.22, 0.035, 0.02]} radius={0.015} material={mat.card()} position={[0, y, 0.09]} />
        ))}
      </group>
    </group>
  );
}
