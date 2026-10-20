"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSyncExternalStore, type ComponentType } from "react";
import * as THREE from "three";
import { heroArtifacts } from "../data/heroArtifacts";
import { objectArtifacts } from "../data/pageArtifacts";
import { StudioLighting } from "../three/lighting/StudioLighting";
import { FloatingArtifact } from "../scene/FloatingArtifact";
import { serviceArtifacts, serviceCamera } from "../three/services";

const noop = () => () => {};

function cameraPosition(): [number, number, number] {
  const { yaw, pitch, distance, target } = serviceCamera;
  const y = (yaw * Math.PI) / 180;
  const p = (pitch * Math.PI) / 180;
  return [target[0] + Math.sin(y) * Math.cos(p) * distance, target[1] + Math.sin(p) * distance, target[2] + Math.cos(y) * Math.cos(p) * distance];
}

/**
 * Dev only. `?id=<category>`: a service artifact at the shared service camera. `?hero=<practice slug>`:
 * one of the home hero's floating objects, fitted to the frame. `?obj=<slug>`: any page object
 * (features/home-v2/data/pageArtifacts.tsx), framed the same way. Full window, transparent, ready to
 * screenshot (tests/visual/render-services.spec.ts, render-hero-objects.spec.ts).
 */
export function RenderStage() {
  const params = useSyncExternalStore(noop, () => window.location.search, () => null);
  if (params === null) return null;
  const q = new URLSearchParams(params);
  const id = q.get("id");
  const hero = q.get("hero") ?? q.get("obj");
  let Component: ComponentType | undefined;
  if (id) Component = serviceArtifacts[id]?.Component;
  if (q.get("hero")) Component = heroArtifacts.find((a) => a.slug === hero)?.Component;
  if (q.get("obj")) Component = objectArtifacts[q.get("obj") ?? ""]?.Component;
  if (!Component) return <p>Unknown artifact</p>;
  const key = id ?? hero ?? "";
  return (
    <div data-stage={key} className="fixed inset-0">
      <style>{"html,body{background:transparent!important}.grain,.backdrop,nextjs-portal{display:none!important}"}</style>
      <Canvas dpr={2} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} onCreated={({ gl }) => (gl.toneMapping = THREE.NeutralToneMapping)}>
        {id ? (
          <>
            <PerspectiveCamera makeDefault fov={serviceCamera.fov} position={cameraPosition()} onUpdate={(c) => c.lookAt(...serviceCamera.target)} />
            <StudioLighting />
            <Component />
          </>
        ) : (
          <>
            <PerspectiveCamera makeDefault fov={28} position={[0, 1.2, 9]} onUpdate={(c) => c.lookAt(0, 0, 0)} />
            <StudioLighting shadow={false} />
            {/* Fitted to a fixed size, at rest (the render script emulates reduced motion). */}
            <FloatingArtifact position={[0, 0, 0]} size={3.6} depth={0} phase={0} yaw={-0.35}>
              <Component />
            </FloatingArtifact>
          </>
        )}
      </Canvas>
    </div>
  );
}
