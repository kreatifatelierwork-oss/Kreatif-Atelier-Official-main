"use client";

import { svc as S } from "../materials/palette";
import { Megaphone, SoundLines } from "../services/kit";

/** A megaphone side-on: white body, blue rim, orange bell, sound lines at the mouth. */
export function MegaphoneArtifact() {
  return (
    <group position={[-0.2, 1.0, 0]} rotation={[0, 0.25, 0.22]} scale={1.3}>
      <Megaphone rim={S.blue} />
      <SoundLines position={[0.58, 0, 0]} />
    </group>
  );
}
