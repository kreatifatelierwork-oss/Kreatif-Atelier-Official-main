"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { custom, glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { extrude, memo, roundedRect, roundedTriangle, svgShapes, youtubeShape } from "./geometry";
import { glyphPaths } from "./glyphPaths";
import { marketplaceGlyphs } from "./marketplaceGlyphs";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { Mesh } from "./parts";

export type SocialId = "facebook" | "twitter" | "instagram" | "youtube" | "tiktok" | "linkedin" | "whatsapp" | "amazon" | "flipkart";

/** Flip to show the old Twitter bird instead of the current X mark. */
export const useLegacyTwitterBird = false;

/*
 * Proportions, from ref-socials-cluster.jpg: edge 1, corner radius ≈ 22% of the edge, depth ≈ 33%,
 * bevel ≈ 6% so the rim catches a highlight. All tiles share one geometry.
 */
const EDGE = 1;
const BEVEL = 0.06;
const DEPTH = 0.2; // + 2 × bevel = 0.32 total
const FRONT = DEPTH / 2 + BEVEL;

const tileGeometry = () => memo("social-tile", () => extrude(roundedRect(EDGE - 2 * BEVEL, EDGE - 2 * BEVEL, 0.22 - BEVEL), DEPTH, BEVEL, 3, 6));
/** YouTube is not a square tile: it keeps the logo's own wide rounded rectangle, same depth and bevel. */
const youtubeGeometry = () => memo("social-tile-youtube", () => extrude(youtubeShape(EDGE * 1.1 - 2 * BEVEL), DEPTH, BEVEL, 3, 8));

/** The Facebook "f" alone, as on the reference tile (24-unit box). */
const FACEBOOK_F = "M13.5 22V13.6H16.3L16.75 10.3H13.5V8.2C13.5 7.25 13.78 6.6 15.15 6.6H16.9V3.65C16.6 3.6 15.55 3.5 14.35 3.5C11.83 3.5 10.1 5.04 10.1 7.86V10.3H7.25V13.6H10.1V22Z";

function instagramGlyph() {
  const outer = roundedRect(0.64, 0.64, 0.19);
  outer.holes.push(new THREE.Path(roundedRect(0.5, 0.5, 0.125).getPoints(24)));
  const ring = new THREE.Shape();
  ring.absarc(0, 0, 0.165, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.1, 0, Math.PI * 2, true);
  ring.holes.push(hole);
  const dot = new THREE.Shape();
  dot.absarc(0.165, 0.165, 0.04, 0, Math.PI * 2, false);
  return [outer, ring, dot];
}

/**
 * Letterforms for the marketplace tiles, from Droid Sans Bold (Google, Apache 2.0; only the "a" and "f" are
 * kept, in marketplaceGlyphs.json). Returned centred on (cx, cy) at the given height.
 */
const glyphFont = new Font(marketplaceGlyphs as unknown as ConstructorParameters<typeof Font>[0]);
function letter(char: string, height: number, cx: number, cy: number, shear = 0) {
  const shapes = glyphFont.generateShapes(char, 1);
  const pts = shapes.flatMap((sh) => sh.getPoints());
  const box = new THREE.Box2().setFromPoints(pts);
  const k = height / (box.max.y - box.min.y);
  const mx = (box.min.x + box.max.x) / 2;
  const my = (box.min.y + box.max.y) / 2;
  const map = (p: THREE.Vector2) => new THREE.Vector2((p.x - mx) * k + (p.y - my) * k * shear + cx, (p.y - my) * k + cy);
  return shapes.map((sh) => {
    const out = new THREE.Shape(sh.getPoints(16).map(map));
    out.holes = sh.holes.map((h) => new THREE.Path(h.getPoints(16).map(map)));
    return out;
  });
}

/** Amazon: the cream "a", high on the tile, as on the app icon. */
function amazonA() {
  return letter("a", 0.4, -0.01, 0.1);
}

/**
 * Amazon's smile: a shallow arc under the "a", thickest in the middle and tapering at both ends, finished
 * on the right with the curled arrowhead.
 */
function amazonSmile() {
  const x0 = -0.33;
  const x1 = 0.26;
  const steps = 32;
  const base = (t: number) => -0.2 - 0.075 * Math.sin(Math.PI * t * 0.9) + 0.03 * t * t;
  const thick = (t: number) => 0.012 + 0.058 * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), 0.8);
  const top: THREE.Vector2[] = [];
  const bottom: THREE.Vector2[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    top.push(new THREE.Vector2(x, base(t) + thick(t) / 2));
    bottom.push(new THREE.Vector2(x, base(t) - thick(t) / 2));
  }
  const smile = new THREE.Shape([...top, ...bottom.reverse()]);
  // The arrowhead: a concave-backed point at the smile's end, aimed up and to the right along the curve.
  const tipBase = base(1);
  const slope = (base(1) - base(0.95)) / ((x1 - x0) * 0.05);
  const ang = Math.atan(slope) + 0.75;
  const dir = new THREE.Vector2(Math.cos(ang), Math.sin(ang));
  const nrm = new THREE.Vector2(-dir.y, dir.x);
  const at = (along: number, across: number) => new THREE.Vector2(x1 - 0.02 + dir.x * along + nrm.x * across, tipBase + dir.y * along + nrm.y * across);
  const head = new THREE.Shape();
  const p0 = at(0.085, 0);
  const left = at(-0.01, 0.06);
  const right = at(-0.01, -0.055);
  const notch = at(0.015, 0);
  head.moveTo(p0.x, p0.y);
  head.lineTo(left.x, left.y);
  head.quadraticCurveTo(notch.x, notch.y, right.x, right.y);
  head.closePath();
  return [smile, head];
}

