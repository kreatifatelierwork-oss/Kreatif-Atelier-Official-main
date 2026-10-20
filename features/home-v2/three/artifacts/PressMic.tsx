"use client";

import { clay, glossy, metal } from "../materials/materials";
import { natural as N } from "../materials/palette";
import { Box, Limb } from "./parts";

/** Public Relations: a studio microphone on a short stand beside a folded newspaper. Matte clay, chrome fittings. */
export function PressMic() {
  const black = clay(N.slate, { roughness: 0.5, clearcoat: 0.3 });
  const paper = clay(N.white);
  const head = glossy(N.grey, { metalness: 0.5, roughness: 0.3 });
  const chrome = metal();
  return (
    <group position={[-0.25, 0.05, 0]}>
      {/* Stand */}
      <mesh position={[0, -1.02, 0]} material={black} castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.5, 0.12, 40]} />
      </mesh>
      <Limb a={[0, -0.98, 0]} b={[0, 0.02, 0]} r={0.05} material={black} />
      {/* Yoke holding the head */}
      <mesh position={[0, 0.42, 0]} rotation={[0, 0, Math.PI]} material={chrome} castShadow>
        <torusGeometry args={[0.34, 0.035, 12, 32, Math.PI]} />
      </mesh>
      <Limb a={[0, 0.02, 0]} b={[0, 0.08, 0]} r={0.06} material={chrome} />
      {/* Head: silver capsule, chrome band, three dark grille rings */}
      <mesh position={[0, 0.5, 0]} material={head} castShadow>
        <capsuleGeometry args={[0.26, 0.42, 8, 24]} />
      </mesh>
      <mesh position={[0, 0.42, 0]} material={chrome} castShadow>
        <cylinderGeometry args={[0.275, 0.275, 0.07, 36]} />
      </mesh>
      {[0.62, 0.74, 0.86].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={black}>
          <torusGeometry args={[y > 0.8 ? 0.22 : 0.262, 0.012, 6, 36]} />
        </mesh>
      ))}
      {/* Folded newspaper on the floor */}
      <group position={[0.95, -1.0, 0.35]} rotation={[0, -0.55, 0]}>
        <Box size={[1.05, 0.06, 0.78]} radius={0.025} material={paper} position={[0, 0, 0]} />
        <group position={[0.02, 0.07, -0.02]} rotation={[0, 0.06, 0]}>
          <Box size={[1.0, 0.05, 0.74]} radius={0.022} material={paper} />
          <Box size={[0.78, 0.02, 0.1]} radius={0.01} material={clay(N.greyDark)} position={[-0.06, 0.035, -0.24]} />
          <Box size={[0.36, 0.02, 0.3]} radius={0.01} material={clay(N.blue)} position={[-0.25, 0.035, 0.09]} />
          {[0.0, 0.08, 0.16, 0.24].map((z) => (
            <Box key={z} size={[0.38, 0.015, 0.035]} radius={0.007} material={clay(N.grey)} position={[0.2, 0.033, z - 0.02]} />
          ))}
        </group>
      </group>
    </group>
  );
}
