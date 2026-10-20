"use client";

import { AU, alpha } from "@/lib/design/aurelius";
import { useMemo } from "react";
import * as THREE from "three";
import { custom } from "../materials/materials";
import { memo } from "./geometry";

type V3 = [number, number, number];

/**
 * The LED palette. Why colour and not brightness: the scene sits on a pure white page, and light
 * added to white stays white, so an "added light" glow is invisible there (the reason the previous
 * attempts barely showed). A glow reads on white by its warmth: a near-white core against the dark
 * base, an amber halo, a pale gold spill. On the wood (darker than the light) added light works, so
 * the machine glows are additive.
 */
const LED = { core: AU.cream50, hot: AU.gold400, amber: AU.gold400, spill: AU.gold400, onWood: AU.gold400, bounce: AU.gold200 };

export type Footprint = { at: V3; w: number; d: number; rotY?: number };

/* ── Textures, drawn once ─────────────────────────────────── */

const textures = new Map<string, THREE.CanvasTexture>();
function cachedTexture(key: string, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, w = 512, h = 512) {
  let t = textures.get(key);
  if (!t) {
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    draw(cv.getContext("2d")!, w, h);
    t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    textures.set(key, t);
  }
  return t;
}

/** A soft rounded-rectangle ring, its centre line at 76% of the texture's size; `width` and `blur` in texture pixels. */
const ringRect = (width: number, blur: number) =>
  cachedTexture(`ring-rect-${width}-${blur}`, (g, N) => {
    g.filter = `blur(${blur}px)`;
    g.strokeStyle = AU.cream50;
    g.lineWidth = width;
    g.beginPath();
    g.roundRect(N * 0.12, N * 0.12, N * 0.76, N * 0.76, N * 0.04);
    g.stroke();
  });

/** A soft circular ring, centre line at radius 36% of the texture. */
const ringRound = (width: number, blur: number) =>
  cachedTexture(`ring-round-${width}-${blur}`, (g, N) => {
    g.filter = `blur(${blur}px)`;
    g.strokeStyle = AU.cream50;
    g.lineWidth = width;
    g.beginPath();
    g.arc(N / 2, N / 2, N * 0.36, 0, Math.PI * 2);
    g.stroke();
  });

/** The glow on the base's sides: brightest just under the wooden lip, warming to amber, fading out by the floor. */
const sideBand = () =>
  cachedTexture(
    "side-band-v2",
    (g, w, h) => {
      const grad = g.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, alpha(AU.cream50, 1));
      grad.addColorStop(0.16, alpha(AU.gold200, 1));
      grad.addColorStop(0.3, alpha(AU.gold400, 0.55));
      grad.addColorStop(0.55, alpha(AU.gold400, 0.12));
      grad.addColorStop(1, alpha(AU.gold400, 0));
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
    },
    4,
    128,
  );

const decalMaterial = (key: string, map: THREE.Texture, color: string, opacity: number, additive: boolean) =>
  custom(`factory-glow-${key}`, () => new THREE.MeshBasicMaterial({ map, color, transparent: true, opacity, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false, toneMapped: false }));

/** A flat decal lying on a surface (y up), centred at `at`, `size` across. */
function Decal({ material, at, size, rotY = 0, order = 2 }: { material: THREE.Material; at: V3; size: [number, number]; rotY?: number; order?: number }) {
  return (
    <mesh position={at} rotation={[-Math.PI / 2, 0, rotY]} material={material} renderOrder={order}>
      <planeGeometry args={size} />
    </mesh>
  );
}

/** A thin flat frame lying on a surface: the visible LED core round a footprint. */
function CoreFrame({ w, d, at, rotY = 0, thickness }: { w: number; d: number; at: V3; rotY?: number; thickness: number }) {
  const geo = memo(`factory-core-frame-${w.toFixed(3)}-${d.toFixed(3)}-${thickness}`, () => {
    const rect = (W: number, D: number) => {
      const s = new THREE.Shape();
      s.moveTo(-W / 2, -D / 2);
      s.lineTo(W / 2, -D / 2);
      s.lineTo(W / 2, D / 2);
      s.lineTo(-W / 2, D / 2);
      s.closePath();
      return s;
    };
    const outer = rect(w, d);
    outer.holes.push(new THREE.Path(rect(w - thickness * 2, d - thickness * 2).getPoints()));
    const g = new THREE.ShapeGeometry(outer);
    g.rotateX(-Math.PI / 2);
    return g;
  });
  const material = custom("factory-core", () => new THREE.MeshBasicMaterial({ color: LED.core, toneMapped: false }));
  return <mesh geometry={geo} position={at} rotation={[0, rotY, 0]} material={material} renderOrder={3} />;
}