/** Flipkart: the blue italic "f", set right of centre, with three speed lines streaming from its crossbar. */
function flipkartF() {
  const height = 0.62;
  const shapes = letter("f", height, 0.07, -0.01, 0.24);
  const box = new THREE.Box2().setFromPoints(shapes.flatMap((sh) => sh.getPoints()));
  const h = box.max.y - box.min.y;
  const right = box.min.x + 0.07;
  const lines = [
    { y: 0.665, len: 0.25, w: 0.03 },
    { y: 0.615, len: 0.18, w: 0.026 },
    { y: 0.565, len: 0.28, w: 0.03 },
  ].map(({ y, len, w }) => {
    const cy = box.min.y + h * y;
    const line = new THREE.Shape();
    line.moveTo(right, cy + w / 2);
    line.lineTo(right - len, cy + w * 0.08);
    line.lineTo(right - len, cy - w * 0.08);
    line.lineTo(right, cy - w / 2);
    line.closePath();
    return line;
  });
  return [...shapes, ...lines];
}

function glyphShapes(id: SocialId) {
  switch (id) {
    case "facebook":
      return svgShapes(FACEBOOK_F, 0.66);
    case "twitter":
      return svgShapes(useLegacyTwitterBird ? glyphPaths.twitterBird : glyphPaths.x, useLegacyTwitterBird ? 0.66 : 0.5);
    case "instagram":
      return instagramGlyph();
    case "youtube":
      return [roundedTriangle(0.21, 0.035)];
    case "tiktok":
      return svgShapes(glyphPaths.tiktok, 0.6);
    case "linkedin":
      // The app icon's white "in" alone: the letters are the holes cut in the square logo.
      return svgShapes(glyphPaths.linkedin, 0.8).flatMap((sh) => sh.holes.map((h) => new THREE.Shape(h.getPoints())));
    case "whatsapp":
      return svgShapes(glyphPaths.whatsapp, 0.6);
    case "amazon":
      return amazonA();
    case "flipkart":
      return flipkartF();
  }
}

const glyphMaterial = () => glossy(palette.socials.glyph, { roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.2 });

/** Instagram's front: the official gradient, yellow at the lower left through orange and magenta to purple-blue at the top. */
function instagramMaterial() {
  return custom("instagram-gradient", () => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const [y, o, p, v, b] = palette.socials.instagram;
    const grad = g.createRadialGradient(30, 250, 8, 30, 250, 380);
    grad.addColorStop(0, y);
    grad.addColorStop(0.18, o);
    grad.addColorStop(0.46, p);
    grad.addColorStop(0.78, v);
    grad.addColorStop(1, b);
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.offset.set(0.5, 0.5);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    return new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 });
  });
}

function tileMaterial(id: SocialId) {
  if (id === "instagram") return instagramMaterial();
  const color = palette.socials[id];
  return id === "tiktok" || id === "twitter" || id === "amazon" ? glossy(color, { envMapIntensity: 0.05, roughness: 0.3, specularIntensity: 0.25, clearcoat: 0.25, clearcoatRoughness: 0.2 }) : glossy(color);
}

/** One glossy social tile with its raised white mark. Pure geometry and material: no motion. */
export function SocialTile({ id }: { id: SocialId }) {
  const glyph = useMemo(() => memo(`glyph-${id}-${useLegacyTwitterBird}`, () => extrude(glyphShapes(id), 0.03, 0.012, 1, id === "instagram" || id === "amazon" || id === "flipkart" ? 32 : 6)), [id]);
  const z = FRONT + 0.012;

  return (
    <group>
      <Mesh geometry={id === "youtube" ? youtubeGeometry() : tileGeometry()} material={tileMaterial(id)} />
      {id === "tiktok" ? (
        <>
          <Mesh geometry={glyph} material={glossy(palette.socials.tiktokCyan)} position={[-0.028, 0.022, z - 0.012]} />
          <Mesh geometry={glyph} material={glossy(palette.socials.tiktokRed)} position={[0.028, -0.022, z - 0.006]} />
          <Mesh geometry={glyph} material={glyphMaterial()} position={[0, 0, z + 0.004]} />
        </>
      ) : (
        <Mesh geometry={glyph} material={id === "flipkart" ? glossy(palette.socials.flipkartGlyph) : id === "amazon" ? glossy(palette.socials.amazonGlyph, { roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.2 }) : glyphMaterial()} position={[id === "youtube" ? 0.02 : 0, 0, z]} />
      )}
      {id === "amazon" && <Mesh geometry={memo("glyph-amazon-smile", () => extrude(amazonSmile(), 0.03, 0.012, 1, 12))} material={glossy(palette.socials.amazonSmile)} position={[0, 0, z]} />}
    </group>
  );
}
