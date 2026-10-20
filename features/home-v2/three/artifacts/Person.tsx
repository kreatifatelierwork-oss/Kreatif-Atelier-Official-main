"use client";

import * as THREE from "three";
import { Ball, Limb } from "./parts";

type V3 = [number, number, number];

/**
 * A faceless clay figure built from a sphere head and capsule limbs. Joints are given as points,
 * so one component covers running, sitting and reaching. Head diameter ≈ 0.45 × torso height.
 */
export type Pose = {
  head: V3;
  neck: V3;
  hip: V3;
  armL: [V3, V3, V3];
  armR: [V3, V3, V3];
  legL: [V3, V3, V3];
  legR: [V3, V3, V3];
};

type Props = {
  pose: Pose;
  body: THREE.Material;
  skin?: THREE.Material;
  legs?: THREE.Material;
  hair?: THREE.Material;
  scale?: number;
  headR?: number;
  torsoR?: number;
  limbR?: number;
  /** Direction the face looks, for the hair cap (unit vector, xz plane). */
  facing?: [number, number];
};

export function Person({ pose, body, skin = body, legs = body, hair, headR = 0.19, torsoR = 0.15, limbR = 0.065, facing = [1, 0] }: Props) {
  const legR = limbR * 1.25;
  return (
    <group>
      <Ball r={headR} material={skin} position={pose.head} />
      {hair && (
        // A cap tilted back off the face, so the forehead and face stay skin.
        <group position={pose.head} rotation={[0, Math.atan2(-facing[1], facing[0]), 0]}>
          <mesh material={hair} position={[-0.02, 0.02, 0]} rotation={[0, 0, 0.75]} castShadow>
            <sphereGeometry args={[headR * 1.07, 24, 10, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          </mesh>
        </group>
      )}
      <Limb a={pose.neck} b={pose.hip} r={torsoR} material={body} />
      <Limb a={pose.armL[0]} b={pose.armL[1]} r={limbR} material={body} />
      <Limb a={pose.armL[1]} b={pose.armL[2]} r={limbR} material={body} />
      <Ball r={limbR * 1.35} material={skin} position={pose.armL[2]} />
      <Limb a={pose.armR[0]} b={pose.armR[1]} r={limbR} material={body} />
      <Limb a={pose.armR[1]} b={pose.armR[2]} r={limbR} material={body} />
      <Ball r={limbR * 1.35} material={skin} position={pose.armR[2]} />
      <Limb a={pose.legL[0]} b={pose.legL[1]} r={legR} material={legs} />
      <Limb a={pose.legL[1]} b={pose.legL[2]} r={legR} material={legs} />
      <Limb a={pose.legR[0]} b={pose.legR[1]} r={legR} material={legs} />
      <Limb a={pose.legR[1]} b={pose.legR[2]} r={legR} material={legs} />
    </group>
  );
}
