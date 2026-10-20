import { config } from "@/lib/config";
import { AU } from "@/lib/design/aurelius";
import * as THREE from "three";
import { natural } from "./palette";

/**
 * The material families, cached so every artifact that asks for the same colour shares one
 * material instance (no per-instance clones).
 *
 * Glossy plastic: social tiles, clapperboard, Google set. Clearcoated, low roughness.
 * Matte clay: people, blocks, arrows, boards. Rough, a faint sheen, a soft clearcoat.
 * Metal: chrome fittings, rims and collars.
 * Gold: any part coloured from the gold scale (gold-400 to gold-700), whatever family it asked for, is
 * polished gold metal (config.artifacts.goldMetal), so gold always reads as metal, never yellow plastic.
 */
const cache = new Map<string, THREE.Material>();

function cached<T extends THREE.Material>(key: string, make: () => T): T {
  let m = cache.get(key) as T | undefined;
  if (!m) {
    m = make();
    cache.set(key, m);
  }
  return m;
}

type Extra = Partial<THREE.MeshPhysicalMaterialParameters>;
const keyOf = (family: string, color: string, extra?: Extra) => `${family}:${color}:${extra ? JSON.stringify(extra) : ""}`;

const GOLDS = new Set<string>([AU.gold400, AU.gold500, AU.gold600, AU.gold700].map((c) => c.toLowerCase()));
const isGold = (color: string) => GOLDS.has(color.toLowerCase());

/** Polished gold: full metal, low roughness, so the warm studio light reflects as gold. */
export function gold(color: string = AU.gold500) {
  return cached(`gold:${color}`, () => new THREE.MeshPhysicalMaterial({ color, ...config.artifacts.goldMetal }));
}

export function glossy(color: string, extra?: Extra) {
  if (isGold(color)) return gold(color);
  return cached(keyOf("glossy", color, extra), () => new THREE.MeshPhysicalMaterial({ color, roughness: 0.22, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08, ...extra }));
}

export function clay(color: string, extra?: Extra) {
  if (isGold(color)) return gold(color);
  return cached(
    keyOf("clay", color, extra),
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.6,
        metalness: 0,
        clearcoat: 0.2,
        clearcoatRoughness: 0.55,
        sheen: 0.08,
        sheenRoughness: 0.8,
        sheenColor: new THREE.Color(AU.cream50),
        ...extra,
      }),
  );
}

/** Polished chrome for fittings, collars and rims. */
export function metal(color: string = natural.chrome, extra?: Extra) {
  if (isGold(color)) return gold(color);
  return cached(keyOf("metal", color, extra), () => new THREE.MeshPhysicalMaterial({ color, metalness: 0.9, roughness: 0.25, envMapIntensity: 1.4, ...extra }));
}

/** A material built once by the caller (textures, gradients), cached under a name. */
export function custom<T extends THREE.Material>(name: string, make: () => T): T {
  return cached(`custom:${name}`, make);
}