type Props = {
  /** The wooden board: outer size and the height of its top. */
  board: { size: number; top: number };
  /** The brown base under the board: outer size, bottom edge and the height where the board's underside starts. */
  base?: { size: number; bottom: number; top: number };
  turntable: { at: V3; radius: number };
  /** Machines whose feet glow where they meet the wood. */
  footprints: Footprint[];
};

/**
 * LED underlighting for the content factory, added around the existing scene without moving anything:
 * - Under the wooden board (after the reference: crisp, LED-like, not a wash): a thin near-white core
 *   just under the lip on the base's four sides, a hairline of light on the floor at the base's real
 *   perimeter, a narrow amber halo hugging it, and a short faint spill.
 * - On the platform: each machine has a hairline warm core where it meets the wood and a thin glow
 *   on the wood beside it; the turntable has a lit rim at its foot; a warm bounce light lifts the machines'
 *   lower faces.
 */
export function FactoryGlow({ board, base, turntable, footprints }: Props) {
  const half = base ? base.size / 2 + 0.002 : 0;
  const bandH = base ? base.top - base.bottom : 0;
  const floorY = base ? base.bottom - 0.006 : 0;
  const mats = useMemo(
    () => ({
      band: custom("factory-glow-band-v2", () => new THREE.MeshBasicMaterial({ map: sideBand(), transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide })),
      halo: decalMaterial("halo-v2", ringRect(12, 10), LED.amber, 0.7, false),
      haloCore: decalMaterial("halo-core-v2", ringRect(5, 2), LED.hot, 1, false),
      spill: decalMaterial("spill-v2", ringRect(22, 22), LED.spill, 0.3, false),
      foot: decalMaterial("foot-v2", ringRect(18, 12), LED.onWood, 0.8, true),
      rim: decalMaterial("rim-v2", ringRound(12, 8), LED.onWood, 0.8, true),
    }),
    [],
  );
  // Sizes so a ring texture's centre line (76% across) lands on a given outline, pushed out by `out`.
  const ringSize = (w: number, d: number, out: number): [number, number] => [(w + out * 2) / 0.76, (d + out * 2) / 0.76];
  return (
    <group>
      {/* The base's sides: the LED's light on them, brightest under the wooden lip. */}
      {base && [0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[0, (base.top + base.bottom) / 2, half]} material={mats.band} renderOrder={3}>
            <planeGeometry args={[base.size, bandH]} />
          </mesh>
        </group>
      ))}
      {/* The floor: a tight bright line at the base's edge, the amber halo, and a wide pale spill. */}
      {base && (
        <>
          <Decal material={mats.spill} at={[0, floorY - 0.002, 0]} size={ringSize(base.size, base.size, 0.1)} order={1} />
          <Decal material={mats.halo} at={[0, floorY - 0.001, 0]} size={ringSize(base.size, base.size, 0.035)} order={2} />
          <Decal material={mats.haloCore} at={[0, floorY, 0]} size={ringSize(base.size, base.size, 0.008)} order={2} />
        </>
      )}
      {/* Machines: a thin core where each meets the wood, and its glow over the wood. */}
      {footprints.map((f, i) => (
        <group key={i}>
          <CoreFrame w={f.w + 0.014} d={f.d + 0.014} at={[f.at[0], board.top + 0.004, f.at[2]]} rotY={f.rotY} thickness={0.007} />
          <Decal material={mats.foot} at={[f.at[0], board.top + 0.003, f.at[2]]} size={ringSize(f.w, f.d, 0.03)} rotY={f.rotY} />
        </group>
      ))}
      {/* Turntable: a thin lit rim at its foot, and its glow on the wood. */}
      <mesh position={[turntable.at[0], board.top + 0.008, turntable.at[2]]} rotation={[Math.PI / 2, 0, 0]} material={custom("factory-core", () => new THREE.MeshBasicMaterial({ color: LED.core, toneMapped: false }))}>
        <torusGeometry args={[turntable.radius + 0.006, 0.005, 6, 140]} />
      </mesh>
      <Decal material={mats.rim} at={[turntable.at[0], board.top + 0.004, turntable.at[2]]} size={[(turntable.radius + 0.03) / 0.36, (turntable.radius + 0.03) / 0.36]} />
      {/* Warm light bounced up from the lit wood onto the machines' lower faces. */}
      <pointLight position={[turntable.at[0], board.top + 0.35, turntable.at[2] + 0.9]} color={LED.bounce} intensity={1.4} distance={4} decay={2} />
    </group>
  );
}
