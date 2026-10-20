"use client";

import { AU } from "@/lib/design/aurelius";
import { svc as S } from "../materials/palette";
import { Bars, CurveArrow } from "../services/kit";

/** Growth: four rising bars (teal, green, blue, orange) under an orange arrow. */
export function GrowthBarsArtifact() {
  return (
    <group rotation={[0, -0.3, 0]}>
      <Bars heights={[0.5, 0.8, 1.2, 1.6]} colors={[AU.maroon400, AU.maroon400, S.blue, S.orange]} width={0.42} gap={0.12} position={[0, 0, 0]} />
      <CurveArrow points={[[-1.0, 0.9, 0.3], [-0.3, 1.25, 0.3], [0.4, 1.6, 0.3], [1.0, 2.15, 0.3]]} color={S.orange} r={0.07} />
    </group>
  );
}
