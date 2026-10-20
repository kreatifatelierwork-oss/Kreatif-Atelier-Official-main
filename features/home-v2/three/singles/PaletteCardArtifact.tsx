"use client";

import { AU } from "@/lib/design/aurelius";
import { Box } from "../artifacts/parts";
import { Card, mat } from "../services/kit";

const GRID = [AU.maroon600, AU.maroon500, AU.gold500, AU.gold400, AU.maroon950, AU.maroon400, AU.maroon400, AU.gold400, AU.maroon400, AU.maroon500, AU.maroon400, AU.cream200];

/** A colour palette card: a 3 × 4 grid of swatches. */
export function PaletteCardArtifact() {
  return (
    <group position={[0, 1.1, 0]} rotation={[0, -0.3, 0]}>
      <Card size={[1.5, 1.9]}>
        {GRID.map((c, i) => (
          <Box key={i} size={[0.36, 0.36, 0.05]} radius={0.06} material={mat.plastic(c)} position={[-0.42 + (i % 3) * 0.42, 0.63 - Math.floor(i / 3) * 0.42, 0.03]} />
        ))}
      </Card>
    </group>
  );
}
