"use client";

import { AU, alpha } from "@/lib/design/aurelius";
import { useMemo } from "react";
import * as THREE from "three";
import { custom, glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { extrude, memo } from "./geometry";

const f = palette.film;
const WIDTH = 0.78;
/** Length of strip covered by one repeat of the texture (one frame). */
const FRAME_LENGTH = 0.42;

/**
 * The film's face, one frame per repeat: black edges with see-through sprocket holes, a clear grey
 * frame in the middle, thin black bars between frames.
 */
function filmMaterial() {
  return custom(`film-strip-${f.base}`, () => {
    const L = 512; // along the strip
    const W = 512; // across the strip
    const cv = document.createElement("canvas");
    cv.width = L;
    cv.height = W;
    const g = cv.getContext("2d")!;
    g.fillStyle = f.base;
    g.fillRect(0, 0, L, W);
    // Sprocket holes, four per frame on each edge, cut through.
    g.globalCompositeOperation = "destination-out";
    const hole = (x: number, y: number) => {
      g.beginPath();
      g.roundRect(x, y, 70, 52, 12);
      g.fill();
    };
    for (let i = 0; i < 4; i++) {
      hole(i * 128 + 29, 22);
      hole(i * 128 + 29, W - 74);
    }
    // The frame: clear, slightly grey, brighter toward one corner like the reference.
    g.clearRect(26, 104, L - 52, W - 208);
    g.globalCompositeOperation = "source-over";
    const grad = g.createLinearGradient(26, 104, L - 26, W - 104);
    grad.addColorStop(0, alpha(AU.cream100, 0.55));
    grad.addColorStop(0.6, alpha(AU.cream300, 0.45));
    grad.addColorStop(1, alpha(AU.gold300, 0.55));
    g.fillStyle = grad;
    g.fillRect(26, 104, L - 52, W - 208);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    return new THREE.MeshPhysicalMaterial({ map: tex, transparent: true, alphaTest: 0.02, side: THREE.DoubleSide, roughness: 0.25, clearcoat: 0.6, clearcoatRoughness: 0.15, depthWrite: false });
  });
}

/** The path the strip takes: off the reel's core, one curl, then a long sweep down toward the viewer. */
const PATH: [number, number, number][] = [
  [-0.62, 0.98, 0.0],
  [-0.3, 0.68, 0.02],
  [0.02, 0.72, 0.06],
  [0.14, 1.02, 0.1],
  [-0.08, 1.16, 0.12],
  [-0.26, 0.92, 0.16],
  [-0.08, 0.52, 0.28],
  [0.3, 0.2, 0.6],
  [0.62, -0.3, 1.1],
  [0.78, -0.95, 1.6],
  [0.74, -1.6, 2.4],
  [0.6, -2.2, 3.1],
];

/**
 * A ribbon along PATH. Near the reel the strip's width runs along the reel axis (so it curls like
 * film coming off a spool); further on it turns to face the viewer.
 */
function stripGeometry() {
  return memo("film-strip-ribbon", () => {
    const curve = new THREE.CatmullRomCurve3(PATH.map((p) => new THREE.Vector3(...p)), false, "centripetal");
    const steps = 360;
    const nearAxis = new THREE.Vector3(0.3, 0, 0.95).normalize();
    const farAxis = new THREE.Vector3(1, 0, 0.15).normalize();
    const total = curve.getLength();
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const p = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      const k = THREE.MathUtils.smoothstep(t, 0.32, 0.6);
      const axis = nearAxis.clone().lerp(farAxis, k);
      const side = axis.sub(tan.clone().multiplyScalar(tan.dot(axis))).normalize().multiplyScalar(WIDTH / 2);
      pos.push(p.x - side.x, p.y - side.y, p.z - side.z, p.x + side.x, p.y + side.y, p.z + side.z);
      const u = (t * total) / FRAME_LENGTH;
      uv.push(u, 0, u, 1);
      if (i < steps) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  });
}

/** One reel flange: a disc with six oval cut-outs and a hub ring of five small holes. */
function flangeGeometry() {
  return memo("film-reel-flange", () => {
    const s = new THREE.Shape();
    s.absarc(0, 0, 0.9, 0, Math.PI * 2, false);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.3;
      const h = new THREE.Path();
      h.absellipse(Math.cos(a) * 0.56, Math.sin(a) * 0.56, 0.24, 0.19, 0, Math.PI * 2, true, a);
      s.holes.push(h);
    }
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const h = new THREE.Path();
      h.absarc(Math.cos(a) * 0.17, Math.sin(a) * 0.17, 0.045, 0, Math.PI * 2, true);
      s.holes.push(h);
    }
    const centre = new THREE.Path();
    centre.absarc(0, 0, 0.06, 0, Math.PI * 2, true);
    s.holes.push(centre);
    return extrude(s, 0.03, 0.012, 2, 24);
  });
}

/** ref-film-reel.png: a grey metal film reel with a black strip curling off it and sweeping toward the viewer. */
export function FilmStrip() {
  const strip = stripGeometry();
  const film = useMemo(() => filmMaterial(), []);
  const metal = glossy(f.reel, { metalness: 0.45, roughness: 0.3, clearcoat: 0.5 });
  const wound = glossy(f.base, { roughness: 0.35 });
  return (
    <group position={[-0.05, 0.35, 0]} scale={0.95}>
      <group position={[-0.85, 1.25, -0.1]} rotation={[-0.12, 0.42, 0.05]} scale={0.8}>
        <mesh geometry={flangeGeometry()} material={metal} position={[0, 0, 0.16]} castShadow />
        <mesh geometry={flangeGeometry()} material={metal} position={[0, 0, -0.16]} castShadow />
        {/* Hub, and the film wound around it */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={metal}>
          <cylinderGeometry args={[0.24, 0.24, 0.3, 32]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={wound}>
          <cylinderGeometry args={[0.4, 0.4, 0.26, 40, 1, true]} />
        </mesh>
      </group>
      <mesh geometry={strip} material={film} renderOrder={1} />
    </group>
  );
}
