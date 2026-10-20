import type { PracticeSlug } from "@/content/aurelius-services";

/*
 * Which objects float where, by slug. Data only (no 3D imports), so pages can use it without pulling
 * three.js into their first load; the models themselves live in pageArtifacts.tsx and load on hover.
 */

/** The four objects that float on each practice page, chosen for what that practice does. */
export const practiceArtifacts: Record<PracticeSlug, [string, string, string, string]> = {
  "digital-marketing": ["amazon-tile", "flipkart-tile", "instagram-tile", "facebook-tile"],
  "public-relations": ["press-mic", "news-mic", "x-tile", "linkedin-tile"],
  promotions: ["gift-box", "flipkart-tile", "megaphone", "reactions"],
  seo: ["seo-magnifier", "google-cluster", "browser-chart", "growth-bars"],
  "branding-creative-design": ["palette-card", "pen-tool", "type-tile", "pen-nib"],
  advertising: ["billboard", "megaphone", "youtube-tile", "target"],
  "analytics-performance": ["analytics-board", "browser-chart", "growth-bars", "target"],
  "lead-generation-growth": ["growth-runner", "target", "web-shop", "whatsapp-tile"],
  "film-video-photography": ["clapperboard", "film-strip", "camcorder", "tiktok-tile"],
  "technology-product": ["dev-laptop", "web-shop", "amazon-tile", "browser-chart"],
  "advisory-transformation": ["lightbulb", "meeting-table", "growth-runner", "analytics-board"],
};

/**
 * Floating sets for page sections outside the practice pages. The home page's Aurelius teaser and the
 * Aurelius page's attention section carry the platforms (every social tile appears somewhere on the site).
 */
export const sectionArtifacts = {
  homeTeaser: ["instagram-tile", "youtube-tile", "linkedin-tile"],
  attention: ["tiktok-tile", "x-tile", "whatsapp-tile"],
  approach: ["lightbulb", "target", "growth-runner"],
  /** The services page: two around the All Services artifact in the header, three beside the index heading. */
  servicesHero: ["megaphone", "growth-bars"],
  servicesIndex: ["seo-magnifier", "palette-card", "camcorder"],
} as const;

/** The slugs actually used on pages (the posters to render). */
export const usedObjectSlugs = [...new Set([...Object.values(practiceArtifacts).flat(), ...Object.values(sectionArtifacts).flat()])];
