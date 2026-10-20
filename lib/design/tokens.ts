/**
 * The JavaScript half of the design tokens: values that drive motion in code (springs, parallax,
 * float) and the text/surface pairs checked for contrast. CSS values live in
 * styles/design/tokens.css; where both need a value it is defined there and mirrored here with the
 * same name. Nothing else in the code base hard-codes these numbers.
 */

/** Springs (emil-design-eng: springs for floating and pointer-driven motion; they keep velocity when interrupted). */
export const springs = {
  /** Mouse parallax: follows the pointer with a little momentum, settles without overshoot. */
  parallax: { stiffness: 120, damping: 20, mass: 1 },
  /** Artifacts arriving after the page content: a soft settle with slight bounce. */
  arrive: { stiffness: 170, damping: 18, mass: 1 },
} as const;

/** Floating artifacts: idle drift and pointer parallax limits, scaled by each artifact's depth (0–1). */
export const float = {
  /** Idle vertical drift amplitude (px) and gentle rotation (deg). */
  driftPx: 10,
  driftDeg: 2.5,
  /** One idle loop, in seconds (matches --ds-dur-ambient, 6s; each artifact adds its own phase). */
  periodS: 6,
  /** Parallax range at depth 1: translation (px) and tilt (deg). Background artifacts use less. */
  parallaxPx: 22,
  parallaxDeg: 7,
  /** Pixel ratio cap for artifact canvases. */
  maxDpr: 1.75,
} as const;


/** Durations in ms, mirroring --ds-dur-* (for code that schedules rather than transitions). */
export const durations = { press: 120, fast: 150, base: 250, slow: 500, stagger: 60 } as const;

/** Surface and text colours, mirroring tokens.css, for the contrast check. */
export const palette = {
  surface: "#e6e8ee",
  surfaceRaised: "#eceef3",
  surfaceSunken: "#dfe2e9",
  text: "#0d1b33",
  textMuted: "#45526a",
  textSubtle: "#535e76",
  brand: "#440000",
  navy: "#0d2750",
  blue: "#2f6bf0",
  onAccent: "#ffffff",
} as const;

/** WCAG relative luminance and contrast ratio. */
function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Every text-on-surface pairing the system uses, with the AA minimum it must meet. */
export const contrastPairs: { text: keyof typeof palette; on: keyof typeof palette; min: number }[] = [
  ...(["surface", "surfaceRaised", "surfaceSunken"] as const).flatMap((on) => [
    { text: "text" as const, on, min: 4.5 },
    { text: "textMuted" as const, on, min: 4.5 },
    { text: "textSubtle" as const, on, min: 4.5 },
    { text: "brand" as const, on, min: 4.5 },
    { text: "navy" as const, on, min: 4.5 },
  ]),
  { text: "onAccent", on: "blue", min: 4.5 },
  { text: "onAccent", on: "brand", min: 4.5 },
  { text: "onAccent", on: "navy", min: 4.5 },
];
