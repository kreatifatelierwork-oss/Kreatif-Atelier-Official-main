"use client";

import { svc as S } from "../materials/palette";
import { Mesh } from "../artifacts/parts";
import { Bubble, heartGeometry, mat } from "../services/kit";

/** A red like bubble with a white heart, and a blue chat bubble with three dots below it. */
export function ReactionsArtifact() {
  return (
    <group position={[0, 0.2, 0]} rotation={[0, -0.25, 0]}>
      <Bubble color={S.red} position={[0, 1.55, 0]} scale={1.6}>
        <Mesh geometry={heartGeometry(0.3, 0.05)} material={mat.card()} position={[0, 0.01, 0]} />
      </Bubble>
      <Bubble color={S.blue} position={[0.2, 0.45, 0.25]} scale={1.35} />
    </group>
  );
}
