"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { SocialTile } from "../artifacts/SocialTile";
import { Box } from "../artifacts/parts";
import { Card, GoogleAds, Label, Lines, Megaphone, MetaMark, Pedestal, Picture, Plinth, SoundLines, Target, Tile, mat } from "./kit";

/** Advertising: an ad on the page, the megaphone, a hit target, and the ad platforms it runs on. */
export function AdvertisingArtifact() {
  return (
    <group>
      <Pedestal />
      <Plinth size={[1.6, 0.35, 0.9]} position={[0.1, 0.37, 0.15]} />
      {/* The ad page */}
      <Card size={[2.0, 1.35]} position={[-0.1, 1.45, -0.65]} bar={S.navy}>
        <Box size={[0.62, 0.5, 0.04]} radius={0.05} material={mat.plastic(S.blue)} position={[-0.55, 0.05, 0.01]} />
        <Label text="AD" height={0.3} color={S.card} position={[-0.55, 0.05, 0.04]} weight={900} />
        <Picture size={[0.95, 0.55]} position={[0.35, 0.05, 0.01]} color={AU.gold600} sky={AU.maroon900} />
        <Box size={[0.5, 0.11, 0.03]} radius={0.05} material={mat.plastic(S.blue)} position={[-0.55, -0.45, 0.01]} />
        <Lines widths={[0.6, 0.45]} position={[0.05, -0.38, 0.01]} gap={0.1} thick={0.035} />
      </Card>
      <Megaphone position={[0.0, 1.05, 0.3]} rotation={[0, 0.3, 0.18]} scale={0.8} />
      <SoundLines position={[0.5, 1.2, 0.1]} rotation={[0, 0.3, 0.18]} />
      <Target position={[1.3, 0.95, 0.45]} rotation={[0, -0.3, 0]} scale={0.75} />
      {/* The platforms */}
      <Tile size={0.5} color={S.card} position={[-1.5, 1.1, -0.1]} rotation={[0, 0.45, 0]}>
        <MetaMark size={0.34} />
      </Tile>
      <Tile size={0.5} color={S.card} position={[-1.15, 0.45, 0.6]} rotation={[0, 0.3, 0]}>
        <GoogleAds scale={0.38} />
      </Tile>
      <group position={[1.45, 1.95, -0.4]} rotation={[0, -0.4, 0]} scale={0.38}>
        <SocialTile id="youtube" />
      </group>
      <Tile size={0.48} color={S.navy} position={[1.0, 0.4, 0.75]} rotation={[0, -0.3, 0]}>
        <Label text="AD" height={0.2} color={S.card} weight={900} />
      </Tile>
    </group>
  );
}
