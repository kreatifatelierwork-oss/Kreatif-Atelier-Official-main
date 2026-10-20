"use client";

import { AU } from "@/lib/design/aurelius";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { clay, glossy, metal } from "../materials/materials";
import { factory as F } from "../materials/palette";
import { Camcorder } from "./Camcorder";
import { extrude, memo, ringSector, roundedRect, roundedTriangle } from "./geometry";
import { Ball, Box, Limb, Mesh, Tube } from "./parts";
import { FactoryGlow } from "./FactoryGlow";
import { SocialTile, type SocialId } from "./SocialTile";

type V3 = [number, number, number];

/**
 * The content factory, laid out on a 4.6-unit platform seen from the front corner (+x, +z).
 * World axes: +x runs toward the lower right of the screen, +z toward the lower left.
 */
const FLOOR = 0.17;
/** Unit vector from the scene toward the camera's side, for things stuck on the visible face of a pipe. */
const TOWARD_VIEWER = new THREE.Vector3(1, 0.3, 1).normalize();
const CENTRE: V3 = [-0.25, FLOOR, -0.35];

/** Motion, in one place so it is easy to tune. Speeds are units (or radians) per second. */
const MOTION = { belt: 0.32, pipe: 0.08, turntable: 0.25, arm: 0.5, pencil: 3.2, bars: 1.6, donut: 0.35 };

/** Shared clock for the scene: stops at 0 under prefers-reduced-motion. */
function useSceneTime() {
  const still = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  return (t: number) => (still ? 0 : t);
}

const glass = () => glossy(F.glass, { transparent: true, opacity: 0.35, roughness: 0.04, clearcoat: 1, depthWrite: false });
/** Machine shells: the light tone of the body hue, glossy like the reference. */
const shell = () => clay(F.bodyLight, { roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 });
const panel = (c: string) => clay(c, { roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 });

/* ------------------------------------------------------------------ belts and pipes */

/**
 * A conveyor belt along local +x: slate belt, end rollers, studded side rails. Items ride from one
 * end to the other and loop, shrinking in and out at the ends.
 */
function Belt({ length, width, items, spacing, itemY, position, rotationY = 0 }: { length: number; width: number; items: ReactNode[]; spacing: number; itemY: number; position: V3; rotationY?: number }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const time = useSceneTime();
  const loop = Math.max(items.length * spacing, length + spacing);
  useFrame(({ clock }) => {
    const t = time(clock.elapsedTime);
    refs.current.forEach((g, i) => {
      if (!g) return;
      const u = (((t * MOTION.belt + i * spacing) % loop) + loop) % loop;
      const fade = Math.min(THREE.MathUtils.smoothstep(u, 0, 0.3), 1 - THREE.MathUtils.smoothstep(u, length - 0.3, length));
      g.position.x = -length / 2 + u;
      g.scale.setScalar(Math.max(fade, 0.0001));
      g.visible = u < length;
    });
  });
  const belt = clay(F.belt, { roughness: 0.55 });
  const rail = clay(F.beltRail, { roughness: 0.5 });
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Box size={[length, 0.1, width]} radius={0.04} material={belt} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Box size={[length + 0.12, 0.2, 0.08]} radius={0.04} material={rail} position={[0, -0.02, s * (width / 2 + 0.04)]} />
          {Array.from({ length: Math.floor(length / 0.42) + 1 }, (_, k) => (
            <mesh key={k} position={[-length / 2 + 0.12 + k * 0.42, -0.02, s * (width / 2 + 0.085)]} rotation={[Math.PI / 2, 0, 0]} material={metal()}>
              <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} />
            </mesh>
          ))}
        </group>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (length / 2), -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} material={rail}>
          <cylinderGeometry args={[0.1, 0.1, width + 0.16, 20]} />
        </mesh>
      ))}
      {items.map((item, i) => (
        <group
          key={i}
          ref={(g) => {
            refs.current[i] = g;
          }}
          position={[0, itemY, 0]}
        >
          {item}
        </group>
      ))}
    </group>
  );
}

/** A collar where a pipe meets a machine, turned to the pipe's direction: chrome, or black on the cream pipe. */
function Collar({ at, dir, dark = false }: { at: THREE.Vector3; dir: THREE.Vector3; dark?: boolean }) {
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize()), [dir]);
  return (
    <group position={at} quaternion={q}>
      <mesh material={dark ? clay(F.bodyDark, { roughness: 0.4, clearcoat: 0.5 }) : metal()}>
        <cylinderGeometry args={[0.17, 0.17, 0.16, 28]} />
      </mesh>
      <mesh position={[0, -0.1, 0]} material={dark ? clay(F.bodyDark) : metal(F.chromeDark)}>
        <cylinderGeometry args={[0.21, 0.21, 0.05, 28]} />
      </mesh>
    </group>
  );
}

