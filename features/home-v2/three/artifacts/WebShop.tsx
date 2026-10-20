"use client";

import { AU } from "@/lib/design/aurelius";
import * as THREE from "three";
import { clay, glossy } from "../materials/materials";
import { palette } from "../materials/palette";
import { extrude, memo } from "./geometry";
import { Ball, Box, Limb, Mesh } from "./parts";

const w = palette.web;

/** A crew-neck t-shirt, front view: short sleeves, scooped neck. */
function shirtShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.1, 0.3);
  s.quadraticCurveTo(0, 0.19, 0.1, 0.3);
  s.lineTo(0.2, 0.3);
  s.quadraticCurveTo(0.27, 0.28, 0.38, 0.17);
  s.lineTo(0.3, 0.06);
  s.lineTo(0.21, 0.12);
  s.lineTo(0.21, -0.27);
  s.quadraticCurveTo(0.21, -0.31, 0.17, -0.31);
  s.lineTo(-0.17, -0.31);
  s.quadraticCurveTo(-0.21, -0.31, -0.21, -0.27);
  s.lineTo(-0.21, 0.12);
  s.lineTo(-0.3, 0.06);
  s.lineTo(-0.38, 0.17);
  s.quadraticCurveTo(-0.27, 0.28, -0.2, 0.3);
  s.closePath();
  return s;
}

/** The cart basket in side profile: wider at the top, with three slots cut through like wire panels. */
function basketShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.24, 0);
  s.lineTo(0.2, 0);
  s.lineTo(0.3, 0.34);
  s.lineTo(-0.3, 0.34);
  s.closePath();
  for (const x of [-0.13, 0, 0.13]) {
    const h = new THREE.Path();
    h.moveTo(x - 0.035, 0.07);
    h.lineTo(x + 0.035, 0.07);
    h.lineTo(x + 0.045, 0.27);
    h.lineTo(x - 0.045, 0.27);
    h.closePath();
    s.holes.push(h);
  }
  return s;
}

/** The shopping bag: a slightly tapered body, wider at the bottom. */
function bagShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.3, 0);
  s.lineTo(0.3, 0);
  s.lineTo(0.25, 0.6);
  s.lineTo(-0.25, 0.6);
  s.closePath();
  return s;
}

/** A shopping cart with an "add" badge: slotted basket, push handle, frame and four wheels. */
function Cart() {
  const basket = memo("web-cart-basket", () => extrude(basketShape(), 0.36, 0.035, 3, 4));
  const blue = clay(w.cart, { roughness: 0.4, clearcoat: 0.4 });
  const wheel = clay(w.wheel, { roughness: 0.5 });
  return (
    <group>
      <Mesh geometry={basket} material={blue} />
      {/* Push handle: rising from the back, grip across */}
      <Limb a={[-0.3, 0.32, 0.17]} b={[-0.44, 0.48, 0.17]} r={0.03} material={blue} />
      <Limb a={[-0.3, 0.32, -0.17]} b={[-0.44, 0.48, -0.17]} r={0.03} material={blue} />
      <Limb a={[-0.44, 0.48, -0.22]} b={[-0.44, 0.48, 0.22]} r={0.045} material={wheel} />
      {/* Frame under the basket and the wheels */}
      <Limb a={[-0.22, -0.02, 0]} b={[-0.18, -0.12, 0]} r={0.025} material={blue} />
      <Limb a={[-0.2, -0.12, -0.16]} b={[0.2, -0.12, -0.16]} r={0.025} material={blue} />
      <Limb a={[-0.2, -0.12, 0.16]} b={[0.2, -0.12, 0.16]} r={0.025} material={blue} />
      {([[-0.16, 0.16], [-0.16, -0.16], [0.16, 0.16], [0.16, -0.16]] as const).map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -0.18, z]} rotation={[Math.PI / 2, 0, 0]} material={wheel} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 20]} />
        </mesh>
      ))}
      {/* "Add" badge: a green disc with a white plus, over the basket's corner */}
      <group position={[0.3, 0.46, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={glossy(w.badge, { roughness: 0.25 })} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 32]} />
        </mesh>
        <Box size={[0.13, 0.035, 0.03]} radius={0.012} material={clay(w.buttonText)} position={[0, 0, 0.04]} />
        <Box size={[0.035, 0.13, 0.03]} radius={0.012} material={clay(w.buttonText)} position={[0, 0, 0.04]} />
      </group>
    </group>
  );
}

