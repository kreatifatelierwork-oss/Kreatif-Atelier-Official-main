import * as THREE from "three";
import ShaderBase, { VANTA, type VantaEffect } from "vanta/src/_shaderBase.js";
import { config } from "@/lib/config";
import { AU, AU_UI } from "@/lib/design/aurelius";

/**
 * The Aurelius background: Vanta's FOG (after Patricio Gonzalez Vivo, thebookofshaders.com/13) in the
 * cream, rose and gold of the theme, with one addition: the fog parts and warms around the pointer
 * while it moves, and settles back when it rests. Built on Vanta's shader base, so Vanta keeps the
 * renderer, resizing, mouse easing and clean-up.
 */
const fragmentShader = /* glsl */ `
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float iDpr;
uniform float uActive;
uniform float uSwirl;
uniform float uGlow;
uniform float uRadius;

uniform float blurFactor;
uniform vec3 baseColor;
uniform vec3 lowlightColor;
uniform vec3 midtoneColor;
uniform vec3 highlightColor;
uniform vec3 glowColor;
uniform float zoom;

float random(in vec2 st) {
  return fract(sin(dot(st, vec2(0.129898, 0.78233))) * 437.585453123);
}

float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm(in vec2 st) {
  float v = 0.0;
  float a = blurFactor;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(st);
    st = rot * st * 2.0 + shift;
    a *= (1.0 - blurFactor);
  }
  return v;
}

void main() {
  // Work in CSS pixels / scale, the same units Vanta gives iResolution and iMouse.
  vec2 px = gl_FragCoord.xy / iDpr;
  vec2 mouse = vec2(iMouse.x, iResolution.y - iMouse.y);
  vec2 toMouse = px - mouse;
  float near = exp(-dot(toMouse, toMouse) / (uRadius * uRadius)) * uActive;

  vec2 st = px / iResolution.xy * 3.0;
  st.x *= 0.7 * iResolution.x / iResolution.y;
  st *= zoom;
  // The pointer stirs the fog: a soft twist around it.
  float ang = near * uSwirl;
  vec2 c = mouse / iResolution.xy * 3.0;
  c.x *= 0.7 * iResolution.x / iResolution.y;
  c *= zoom;
  st = c + mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * (st - c);

  vec2 q = vec2(fbm(st), fbm(st + vec2(1.0)));
  vec2 dir = vec2(0.15, 0.126);
  vec2 r = vec2(fbm(st + q + vec2(1.7, 9.2) + dir.x * iTime), fbm(st + q + vec2(8.3, 2.8) + dir.y * iTime));
  float f = fbm(st + r);

  vec3 color = mix(baseColor, lowlightColor, clamp(f * f * 4.0, 0.0, 1.0));
  color = mix(color, midtoneColor, clamp(length(q), 0.0, 1.0));
  color = mix(color, highlightColor, clamp(length(r.x), 0.0, 1.0));
  vec3 finalColor = mix(baseColor, color, f * f * f + 0.6 * f * f + 0.5 * f);
  // A warm light where the pointer is.
  finalColor = mix(finalColor, glowColor, near * uGlow);
  // The colours arrive in linear space (three converts the hex values): back to sRGB for the screen.
  gl_FragColor = linearToOutputTexel(vec4(finalColor, 1.0));
}
`;

const { background: bg } = config;

class AureliusFog extends ShaderBase {
  declare fragmentShader: string;
  declare defaultOptions: Record<string, unknown>;
  private lastMove = 0;

  onMouseMove() {
    this.lastMove = performance.now();
  }

  /** Called by Vanta every frame: the pointer's effect fades in while it moves and out when it rests. */
  onUpdate() {
    const u = this.uniforms.uActive;
    const moving = performance.now() - this.lastMove < bg.restAfterMs;
    const v = u.value as number;
    u.value = v + ((moving ? 1 : 0) - v) * (moving ? bg.fadeIn : bg.fadeOut);
  }
}
AureliusFog.prototype.fragmentShader = fragmentShader;
AureliusFog.prototype.defaultOptions = {
  baseColor: AU_UI.surface,
  lowlightColor: AU.cream200,
  midtoneColor: AU.rose200,
  highlightColor: AU.gold200,
  glowColor: AU.gold300,
  blurFactor: bg.blur,
  speed: bg.speed,
  zoom: bg.zoom,
  scale: bg.scale,
  scaleMobile: bg.scale,
  mouseControls: true,
  touchControls: false,
  gyroControls: false,
  mouseEase: true,
  uActive: 0,
  uSwirl: bg.swirl,
  uGlow: bg.glow,
  uRadius: bg.radius,
};

const create = VANTA.register("AURELIUS_FOG", AureliusFog);

export function createAureliusFog(el: HTMLElement): VantaEffect {
  return create({ el, THREE });
}
