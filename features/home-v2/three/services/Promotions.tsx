"use client";

import { svc as S } from "../materials/palette";
import { GiftBox } from "../artifacts/GiftBox";
import { Box } from "../artifacts/parts";
import { Card, Label, Megaphone, Pedestal, SoundLines, mat } from "./kit";
import * as THREE from "three";
import { extrude, memo, roundedRect } from "../artifacts/geometry";
import { Mesh } from "../artifacts/parts";

/** A price tag with a punched hole. */
function PriceTag({ position, rotation }: { position?: [number, number, number]; rotation?: [number, number, number] }) {
  const geo = memo("svc-price-tag", () => {
    const s = new THREE.Shape();
    s.moveTo(-0.32, -0.42);
    s.lineTo(0.32, -0.42);
    s.lineTo(0.32, 0.2);
    s.lineTo(0, 0.45);
    s.lineTo(-0.32, 0.2);
    s.closePath();
    const h = new THREE.Path();
    h.absarc(0, 0.22, 0.06, 0, Math.PI * 2, true);
    s.holes.push(h);
    return extrude(s, 0.08, 0.04, 3, 12);
  });
  return (
    <group position={position} rotation={rotation}>
      <Mesh geometry={geo} material={mat.plastic(S.red)} />
      <Label text="%" height={0.42} color={S.card} position={[0, -0.12, 0.1]} weight={900} />
    </group>
  );
}

/** A shopping bag with two handles. */
function Bag({ color, position, rotation }: { color: string; position?: [number, number, number]; rotation?: [number, number, number] }) {
  const body = memo("svc-bag", () => extrude(roundedRect(0.6, 0.62, 0.06, 0, 0.31), 0.3, 0.03, 2, 6));
  return (
    <group position={position} rotation={rotation}>
      <Mesh geometry={body} material={mat.plastic(color)} />
      <mesh position={[0, 0.62, 0.08]} material={mat.plastic(S.navy)}>
        <torusGeometry args={[0.14, 0.025, 10, 28, Math.PI]} />
      </mesh>
    </group>
  );
}

/** Promotions: an open gift, a price tag, a megaphone calling out the offer, a bag and a date. */
export function PromotionsArtifact() {
  return (
    <group>
      <Pedestal />
      <group position={[-0.3, 0.95, -0.2]} scale={1.05}>
        <GiftBox />
      </group>
      <PriceTag position={[-1.3, 1.0, 0.45]} rotation={[0, 0.3, 0.25]} />
      <Megaphone position={[0.85, 1.4, -0.3]} rotation={[0, 0.3, 0.25]} scale={0.7} rim={S.navy} bell={S.blue} />
      <SoundLines color={S.orange} position={[1.25, 1.62, -0.42]} rotation={[0, 0.3, 0.25]} />
      <Bag color={S.orange} position={[1.25, 0.2, 0.55]} rotation={[0, -0.4, 0]} />
      <Card size={[0.62, 0.62]} position={[0.35, 0.52, 0.65]} rotation={[0, -0.15, 0]}>
        <Box size={[0.62, 0.14, 0.03]} radius={0.04} material={mat.plastic(S.blue)} position={[0, 0.24, 0]} />
        <Label text="★" height={0.3} color={S.orange} position={[0, -0.05, 0.01]} />
      </Card>
    </group>
  );
}
