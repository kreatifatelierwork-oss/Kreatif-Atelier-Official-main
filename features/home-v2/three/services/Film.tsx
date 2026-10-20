"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Clapperboard } from "../artifacts/Clapperboard";
import { SocialTile } from "../artifacts/SocialTile";
import { Box } from "../artifacts/parts";
import { DslrCamera, Monitor, Pedestal, Play, mat } from "./kit";

/** A short film strip: dark frame with sprocket holes and two picture frames. */
function FilmFrames({ position, rotation }: { position?: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Box size={[0.7, 1.0, 0.05]} radius={0.04} material={mat.matte(AU.maroon950)} />
      {[-0.42, -0.25, -0.08, 0.08, 0.25, 0.42].flatMap((y) => [-0.29, 0.29].map((x) => <Box key={`${x}${y}`} size={[0.06, 0.08, 0.02]} radius={0.01} material={mat.card()} position={[x, y, 0.03]} />))}
      {[0.22, -0.22].map((y, i) => (
        <Box key={y} size={[0.42, 0.38, 0.02]} radius={0.02} material={mat.matte(i ? AU.maroon500 : AU.maroon400)} position={[0, y, 0.03]} />
      ))}
    </group>
  );
}

/** Film, Video & Photography: the clapper, an editing screen with its timeline, a camera, film and the play button. */
export function FilmArtifact() {
  const timeline = [S.blue, S.orange, AU.maroon500, S.green];
  return (
    <group>
      <Pedestal />
      <Monitor width={1.9} position={[0.35, 0.2, -0.45]}>
        <Box size={[1.75, 1.07, 0.01]} radius={0.04} material={mat.matte(AU.maroon950)} />
        <Box size={[1.1, 0.6, 0.01]} radius={0.03} material={mat.matte(AU.maroon600)} position={[0.15, 0.17, 0.01]} />
        <Box size={[1.1, 0.25, 0.01]} radius={0.03} material={mat.matte(AU.maroon400)} position={[0.15, -0.0, 0.015]} />
        <Play size={0.12} position={[0.17, 0.2, 0.02]} />
        {timeline.map((c, i) => (
          <Box key={i} size={[0.3 + (i % 2) * 0.15, 0.06, 0.02]} radius={0.02} material={mat.plastic(c)} position={[-0.45 + i * 0.36, -0.36, 0.02]} />
        ))}
        {[0.3, 0.15, 0, -0.15].map((y) => (
          <Box key={y} size={[0.25, 0.05, 0.02]} radius={0.02} material={mat.matte(AU.maroon800)} position={[-0.68, y, 0.02]} />
        ))}
      </Monitor>
      <group position={[-1.2, 1.15, -0.2]} rotation={[0, 0.35, 0.05]} scale={0.62}>
        <Clapperboard />
      </group>
      <DslrCamera position={[-0.55, 0.62, 0.5]} rotation={[0, 0.35, 0]} scale={0.8} />
      <FilmFrames position={[1.5, 0.75, 0.2]} rotation={[0, -0.45, 0.08]} />
      <group position={[0.75, 0.42, 0.75]} rotation={[0, -0.3, 0]} scale={0.38}>
        <SocialTile id="youtube" />
      </group>
    </group>
  );
}
