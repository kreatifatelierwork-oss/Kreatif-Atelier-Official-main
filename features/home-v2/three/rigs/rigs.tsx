"use client";

import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import type * as THREE from "three";

/** Slow turntable, for judging an artifact from every side. */
export function Turntable({ enabled, speed = 0.35, children }: { enabled: boolean; speed?: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (enabled && ref.current) ref.current.rotation.y += dt * speed;
  });
  return <group ref={ref}>{children}</group>;
}

/** Idle float: a slow bob and sway (about a 5 s loop). `seed` offsets the phase so objects never move in step. */
export function Float({ enabled, seed = 0, amplitude = 0.08, children }: { enabled: boolean; seed?: number; amplitude?: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime + seed * 1.7;
    const target = enabled ? [Math.sin((t * Math.PI * 2) / 5) * amplitude, Math.sin((t * Math.PI * 2) / 7) * 0.06, Math.cos((t * Math.PI * 2) / 6) * 0.05] : [0, 0, 0];
    easing.damp(g.position, "y", target[0], 0.4, dt);
    easing.damp(g.rotation, "z", target[1], 0.6, dt);
    easing.damp(g.rotation, "x", target[2], 0.6, dt);
  });
  return <group ref={ref}>{children}</group>;
}

/**
 * Cursor follow: the object slides a little with the pointer and tilts toward it. `depth` scales the
 * move, so near objects travel further than far ones. Damped, about a quarter of a second.
 */
export function MouseParallax({ enabled, depth = 1, children }: { enabled: boolean; depth?: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, dt) => {
    const g = ref.current;
    if (!g) return;
    const x = enabled ? pointer.x : 0;
    const y = enabled ? pointer.y : 0;
    easing.damp3(g.position, [x * 0.18 * depth, y * 0.12 * depth, 0], 0.25, dt);
    easing.damp(g.rotation, "y", x * 0.22, 0.25, dt);
    easing.damp(g.rotation, "x", -y * 0.16, 0.25, dt);
  });
  return <group ref={ref}>{children}</group>;
}
