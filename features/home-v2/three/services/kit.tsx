"use client";

import { AU } from "@/lib/design/aurelius";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as THREE from "three";
import { clay, custom, glossy, metal } from "../materials/materials";
import { BRAND, palette, svc as S } from "../materials/palette";
import { gGeometry } from "../artifacts/GoogleCluster";
import { extrude, gearShape, memo, ringSector, roundedRect, roundedTriangle, svgShapes } from "../artifacts/geometry";
import { glyphPaths } from "../artifacts/glyphPaths";
import { Ball, Box, Limb, Mesh, Tube } from "../artifacts/parts";

/**
 * The parts every service artifact is built from, in one shared style: soft white plinths and
 * cards, navy and blue plastics, chunky rounded objects. Materials are cached and shared.
 */
export type V3 = [number, number, number];

export const mat = {
  // Satin finish: soft, slightly lacquered, so whites read clean and premium rather than chalky.
  white: () => clay(S.white, { roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.2 }),
  card: () => clay(S.card, { roughness: 0.3, clearcoat: 0.85, clearcoatRoughness: 0.18 }),
  shade: () => clay(S.shade, { roughness: 0.5 }),
  line: () => clay(S.line, { roughness: 0.5 }),
  plastic: (c: string) => glossy(c, { roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08 }),
  matte: (c: string) => clay(c, { roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.2 }),
};

const D = Math.PI / 180;

/* ------------------------------------------------------------------ text */

/** The body font the site loads (next/font), with system fallbacks. */
function fontFamily() {
  const v = typeof document !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue("--font-manrope").trim() : "";
  return `${v ? `${v}, ` : ""}"Helvetica Neue", Arial, sans-serif`;
}

/**
 * Words printed on a card ("NEWS", "AD", "PRESS"): a transparent canvas texture on a plane. Drawn
 * once per text and colour, and redrawn when the web font finishes loading.
 */
