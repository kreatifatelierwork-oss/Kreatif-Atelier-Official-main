
/**
 * Where the eleven objects float on the home hero, as position classes on the hero box.
 * `mobile` applies below md (only four objects show there); `centered` is the desktop placement. Sizes are the rendered pictures' pixel sizes (public/images/hero/objects/<slug>.webp).
 */
/**
 * `kind`: "hero" pictures are the practice objects (public/images/hero/objects/<slug>.webp); "obj" pictures are the
 * page objects and platform tiles (public/images/artifacts/<slug>.webp). `layer: "stage"` objects sit on the
 * factory's area. Roo, 2026-10-20: no spheres, no phone or palette card, the bulb moved off the stage, and the
 * platform tiles (YouTube, Facebook, Instagram, X, Flipkart) spread apart, never side by side.
 */
export type HeroObject = { slug: string; kind: "hero" | "obj"; size: [number, number]; seed: number; mobile: string; centered: string; layer?: "stage" };

const desk = "hidden md:block";

/**
 * A loose, natural scatter around the words and the factory (Roo, 2026-10-20): no platform tiles, nothing in
 * rows or columns, each object at its own height and size, the left and right sides balanced but not mirrored.
 */
export const heroObjects: HeroObject[] = [
  { slug: "advisory-transformation", kind: "hero", size: [299, 420], seed: 37, mobile: desk, centered: "md:left-[22%] md:top-[14%] md:w-[3.4%]" },
  { slug: "public-relations", kind: "hero", size: [387, 420], seed: 67, mobile: desk, centered: "md:left-[13%] md:top-[33%] md:w-[7.2%]" },
  { slug: "meeting-table", kind: "obj", size: [382, 420], seed: 29, mobile: desk, centered: "md:left-[19%] md:top-[55%] md:w-[7%]" },
  { slug: "seo", kind: "hero", size: [330, 420], seed: 101, mobile: desk, centered: "md:left-[8%] md:top-[72%] md:w-[4.6%]" },
  { slug: "film-strip", kind: "obj", size: [183, 420], seed: 89, mobile: desk, centered: "md:left-[15%] md:top-[80%] md:w-[3.4%]" },
  { slug: "advertising", kind: "hero", size: [420, 302], seed: 53, mobile: desk, centered: "md:right-[7%] md:top-[19%] md:w-[7%] md:left-auto" },
  { slug: "web-shop", kind: "obj", size: [358, 420], seed: 59, mobile: desk, centered: "md:right-[3%] md:top-[50%] md:w-[5.6%] md:left-auto" },
  { slug: "analytics-performance", kind: "hero", size: [420, 394], seed: 71, mobile: desk, centered: "md:right-[14%] md:top-[57%] md:w-[6.6%] md:left-auto" },
  { slug: "film-video-photography", kind: "hero", size: [420, 405], seed: 113, mobile: desk, centered: "md:right-[17%] md:top-[78%] md:w-[6%] md:left-auto" },
  { slug: "press-mic", kind: "obj", size: [345, 420], seed: 131, mobile: desk, centered: "md:left-[2%] md:top-[57%] md:w-[7%]" },
  { slug: "clapperboard", kind: "obj", size: [324, 420], seed: 137, mobile: desk, centered: "md:right-[19%] md:top-[11%] md:w-[5.4%] md:left-auto" },
  // On the stage
  { slug: "technology-product", kind: "hero", size: [420, 239], seed: 41, layer: "stage", mobile: desk, centered: "md:left-[71%] md:top-[2%] md:w-[10%]" },
];
