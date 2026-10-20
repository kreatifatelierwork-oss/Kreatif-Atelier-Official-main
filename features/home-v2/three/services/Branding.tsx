"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Box, Limb } from "../artifacts/parts";
import { Bulb, Card, DslrCamera, Label, Monitor, Pedestal, Plinth, Tile, mat } from "./kit";

/** The brand mark being designed: a navy upright and an orange chevron (a "K"), drawn as shapes. */
function KMark({ size = 0.5, position }: { size?: number; position?: [number, number, number] }) {
  return (
    <group position={position} scale={size}>
      <Box size={[0.22, 1, 0.08]} radius={0.04} material={mat.plastic(S.navy)} position={[-0.25, 0, 0]} />
      <Box size={[0.24, 0.62, 0.08]} radius={0.04} material={mat.plastic(S.orange)} position={[0.08, 0.2, 0.01]} rotation={[0, 0, -0.75]} />
      <Box size={[0.24, 0.62, 0.08]} radius={0.04} material={mat.plastic(AU.gold500)} position={[0.1, -0.22, 0.02]} rotation={[0, 0, 0.75]} />
    </group>
  );
}

/** A swatch fan pinned at one corner. */
function Swatches({ position, rotation }: { position?: [number, number, number]; rotation?: [number, number, number] }) {
  const colors = [AU.maroon500, AU.gold500, AU.gold400, AU.maroon400, AU.maroon600, AU.maroon600];
  return (
    <group position={position} rotation={rotation}>
      {colors.map((c, i) => (
        <group key={i} rotation={[0, 0, -0.9 + i * 0.28]} position={[0, 0, i * 0.03]}>
          <Box size={[0.3, 0.9, 0.025]} radius={0.06} material={mat.matte(c)} position={[0, 0.45, 0]} />
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0.2]} material={mat.matte(S.navy)}>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
      </mesh>
    </group>
  );
}

/** Branding & Creative Design: the mark on screen, the brand sheet, swatches, type, a drawing tablet, a camera and an idea. */
export function BrandingArtifact() {
  return (
    <group>
      <Pedestal />
      <Plinth size={[1.3, 0.3, 1.0]} position={[1.1, 0.37, -0.45]} color={S.cream} />
      <Monitor width={1.7} position={[0, 0.22, -0.35]}>
        <Box size={[1.55, 0.95, 0.01]} radius={0.04} material={mat.matte(AU.maroon950)} />
        <Box size={[0.95, 0.78, 0.01]} radius={0.03} material={mat.matte(S.cream)} position={[-0.08, -0.02, 0.01]} />
        <KMark size={0.5} position={[-0.08, -0.02, 0.03]} />
        {[AU.maroon500, AU.gold400, AU.maroon400, AU.maroon500].map((c, i) => (
          <Box key={i} size={[0.16, 0.05, 0.02]} radius={0.02} material={mat.plastic(c)} position={[0.6, 0.25 - i * 0.14, 0.02]} />
        ))}
      </Monitor>
      <Card size={[1.0, 1.3]} position={[-1.25, 1.0, -0.6]} rotation={[0, 0.35, 0]} color={S.cream}>
        <Label text="BRAND" height={0.16} color={S.navy} position={[-0.15, 0.48, 0.01]} weight={900} />
        <KMark size={0.38} position={[-0.15, 0.08, 0.01]} />
        {[S.navy, S.orange, S.creamShade].map((c, i) => (
          <Box key={i} size={[0.18, 0.18, 0.03]} radius={0.03} material={mat.matte(c)} position={[-0.28 + i * 0.22, -0.4, 0.01]} />
        ))}
      </Card>
      <Swatches position={[-1.25, 0.25, 0.45]} rotation={[-0.2, 0.4, 0]} />
      <Tile size={0.45} color={S.cream} position={[-0.45, 0.48, 0.65]} rotation={[0, 0.2, 0]}>
        <Label text="Aa" height={0.24} color={S.navy} weight={900} />
      </Tile>
      {/* Drawing tablet and pen */}
      <Box size={[1.1, 0.06, 0.7]} radius={0.05} material={mat.matte(AU.maroon950)} position={[0.4, 0.26, 0.5]} rotation={[0, -0.1, 0]} />
      <Limb a={[0.2, 0.33, 0.55]} b={[0.65, 0.33, 0.4]} r={0.035} material={mat.matte(AU.maroon950)} />
      <DslrCamera position={[1.4, 0.95, 0.25]} rotation={[0, -0.6, 0]} scale={0.6} />
      <Bulb position={[0.95, 0.52, -0.5]} scale={0.8} />
    </group>
  );
}
