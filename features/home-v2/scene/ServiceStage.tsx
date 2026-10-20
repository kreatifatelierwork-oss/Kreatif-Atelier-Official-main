"use client";

import { LIGHT } from "../three/materials/palette";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { float } from "@/lib/design/tokens";
import { StudioLighting } from "../three/lighting/StudioLighting";
import { serviceArtifacts } from "../three/services";
import { FloatingArtifact } from "./FloatingArtifact";
import { prefersReducedMotion } from "./pointer";

/**
 * One practice's 3D artifact, floating on the page surface with the shared idle drift and mouse
 * parallax. Stops drawing out of view; holds still for reduced motion. Decorative.
 */
export default function ServiceStage({ slug, onReady }: { slug: string; onReady?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const still = useMemo(() => prefersReducedMotion(), []);
  const entry = serviceArtifacts[slug];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!entry) return null;
  const { Component } = entry;
  return (
    <div ref={box} aria-hidden="true" data-ready={ready || undefined} className="absolute inset-0 opacity-0 transition-opacity duration-[var(--ds-dur-slow)] ease-[var(--ds-ease-out)] data-[ready]:opacity-100">
      <Canvas
        frameloop={!visible ? "never" : still ? "demand" : "always"}
        dpr={[1, float.maxDpr]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
          requestAnimationFrame(() => {
            setReady(true);
            onReady?.();
          });
        }}
      >
        <PerspectiveCamera makeDefault fov={30} position={[0, 2.2, 9.2]} onUpdate={(c) => c.lookAt(0, 0.1, 0)} />
        <StudioLighting shadow={false} />
        <FloatingArtifact position={[0, 0.45, 0]} size={3.8} depth={1} phase={0} yaw={-0.35}>
          <Component />
        </FloatingArtifact>
        <ContactShadows position={[0, -1.55, 0]} opacity={0.3} scale={8} blur={2.6} far={3} resolution={512} color={LIGHT.shadow} />
      </Canvas>
    </div>
  );
}