export function Label({ text, height, color = S.navy, weight = 800, position, rotation, align = "center" }: { text: string; height: number; color?: string; weight?: number; position?: V3; rotation?: V3; align?: "center" | "left" }) {
  const { material, aspect, draw } = useMemo(() => {
    const H = 160;
    const cv = document.createElement("canvas");
    const ctx = cv.getContext("2d")!;
    const font = () => `${weight} ${H * 0.78}px ${fontFamily()}`;
    ctx.font = font();
    const W = Math.ceil(ctx.measureText(text).width + H * 0.2);
    cv.width = W;
    cv.height = H;
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.font = font();
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";
      ctx.textAlign = align;
      ctx.fillText(text, align === "center" ? W / 2 : H * 0.1, H * 0.54);
      tex.needsUpdate = true;
    };
    draw();
    const material = custom(`label-${text}-${color}-${weight}-${align}`, () => new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false }));
    return { material, aspect: W / H, draw };
  }, [text, color, weight, align]);
  useEffect(() => {
    document.fonts?.ready.then(draw);
  }, [draw]);
  const w = height * aspect;
  return (
    <mesh position={position} rotation={rotation} material={material}>
      <planeGeometry args={[w, height]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ building blocks */

/** The base every service scene stands on: a thick, warm-white round pedestal. */
export function Pedestal() {
  return (
    <mesh position={[0, 0.13, 0]} material={clay(AU.cream50, { roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.25 })} receiveShadow>
      <cylinderGeometry args={[1.75, 1.8, 0.26, 96]} />
    </mesh>
  );
}

/** A soft white plinth or step. */
export const Plinth = ({ size, position, color }: { size: V3; position: V3; color?: string }) => <Box size={size} radius={0.08} material={color ? mat.matte(color) : mat.white()} position={position} />;

/** Grey text lines on a card face (local z = face). */
export function Lines({ widths, position, gap = 0.12, thick = 0.045, color = S.line }: { widths: number[]; position: V3; gap?: number; thick?: number; color?: string }) {
  return (
    <group position={position}>
      {widths.map((w, i) => (
        <Box key={i} size={[w, thick, 0.02]} radius={thick / 2 - 0.001} material={clay(color)} position={[w / 2, -i * gap, 0]} />
      ))}
    </group>
  );
}

/** A rounded card standing up, its face toward +z. `bar` adds a coloured title bar with three dots. */
export function Card({ size, position, rotation, color = S.card, bar, children }: { size: [number, number]; position?: V3; rotation?: V3; color?: string; bar?: string; children?: React.ReactNode }) {
  const [w, h] = size;
  const geo = memo(`svc-card-${w}-${h}`, () => extrude(roundedRect(w, h, Math.min(w, h) * 0.08), 0.06, 0.025, 2, 6));
  const front = 0.06;
  return (
    <group position={position} rotation={rotation}>
      <Mesh geometry={geo} material={mat.matte(color)} />
      {bar && (
        <group position={[0, h / 2 - 0.11, front]}>
          <Box size={[w - 0.02, 0.2, 0.03]} radius={0.06} material={mat.matte(bar)} />
          {[S.red, S.yellow, S.green].map((c, i) => (
            <Ball key={i} r={0.03} material={mat.plastic(c)} position={[-w / 2 + 0.14 + i * 0.09, 0, 0.025]} scale={[1, 1, 0.5]} />
          ))}
        </group>
      )}
      <group position={[0, 0, front]}>{children}</group>
    </group>
  );
}

/** A picture tile: a framed landscape with mountains and a sun. */
export function Picture({ size, position, color = S.blueLight, sky = S.sky }: { size: [number, number]; position?: V3; color?: string; sky?: string }) {
  const [w, h] = size;
  return (
    <group position={position}>
      <Box size={[w, h, 0.03]} radius={0.03} material={mat.matte(sky)} />
      <mesh position={[-w * 0.12, -h * 0.12, 0.02]} material={mat.matte(color)}>
        <coneGeometry args={[h * 0.42, h * 0.52, 3]} />
      </mesh>
      <mesh position={[w * 0.18, -h * 0.2, 0.025]} material={mat.matte(S.blue)}>
        <coneGeometry args={[h * 0.3, h * 0.36, 3]} />
      </mesh>
      <Ball r={h * 0.1} material={mat.plastic(S.orange)} position={[w * 0.26, h * 0.22, 0.03]} scale={[1, 1, 0.5]} />
    </group>
  );
}

/** Upright bars of the given heights, standing on y = 0. */
export function Bars({ heights, colors, width = 0.16, gap = 0.06, depth, position, rotation }: { heights: number[]; colors: string[]; width?: number; gap?: number; depth?: number; position?: V3; rotation?: V3 }) {
  const span = heights.length * width + (heights.length - 1) * gap;
  return (
    <group position={position} rotation={rotation}>
      {heights.map((h, i) => (
        <Box key={i} size={[width, h, depth ?? width]} radius={Math.min(0.03, width / 4)} material={mat.plastic(colors[i % colors.length])} position={[-span / 2 + width / 2 + i * (width + gap), h / 2, 0]} />
      ))}
    </group>
  );
}

/** A donut chart lying in its local xy plane; parts run anticlockwise from `start` degrees. */
export function Donut({ r = 0.32, inner = 0.15, depth = 0.12, parts, start = 90, position, rotation }: { r?: number; inner?: number; depth?: number; parts: [number, string][]; start?: number; position?: V3; rotation?: V3 }) {
  const starts = parts.map((_, i) => start + parts.slice(0, i).reduce((sum, [deg]) => sum + deg, 0));
  return (
    <group position={position} rotation={rotation}>
      {parts.map(([deg, c], i) => {
        const a0 = starts[i];
        return <Mesh key={`${a0}`} geometry={memo(`svc-donut-${r}-${inner}-${depth}-${a0}-${deg}`, () => extrude(ringSector(inner, r, (a0 + 1.5) * D, (a0 + deg - 1.5) * D), depth, 0.02, 2, 16))} material={mat.plastic(c)} />;
      })}
    </group>
  );
}

/** A rising curved arrow: a tube through the points and a cone at the end, pointing along the last segment. */
export function CurveArrow({ points, r = 0.035, color, position }: { points: V3[]; r?: number; color: string; position?: V3 }) {
  const { tip, q } = useMemo(() => {
    const a = new THREE.Vector3(...points[points.length - 2]);
    const b = new THREE.Vector3(...points[points.length - 1]);
    const dir = b.clone().sub(a).normalize();
    return { tip: b, q: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir) };
  }, [points]);
  return (
    <group position={position}>
      <Tube points={points} r={r} material={mat.plastic(color)} />
      <mesh position={tip} quaternion={q} material={mat.plastic(color)}>
        <coneGeometry args={[r * 2.6, r * 4.5, 24]} />
      </mesh>
    </group>
  );
}

/** A small rounded icon tile with something on its face. */
export function Tile({ size = 0.42, color = S.card, position, rotation, children }: { size?: number; color?: string; position?: V3; rotation?: V3; children?: React.ReactNode }) {
  const geo = memo(`svc-tile-${size}`, () => extrude(roundedRect(size, size, size * 0.22), size * 0.22, size * 0.05, 3, 8));
  return (
    <group position={position} rotation={rotation}>
      <Mesh geometry={geo} material={mat.plastic(color)} />
      <group position={[0, 0, size * 0.17]}>{children}</group>
    </group>
  );
}

/** A play triangle, flat on a face. */
export const Play = ({ size = 0.1, color = S.card, position }: { size?: number; color?: string; position?: V3 }) => (
  <Mesh geometry={memo(`svc-play-${size}`, () => extrude(roundedTriangle(size, size * 0.18), size * 0.3, size * 0.08, 2))} material={mat.plastic(color)} position={position} />
);

/* ------------------------------------------------------------------ objects */

/** A megaphone pointing along +x: white body, navy rim, orange bell and handle. */
export function Megaphone({ body = S.card, rim = S.navy, bell = S.orange, position, rotation, scale = 1 }: { body?: string; rim?: string; bell?: string; position?: V3; rotation?: V3; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh rotation={[0, 0, -Math.PI / 2]} material={glossy(body, { roughness: 0.28, side: THREE.DoubleSide })} castShadow>
        <cylinderGeometry args={[0.55, 0.22, 0.95, 40, 1, true]} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 2]} position={[-0.02, 0, 0]} material={glossy(bell, { roughness: 0.28, side: THREE.BackSide })}>
        <cylinderGeometry args={[0.53, 0.2, 0.92, 40, 1, true]} />
      </mesh>
      <mesh position={[0.48, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={mat.plastic(rim)}>
        <torusGeometry args={[0.55, 0.06, 14, 48]} />
      </mesh>
      <mesh position={[0.25, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={mat.plastic(bell)}>
        <cylinderGeometry args={[0.16, 0.16, 0.35, 24]} />
      </mesh>
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={mat.plastic(rim)}>
        <cylinderGeometry args={[0.26, 0.24, 0.22, 32]} />
      </mesh>
      <mesh position={[-0.7, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={mat.plastic(bell)}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 28]} />
      </mesh>
      <Box size={[0.18, 0.45, 0.16]} radius={0.06} material={mat.plastic(rim)} position={[-0.38, -0.32, 0]} rotation={[0, 0, 0.15]} />
    </group>
  );
}

/** Three sound lines fanning out from a megaphone's mouth (local +x). */
export function SoundLines({ color = S.orange, position, rotation }: { color?: string; position?: V3; rotation?: V3 }) {
  return (
    <group position={position} rotation={rotation}>
      {[-0.45, 0, 0.45].map((a) => (
        <group key={a} rotation={[0, 0, a]}>
          <Limb a={[0.15, 0, 0]} b={[0.42, 0, 0]} r={0.045} material={mat.plastic(color)} />
        </group>
      ))}
    </group>
  );
}

/** A target with an arrow in the bullseye. Face toward +z. */
export function Target({ position, rotation, scale = 1 }: { position?: V3; rotation?: V3; scale?: number }) {
  const rings: [number, string][] = [
    [0.6, S.red],
    [0.46, S.card],
    [0.32, S.red],
    [0.18, S.card],
    [0.08, S.red],
  ];
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {rings.map(([r, c], i) => (
        <mesh key={r} position={[0, 0, i * 0.025]} rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(c)}>
          <cylinderGeometry args={[r, r, 0.16, 48]} />
        </mesh>
      ))}
      <group position={[0, 0, 0.2]} rotation={[-0.5, 0.55, 0]}>
        <Limb a={[0, 0, 0]} b={[0, 0, 0.75]} r={0.025} material={mat.plastic(S.navy)} />
        <mesh position={[0, 0, -0.02]} rotation={[-Math.PI / 2, 0, 0]} material={mat.plastic(S.orange)}>
          <coneGeometry args={[0.05, 0.12, 16]} />
        </mesh>
        {[0, 1, 2].map((k) => (
          <Box key={k} size={[0.02, 0.14, 0.16]} radius={0.008} material={mat.plastic(S.blue)} position={[0, 0, 0.7]} rotation={[0, 0, (k * Math.PI) / 3]} />
        ))}
      </group>
    </group>
  );
}

/** Keyboard keys as one instanced mesh: `cols` × `rows` small rounded caps in a grid. */
function Keys({ width, depth, cols = 13, rows = 5 }: { width: number; depth: number; cols?: number; rows?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const gap = width * 0.012;
  const kw = (width - gap * (cols + 1)) / cols;
  const kd = (depth - gap * (rows + 1)) / rows;
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    let i = 0;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        // The bottom row has a long space bar in the middle.
        const space = r === rows - 1 && c >= 4 && c <= 8;
        if (space && c !== 6) continue;
        const sx = space ? (kw + gap) * 5 - gap : kw;
        m.compose(new THREE.Vector3(-width / 2 + gap + kw / 2 + c * (kw + gap), 0, -depth / 2 + gap + kd / 2 + r * (kd + gap)), new THREE.Quaternion(), new THREE.Vector3(sx / kw, 1, 1));
        ref.current!.setMatrixAt(i++, m);
      }
    ref.current!.count = i;
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [width, depth, cols, rows, kw, kd, gap]);
  const geo = memo(`svc-key-${kw.toFixed(3)}-${kd.toFixed(3)}`, () => new RoundedBoxGeometry(kw, 0.018, kd, 2, Math.min(kw, kd) * 0.18));
  return <instancedMesh ref={ref} args={[geo, clay(AU.maroon950, { roughness: 0.55, clearcoat: 0.2 }), cols * rows]} />;
}

