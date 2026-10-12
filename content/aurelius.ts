import type { HeroFigure } from "./types";
import { catalogue, type PracticeSlug, type Service } from "./aurelius-services";

/**
 * Aurelius — the marketing, advertising and growth business. Practice-area pages and the
 * service index are built from this file plus the catalogue in ./aurelius-services.ts.
 * Headlines and point-of-view lines come from the Kreatif Atelier profile and the website
 * blueprint (docs/website-blueprint.md); nothing here is invented.
 */

export type Practice = {
  slug: PracticeSlug;
  name: string;
  /** Catalogue descriptor. */
  descriptor: string;
  /** Page headline (blueprint §6). */
  headline: string;
  /** Point-of-view lines from the profile. */
  pov: string[];
  /** What the practice covers (blueprint §6). */
  scope: string;
  related: PracticeSlug[];
  /** The catalogue marks these as expansion practices. */
  expansion?: boolean;
  services: readonly Service[];
};

const meta: Record<PracticeSlug, Omit<Practice, "slug" | "name" | "descriptor" | "services">> = {
  "digital-marketing": {
    headline: "Own the relationship, not just the reach.",
    pov: [
      "A brand's buyers are not sitting in one channel waiting to be found. They scroll, search, open email, ask a colleague and compare on marketplaces.",
    ],
    scope: "Always-on channel strategy, audiences, content, lifecycle and retention.",
    related: ["advertising", "lead-generation-growth", "analytics-performance"],
  },
  "public-relations": {
    headline: "Advertising is what a brand says. PR is what others say.",
    pov: ["Credibility has to be earned."],
    scope: "Credibility, relationships, reputation and earned conversation.",
    related: ["branding-creative-design", "digital-marketing", "seo"],
  },
  promotions: {
    headline: "Turn attention into action.",
    pov: [
      "The moment attention becomes action.",
      "Awareness moves a brand slowly. Promotions move a number this quarter.",
      "A discount is not a strategy. A mechanic is.",
    ],
    scope: "Trial, offer mechanics, events, incentives and loyalty.",
    related: ["advertising", "digital-marketing", "film-video-photography"],
  },
  seo: {
    headline: "Build visibility that compounds.",
    pov: [
      "The only channel that keeps paying after you stop.",
      "Ads end the day the budget does. Search does not.",
      "Authority is not bought. It is accumulated.",
    ],
    scope: "Technical, on-page, content, authority, local and AI/search discovery work.",
    related: ["digital-marketing", "public-relations", "analytics-performance", "technology-product"],
  },
  "branding-creative-design": {
    headline: "A brand is what people say when you leave the room.",
    pov: ["Everything else is just design.", "Make it once. Use it everywhere."],
    scope: "Strategy, identity systems, messaging, design systems and commercial creative.",
    related: ["advertising", "film-video-photography", "digital-marketing"],
  },
  advertising: {
    headline: "Buy the right attention.",
    pov: [
      "Buying attention is easy. Buying the right attention is the job.",
      "Media cannot save a bad idea.",
      "We write it. Shoot it. Buy it. Measure it.",
    ],
    scope: "Audience, creative, channel choice, buying, iteration and measurement.",
    related: ["analytics-performance", "branding-creative-design", "digital-marketing", "film-video-photography"],
  },
  "analytics-performance": {
    headline: "Measure. Understand. Redirect.",
    pov: [
      "Most reporting exists to justify spend. Ours exists to redirect it.",
      "Opinions are free. Evidence costs money and saves more.",
    ],
    scope: "Instrumentation, attribution, dashboards, experimentation and decision-making.",
    related: ["advertising", "lead-generation-growth", "technology-product"],
  },
  "lead-generation-growth": {
    headline: "Marketing should create qualified conversations.",
    pov: [
      "Marketing that does not produce pipeline is just publishing.",
      "For most businesses the honest question is not reach. It is how many qualified conversations happened this month.",
      "A funnel is plumbing. Most of them leak.",
    ],
    scope: "Demand generation, outbound/inbound, funnels, CRM, qualification and nurturing.",
    related: ["digital-marketing", "analytics-performance", "technology-product"],
  },
  "film-video-photography": {
    headline: "The work, the way it actually looks.",
    pov: [
      "Some things cannot be explained in a document. They just have to be seen.",
      "Real crew. Real equipment. Real craft.",
    ],
    scope: "Production from pre-production through shooting, finishing and distribution-ready assets.",
    related: ["branding-creative-design", "advertising", "digital-marketing"],
  },
  "technology-product": {
    headline: "The strategy is real when something is built.",
    pov: [
      "AI is not a campaign. It is infrastructure.",
      "The question is not whether AI can write your posts. It is which parts of your business should stop being done by hand.",
    ],
    scope: "Websites, UX, funnels, integrations, automation and digital experiences.",
    related: ["analytics-performance", "lead-generation-growth", "advisory-transformation"],
    expansion: true,
  },
  "advisory-transformation": {
    headline: "Sometimes the most valuable advice is what not to spend.",
    pov: [
      "Sometimes you do not need an agency. You need someone to tell you the truth.",
      "Senior counsel, sold as counsel. Not as a route into a retainer.",
      "The best outcome is a client who needs us less. We would rather build capability inside your team than sell you a dependency.",
    ],
    scope: "Independent counsel, transformation, capability-building and GTM advisory.",
    related: ["technology-product", "analytics-performance", "branding-creative-design"],
    expansion: true,
  },
};

