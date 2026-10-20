"use client";

import { AU } from "@/lib/design/aurelius";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { FRAME_PX } from "./filmTexture";

type Props = {
  texture: THREE.Texture;
  /** How many frames the texture holds. */
  frames: number;
  /** Ribbon height in world units; frame width follows the texture's aspect. */
  height: number;
  /** Ribbon length in world units (longer than the view, so its ends are never seen). */
  length: number;
  /** Frames per second along the strip; negative runs the other way. */
  speed: number;
  /** Shape of the curl: wave amplitude in depth and height, wavelength, a slow twist, and a phase. */
  curl: { depth: number; lift: number; wavelength: number; twist: number; phase: number };
  position: [number, number, number];
  rotation?: [number, number, number];
  segments?: number;
};

/**
 * One strip of film: a procedurally curved ribbon (a gentle 3D wave with a slight twist) carrying
 * the reel texture, with a dark back layer behind it for thickness. The strip moves by sliding the
 * texture along it (offset wraps), so the loop is seamless and nothing re-renders in React.
 */
export function FilmRibbon({ texture, frames, height, length, speed, curl, position, rotation, segments = 260 }: Props) {
  const frameW = height * (FRAME_PX.w / FRAME_PX.h);

  // Each ribbon slides its own copy of the texture, sharing the same pixels.
  const map = useMemo(() => {
    const t = texture.clone();
    t.repeat.set(length / (frameW * frames), 1);
    t.needsUpdate = true;
    return t;
  }, [texture, length, frameW, frames]);

  const [front, back] = useMemo(() => {
    const build = (offset: number) => {
      const pos: number[] = [];
      const uv: number[] = [];
      const idx: number[] = [];
      const k = (Math.PI * 2) / curl.wavelength;
      for (let i = 0; i <= segments; i++) {
        const s = i / segments;
        const x = (s - 0.5) * length;
        const y = Math.sin(x * k * 0.7 + curl.phase) * curl.lift;
        const z = Math.cos(x * k + curl.phase) * curl.depth + offset;
        const theta = Math.sin(x * k * 0.5 + curl.phase) * curl.twist;
        const up = [0, Math.cos(theta) * (height / 2), Math.sin(theta) * (height / 2)];
        pos.push(x, y - up[1], z - up[2], x, y + up[1], z + up[2]);
        uv.push(s, 0, s, 1);
        if (i < segments) {
          const a = i * 2;
          idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      return geo;
    };
    return [build(0), build(-0.035)];
  }, [segments, length, height, curl]);

  const materials = useMemo(
    () => ({
      front: new THREE.MeshPhysicalMaterial({ map, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.28 }),
      // Same pixels, painted near-black: the film's back face and edge, so the strip has thickness.
      back: new THREE.MeshPhysicalMaterial({ map, color: AU.maroon950, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.6 }),
    }),
    [map],
  );

  // The frame loop slides the texture through a ref (the memoised texture itself stays untouched by React).
  const sliding = useRef<THREE.Texture | null>(null);
  useEffect(() => {
    sliding.current = map;
  }, [map]);
  useFrame((_, dt) => {
    const t = sliding.current;
    if (t) t.offset.x = (t.offset.x + (speed / frames) * Math.min(dt, 0.05)) % 1;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={front} material={materials.front} castShadow />
      <mesh geometry={back} material={materials.back} castShadow />
    </group>
  );
}