/**
 * A laptop: silver aluminium base with a recessed dark keyboard of real keys and a trackpad, a black
 * screen bezel and a silver lid, tilted back. `children` sit on the screen face.
 */
export function Laptop({ width = 1.6, position, rotation, children }: { width?: number; position?: V3; rotation?: V3; children?: React.ReactNode }) {
  const d = width * 0.68;
  const h = width * 0.64;
  const alu = clay(AU.cream200, { roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const top = 0.07;
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <Box size={[width, top, d]} radius={0.035} material={alu} position={[0, top / 2, 0]} />
      <Box size={[width * 0.9, 0.012, d * 0.46]} radius={0.01} material={clay(AU.maroon950, { roughness: 0.6 })} position={[0, top + 0.001, -d * 0.12]} />
      <group position={[0, top + 0.012, -d * 0.12]}>
        <Keys width={width * 0.88} depth={d * 0.44} />
      </group>
      <Box size={[width * 0.34, 0.006, d * 0.26]} radius={0.012} material={clay(AU.cream300, { roughness: 0.35, clearcoat: 0.5 })} position={[0, top + 0.002, d * 0.28]} />
      {/* Screen, hinged at the back edge */}
      <group position={[0, top, -d / 2 + 0.02]} rotation={[-0.2, 0, 0]}>
        <Box size={[width, h, 0.04]} radius={0.035} material={alu} position={[0, h / 2, -0.012]} />
        <Box size={[width - 0.02, h - 0.02, 0.012]} radius={0.03} material={clay(AU.maroon950, { roughness: 0.25, clearcoat: 0.9 })} position={[0, h / 2, 0.012]} />
        <Box size={[width - 0.12, h - 0.13, 0.006]} radius={0.015} material={mat.card()} position={[0, h / 2 + 0.01, 0.02]} />
        <group position={[0, h / 2 + 0.01, 0.026]}>{children}</group>
      </group>
    </group>
  );
}

/** A phone standing up, face toward +z, `children` on the screen. */
export function Phone({ height = 1.3, position, rotation, children }: { height?: number; position?: V3; rotation?: V3; children?: React.ReactNode }) {
  const w = height * 0.5;
  return (
    <group position={position} rotation={rotation}>
      <Box size={[w, height, 0.08]} radius={0.08} material={mat.matte(S.navyDeep)} />
      <Box size={[w - 0.07, height - 0.07, 0.01]} radius={0.06} material={mat.card()} position={[0, 0, 0.042]} />
      <Box size={[w * 0.3, 0.035, 0.01]} radius={0.015} material={mat.matte(S.navyDeep)} position={[0, height / 2 - 0.08, 0.05]} />
      <group position={[0, 0, 0.05]}>{children}</group>
    </group>
  );
}

/** A desktop monitor on a stand, `children` on the screen. */
export function Monitor({ width = 1.8, frame = S.navyDeep, position, rotation, children }: { width?: number; frame?: string; position?: V3; rotation?: V3; children?: React.ReactNode }) {
  const h = width * 0.62;
  return (
    <group position={position} rotation={rotation}>
      <Box size={[0.5, 0.05, 0.36]} radius={0.025} material={mat.white()} position={[0, 0.025, 0]} />
      <Box size={[0.12, 0.4, 0.08]} radius={0.03} material={mat.white()} position={[0, 0.25, -0.04]} />
      <Box size={[width, h, 0.1]} radius={0.06} material={mat.matte(frame)} position={[0, 0.42 + h / 2, 0]} />
      <group position={[0, 0.42 + h / 2, 0.055]}>{children}</group>
    </group>
  );
}

/** A light bulb with a warm glow and a navy screw base. */
export function Bulb({ position, scale = 1, rays = true }: { position?: V3; scale?: number; rays?: boolean }) {
  return (
    <group position={position} scale={scale}>
      <Ball r={0.26} material={glossy(AU.gold400, { roughness: 0.12, emissive: new THREE.Color(AU.gold500), emissiveIntensity: 0.45 })} position={[0, 0.3, 0]} />
      <Limb a={[-0.05, 0.22, 0]} b={[0, 0.34, 0]} r={0.012} material={mat.plastic(S.orange)} />
      <Limb a={[0, 0.34, 0]} b={[0.05, 0.22, 0]} r={0.012} material={mat.plastic(S.orange)} />
      {[0, 0.07, 0.14].map((y) => (
        <mesh key={y} position={[0, y - 0.03, 0]} material={mat.matte(AU.maroon950)}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 24]} />
        </mesh>
      ))}
      {rays &&
        [-0.7, 0, 0.7].map((a) => (
          <group key={a} position={[0, 0.3, 0]} rotation={[0, 0, a]}>
            <Limb a={[0, 0.36, 0]} b={[0, 0.48, 0]} r={0.022} material={mat.plastic(S.yellow)} />
          </group>
        ))}
    </group>
  );
}

