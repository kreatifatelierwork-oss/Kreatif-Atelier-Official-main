import { practices, type Practice } from "@/content/aurelius";

/**
 * The 11 Aurelius practices (source of truth: content/aurelius-services.ts via content/aurelius.ts),
 * each with its signature artifact and, where it has one, supporting artifacts that float behind it.
 * Approved mapping, 2026-10-19.
 */
export type ArtifactId =
  | "social-instagram"
  | "social-facebook"
  | "social-youtube"
  | "social-twitter"
  | "social-tiktok"
  | "social-linkedin"
  | "social-whatsapp"
  | "press-mic"
  | "gift-box"
  | "google-cluster"
  | "pen-nib"
  | "billboard"
  | "analytics-board"
  | "growth-runner"
  | "camcorder"
  | "clapperboard"
  | "film-strip"
  | "web-shop"
  | "meeting-table";

const mapping: Record<Practice["slug"], { artifact: ArtifactId; supporting: ArtifactId[] }> = {
  "digital-marketing": { artifact: "social-instagram", supporting: ["social-facebook", "social-youtube", "social-tiktok"] },
  "public-relations": { artifact: "press-mic", supporting: ["social-twitter", "social-linkedin"] },
  promotions: { artifact: "gift-box", supporting: ["billboard"] },
  seo: { artifact: "google-cluster", supporting: ["analytics-board"] },
  "branding-creative-design": { artifact: "pen-nib", supporting: ["billboard"] },
  advertising: { artifact: "billboard", supporting: ["clapperboard", "social-youtube"] },
  "analytics-performance": { artifact: "analytics-board", supporting: ["growth-runner"] },
  "lead-generation-growth": { artifact: "growth-runner", supporting: ["analytics-board"] },
  "film-video-photography": { artifact: "camcorder", supporting: ["clapperboard", "film-strip"] },
  "technology-product": { artifact: "web-shop", supporting: ["analytics-board"] },
  "advisory-transformation": { artifact: "meeting-table", supporting: ["growth-runner"] },
};

export const services = practices.map((p) => ({ ...p, ...mapping[p.slug] }));
export type V2Service = (typeof services)[number];
