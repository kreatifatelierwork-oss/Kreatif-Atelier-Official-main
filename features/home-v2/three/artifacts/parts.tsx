"use client";

import { RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type V3 = [number, number, number];

/** A rounded box with a given material. */
export function Box({ size, radius = 0.05, material, position, rotation, smoothness = 2 }: { size: V3; radius?: number; material: THREE.Material; position?: V3; rotation?: V3; smoothness?: number }) {
  return <RoundedBox args={size} radius={Math.min(radius, Math.min(...size) / 2 - 0.001)} smoothness={smoothness} bevelSegments={2} material={material} position={position} rotation={rotation} castShadow receiveShadow />;
}

/** A capsule from point a to point b: limbs, tubes, bars. Ends are rounded, so joints read as clay. */
export function Limb({ a, b, r, material }: { a: V3; b: V3; r: number; material: THREE.Material }) {
  const { position, quaternion, length } = useMemo(() => {
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const dir = vb.clone().sub(va);
    const length = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return { position: va.add(vb).multiplyScalar(0.5), quaternion: q, length };
  }, [a, b]);
  return (
    <mesh position={position} quaternion={quaternion} material={material} castShadow>
      <capsuleGeometry args={[r, Math.max(0.0001, length), 4, 12]} />
    </mesh>
  );
}

export function Ball({ r, material, position, scale }: { r: number; material: THREE.Material; position?: V3; scale?: V3 }) {
  return (
    <mesh position={position} scale={scale} material={material} castShadow>
      <sphereGeometry args={[r, r > 0.15 ? 24 : 12, r > 0.15 ? 16 : 8]} />
    </mesh>
  );
}

/** A smooth tube through points (chart lines, handles). */
export function Tube({ points, r, material, closed = false }: { points: V3[]; r: number; material: THREE.Material; closed?: boolean }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), closed, "catmullrom", 0.05);
    return new THREE.TubeGeometry(curve, points.length * 10, r, 8, closed);
  }, [points, r, closed]);
  return <mesh geometry={geometry} material={material} castShadow />;
}

export function Mesh({ geometry, material, position, rotation, scale }: { geometry: THREE.BufferGeometry; material: THREE.Material | THREE.Material[]; position?: V3; rotation?: V3; scale?: number | V3 }) {
  return <mesh geometry={geometry} material={material} position={position} rotation={rotation} scale={scale} castShadow receiveShadow />;
}