/** A potted plant: round pot and a fan of soft leaves. */
export function Plant({ position, scale = 1 }: { position?: V3; scale?: number }) {
  const leaves = [
    [0, 0.95, 0, 0],
    [-0.3, 0.8, 0.05, 0.6],
    [0.3, 0.8, -0.05, -0.6],
    [-0.42, 0.55, 0.1, 1.0],
    [0.42, 0.55, -0.1, -1.0],
    [0.12, 0.72, 0.25, -0.2],
  ];
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]} material={mat.matte(S.pot)}>
        <cylinderGeometry args={[0.26, 0.2, 0.4, 32]} />
      </mesh>
      {leaves.map(([x, y, z, rz], i) => (
        <group key={i} position={[x * 0.6, y * 0.6 + 0.3, z]} rotation={[0, 0, rz]}>
          <Ball r={0.2} material={mat.plastic(i % 2 ? S.leaf : S.leafDark)} position={[0, 0.22, 0]} scale={[0.55, 1.4, 0.18]} />
          <Limb a={[0, -0.05, 0]} b={[0, 0.2, 0]} r={0.015} material={mat.plastic(S.leafDark)} />
        </group>
      ))}
    </group>
  );
}

/** A faceless person bust: round head over a rounded body. */
export function Person({ color, position, scale = 1 }: { color: string; position?: V3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Ball r={0.22} material={mat.plastic(color)} position={[0, 0.72, 0]} />
      <mesh position={[0, 0.22, 0]} material={mat.plastic(color)}>
        <capsuleGeometry args={[0.3, 0.2, 8, 24]} />
      </mesh>
    </group>
  );
}