export const practices: Practice[] = (Object.keys(catalogue) as PracticeSlug[]).map((slug) => ({
  slug,
  ...catalogue[slug],
  ...meta[slug],
}));

/** Artwork from the Kreatif Atelier profile (the owner's Canva file), used on the home page. */
export const profileArt = {
  tower: { src: "/images/profile/aurelius/tower.webp", width: 704, height: 1765, alt: "A lone figure standing on a concrete tower before a red sun" },
} as const;

export const practiceBySlug = (slug: string) => practices.find((p) => p.slug === slug);
export const practiceHref = (slug: PracticeSlug) => `/aurelius/services/${slug}`;
export const serviceCount = practices.reduce((sum, p) => sum + p.services.length, 0);

/** Strategy, creative, media, technology: what Aurelius holds together (Approach, About Aurelius). */
export const pillars = [
  { title: "Strategy", body: "What the brand stands for, and who it is for." },
  { title: "Creative", body: "The identity, the film, the words, the design." },
  { title: "Media", body: "Getting it in front of the right person at the right cost." },
  { title: "Technology", body: "The site, the funnel, the automation, the proof." },
] as const;

export const aurelius = {
  name: "Aurelius",
  byline: "a Kreatif Atelier company",
  tagline: "We make the work. And we make sure it lands.",
  support: "Strategy, creative, media and technology—connected to move brands forward.",
  descriptor: "Brands. Strategy. Growth.",
  about: [
    "Aurelius is the marketing and advertising company within Kreatif Atelier, bringing together strategy, creative, media and technology to help brands move from ideas to execution and measurable outcomes.",
    "We believe marketing works best when its parts work together. Brand positioning informs the creative. Creative connects with the right audience. Media creates opportunities for discovery and demand. Digital platforms, automation and analytics help turn that attention into meaningful action and inform what happens next.",
    "Our capabilities span branding and creative design, digital marketing, advertising, public relations, promotions, search engine optimization, film and photography, lead generation, analytics, technology and strategic advisory.",
    "Rather than treating each activity as an isolated service, Aurelius approaches them as connected parts of a larger business objective: building stronger brands, reaching the right people and making marketing efforts more accountable to the work they are meant to achieve.",
  ],
  meta: {
    title: "Aurelius | Marketing, Advertising & Growth — Kreatif Atelier",
    description:
      "Aurelius connects brand strategy, creative, advertising, media and technology to help businesses strengthen their brands, reach the right audiences and build more measurable marketing systems.",
  },
  /** The four parts Aurelius holds together (profile, p.2). */
  pillars,
  /** How every practice works (blueprint §5). */
  process: ["Discovery", "Strategy", "Execution", "Delivery & integration", "Measurement & iteration"],
  labels: {
    services: "Services",
    practiceAreas: "Practice Areas",
    allPractices: "View all 11 practice areas",
    allServices: "View all services",
    pillarServices: "services",
    pillars: "Our services",
    servicesIn: "Services in this practice",
    how: "How Aurelius works",
    related: "Related practices",
    expansion: "Expansion practice",
    discuss: "Discuss this service",
    search: "Search services",
    searchPlaceholder: "Search 206 services by name or code",
    all: "All",
    noResults: "No services match that search.",
    index: "Service index",
    noNote: "A note on this service is on its way. Ask us about it in the meantime.",
    tapHint: "Select a service to read what it covers.",
  },
} as const;

