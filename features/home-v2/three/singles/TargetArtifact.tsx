"use client";

import { Target } from "../services/kit";

/** A target with an arrow in the bullseye. */
export function TargetArtifact() {
  return <Target position={[0, 1.0, 0]} rotation={[0, -0.35, 0]} scale={1.5} />;
}