/** A speech-bubble outline: rounded rectangle with its tail drawn in, at the lower left. Centred on the body. */
function bubbleShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const [x0, x1, y0, y1] = [-w / 2, w / 2, -h / 2, h / 2];
  const tw = w * 0.2;
  const th = h * 0.34;
  s.moveTo(x0 + r, y1);
  s.lineTo(x1 - r, y1);
  s.quadraticCurveTo(x1, y1, x1, y1 - r);
  s.lineTo(x1, y0 + r);
  s.quadraticCurveTo(x1, y0, x1 - r, y0);
  s.lineTo(x0 + r + tw, y0);
  s.quadraticCurveTo(x0 + r + tw * 0.2, y0 - th * 0.35, x0 + r * 0.7, y0 - th);
  s.quadraticCurveTo(x0 + r * 0.95, y0 - th * 0.4, x0 + r * 0.9, y0);
  s.quadraticCurveTo(x0, y0, x0, y0 + r);
  s.lineTo(x0, y1 - r);
  s.quadraticCurveTo(x0, y1, x0 + r, y1);
  return s;
}

/** A heart, point down, about `size` wide, centred. */
export function heartGeometry(size: number, depth: number) {
  return memo(`svc-heart-v2-${size}-${depth}`, () => {
    const s = new THREE.Shape();
    s.moveTo(5, 5);
    s.bezierCurveTo(5, 5, 4, 0, 0, 0);
    s.bezierCurveTo(-6, 0, -6, 7, -6, 7);
    s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
    s.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
    s.bezierCurveTo(16, 7, 16, 0, 10, 0);
    s.bezierCurveTo(7, 0, 5, 5, 5, 5);
    const g = extrude(s, depth * (22 / size), 1.2, 3, 16);
    g.center();
    // Turned, not mirrored: a negative scale would flip the faces inside out.
    g.rotateZ(Math.PI);
    g.scale(size / 22, size / 22, size / 22);
    return g;
  });
}