/** ref-web-shop.png, adapted: a browser window with a t-shirt product card and an add-to-cart button, a cart, a shopping bag and a magnifier. */
export function WebShop() {
  const shirt = memo("web-shirt", () => extrude(shirtShape(), 0.08, 0.035, 4, 10));
  const bag = memo("web-bag-body", () => extrude(bagShape(), 0.24, 0.05, 4, 4));
  const textBar = clay(w.textBar);
  const handle = clay(w.handle, { roughness: 0.45 });
  return (
    <group position={[0, -0.05, 0]}>
      {/* Window: light body, grey-blue title bar with three dots */}
      <Box size={[1.95, 1.45, 0.16]} radius={0.09} material={clay(w.window)} />
      <Box size={[1.95, 0.3, 0.2]} radius={0.09} material={clay(w.bar)} position={[0, 0.6, 0]} />
      {w.dots.map((d, i) => (
        <Ball key={d} r={0.06} material={glossy(d, { roughness: 0.3 })} position={[-0.76 + i * 0.17, 0.61, 0.1]} scale={[1, 1, 0.7]} />
      ))}
      {/* Product card with the t-shirt */}
      <Box size={[0.98, 0.82, 0.1]} radius={0.08} material={clay(w.card)} position={[-0.36, -0.08, 0.1]} />
      <group position={[-0.37, -0.06, 0.26]} rotation={[0, -0.12, 0]}>
        <Mesh geometry={shirt} material={clay(w.shirt, { roughness: 0.5, clearcoat: 0.25 })} />
        <Limb a={[-0.085, 0.29, 0.07]} b={[0, 0.215, 0.07]} r={0.018} material={clay(w.collar)} />
        <Limb a={[0, 0.215, 0.07]} b={[0.085, 0.29, 0.07]} r={0.018} material={clay(w.collar)} />
      </group>
      {/* Product copy and the add-to-cart button */}
      <Limb a={[0.3, 0.16, 0.1]} b={[0.68, 0.12, 0.1]} r={0.038} material={textBar} />
      <Limb a={[0.3, 0.03, 0.1]} b={[0.56, 0.0, 0.1]} r={0.038} material={textBar} />
      <group position={[0.48, -0.2, 0.11]}>
        <Box size={[0.46, 0.15, 0.07]} radius={0.07} material={glossy(w.button, { roughness: 0.3 })} />
        <Box size={[0.08, 0.025, 0.02]} radius={0.01} material={clay(w.buttonText)} position={[-0.14, 0, 0.04]} />
        <Box size={[0.025, 0.08, 0.02]} radius={0.01} material={clay(w.buttonText)} position={[-0.14, 0, 0.04]} />
        <Box size={[0.2, 0.03, 0.02]} radius={0.012} material={clay(w.buttonText)} position={[0.05, 0, 0.04]} />
      </group>
      {/* Cart, over the window's top-right corner */}
      <group position={[0.74, 0.5, 0.34]} rotation={[0.1, -0.45, 0]} scale={0.95}>
        <Cart />
      </group>
      {/* Shopping bag with two rounded handles */}
      <group position={[0.74, -1.02, 0.42]} rotation={[0, -0.35, 0]}>
        <Mesh geometry={bag} material={clay(w.bag, { roughness: 0.5 })} />
        {[0.09, -0.09].map((z) => (
          <mesh key={z} position={[0, 0.6, z]} material={handle} castShadow>
            <torusGeometry args={[0.16, 0.036, 12, 32, Math.PI]} />
          </mesh>
        ))}
      </group>
      {/* Magnifier: grey ring, pale glass, blue handle with a grey collar */}
      <group position={[-0.66, -0.66, 0.38]} rotation={[0.15, 0.35, 0.65]}>
        <mesh material={handle} castShadow>
          <torusGeometry args={[0.2, 0.06, 16, 48]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={glossy(AU.cream100, { transparent: true, opacity: 0.35, roughness: 0.05 })}>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
        </mesh>
        <Limb a={[0, -0.26, 0]} b={[0, -0.32, 0]} r={0.065} material={handle} />
        <Limb a={[0, -0.36, 0]} b={[0, -0.66, 0]} r={0.07} material={clay(w.lensHandle)} />
      </group>
    </group>
  );
}
