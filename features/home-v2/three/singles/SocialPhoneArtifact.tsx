"use client";

import { SocialTile, type SocialId } from "../artifacts/SocialTile";
import { Phone } from "../services/kit";

const APPS: SocialId[] = ["instagram", "youtube", "tiktok", "linkedin"];

/** A phone standing up with four social apps stacked on its screen. */
export function SocialPhoneArtifact() {
  return (
    <Phone height={2.5} position={[0, 1.3, 0]} rotation={[0, -0.3, 0]}>
      {APPS.map((id, i) => (
        <group key={id} position={[0, 0.75 - i * 0.5, 0.03]} scale={0.4}>
          <SocialTile id={id} />
        </group>
      ))}
    </Phone>
  );
}
