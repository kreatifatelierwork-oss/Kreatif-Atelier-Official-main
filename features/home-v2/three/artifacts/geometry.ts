import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/** Shape and geometry helpers shared by the artifacts. Geometries are cached by their parameters. */
const cache = new Map<string, THREE.BufferGeometry>();
export function memo<T extends THREE.BufferGeometry>(key: string, make: () => T): T {
  let g = cache.get(key) as T | undefined;
  if (!g) {
    g = make();
    cache.set(key, g);
  }
  return g;
}

/** The YouTube logo's body: a rounded rectangle 1.43 : 1, corners about a fifth of its height. */
export function youtubeShape(width: number) {
  const h = width / 1.43;
  return roundedRect(width, h, h * 0.22);
}

export function roundedRect(w: number, h: number, r: number, cx = 0, cy = 0) {
  const s = new THREE.Shape();
  const x = cx - w / 2;
  const y = cy - h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

export function roundedRectPath(w: number, h: number, r: number, cx = 0, cy = 0) {
  const p = new THREE.Path();
  const s = roundedRect(w, h, r, cx, cy);
  p.curves = s.curves;
  return p;
}

/** Extrude a shape centred on z = 0. `bevel` is both size and thickness. */
export function extrude(shapes: THREE.Shape | THREE.Shape[], depth: number, bevel: number, segments = 4, curveSegments = 12) {
  const g = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: segments,
    curveSegments,
  });
  g.translate(0, 0, -depth / 2);
  g.computeVertexNormals();
  return g;
}

/** An annulus sector from angle a0 to a1 (radians, CCW from +x). */
export function ringSector(r0: number, r1: number, a0: number, a1: number) {
  const s = new THREE.Shape();
  s.absarc(0, 0, r1, a0, a1, false);
  s.absarc(0, 0, r0, a1, a0, true);
  s.closePath();
  return s;
}

/** An upward arrow: shaft width sw, total height h, head width hw, head height hh, base at y = 0. */
export function arrowShape(sw: number, h: number, hw: number, hh: number) {
  const s = new THREE.Shape();
  s.moveTo(-sw / 2, 0);
  s.lineTo(sw / 2, 0);
  s.lineTo(sw / 2, h - hh);
  s.lineTo(hw / 2, h - hh);
  s.lineTo(0, h);
  s.lineTo(-hw / 2, h - hh);
  s.lineTo(-sw / 2, h - hh);
  s.closePath();
  return s;
}

/** A gear with `teeth` rounded teeth and a round hole. */
export function gearShape(r: number, teeth: number, toothDepth: number, hole: number) {
  const s = new THREE.Shape();
  const steps = teeth * 16;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const phase = (i % 16) / 16;
    const t = 0.5 + 0.5 * Math.tanh(6 * Math.sin(phase * Math.PI * 2));
    const rr = r + toothDepth * t;
    const x = Math.cos(a) * rr;
    const y = Math.sin(a) * rr;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  const h = new THREE.Path();
  h.absarc(0, 0, hole, 0, Math.PI * 2, true);
  s.holes.push(h);
  return s;
}

/** A triangle with rounded corners, pointing +x, centred on its centroid. */
export function roundedTriangle(size: number, r: number) {
  const pts = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((a) => new THREE.Vector2(Math.cos(a) * size, Math.sin(a) * size));
  const s = new THREE.Shape();
  for (let i = 0; i < 3; i++) {
    const p = pts[i];
    const prev = pts[(i + 2) % 3];
    const next = pts[(i + 1) % 3];
    const a = p.clone().add(prev.clone().sub(p).setLength(r * 1.7));
    const b = p.clone().add(next.clone().sub(p).setLength(r * 1.7));
    if (i === 0) s.moveTo(a.x, a.y);
    else s.lineTo(a.x, a.y);
    s.quadraticCurveTo(p.x, p.y, b.x, b.y);
  }
  s.closePath();
  return s;
}

/** Parse SVG path data (24×24 viewBox, y down) into shapes scaled to `size`, centred, y up. */
export function svgShapes(d: string, size: number) {
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}"/></svg>`);
  const shapes = data.paths.flatMap((p) => p.toShapes());
  const g = new THREE.ShapeGeometry(shapes);
  g.computeBoundingBox();
  const bb = g.boundingBox!;
  const span = Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y);
  const k = size / span;
  const cx = (bb.max.x + bb.min.x) / 2;
  const cy = (bb.max.y + bb.min.y) / 2;
  g.dispose();
  return shapes.map((sh) => {
    const pts = sh.extractPoints(6);
    const map = (v: THREE.Vector2) => new THREE.Vector2((v.x - cx) * k, -(v.y - cy) * k);
    const out = new THREE.Shape(pts.shape.map(map));
    out.holes = pts.holes.map((h) => new THREE.Path(h.map(map)));
    return out;
  });
}
