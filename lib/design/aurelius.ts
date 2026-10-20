/**
 * The Aurelius colour scales for code (3D materials, canvas textures), mirroring
 * styles/design/aurelius-theme.css. lib/design/aurelius.test.ts keeps the two in step and checks
 * every text/surface pairing for WCAG AA.
 */
export const AU = {
  maroon950: "#24070a",
  maroon900: "#3a0c10",
  maroon800: "#5c0f14",
  maroon700: "#7a1c1e",
  maroon600: "#962a28",
  maroon500: "#b23b33",
  maroon400: "#cc5e52",
  gold700: "#8a6209",
  gold600: "#b07f0c",
  gold500: "#d4a017",
  gold400: "#e6b93a",
  gold300: "#f0cf6e",
  gold200: "#f7e3a1",
  /** Gold for text and links on cream (AA). */
  goldInk: "#7a5a0e",
  cream50: "#fdf9f5",
  cream100: "#f8f1eb",
  cream200: "#f1e6de",
  cream300: "#e6d7cd",
  rose200: "#efd3ca",
} as const;

/** The theme's surfaces and type (the `.theme-aurelius` overrides). */
export const AU_UI = {
  surface: "#f4ebe5",
  surfaceRaised: "#f9f2ed",
  surfaceSunken: "#ede1d9",
  text: AU.maroon900,
  textMuted: "#5d3a35",
  textSubtle: "#6e4a44",
  brand: AU.maroon800,
  link: AU.maroon600,
  onAccent: AU.cream50,
  ctaInk: AU.maroon900,
} as const;

/** "#rrggbb" + alpha → "rgba(…)", for canvas drawing from the scales. */
export function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
