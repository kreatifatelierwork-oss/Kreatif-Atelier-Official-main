"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { float } from "@/lib/design/tokens";
import { prefersReducedMotion } from "./pointer";

type V3 = [number, number, number];

type Props = {
  /** Where it floats (world units). */
  position: V3;
  /** Fitted size: the artifact is centred and scaled so its largest side is this long. */
  size: number;
  /** 0 (far, barely moves) to 1 (near, moves most). Scales the parallax. */
  depth: number;
  /** Seconds into the idle loop, so neighbours never move in step. */
  phase: number;
  /** A small turn toward the camera, in radians. */
  yaw?: number;
  /** Shown in a glass chip while hovered. */
  label?: string;
  onSelect?: () => void;
  /** Hold the idle drift and the built-in hover (the live hover layer drives its own motion). */
  still?: boolean;
  children: ReactNode;
};

const DEG = Math.PI / 180;
/** Parallax travel at depth 1, in world units (~22px at the hero's scale). */
const TRAVEL = 0.32;
/** Hover tilt at the artifact's edge (degrees): it moves in 3D only while the pointer is on it. */
const HOVER_DEG = 12;

/**
 * Every floating artifact on the site goes through this: it fits the artifact to a size, then adds
 * a seeded idle drift and gentle rotation, and a 3D tilt toward the pointer only while the pointer is
 * over it (no page-wide parallax). Reduced motion holds it still. (emil-design-eng: pointer-driven motion goes through a
 * spring/damper, never straight to the pointer.)
 */
export function FloatingArtifact({ position, size, depth, phase, yaw = 0, label, onSelect, still: holdStill = false, children }: Props) {
  const outer = useRef<THREE.Group>(null);
  const fit = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);
  const still = holdStill || reduced;
  const [hovered, setHovered] = useState(false);

  // Centre and scale the artifact once it has built.
  useLayoutEffect(() => {
    if (!inner.current || !fit.current) return;
    const box = new THREE.Box3().setFromObject(inner.current);
    const dims = box.getSize(new THREE.Vector3());
    const k = size / Math.max(dims.x, dims.y, dims.z, 1e-3);
    const centre = box.getCenter(new THREE.Vector3());
    fit.current.scale.setScalar(k);
    fit.current.position.copy(centre.multiplyScalar(-k));
  }, [size]);

  // Hover tilt: where the pointer is over this artifact (-1..1 each way); zero when it is not.
  const tilt = useRef({ x: 0, y: 0 });
  // A seeded idle loop: period 4–9s and its own phase, so no two artifacts move in step.
  const period = 4 + ((phase * 7.31) % 5);

  useFrame(({ clock }, dt) => {
    const g = outer.current;
    if (!g || still) return;
    const t = clock.elapsedTime + phase;
    const w = (Math.PI * 2) / period;
    const drift = (float.driftPx / 22) * TRAVEL * (0.6 + depth * 0.4);
    easing.damp3(g.position, [position[0], position[1] + Math.sin(t * w) * drift, position[2]], 0.25, dt);
    easing.dampE(
      g.rotation,
      [-tilt.current.y * HOVER_DEG * DEG + Math.sin(t * w * 0.7) * float.driftDeg * DEG, yaw + tilt.current.x * HOVER_DEG * DEG, Math.cos(t * w * 0.6) * float.driftDeg * DEG],
      0.3,
      dt,
    );
    easing.damp3(g.scale, hovered ? 1.04 : 1, 0.15, dt);
  });

  return (
    <group
      ref={outer}
      position={position}
      rotation={[0, yaw, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (onSelect) document.body.style.cursor = "pointer";
      }}
      onPointerMove={(e) => {
        const g = outer.current;
        if (!g) return;
        const local = g.worldToLocal(e.point.clone());
        tilt.current = { x: THREE.MathUtils.clamp(local.x / (size / 2), -1, 1), y: THREE.MathUtils.clamp(local.y / (size / 2), -1, 1) };
      }}
      onPointerOut={() => {
        tilt.current = { x: 0, y: 0 };
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      <group ref={fit}>
        <group ref={inner}>{children}</group>
      </group>
      {label && hovered && (
        <Html center position={[0, -size * 0.62, 0]} zIndexRange={[20, 0]} className="pointer-events-none">
          <span className="glass-frost ds-label block rounded-full px-[var(--ds-space-3)] py-[var(--ds-space-1)] whitespace-nowrap text-ds-text">{label}</span>
        </Html>
      )}
    </group>
  );
}