/** A speech bubble with its tail, face toward +z: three dots by default, or whatever `children` puts on the face. */
export function Bubble({ color = S.blue, dot = S.card, position, rotation, scale = 1, children }: { color?: string; dot?: string; position?: V3; rotation?: V3; scale?: number; children?: React.ReactNode }) {
  const body = memo("svc-bubble", () => extrude(bubbleShape(0.72, 0.52, 0.16), 0.16, 0.04, 4, 12));
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Mesh geometry={body} material={mat.plastic(color)} />
      <group position={[0, 0, 0.13]}>
        {children ??
          [-0.18, 0, 0.18].map((x) => <Ball key={x} r={0.055} material={mat.plastic(dot)} position={[x, 0, 0]} scale={[1, 1, 0.5]} />)}
      </group>
    </group>
  );
}

/** A gear lying in its local xy plane. */
export const Gear = ({ r = 0.3, teeth = 8, color = S.blue, position, rotation }: { r?: number; teeth?: number; color?: string; position?: V3; rotation?: V3 }) => (
  <Mesh geometry={memo(`svc-gear-${r}-${teeth}`, () => extrude(gearShape(r, teeth, r * 0.26, r * 0.4), r * 0.4, r * 0.06, 2, 6))} material={mat.plastic(color)} position={position} rotation={rotation} />
);

