"use client";

import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { config } from "@/lib/config";
import { float } from "@/lib/design/tokens";
import { ContentFactory } from "../three/artifacts/ContentFactory";
import { StudioLighting } from "../three/lighting/StudioLighting";
import { clay } from "../three/materials/materials";
import { AU, LIGHT } from "../three/materials/palette";
import { prefersReducedMotion } from "./pointer";

const PITCH = 20 * (Math.PI / 180);
const FOV = 30;
/** The podium's top, in world units: exactly where the factory's base sits. */
const PODIUM_TOP = -1.634;
const PODIUM_R = 4.3;

/** Frames the factory on its podium: fits its height, and its width on narrow screens. */
function cameraFor(aspect: number): [number, number, number] {
  const half = Math.tan((FOV / 2) * (Math.PI / 180));
  // Fits the factory and the whole podium (its front rim included), with a margin, so nothing is cut.
  const d = Math.max(6.9 / (2 * half), 10.2 / (2 * half * aspect));
  return [0, Math.sin(PITCH) * d - 0.55, Math.cos(PITCH) * d];
}

const REST_YAW = -Math.PI / 4;

/**
 * The factory's slow half-turn: it swings config.factory.swingDeg either side of its resting angle and back,
 * on a sine, so it eases into each turnaround and never spins all the way. It starts at rest (the poster's
 * pose) so the swap from picture to live 3D is seamless. Still for reduced motion.
 */
function SwingingFactory({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  useFrame(({ clock }) => {
    const g = group.current;
    if (!g || still) return;
    start.current ??= clock.elapsedTime;
    const { swingDeg, periodS } = config.factory;
    const t = clock.elapsedTime - start.current;
    g.rotation.y = REST_YAW + Math.sin((t / periodS) * Math.PI * 2) * swingDeg * (Math.PI / 180);
  });
  return (
    <group ref={group} rotation={[0, REST_YAW, 0]} position={[0, -0.35 - (0.17 + 0.07) * 1.2, 0]} scale={1.2}>
      <ContentFactory />
    </group>
  );
}

/** The round cream podium under the factory, rimmed with fine gold light like the reference. */
function Podium() {
  const gold = useMemo(() => new THREE.MeshBasicMaterial({ color: AU.gold400, toneMapped: false }), []);
  const faint = useMemo(() => new THREE.MeshBasicMaterial({ color: AU.gold300, transparent: true, opacity: 0.55, toneMapped: false }), []);
  return (
    <group position={[0, PODIUM_TOP, 0]}>
      <mesh position={[0, -0.18, 0]} material={clay(AU.cream50, { roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.2 })} receiveShadow>
        <cylinderGeometry args={[PODIUM_R, PODIUM_R + 0.05, 0.36, 128]} />
      </mesh>
      <mesh position={[0, 0.002, 0]} rotation={[Math.PI / 2, 0, 0]} material={gold}>
        <torusGeometry args={[PODIUM_R - 0.02, 0.012, 6, 200]} />
      </mesh>
      <mesh position={[0, -0.36, 0]} rotation={[Math.PI / 2, 0, 0]} material={gold}>
        <torusGeometry args={[PODIUM_R + 0.05, 0.01, 6, 200]} />
      </mesh>
      {/* Two faint rings on the floor around it. */}
      {[0.55, 1.15].map((out) => (
        <mesh key={out} position={[0, -0.36, 0]} rotation={[Math.PI / 2, 0, 0]} material={faint}>
          <torusGeometry args={[PODIUM_R + out, 0.006, 4, 200]} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ still }: { still: boolean }) {
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const camera = useMemo(() => cameraFor(aspect), [aspect]);
  return (
    <>
      <PerspectiveCamera makeDefault fov={FOV} position={camera} onUpdate={(c) => c.lookAt(0, -1.15, 0)} />
      <StudioLighting shadow={false} />
      {/* The factory: large and centred, turning slowly half way round and back. */}
      <SwingingFactory still={still} />
      <Podium />
      <ContactShadows position={[0, PODIUM_TOP + 0.004, 0]} opacity={0.3} scale={10} blur={2.4} far={4} resolution={512} color={LIGHT.shadow} />
    </>
  );
}

/**
 * The hero's live 3D: the content factory on its podium, in one canvas. It never takes the pointer (so
 * it cannot block text or buttons), stops drawing off screen, caps the pixel ratio, and holds still
 * for reduced motion. The floating objects around it are light pictures (components/design/FloatingArtifact).
 */
export default function FactoryStage({ onReady }: { onReady?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const still = useMemo(() => prefersReducedMotion(), []);
  // `?poster`: keep the drawing buffer so tests/visual/render-hero-poster.spec.ts can export the canvas itself.
  const poster = useMemo(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("poster"), []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} aria-hidden="true" data-ready={ready || undefined} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--ds-dur-slow)] ease-[var(--ds-ease-out)] data-[ready]:opacity-100">
      <Canvas
        frameloop={!visible ? "never" : still ? "demand" : "always"}
        dpr={[1, float.maxDpr]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: poster }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
          requestAnimationFrame(() => {
            setReady(true);
            onReady?.();
          });
        }}
      >
        <Scene still={still} />
      </Canvas>
    </div>
  );
}
