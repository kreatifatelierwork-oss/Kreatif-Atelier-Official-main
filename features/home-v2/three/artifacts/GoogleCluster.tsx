"use client";

import * as THREE from "three";
import { glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { arrowShape, extrude, gearShape, memo, ringSector, roundedRect } from "./geometry";
import { Ball, Box, Limb, Mesh, Tube } from "./parts";

const G = palette.google;
const D = Math.PI / 180;

/** The four-colour G as extruded ring sectors plus the blue bar. Opening on the right, as in the mark. */
let gParts: Record<"red" | "yellow" | "green" | "blue", THREE.BufferGeometry> | null = null;
export function gGeometry() {
  if (!gParts) {
    const r0 = 0.62;
    const r1 = 1;
    const sector = (a0: number, a1: number) => extrude(ringSector(r0, r1, a0 * D, a1 * D), 0.32, 0.06, 3, 14);
    gParts = {
      red: sector(42, 142),
      yellow: sector(142, 218),
      green: sector(218, 318),
      blue: extrude([ringSector(r0, r1, 318 * D, 360 * D), roundedRect(0.98, 0.36, 0.02, 0.51, -0.01)], 0.32, 0.06, 3, 14),
    };
  }
  return gParts;
}

function Gear({ r, teeth, color, position, rotation }: { r: number; teeth: number; color: string; position: [number, number, number]; rotation?: [number, number, number] }) {
  const geo = memo(`gear-${r}-${teeth}`, () => extrude(gearShape(r, teeth, r * 0.28, r * 0.42), r * 0.35, r * 0.06, 2, 6));
  return <Mesh geometry={geo} material={glossy(color)} position={position} rotation={rotation} />;
}

/** ref-google-cluster.png: the glossy four-colour G on a pedestal, ringed and surrounded by search and growth icons. */
export function GoogleCluster() {
  const parts = gGeometry();
  const arrow = memo("google-arrow", () => extrude(arrowShape(0.2, 1.3, 0.5, 0.36), 0.16, 0.04, 4));
  const white = glossy(G.white, { roughness: 0.3 });
  const card = memo("google-card", () => extrude(roundedRect(1.0, 0.72, 0.08), 0.05, 0.025, 3));
  const pill = memo("google-pill", () => extrude(roundedRect(1.15, 0.26, 0.13), 0.06, 0.025, 3));
  const ringGeo = memo("google-ring", () => {
    const geo = new THREE.TorusGeometry(1.55, 0.065, 10, 96);
    const col: number[] = [];
    const a = new THREE.Color(G.green);
    const b = new THREE.Color(G.yellow);
    const pos = geo.getAttribute("position");
    for (let i = 0; i < pos.count; i++) {
      const t = (Math.atan2(pos.getY(i), pos.getX(i)) / Math.PI + 1) / 2;
      const c = a.clone().lerp(b, t);
      col.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    return geo;
  });

  return (
    <group position={[0, -0.05, 0]} scale={0.82}>
      {/* Pedestal */}
      <mesh position={[0, -1.18, 0]} material={glossy(G.pedestal)} castShadow receiveShadow>
        <cylinderGeometry args={[1.25, 1.3, 0.16, 48]} />
      </mesh>
      <mesh position={[0, -1.05, 0]} material={white} castShadow receiveShadow>
        <cylinderGeometry args={[1.15, 1.2, 0.12, 48]} />
      </mesh>
      {/* The G */}
      <group position={[0, 0, 0]}>
        <Mesh geometry={parts.red} material={glossy(G.red)} />
        <Mesh geometry={parts.yellow} material={glossy(G.yellow)} />
        <Mesh geometry={parts.green} material={glossy(G.green)} />
        <Mesh geometry={parts.blue} material={glossy(G.blue)} />
      </group>
      {/* Orbit ring */}
      <mesh geometry={ringGeo} rotation={[1.35, 0.15, 0.2]} position={[0, -0.25, 0]} castShadow>
        <meshPhysicalMaterial vertexColors roughness={0.22} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      {/* Rising arrow */}
      <Mesh geometry={arrow} material={glossy(G.blue)} position={[0.55, 0.1, 0.35]} rotation={[0, 0, -0.75]} />
      {/* Gears */}
      <Gear r={0.32} teeth={8} color={G.blue} position={[1.55, 1.05, -0.2]} rotation={[0.2, -0.3, 0.3]} />
      <Gear r={0.16} teeth={7} color={G.yellow} position={[1.98, 0.72, -0.1]} rotation={[0.2, -0.3, 0]} />
      {/* Light bulb */}
      <group position={[0, 1.55, 0]}>
        <Ball r={0.26} material={glossy(G.white, { roughness: 0.15, emissive: new THREE.Color(G.yellow), emissiveIntensity: 0.25 })} />
        <mesh position={[0, -0.3, 0]} material={glossy(G.grey, { metalness: 0.5 })}>
          <cylinderGeometry args={[0.11, 0.1, 0.16, 24]} />
        </mesh>
        {[-60, -30, 0, 30, 60].map((deg) => (
          <Limb key={deg} a={[Math.sin(deg * D) * 0.36, Math.cos(deg * D) * 0.36, 0]} b={[Math.sin(deg * D) * 0.5, Math.cos(deg * D) * 0.5, 0]} r={0.025} material={glossy(G.yellow)} />
        ))}
      </group>
      {/* Browser card, upper left */}
      <group position={[-1.75, 0.65, -0.4]} rotation={[0, 0.35, 0]}>
        <Mesh geometry={card} material={white} />
        <Box size={[1.0, 0.12, 0.07]} radius={0.03} material={glossy(G.blue)} position={[0, 0.3, 0.01]} />
        <Box size={[0.6, 0.06, 0.05]} radius={0.02} material={glossy(G.blue)} position={[-0.1, -0.05, 0.05]} />
        <Box size={[0.45, 0.06, 0.05]} radius={0.02} material={glossy(G.green)} position={[-0.18, -0.18, 0.05]} />
      </group>
      {/* Search pill, left */}
      <group position={[-1.6, -0.15, 0.3]} rotation={[0, 0.3, 0]}>
        <Mesh geometry={pill} material={white} />
        <mesh position={[0.42, 0, 0.06]} material={glossy(G.grey)}>
          <torusGeometry args={[0.06, 0.015, 8, 24]} />
        </mesh>
      </group>
      {/* Refresh arrows, lower left */}
      <group position={[-1.75, -0.95, 0.2]} rotation={[0, 0.3, 0]}>
        {[G.red, G.yellow, G.green, G.blue].map((c, i) => (
          <mesh key={i} rotation={[0, 0, i * (Math.PI / 2)]} material={glossy(c)} castShadow>
            <torusGeometry args={[0.28, 0.07, 16, 32, Math.PI / 2 - 0.15]} />
          </mesh>
        ))}
      </group>
      {/* Chart card, right */}
      <group position={[1.8, -0.15, -0.2]} rotation={[0, -0.35, 0]}>
        <Mesh geometry={card} material={white} />
        {[[G.red, 0.16], [G.yellow, 0.26], [G.green, 0.4]].map(([c, h], i) => (
          <Box key={String(c)} size={[0.12, h as number, 0.06]} radius={0.02} material={glossy(c as string)} position={[-0.15 + i * 0.18, -0.28 + (h as number) / 2, 0.05]} />
        ))}
        <Tube points={[[-0.4, -0.18, 0.08], [-0.1, 0.0, 0.08], [0.12, -0.05, 0.08], [0.38, 0.24, 0.08]]} r={0.022} material={glossy(G.green)} />
      </group>
      {/* Globe with magnifier, lower right */}
      <group position={[1.6, -0.95, 0.35]}>
        <Ball r={0.32} material={glossy(G.blue)} />
        <mesh position={[0.22, -0.18, 0.25]} rotation={[0, 0, 0]} material={glossy(G.blue)}>
          <torusGeometry args={[0.12, 0.03, 12, 32]} />
        </mesh>
        <Limb a={[0.3, -0.27, 0.25]} b={[0.45, -0.42, 0.25]} r={0.035} material={glossy(G.yellow)} />
      </group>
    </group>
  );
}
