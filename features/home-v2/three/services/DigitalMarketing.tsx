"use client";

import { svc as S } from "../materials/palette";
import { SocialTile, type SocialId } from "../artifacts/SocialTile";
import { Bars, Bubble, Card, Laptop, Lines, Pedestal, Phone, Picture, Tile, heartGeometry, mat } from "./kit";
import { Box, Limb, Mesh } from "../artifacts/parts";

const PHONE_APPS: SocialId[] = ["instagram", "tiktok", "linkedin", "youtube"];

/** Digital Marketing: a laptop with a campaign dashboard, a phone of social apps, chat, likes, mail and the web. */
export function DigitalMarketingArtifact() {
  return (
    <group>
      <Pedestal />
      <Laptop width={1.6} position={[0.15, 0.2, 0.05]}>
        <Picture size={[0.62, 0.5]} position={[-0.32, 0.08, 0]} />
        <Lines widths={[0.4, 0.3, 0.35]} position={[0.08, 0.22, 0]} gap={0.09} thick={0.035} />
        <Bars heights={[0.12, 0.2, 0.28, 0.36]} colors={[S.blue]} width={0.07} gap={0.04} depth={0.02} position={[0.42, -0.26, 0]} />
      </Laptop>
      {/* Phone with the social apps */}
      <Phone height={1.7} position={[-1.1, 1.05, 0.25]} rotation={[0, 0.35, 0]}>
        {PHONE_APPS.map((id, i) => (
          <group key={id} position={[0, 0.5 - i * 0.33, 0.02]} scale={0.26}>
            <SocialTile id={id} />
          </group>
        ))}
      </Phone>
      {/* Chat, like and mail over the laptop */}
      <Bubble color={S.red} position={[-0.35, 1.75, -0.3]} scale={0.75}>
        <Mesh geometry={heartGeometry(0.3, 0.05)} material={mat.card()} />
      </Bubble>
      <Bubble color={S.blue} position={[0.3, 1.9, -0.35]} scale={0.8} />
      <Tile size={0.42} color={S.navy} position={[0.95, 1.8, -0.3]}>
        <Box size={[0.24, 0.16, 0.02]} radius={0.02} material={mat.card()} />
        <Limb a={[-0.11, 0.07, 0.02]} b={[0, -0.01, 0.02]} r={0.012} material={mat.plastic(S.navy)} />
        <Limb a={[0, -0.01, 0.02]} b={[0.11, 0.07, 0.02]} r={0.012} material={mat.plastic(S.navy)} />
      </Tile>
      {/* The web: a globe tile, and a small stats card */}
      <Tile size={0.5} color={S.card} position={[1.25, 0.75, 0.55]} rotation={[0, -0.3, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(S.blue)}>
          <torusGeometry args={[0.15, 0.025, 10, 32]} />
        </mesh>
        <Box size={[0.3, 0.025, 0.02]} radius={0.01} material={mat.plastic(S.blue)} />
        <Box size={[0.025, 0.3, 0.02]} radius={0.01} material={mat.plastic(S.blue)} />
      </Tile>
      <Card size={[0.6, 0.55]} position={[1.4, 0.48, -0.35]} rotation={[0, -0.3, 0]}>
        <Bars heights={[0.1, 0.17, 0.24, 0.3]} colors={[S.blue]} width={0.06} gap={0.04} depth={0.02} position={[0, -0.18, 0]} />
      </Card>
    </group>
  );
}