/** A magnifying glass, ring in its local xy plane, handle down-left. */
export function Magnifier({ ring = S.blue, handle = S.navy, position, rotation, scale = 1 }: { ring?: string; handle?: string; position?: V3; rotation?: V3; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={mat.plastic(ring)}>
        <torusGeometry args={[0.38, 0.08, 18, 56]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={glossy(AU.cream200, { transparent: true, opacity: 0.55, roughness: 0.05 })}>
        <cylinderGeometry args={[0.34, 0.34, 0.03, 40]} />
      </mesh>
      <Limb a={[-0.3, -0.3, 0]} b={[-0.42, -0.42, 0]} r={0.07} material={metal()} />
      <Limb a={[-0.46, -0.46, 0]} b={[-0.82, -0.82, 0]} r={0.085} material={mat.plastic(handle)} />
    </group>
  );
}

/** A cloud: overlapping soft spheres on a flat base. */
export function Cloud({ position, scale = 1, children }: { position?: V3; scale?: number; children?: React.ReactNode }) {
  return (
    <group position={position} scale={scale}>
      <Ball r={0.42} material={mat.white()} position={[0, 0.1, 0]} />
      <Ball r={0.3} material={mat.white()} position={[-0.42, -0.05, 0]} />
      <Ball r={0.32} material={mat.white()} position={[0.44, -0.04, 0]} />
      <Box size={[1.2, 0.36, 0.5]} radius={0.18} material={mat.white()} position={[0, -0.15, 0]} />
      <group position={[0, 0, 0.44]}>{children}</group>
    </group>
  );
}

/** A database: three stacked navy discs with glowing blue seams. */
export function Database({ position, scale = 1 }: { position?: V3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {[0, 0.3, 0.6].map((y) => (
        <group key={y}>
          <mesh position={[0, y + 0.14, 0]} material={mat.matte(S.navy)}>
            <cylinderGeometry args={[0.42, 0.42, 0.26, 40]} />
          </mesh>
          <mesh position={[0, y + 0.285, 0]} rotation={[Math.PI / 2, 0, 0]} material={glossy(S.blue, { emissive: new THREE.Color(S.blue), emissiveIntensity: 0.5 })}>
            <torusGeometry args={[0.42, 0.012, 8, 48]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** A compass: dark ring, white face, blue needle. Face toward +y. */
export function Compass({ position, rotation, scale = 1 }: { position?: V3; rotation?: V3; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={mat.matte(S.navyDeep)}>
        <cylinderGeometry args={[0.55, 0.58, 0.16, 48]} />
      </mesh>
      <mesh position={[0, 0.06, 0]} material={mat.card()}>
        <cylinderGeometry args={[0.46, 0.46, 0.08, 48]} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <Box key={i} size={[0.015, 0.02, 0.06]} radius={0.005} material={mat.line()} position={[Math.sin(i * 30 * D) * 0.38, 0.105, Math.cos(i * 30 * D) * 0.38]} rotation={[0, i * 30 * D, 0]} />
      ))}
      <group position={[0, 0.12, 0]} rotation={[0, 0.7, 0]}>
        <mesh position={[0, 0, -0.17]} rotation={[-Math.PI / 2, 0, 0]} material={mat.plastic(S.blue)}>
          <coneGeometry args={[0.07, 0.34, 4]} />
        </mesh>
        <mesh position={[0, 0, 0.17]} rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(S.navy)}>
          <coneGeometry args={[0.07, 0.34, 4]} />
        </mesh>
        <Ball r={0.04} material={mat.card()} position={[0, 0.03, 0]} />
      </group>
    </group>
  );
}

/** A funnel: wide blue cone over a narrow spout. Opening up. */
export function Funnel({ position, scale = 1, color = S.blue }: { position?: V3; scale?: number; color?: string }) {
  const geo = memo("svc-funnel", () => new THREE.LatheGeometry([new THREE.Vector2(0.1, 0), new THREE.Vector2(0.12, 0.3), new THREE.Vector2(0.2, 0.42), new THREE.Vector2(0.62, 0.9), new THREE.Vector2(0.66, 0.98), new THREE.Vector2(0.6, 0.98), new THREE.Vector2(0.18, 0.46), new THREE.Vector2(0.06, 0.3)], 48));
  return (
    <group position={position} scale={scale}>
      <mesh geometry={geo} material={glossy(color, { roughness: 0.25, side: THREE.DoubleSide })} castShadow />
      <mesh position={[0, 0.98, 0]} rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(S.blueLight)}>
        <torusGeometry args={[0.64, 0.04, 12, 48]} />
      </mesh>
    </group>
  );
}

/** A DSLR camera, lens toward +z, with an orange ring. */
export function DslrCamera({ position, rotation, scale = 1 }: { position?: V3; rotation?: V3; scale?: number }) {
  const body = mat.matte(AU.maroon950);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Box size={[1.1, 0.7, 0.5]} radius={0.12} material={body} />
      <Box size={[0.36, 0.22, 0.4]} radius={0.06} material={body} position={[0, 0.42, 0]} />
      <Box size={[0.26, 0.6, 0.56]} radius={0.1} material={body} position={[-0.45, -0.02, 0.02]} />
      <Ball r={0.06} material={mat.matte(AU.maroon800)} position={[0.38, 0.38, 0]} scale={[1, 0.5, 1]} />
      <mesh position={[0.08, -0.02, 0.42]} rotation={[Math.PI / 2, 0, 0]} material={body}>
        <cylinderGeometry args={[0.3, 0.32, 0.4, 40]} />
      </mesh>
      <mesh position={[0.08, -0.02, 0.5]} rotation={[Math.PI / 2, 0, 0]} material={mat.plastic(S.orange)}>
        <cylinderGeometry args={[0.31, 0.31, 0.05, 40]} />
      </mesh>
      <mesh position={[0.08, -0.02, 0.62]} rotation={[Math.PI / 2, 0, 0]} material={glossy(AU.maroon800, { roughness: 0.05 })}>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
      </mesh>
    </group>
  );
}

/** The Google "G" in its four colours, upright. */
export function GoogleG({ position, rotation, scale = 1 }: { position?: V3; rotation?: V3; scale?: number }) {
  const g = gGeometry();
  const G = palette.google;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Mesh geometry={g.red} material={mat.plastic(G.red)} />
      <Mesh geometry={g.yellow} material={mat.plastic(G.yellow)} />
      <Mesh geometry={g.green} material={mat.plastic(G.green)} />
      <Mesh geometry={g.blue} material={mat.plastic(G.blue)} />
    </group>
  );
}

