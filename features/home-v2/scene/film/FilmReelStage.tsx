"use client";

import { AU } from "@/lib/design/aurelius";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { filmReel } from "@/content/home";
import { prefersReducedMotion } from "../pointer";
import { createFilmTexture } from "./filmTexture";
import { FilmRibbon } from "./FilmRibbon";

/** Film speed in frames per second: slow and deliberate. */
const SPEED = 0.3;
/** Both strips tilt up to the right by this much (radians), so they are not dead horizontal. */
const SLANT = 0.06;

/** Frames the reel: most of the width on wide screens, a readable few frames on phones. */
function ReelCamera() {
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const half = Math.tan((30 / 2) * (Math.PI / 180));
  const wide = aspect >= 1.4;
  const span = wide ? 14 : 3.9;
  const d = Math.max(6, span / (2 * half * aspect));
  return <PerspectiveCamera makeDefault fov={30} position={[0, 0.5, d]} onUpdate={(c) => c.lookAt(0, 0, 0)} />;
}

function Reel({ progress, still }: { progress: MutableRefObject<number>; still: boolean }) {
  const narrow = useThree((s) => s.size.width < 700);
  const group = useRef<THREE.Group>(null);
  const { texture, redraw } = useMemo(() => createFilmTexture(filmReel.services), []);
  useEffect(() => {
    document.fonts?.ready.then(redraw);
  }, [redraw]);

  // Restrained depth: the reel tilts a little with the section's scroll progress (no pointer tracking).
  useFrame((_, dt) => {
    if (!group.current || still) return;
    const p = progress.current - 0.5;
    easing.dampE(group.current.rotation, [-0.06 + p * 0.12, 0, 0], 0.4, dt);
  });

  const speed = still ? 0 : SPEED;
  const height = narrow ? 1.05 : 1.1;
  const length = narrow ? 10 : 24;
  return (
    <group ref={group}>
      {/* Two separate strips, both slanting gently up to the right, in counter-motion. */}
      <FilmRibbon
        texture={texture}
        frames={filmReel.services.length}
        height={height}
        length={length}
        speed={speed}
        curl={{ depth: 0.45, lift: 0.14, wavelength: narrow ? 7 : 12, twist: 0.14, phase: 0 }}
        position={[0, narrow ? 0.82 : 0.8, 0.2]}
        rotation={[0, 0, SLANT]}
        segments={narrow ? 140 : 260}
      />
      <FilmRibbon
        texture={texture}
        frames={filmReel.services.length}
        height={height}
        length={length}
        speed={-speed}
        curl={{ depth: 0.55, lift: 0.14, wavelength: narrow ? 8 : 13, twist: -0.16, phase: 2.1 }}
        position={[narrow ? 0.3 : 0.5, narrow ? -0.82 : -0.78, -0.25]}
        rotation={[0, 0, SLANT * 0.8]}
        segments={narrow ? 140 : 260}
      />
      {/* An invisible wall behind the reel that only shows the strips' soft shadows. */}
      <mesh position={[0, 0, -2.4]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

/**
 * The home page's film reel, in one canvas: two separate strips of film, slanting slightly and moving
 * in opposite directions, text only. Draws only while on screen; reduced motion shows the strips at rest.
 */
export default function FilmReelStage() {
  const box = useRef<HTMLDivElement>(null);
  const progress = useRef(0.5);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const still = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "1200px 0px" });
    io.observe(el);
    // Scroll progress through the section (0 entering, 1 leaving), sampled outside the render loop.
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      progress.current = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={box} aria-hidden="true" data-ready={ready || undefined} className="absolute inset-0 opacity-0 transition-opacity duration-[var(--ds-dur-slow)] ease-[var(--ds-ease-out)] data-[ready]:opacity-100">
      <Canvas
        shadows="variance"
        frameloop={!visible ? "never" : still ? "demand" : "always"}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
          requestAnimationFrame(() => setReady(true));
        }}
      >
        <ReelCamera />
        <ambientLight intensity={1.1} />
        <hemisphereLight args={[AU.cream50, AU.cream200, 0.8]} />
        <directionalLight position={[-3, 5, 7]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-radius={14} shadow-blurSamples={16} shadow-bias={-0.0004}>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 4, -4, 0.5, 30]} />
        </directionalLight>
        <directionalLight position={[6, -2, 4]} intensity={0.45} color={AU.cream50} />
        <Reel progress={progress} still={still} />
      </Canvas>
    </div>
  );
}
