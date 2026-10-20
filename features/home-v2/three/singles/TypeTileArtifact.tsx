"use client";

import { svc as S } from "../materials/palette";
import { Label, Plinth } from "../services/kit";

/** Layers behind the face, stepping back and down, so the flat letters read as chunky extruded type. */
const DEPTH = 14;

/** Typography: a big extruded navy "Aa" standing on a white step. */
export function TypeTileArtifact() {
  return (
    <group rotation={[0, -0.3, 0]}>
      <Plinth size={[2.0, 0.3, 1.0]} position={[0, 0.15, 0]} />
      <group position={[0, 1.05, 0.1]}>
        {Array.from({ length: DEPTH }, (_, i) => (
          <Label key={i} text="Aa" height={1.35} color={i === DEPTH - 1 ? S.navy : S.navyDeep} weight={900} position={[0, 0, -0.18 + (i / (DEPTH - 1)) * 0.18]} />
        ))}
      </group>
    </group>
  );
}
