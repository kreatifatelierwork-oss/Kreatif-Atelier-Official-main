"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { config } from "@/lib/config";
import { scrollStore } from "@/lib/scroll/store";

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uRamp[5];
uniform vec3 uDark;
// x: vertex height (0 bottom – 1 top), y: curvature, z: glow width — all in viewport heights.
uniform vec3 uDome;
uniform float uAspect;
uniform float uTime;
uniform float uSway;
varying vec2 vUv;

vec3 ramp(float t) {
  vec3 c = uRamp[0];
  c = mix(c, uRamp[1], smoothstep(0.08, 0.34, t));
  c = mix(c, uRamp[2], smoothstep(0.26, 0.58, t));
  c = mix(c, uRamp[3], smoothstep(0.5, 0.8, t));
  c = mix(c, uRamp[4], smoothstep(0.72, 1.0, t));
  return c;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float x = vUv.x * 2.0 - 1.0;
  float y = vUv.y;
  // Portrait screens would pinch the glow into slivers; treat them as no narrower than 6:5.
  float aspect = max(uAspect, 1.2);
  float sway = (sin(x * 2.3 + uTime * 0.35) * 0.6 + sin(x * 5.1 - uTime * 0.22) * 0.4) * uSway;

  // The dark comes back as a dome rising from below; t is 0 in the dark, 1 on the open page.
  float slope = 4.0 * uDome.y * x / aspect;
  float t = (y - (uDome.x - uDome.y * x * x) + sway) / sqrt(1.0 + slope * slope) / uDome.z;

  gl_FragColor = vec4(mix(uDark, ramp(t), smoothstep(-0.1, 0.07, t)), 1.0);
  #include <colorspace_fragment>
  // Dither: long soft gradients band badly in 8 bits.
  gl_FragColor.rgb += (hash(gl_FragCoord.xy) - 0.5) / 128.0;
}
`;

/**
 * The canvas layer behind the home page's light block: it paints the page colour, and at the
 * block's end the dark rises from below as a dome with a burning rim. Driven only by `veil.exit`
 * in the scroll store (plus time for a slight sway).
 */
export function Veil({ animated }: { animated: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const aspect = useThree((s) => s.size.width / s.size.height);

  const material = useMemo(() => {
    const { ramp, dark, sway } = config.front.veil;
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uRamp: { value: ramp.map((hex) => new THREE.Color(hex)) },
        uDark: { value: new THREE.Color(dark) },
        uDome: { value: new THREE.Vector3() },
        uAspect: { value: 1 },
        uTime: { value: 0 },
        uSway: { value: animated ? sway : 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
  }, [animated]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const u = (mesh.material as THREE.ShaderMaterial).uniforms;
    const { dome } = config.front.veil;
    const { exit } = scrollStore.getState().veil;

    // The dome's rim tracks the light block's bottom edge, a little ahead of it.
    const edge = -config.front.exitLead + (1 + config.front.exitLead) * exit;
    u.uDome.value.set(edge + dome.curve + dome.margin, dome.curve, dome.width);
    u.uAspect.value = aspect;
    if (animated) u.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef} material={material} frustumCulled={false} renderOrder={10}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
