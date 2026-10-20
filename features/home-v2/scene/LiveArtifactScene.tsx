"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useLive, type LiveKind } from "@/lib/artifacts/live";
import { config } from "@/lib/config";
import { liveEntry, serviceCamera } from "../data/liveRegistry";
import { StudioLighting } from "../three/lighting/StudioLighting";
import { LIGHT } from "../three/materials/palette";
import { FloatingArtifact } from "./FloatingArtifact";

const DEG = Math.PI / 180;
/** The camera's field of view widened so the poster's frame fills 1/pad of the (padded) canvas: same scale, more room. */
const padFov = (fov: number) => (2 * Math.atan(config.artifacts.live.pad * Math.tan((fov * DEG) / 2))) / DEG;
/** How far the contact shadow slides against the tilt (share of the artifact's width), as on the poster. */
const SHADOW_SHIFT = 0.08;

function serviceCameraPosition(): [number, number, number] {
  const { yaw, pitch, distance, target } = serviceCamera;
  const y = yaw * DEG;
  const p = pitch * DEG;
  return [target[0] + Math.sin(y) * Math.cos(p) * distance, target[1] + Math.sin(p) * distance, target[2] + Math.cos(y) * Math.cos(p) * distance];
}

/**
 * Turns the model toward the pointer (up to config.artifacts.live.maxTiltDeg each way), lifts it toward the
 * viewer, and eases it back on leave, all through a damped spring. Writes the poster's shadow offset so the
 * DOM contact shadow slides against the tilt. Reports ready after its first frames.
 */
function Tilt({ children, onReady }: { children: ReactNode; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const frames = useRef(0);
  const { maxTiltDeg, lift, scale, smooth } = config.artifacts.live;
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    // Ready only after a few frames drawn at the canvas's current box size: when the pointer moves from one
    // artifact to the next, the canvas resizes a moment after the new model mounts, and showing it before
    // then flashes the model at the previous artifact's size.
    const box = state.gl.domElement.parentElement?.parentElement?.clientWidth ?? state.size.width;
    if (Math.abs(state.size.width - box) > 1) frames.current = 0;
    else if (++frames.current === 3) onReady();
    const live = useLive.getState();
    const { hovering, target } = live;
    // Outside the artifact the pointer gives a direction only: capped at the edge, so nothing flips round.
    const u = THREE.MathUtils.clamp(live.u, 0, 1);
    const v = THREE.MathUtils.clamp(live.v, 0, 1);
    // Strength falls off with distance from the edge (1 on the artifact).
    const on = hovering ? 1 - Math.min(1, live.dist / config.artifacts.proximityPad) * 0.6 : 0;
    easing.dampE(g.rotation, [on * (v - 0.5) * 2 * maxTiltDeg * DEG, on * (u - 0.5) * 2 * maxTiltDeg * DEG, 0], smooth, dt);
    easing.damp(g.position, "z", on * lift, smooth, dt);
    easing.damp(g.scale, "x", 1 + on * scale, smooth, dt);
    g.scale.y = g.scale.z = g.scale.x;
    if (target) {
      target.el.style.setProperty("--fa-hover", (g.position.z / lift).toFixed(3));
      target.el.style.setProperty("--fa-sx", `${((-g.rotation.y / (maxTiltDeg * DEG)) * SHADOW_SHIFT * 100).toFixed(1)}%`);
    }
  });
  return <group ref={group}>{children}</group>;
}

/** A warm light that follows the pointer, so the highlights travel across the model. */
function PointerLight() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((_, dt) => {
    const l = light.current;
    if (!l) return;
    const { u: lu, v: lv, hovering } = useLive.getState();
    const u = THREE.MathUtils.clamp(lu, -0.15, 1.15);
    const v = THREE.MathUtils.clamp(lv, -0.15, 1.15);
    easing.damp3(l.position, [(u - 0.5) * 6, (0.5 - v) * 6, 4], 0.12, dt);
    easing.damp(l, "intensity", hovering ? 6 : 0, 0.2, dt);
  });
  return <pointLight ref={light} color={LIGHT.keyWarm} intensity={0} distance={14} decay={1.4} />;
}

/** One model with the same camera and lights its poster was rendered with, so the swap is seamless. */
function Model({ kind, slug, onReady }: { kind: LiveKind; slug: string; onReady: () => void }) {
  const entry = liveEntry(kind, slug);
  if (!entry) return null;
  const { Component } = entry;
  return (
    <>
      <StudioLighting shadow={entry.framing === "service"} />
      <PointerLight />
      <Tilt onReady={onReady}>
        {entry.framing === "fitted" ? (
          <FloatingArtifact position={[0, 0, 0]} size={3.6} depth={0} phase={0} yaw={-0.35} still>
            <Component />
          </FloatingArtifact>
        ) : (
          <Component />
        )}
      </Tilt>
    </>
  );
}

/**
 * The one camera, never unmounted: it takes each model's framing (the poster's own camera). A camera per model
 * used to hand control back to the canvas's default wide camera when models were swapped, drawing them too small.
 */
function LiveCamera({ kind, slug }: { kind?: LiveKind; slug?: string }) {
  const service = !!kind && !!slug && liveEntry(kind, slug)?.framing === "service";
  const fov = padFov(service ? serviceCamera.fov : 28);
  const pos = service ? serviceCameraPosition() : ([0, 1.2, 9] as [number, number, number]);
  const target = service ? serviceCamera.target : ([0, 0, 0] as [number, number, number]);
  const cam = useRef<THREE.PerspectiveCamera>(null);
  useEffect(() => {
    const c = cam.current;
    if (!c) return;
    c.fov = fov;
    c.position.set(...pos);
    c.lookAt(...target);
    c.updateProjectionMatrix();
  });
  return <PerspectiveCamera ref={cam} makeDefault fov={fov} position={pos} />;
}

/**
 * The live canvas. It is created once and kept: only the model inside changes from one artifact to the
 * next (no new WebGL context, so nothing flashes), and it stops drawing when there is no model.
 */
export default function LiveArtifactScene({ kind, slug, onReady }: { kind?: LiveKind; slug?: string; onReady: () => void }) {
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const { maxDpr, maxDprTouch } = config.artifacts.live;
  const active = !!kind && !!slug;
  return (
    // Click-through: R3F makes its canvas catch the pointer by default, which would steal the hover from the poster.
    <Canvas
      style={{ pointerEvents: "none" }}
      frameloop={active ? "always" : "never"}
      dpr={[1, touch ? maxDprTouch : maxDpr]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <LiveCamera kind={kind} slug={slug} />
      {active && <Model key={`${kind}:${slug}`} kind={kind} slug={slug} onReady={onReady} />}
    </Canvas>
  );
}
