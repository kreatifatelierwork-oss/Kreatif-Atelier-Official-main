"use client";

import { svc as S } from "../materials/palette";
import { Label, Magnifier } from "../services/kit";

/** A magnifying glass with "SEO" in the lens. */
export function SeoMagnifierArtifact() {
  return (
    <group position={[0.25, 1.15, 0]} rotation={[0, -0.3, 0.1]} scale={2.1}>
      <Magnifier ring={S.blue} handle={S.navy} />
      <Label text="SEO" height={0.2} color={S.navy} position={[0, 0, 0.03]} weight={900} />
    </group>
  );
}
