"use client";

import { AU } from "@/lib/design/aurelius";
import { Bulb } from "../services/kit";

/** An idea: a glowing bulb with rays, giving off a little warm light of its own. */
export function LightbulbArtifact() {
  return (
    <group>
      <Bulb position={[0, 0.35, 0]} scale={2.6} />
      <pointLight position={[0, 1.2, 0.4]} color={AU.gold400} intensity={0.8} distance={2.2} decay={2} />
    </group>
  );
}