/** The Aurelius hero: the owner's galloping horse, full-bleed. Home uses the same picture. */
export const aureliusHeroFigure: HeroFigure = {
  src: "/reference/aurelius-horse.webp",
  alt: "A dark horse at full gallop, blurred by its own speed, against burning red",
  width: 1672,
  height: 941,
  mode: "full",
  position: "30% 45%",
};

export type PillarId = "brand" | "marketing" | "creative" | "advisory";
type Pillar = { id: PillarId; title: string; body: string; keywords: string[]; practices: PracticeSlug[] };

/**
 * Four pillars, word for word from the Aurelius brief. Every practice area is filed under exactly one
 * of them (`practices`), so the whole catalogue divides four ways. That grouping is ours, pending the
 * owner's sign-off; move a slug between lists to change it.
 */
export const ourServices: { label: string; image: { src: string; alt: string; width: number; height: number }; items: Pillar[] } = {
  label: "Our Services",
  /** The owner's artwork: the Colosseum with the red 01–04 behind it. Shown whole and unaltered. One prop, so it stays replaceable. */
  image: { src: "/reference/colosseum-numbered.webp", alt: "", width: 1536, height: 1024 },
  items: [
    {
      id: "brand",
      practices: ["branding-creative-design"],
      title: "Brand Strategy & Identity",
      body: "We help you define what you stand for, shape a compelling brand story and build a distinctive identity that connects, creates trust and drives long-term value.",
      keywords: ["Positioning", "Differentiation", "Brand architecture"],
    },
    {
      id: "marketing",
      practices: ["digital-marketing", "advertising", "public-relations", "promotions", "seo"],
      title: "Marketing & Communication",
      body: "We craft integrated campaigns and meaningful messages that cut through the noise, spark engagement and turn audiences into advocates.",
      keywords: ["Strategy", "Content", "Campaigns"],
    },
    {
      id: "creative",
      practices: ["film-video-photography", "technology-product"],
      title: "Creative Consulting",
      body: "We bring fresh perspectives and big ideas to help you solve complex challenges, unlock new opportunities and create work that makes an impact.",
      keywords: ["Ideas", "Innovation", "Execution"],
    },
    {
      id: "advisory",
      practices: ["advisory-transformation", "analytics-performance", "lead-generation-growth"],
      title: "Business Advisory",
      body: "We provide strategic guidance to help you make smarter decisions, streamline operations and build a stronger, more sustainable future.",
      keywords: ["Insights", "Strategy", "Growth"],
    },
  ],
};

export const pillarById = (id: string) => ourServices.items.find((p) => p.id === id);
export const pillarServiceCount = (id: PillarId) =>
  practices.filter((p) => pillarById(id)?.practices.includes(p.slug)).reduce((sum, p) => sum + p.services.length, 0);
/** The services index, opened on one pillar's share of the catalogue. */
export const pillarHref = (id: PillarId) => `/aurelius/services/?pillar=${id}#index`;

/** The staircase photo beside the eleven practice rows. */
export const domainsImage = { src: "/reference/staircase.png", alt: "" } as const;
