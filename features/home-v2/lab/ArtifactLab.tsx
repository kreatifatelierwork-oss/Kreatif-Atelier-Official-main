"use client";

import { PerspectiveCamera, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import { artifacts, type ArtifactEntry } from "../three/artifacts";
import { StudioLighting } from "../three/lighting/StudioLighting";
import { Float, MouseParallax } from "../three/rigs/rigs";

const noop = () => () => {};

function cameraPosition(c: ArtifactEntry["camera"]): [number, number, number] {
  const yaw = (c.yaw * Math.PI) / 180;
  const pitch = (c.pitch * Math.PI) / 180;
  const t = c.target ?? [0, 0, 0];
  return [t[0] + Math.sin(yaw) * Math.cos(pitch) * c.distance, t[1] + Math.sin(pitch) * c.distance, t[2] + Math.cos(yaw) * Math.cos(pitch) * c.distance];
}

type Flags = { float: boolean; parallax: boolean };

/** One artifact at its reference camera, with only the two motion rigs: float and mouse parallax. */
function ArtifactScene({ entry, flags }: { entry: ArtifactEntry; flags: Flags }) {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const target = entry.camera.target ?? [0, 0, 0];
  useEffect(() => {
    camera.current?.lookAt(...target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { Component } = entry;
  return (
    <>
      <PerspectiveCamera ref={camera} makeDefault fov={entry.camera.fov} position={cameraPosition(entry.camera)} />
      <StudioLighting shadow />
      <MouseParallax enabled={flags.parallax}>
        <Float enabled={flags.float} seed={entry.id.length}>
          <Component />
        </Float>
      </MouseParallax>
    </>
  );
}

function Card({ entry, snapshot }: { entry: ArtifactEntry; snapshot: boolean }) {
  // Snapshot mode holds still so screenshots compare frame to frame.
  const [flags, setFlags] = useState<Flags>({ float: !snapshot, parallax: !snapshot });
  const toggle = (k: keyof Flags) => setFlags((f) => ({ ...f, [k]: !f[k] }));
  const btn = "rounded-full border border-black/15 px-3 py-1 text-xs aria-pressed:bg-black aria-pressed:text-white";
  return (
    <section data-artifact={entry.id} className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_10px_40px_-20px_rgba(60,45,20,0.25)]">
      <header className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="mr-auto text-lg font-semibold">{entry.name}</h2>
        <button type="button" className={btn} aria-pressed={flags.float} onClick={() => toggle("float")}>Float</button>
        <button type="button" className={btn} aria-pressed={flags.parallax} onClick={() => toggle("parallax")}>Mouse parallax</button>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <View data-render className="aspect-square w-full overflow-hidden rounded-2xl">
          <ArtifactScene entry={entry} flags={flags} />
        </View>
        {entry.ref && (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-ref src={`/lab/refs/${entry.ref}`} alt={`Reference for ${entry.name}`} className="aspect-square w-full rounded-2xl bg-white object-contain" />
        )}
      </div>
    </section>
  );
}

/** The artifact lab: every artifact beside its reference, one shared canvas behind all the cards. */
export function ArtifactLab() {
  const root = useRef<HTMLDivElement>(null!);
  const snapshot = useSyncExternalStore(noop, () => new URLSearchParams(window.location.search).has("snapshot"), () => null);
  if (snapshot === null) return null;
  return (
    <div ref={root} className="relative min-h-screen bg-[#f4f5f7] px-6 py-10 text-[#16181c]">
      <style>{".grain{display:none}"}</style>
      <h1 className="mb-8 text-3xl font-semibold">Artifact lab</h1>
      <div className="mx-auto grid max-w-6xl gap-8">
        {artifacts.map((entry) => (
          <Card key={entry.id} entry={entry} snapshot={snapshot} />
        ))}
      </div>
      <Canvas eventSource={root} className="!fixed inset-0 !pointer-events-none" style={{ position: "fixed", inset: 0 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => (gl.toneMapping = THREE.NeutralToneMapping)}>
        <View.Port />
      </Canvas>
    </div>
  );
}
