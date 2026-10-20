"use client";

import * as THREE from "three";
import { clay, glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { arrowShape, extrude, memo, roundedRect } from "./geometry";
import { Box, Mesh } from "./parts";
import { Person, type Pose } from "./Person";

/** ref-growth-runner.png: a chunky glossy figure leaping a lavender block beside a tall red arrow with a gold head. */
const RUN: Pose = {
  head: [0.32, 1.17, 0],
  neck: [0.18, 0.89, 0],
  hip: [-0.04, 0.52, 0],
  armR: [[0.2, 0.84, 0.2], [0.44, 0.78, 0.27], [0.64, 1.0, 0.27]],
  armL: [[0.12, 0.84, -0.2], [-0.16, 0.66, -0.25], [-0.44, 0.6, -0.25]],
  legR: [[0.03, 0.47, 0.11], [0.42, 0.5, 0.13], [0.44, 0.15, 0.13]],
  legL: [[-0.09, 0.47, -0.11], [-0.38, 0.28, -0.11], [-0.8, 0.3, -0.11]],
};

export function GrowthRunner() {
  // Red shaft with a gold head: the head is the arrow's own outline with the shaft cut away.
  const shaft = memo("growth-shaft", () => extrude(roundedRect(0.3, 1.37, 0.02, 0, 0.685), 0.26, 0.05, 4));
  const head = memo("growth-head", () => {
    const s = arrowShape(0.3, 1.85, 0.7, 0.48);
    const pts = s.getPoints().filter((p) => p.y >= 1.37 - 1e-6);
    return extrude(new THREE.Shape(pts), 0.26, 0.05, 4);
  });
  return (
    <group position={[-0.2, -0.1, 0]}>
      <Box size={[1.55, 0.95, 0.42]} radius={0.09} material={clay(palette.growth.block)} position={[-0.05, -0.55, 0]} />
      <group position={[1.02, -1.02, -0.18]} rotation={[0, -0.25, 0]}>
        <Mesh geometry={shaft} material={clay(palette.growth.arrow, { roughness: 0.45, clearcoat: 0.35 })} />
        <Mesh geometry={head} material={clay(palette.growth.tip)} />
      </group>
      <group position={[-0.25, -0.1, 0.12]} scale={1.1}>
        <Person pose={RUN} body={glossy(palette.growth.figure, { roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.2 })} headR={0.25} torsoR={0.21} limbR={0.095} />
      </group>
    </group>
  );
}
