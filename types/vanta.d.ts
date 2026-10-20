/** Vanta ships no types. Only the shader base is used (components/aurelius-site/vantaFog.ts). */
declare module "vanta/src/_shaderBase.js" {
  export type VantaEffect = { destroy(): void; setOptions(options: Record<string, unknown>): void };
  export const VANTA: { register(name: string, effect: unknown): (options: Record<string, unknown>) => VantaEffect };
  export default class ShaderBase {
    constructor(options: Record<string, unknown>);
    uniforms: Record<string, { type: string; value: unknown }>;
    options: Record<string, unknown>;
  }
}