/** The Google Ads mark: yellow and blue slanted bars and a green dot. */
export function GoogleAds({ position, rotation, scale = 1 }: { position?: V3; rotation?: V3; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Limb a={[-0.32, -0.25, 0]} b={[-0.05, 0.3, 0]} r={0.12} material={mat.plastic(BRAND.adsYellow)} />
      <Limb a={[0.05, 0.3, 0.02]} b={[0.32, -0.25, 0.02]} r={0.12} material={mat.plastic(BRAND.adsBlue)} />
      <Ball r={0.12} material={mat.plastic(BRAND.adsGreen)} position={[-0.32, -0.25, 0.04]} />
    </group>
  );
}

/** The Meta infinity mark in its blue. */
export const MetaMark = ({ position, rotation, size = 0.6 }: { position?: V3; rotation?: V3; size?: number }) => (
  <Mesh geometry={memo(`svc-meta-${size}`, () => extrude(svgShapes(glyphPaths.meta, size), size * 0.12, size * 0.03, 2, 6))} material={mat.plastic(BRAND.meta)} position={position} rotation={rotation} />
);

/** A tick in a rounded box, for checklists. */
export function Check({ position }: { position?: V3 }) {
  return (
    <group position={position}>
      <Box size={[0.13, 0.13, 0.03]} radius={0.03} material={mat.matte(S.navy)} />
      <Limb a={[-0.035, 0.0, 0.025]} b={[-0.01, -0.03, 0.025]} r={0.012} material={mat.card()} />
      <Limb a={[-0.01, -0.03, 0.025]} b={[0.04, 0.035, 0.025]} r={0.012} material={mat.card()} />
    </group>
  );
}