/**
 * A pipe from one machine face to another. `from` and `to` are points on the faces; the pipe
 * leaves and enters along the given face normals, with collars at both ends. A glass pipe carries
 * its items through it; a `solid` pipe is a cream jointed tube with its items fixed on the front.
 */
function Pipe({ from, fromNormal, to, toNormal, via = [], items, solid = false }: { from: V3; fromNormal: V3; to: V3; toNormal: V3; via?: V3[]; items: ReactNode[]; solid?: boolean }) {
  const { curve, a, b, na, nb, points } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const na = new THREE.Vector3(...fromNormal).normalize();
    const nb = new THREE.Vector3(...toNormal).normalize();
    const pts = [a, a.clone().addScaledVector(na, 0.3), ...via.map((v) => new THREE.Vector3(...v)), b.clone().addScaledVector(nb, 0.3), b];
    return { curve: new THREE.CatmullRomCurve3(pts, false, "centripetal"), a, b, na, nb, points: pts.map((p) => p.toArray() as V3) };
  }, [from, fromNormal, to, toNormal, via]);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const time = useSceneTime();
  useFrame(({ clock }) => {
    const t = time(clock.elapsedTime);
    refs.current.forEach((g, i) => {
      if (!g) return;
      // Solid pipe: badges sit still on the side facing the viewer; glass pipe: items travel through.
      const u = solid ? (i + 1) / (items.length + 1) : 0.06 + ((t * MOTION.pipe + i / items.length) % 1) * 0.88;
      g.position.copy(curve.getPointAt(u));
      if (solid) g.position.add(TOWARD_VIEWER.clone().multiplyScalar(0.14));
    });
  });
  const joints = solid ? [0.25, 0.5, 0.75].map((u) => ({ at: curve.getPointAt(u), dir: curve.getTangentAt(u) })) : [];
  return (
    <group>
      <Tube points={points} r={0.13} material={solid ? shell() : glass()} />
      <Collar at={a.clone().addScaledVector(na, 0.06)} dir={na} dark={solid} />
      <Collar at={b.clone().addScaledVector(nb, 0.06)} dir={nb} dark={solid} />
      {joints.map((j, k) => (
        <group key={k} position={j.at} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), j.dir)}>
          <mesh material={clay(F.bodyDark)}>
            <cylinderGeometry args={[0.145, 0.145, 0.05, 24]} />
          </mesh>
        </group>
      ))}
      {items.map((item, i) => (
        <group
          key={i}
          ref={(g) => {
            refs.current[i] = g;
          }}
        >
          {item}
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ small parts */

/** A small rounded badge with a white play mark, fixed on the cream pipe. */
function PlayBadge({ color }: { color: string }) {
  const card = memo("factory-badge", () => extrude(roundedRect(0.2, 0.2, 0.05), 0.04, 0.012, 2, 6));
  const play = memo("factory-badge-play", () => extrude(roundedTriangle(0.05, 0.012), 0.015, 0.006, 1));
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <Mesh geometry={card} material={glossy(color, { roughness: 0.25 })} />
      <Mesh geometry={play} material={clay(F.pale)} position={[0.008, 0, 0.03]} />
    </group>
  );
}

/** A social tile laid flat on the belt. */
const FlatTile = ({ id }: { id: SocialId }) => (
  <group rotation={[-Math.PI / 2, 0, 0]} scale={0.46}>
    <SocialTile id={id} />
  </group>
);

/** A tunnel arch over a belt, opening along its local z. */
function Arch({ width, height, depth, color, position, rotationY = 0 }: { width: number; height: number; depth: number; color: string; position: V3; rotationY?: number }) {
  const geo = memo(`factory-arch-${width}-${height}-${depth}`, () => {
    const s = roundedRect(width, height, 0.2, 0, height / 2);
    s.holes.push(new THREE.Path(roundedRect(width - 0.32, height - 0.22, 0.14, 0, (height - 0.22) / 2).getPoints(8)));
    return extrude(s, depth, 0.05, 3, 8);
  });
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Mesh geometry={geo} material={panel(color)} />
      <Box size={[0.36, 0.08, 0.06]} radius={0.035} material={glossy(F.yellow)} position={[0, height - 0.13, depth / 2 + 0.05]} />
    </group>
  );
}

/** A vent: dark slots on a machine face. */
function Vent({ position, rotationY = 0, rows = 4, width = 0.4 }: { position: V3; rotationY?: number; rows?: number; width?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {Array.from({ length: rows }, (_, i) => (
        <Box key={i} size={[width, 0.035, 0.02]} radius={0.012} material={clay(F.beltRail)} position={[0, i * 0.07, 0]} />
      ))}
    </group>
  );
}

/** A small round button. */
const Button = ({ color, position, rotation }: { color: string; position: V3; rotation: V3 }) => (
  <mesh position={position} rotation={rotation} material={glossy(color, { roughness: 0.2 })}>
    <cylinderGeometry args={[0.085, 0.085, 0.06, 24]} />
  </mesh>
);

/* ------------------------------------------------------------------ stations */

/** The centre: a cream drum with a gold rim and a turning polished-burgundy disc with a white play mark. */
function Turntable() {
  const disc = useRef<THREE.Group>(null);
  const time = useSceneTime();
  useFrame(({ clock }) => {
    const t = time(clock.elapsedTime);
    if (disc.current) disc.current.rotation.y = t * MOTION.turntable;
  });
  const play = memo("factory-play", () => extrude(roundedTriangle(0.34, 0.07), 0.14, 0.04, 3));
  const front = Math.PI / 4; // toward the viewer
  return (
    <group position={CENTRE}>
      <mesh position={[0, 0.2, 0]} material={panel(F.body)} castShadow>
        <cylinderGeometry args={[1.2, 1.26, 0.4, 56]} />
      </mesh>
      <Vent position={[Math.sin(front) * 1.24, 0.1, Math.cos(front) * 1.24]} rotationY={front} rows={3} width={0.5} />
      {([[F.orange, -0.42], [F.pale, -0.27]] as const).map(([c, a]) => (
        <Button key={a} color={c} position={[Math.sin(front + a) * 1.24, 0.22, Math.cos(front + a) * 1.24]} rotation={[Math.PI / 2, front + a, 0]} />
      ))}
      <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal()}>
        <torusGeometry args={[1.16, 0.05, 12, 72]} />
      </mesh>
      <mesh position={[0, 0.56, 0]} material={shell()} castShadow>
        <cylinderGeometry args={[1.0, 1.08, 0.26, 56]} />
      </mesh>
      <group ref={disc} position={[0, 0.78, 0]}>
        <mesh material={glossy(F.disc, { roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 })} castShadow>
          <cylinderGeometry args={[0.8, 0.84, 0.2, 56]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal()}>
          <torusGeometry args={[0.8, 0.03, 8, 64]} />
        </mesh>
        <Mesh geometry={play} material={glossy(F.glass, { roughness: 0.12, clearcoat: 1 })} position={[0.05, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
}

const ARM_BASE: V3 = [-1.65, FLOOR, -1.55];

/** Back left: a big machine with a robot arm that swings the camcorder over the centre. */
function CameraArm() {
  const arm = useRef<THREE.Group>(null);
  const time = useSceneTime();
  // Rotation that turns the arm's local +x toward the turntable; it sweeps either side of that.
  const aim = Math.atan2(-(CENTRE[2] - ARM_BASE[2]), CENTRE[0] - ARM_BASE[0]);
  useFrame(({ clock }) => {
    const t = time(clock.elapsedTime);
    if (arm.current) arm.current.rotation.y = aim + Math.sin(t * MOTION.arm) * 0.3;
  });
  const joint = metal();
  const link = panel(F.bodyLight);
  return (
    <group position={ARM_BASE}>
      <Box size={[1.35, 1.0, 1.3]} radius={0.14} material={shell()} position={[0, 0.5, 0]} />
      <Box size={[1.37, 0.32, 1.32]} radius={0.1} material={panel(F.body)} position={[0, 0.16, 0]} />
      <Vent position={[0.69, 0.48, 0.15]} rotationY={Math.PI / 2} rows={4} />
      <Vent position={[0.1, 0.48, 0.66]} rows={4} />
      <Box size={[0.24, 0.08, 0.05]} radius={0.035} material={glossy(F.yellow)} position={[-0.35, 0.82, 0.66]} />
      <group position={[0, 1.0, 0]}>
        <mesh material={clay(F.bodyDark)} castShadow>
          <cylinderGeometry args={[0.32, 0.36, 0.2, 32]} />
        </mesh>
        <group ref={arm} position={[0, 0.12, 0]}>
          <Ball r={0.16} material={joint} position={[0, 0.05, 0]} />
          <Limb a={[0, 0.05, 0]} b={[0.15, 0.85, 0]} r={0.12} material={link} />
          <Ball r={0.14} material={joint} position={[0.15, 0.85, 0]} />
          <Limb a={[0.15, 0.85, 0]} b={[0.72, 1.0, 0]} r={0.1} material={link} />
          <Ball r={0.12} material={joint} position={[0.72, 1.0, 0]} />
          <Limb a={[0.72, 1.0, 0]} b={[0.84, 0.86, 0]} r={0.07} material={clay(F.bodyDark)} />
          {/* The camcorder, lens forward along the arm and tilted down at the turntable */}
          <group position={[1.15, 0.62, 0]} rotation={[0, Math.PI, 0.3]} scale={0.7}>
            <Camcorder tripod={false} />
          </group>
        </group>
      </group>
    </group>
  );
}

/** Back: a browser window on two chrome posts, with an image tile, copy lines and a chart card. */
function BrowserPanel() {
  const line = clay(F.paleShade);
  return (
    <group position={[-0.55, FLOOR, -1.95]} rotation={[0, Math.PI / 4, 0]}>
      {[-0.55, 0.55].map((x) => (
        <Limb key={x} a={[x, 0, -0.05]} b={[x, 1.6, -0.05]} r={0.045} material={metal()} />
      ))}
      <group position={[0, 2.2, 0]}>
        <Box size={[2.0, 1.32, 0.1]} radius={0.07} material={clay(F.pale, { roughness: 0.4, clearcoat: 0.5 })} />
        <Box size={[2.0, 0.22, 0.12]} radius={0.07} material={panel(F.bodyDark)} position={[0, 0.55, 0]} />
        {[F.gRed, F.yellow, F.green].map((c, i) => (
          <Ball key={i} r={0.045} material={glossy(c)} position={[-0.86 + i * 0.13, 0.55, 0.07]} scale={[1, 1, 0.6]} />
        ))}
        <group position={[-0.45, 0.05, 0.07]}>
          <Box size={[0.8, 0.62, 0.05]} radius={0.06} material={panel(F.teal)} />
          <mesh position={[-0.08, -0.1, 0.04]} material={clay(F.pale)}>
            <coneGeometry args={[0.22, 0.3, 3]} />
          </mesh>
          <Ball r={0.07} material={glossy(F.yellow)} position={[0.2, 0.14, 0.04]} />
        </group>
        <Box size={[0.8, 0.09, 0.04]} radius={0.035} material={clay(F.paleShade)} position={[-0.45, -0.42, 0.07]} />
        {[0.24, 0.11, -0.02].map((y, i) => (
          <Box key={y} size={[i === 2 ? 0.36 : 0.56, 0.06, 0.03]} radius={0.025} material={line} position={[0.42 - (i === 2 ? 0.1 : 0), y, 0.07]} />
        ))}
        {/* Chart card standing proud of the window */}
        <group position={[0.62, -0.28, 0.22]}>
          <Box size={[0.62, 0.5, 0.05]} radius={0.05} material={glass()} />
          {([[F.green, 0.12], [F.yellow, 0.2], [F.orange, 0.3]] as const).map(([c, h], i) => (
            <Box key={i} size={[0.1, h, 0.05]} radius={0.02} material={glossy(c)} position={[-0.15 + i * 0.15, -0.17 + h / 2, 0.04]} />
          ))}
        </group>
      </group>
    </group>
  );
}

/** Right: a sky-blue machine with an open notepad and a pencil that scribbles. */
function NotepadMachine() {
  const pencil = useRef<THREE.Group>(null);
  const time = useSceneTime();
  useFrame(({ clock }) => {
    const t = time(clock.elapsedTime);
    if (pencil.current) pencil.current.rotation.z = -0.5 + Math.sin(t * MOTION.pencil) * 0.06;
  });
  return (
    <group position={[1.0, FLOOR, -1.55]}>
      <Box size={[1.3, 0.85, 1.25]} radius={0.14} material={panel(F.olive)} position={[0, 0.42, 0]} />
      <Box size={[1.32, 0.26, 1.27]} radius={0.1} material={shell()} position={[0, 0.13, 0]} />
      <Vent position={[0.66, 0.38, 0.1]} rotationY={Math.PI / 2} rows={3} />
      <Button color={F.orange} position={[0.2, 0.55, 0.63]} rotation={[Math.PI / 2, 0, 0]} />
      <Button color={F.pale} position={[-0.05, 0.55, 0.63]} rotation={[Math.PI / 2, 0, 0]} />
      <group position={[-0.05, 0.88, 0.1]} rotation={[0, -0.35, 0]}>
        <Box size={[0.72, 0.07, 0.86]} radius={0.03} material={clay(F.pale)} />
        {[-0.22, -0.08, 0.06, 0.2].map((z) => (
          <Box key={z} size={[0.5, 0.012, 0.02]} radius={0.006} material={clay(F.paleShade)} position={[0.04, 0.04, z]} />
        ))}
        {[-0.28, -0.19, -0.1, -0.01, 0.08, 0.17, 0.26].map((x) => (
          <mesh key={x} position={[x, 0.05, -0.42]} rotation={[0, Math.PI / 2, 0]} material={metal()}>
            <torusGeometry args={[0.04, 0.012, 6, 16]} />
          </mesh>
        ))}
        <group ref={pencil} position={[0.1, 0.44, 0.1]}>
          <Limb a={[0, -0.32, 0]} b={[0, 0.32, 0]} r={0.06} material={glossy(F.yellow, { roughness: 0.3 })} />
          <mesh position={[0, -0.44, 0]} rotation={[Math.PI, 0, 0]} material={clay(F.paleShade)}>
            <coneGeometry args={[0.06, 0.14, 16]} />
          </mesh>
          <Limb a={[0, 0.34, 0]} b={[0, 0.4, 0]} r={0.062} material={metal()} />
          <Ball r={0.064} material={clay(F.eraser)} position={[0, 0.45, 0]} />
        </group>
      </group>
    </group>
  );
}

/** Front: a white block with pulsing bars, and a blue block with a turning donut chart. */
function ChartStation() {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const donut = useRef<THREE.Group>(null);
  const time = useSceneTime();
  const heights = [0.36, 0.56, 0.46, 0.7];
  useFrame(({ clock }) => {
    const t = time(clock.elapsedTime);
    bars.current.forEach((m, i) => {
      if (!m) return;
      const h = heights[i] * (1 + Math.sin(t * MOTION.bars + i * 1.3) * 0.18);
      m.scale.y = h;
      m.position.y = 0.72 + h / 2;
    });
    if (donut.current) donut.current.rotation.z = t * MOTION.donut;
  });
  const sector = (a0: number, a1: number) => memo(`factory-donut-${a0.toFixed(3)}`, () => extrude(ringSector(0.14, 0.32, a0, a1), 0.14, 0.03, 2, 16));
  const D = Math.PI / 180;
  return (
    <group position={[-0.55, FLOOR, 1.55]}>
      {/* Bars block */}
      <Box size={[1.05, 0.62, 1.0]} radius={0.12} material={shell()} position={[-0.35, 0.31, -0.15]} />
      <Box size={[0.95, 0.1, 0.9]} radius={0.05} material={clay(F.pale)} position={[-0.35, 0.67, -0.15]} />
      <Vent position={[-0.35, 0.18, 0.36]} rows={3} />
      {[F.green, F.teal, F.orange, F.yellow].map((c, i) => (
        <mesh
          key={i}
          ref={(m) => {
            bars.current[i] = m;
          }}
          position={[-0.68 + i * 0.22, 0.9, -0.15]}
          material={glossy(c, { roughness: 0.25 })}
          castShadow
        >
          <boxGeometry args={[0.16, 1, 0.16]} />
        </mesh>
      ))}
      {/* Donut block */}
      <Box size={[0.95, 0.85, 0.9]} radius={0.12} material={panel(F.body)} position={[0.62, 0.42, 0.1]} />
      <Box size={[0.97, 0.22, 0.92]} radius={0.08} material={shell()} position={[0.62, 0.11, 0.1]} />
      <Vent position={[0.62, 0.32, 0.56]} rows={3} />
      <Button color={F.yellow} position={[0.36, 0.62, 0.56]} rotation={[Math.PI / 2, 0, 0]} />
      <group ref={donut} position={[0.62, 1.2, 0.1]} rotation={[0, Math.PI / 4, 0]}>
        {([[0, 100, F.gRed], [100, 190, F.gYellow], [190, 280, F.gGreen], [280, 360, F.gBlue]] as const).map(([a0, a1, c]) => (
          <Mesh key={a0} geometry={sector(a0 * D + 0.03, a1 * D - 0.03)} material={glossy(c, { roughness: 0.25 })} />
        ))}
      </group>
    </group>
  );
}

/** Left corner: the gate the left belt's posts come out of. */
function MediaGate() {
  return (
    <group position={[-1.95, FLOOR, -0.4]}>
      <Arch width={1.0} height={0.95} depth={0.6} color={F.body} position={[0, 0, 0]} />
    </group>
  );
}

/* ------------------------------------------------------------------ the scene */

const SOCIALS: SocialId[] = ["facebook", "whatsapp", "twitter", "instagram", "tiktok", "linkedin"];
const LEFT_BELT: SocialId[] = ["youtube", "tiktok", "youtube", "linkedin", "youtube", "instagram"];

/** Pipe endpoints, on machine faces (world space, platform group). */
// Donut block's right face (x 0.545) → the tunnel's front pillar (z 1.225).
const PIPE_1 = { from: [0.545, FLOOR + 0.5, 1.75] as V3, fromNormal: [1, 0, 0] as V3, via: [[1.2, FLOOR + 1.0, 1.85]] as V3[], to: [0.75, FLOOR + 0.55, 1.225] as V3, toNormal: [0, 0, 1] as V3 };
// Browser window's right edge → the notepad machine's top (y 0.85).
const PIPE_2 = { from: [0.25, FLOOR + 2.2, -2.6] as V3, fromNormal: [0.7, 0, -0.7] as V3, via: [[1.1, FLOOR + 2.2, -2.35]] as V3[], to: [1.45, FLOOR + 0.85, -1.95] as V3, toNormal: [0, 1, 0] as V3 };

/**
 * The content factory (home scene): blue machines in light, mid and dark tones on a navy platform. A camera
 * on a robot arm films the turning play disc; media cards come out of the gate on the left belt;
 * a glass pipe carries them from the chart station to the front belt, where they ship as social
 * posts; a cream jointed pipe runs from the browser window to the notepad machine.
 */
export function ContentFactory() {
  const small = (id: SocialId, k: string) => (
    <group key={k} rotation={[0, Math.PI / 4, 0]} scale={0.17}>
      <SocialTile id={id} />
    </group>
  );
  return (
    <group position={[0, -1.0, 0]}>
      {/* The scene is larger than a single object, so it gets its own soft sky light on top of the studio. */}
      <hemisphereLight args={[AU.cream50, F.bodyLight, 1.1]} />
      {/* Warm key from the upper left, as in a studio product shot. */}
      <directionalLight position={[-4, 6, 5]} intensity={0.8} color={AU.cream50} />
      {/* No square platform (Roo, 2026-10-20): the machines stand straight on the round podium. */}
      <FactoryGlow
        board={{ size: 4.6, top: FLOOR }}
        turntable={{ at: CENTRE, radius: 1.26 }}
        footprints={[
          { at: ARM_BASE, w: 1.37, d: 1.32 },
          { at: [1.0, FLOOR, -1.55], w: 1.32, d: 1.27 },
          { at: [-0.9, FLOOR, 1.4], w: 1.05, d: 1.0 },
          { at: [0.07, FLOOR, 1.65], w: 0.97, d: 0.92 },
        ]}
      />
      <Turntable />
      <CameraArm />
      <BrowserPanel />
      <NotepadMachine />
      <ChartStation />
      <MediaGate />
      {/* Left belt: YouTube and other posts out of the gate toward the viewer */}
      <Belt length={3.4} width={0.62} spacing={0.66} itemY={0.15} position={[-1.95, FLOOR + 0.16, 1.25]} rotationY={-Math.PI / 2} items={LEFT_BELT.map((id, i) => <FlatTile key={i} id={id} />)} />
      {/* Front belt: social posts out of the tunnel */}
      <Belt length={2.7} width={0.62} spacing={0.62} itemY={0.15} position={[1.95, FLOOR + 0.16, 0.75]} items={SOCIALS.map((id) => <FlatTile key={id} id={id} />)} />
      <Arch width={0.95} height={0.9} depth={0.5} color={F.body} position={[0.75, FLOOR, 0.75]} rotationY={Math.PI / 2} />
      {/* Pipe 1: donut block's front face → the tunnel's far side; Pipe 2: browser window → notepad machine */}
      <Pipe {...PIPE_1} items={[small("facebook", "p1"), small("instagram", "p2"), small("youtube", "p3")]} />
      <Pipe {...PIPE_2} solid items={[<PlayBadge key="q1" color={F.bodyDark} />, <PlayBadge key="q2" color={F.orange} />]} />
    </group>
  );
}
