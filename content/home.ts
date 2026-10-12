import type { PracticeSlug } from "./aurelius-services";
import type { HeroFigure } from "./types";

/**
 * Home page copy, section by section (docs/website-blueprint.md §4). Lines come from the
 * Kreatif Atelier profile and the blueprint; anything marked `placeholder` must be replaced
 * with approved content before launch.
 */

/** The home hero: the owner's galloping horse, full-bleed. The Aurelius page uses the same picture. */
export const heroFigure: HeroFigure = {
  src: "/reference/aurelius-horse.webp",
  alt: "A dark horse at full gallop, its mane streaming behind it, against burning red",
  width: 1672,
  height: 941,
  mode: "full",
  front: "/reference/aurelius-horse-front.webp",
};

export const hero = {
  id: "home",
  primaryCta: { label: "Explore Aurelius", href: "/aurelius" },
  secondaryCta: { label: "View Selected Work", href: "/work" },
  scrollCue: "Scroll",
  /** The two small word lists in the hero's top corners. */
  words: { start: ["Strategy", "Creative", "Media", "Technology"], end: ["Ideas", "Brands", "Audiences", "Impact"] },
} as const;

export const positioning = {
  id: "positioning",
  marker: "Positioning",
  headline: { lead: "Creative should", emphasis: "move the business." },
  body: [
    "Most agencies pick a side. We were built to hold both ends.",
    "Some make beautiful things nobody can trace to revenue. Others run efficient media against creative they did not build and cannot fix. The gap between those two is where most marketing budgets quietly disappear.",
  ],
} as const;

export const capabilities: {
  id: string;
  marker: string;
  headline: { lead: string; emphasis: string };
  entries: { label: string; slug: PracticeSlug }[];
} = {
  id: "capabilities",
  marker: "Capabilities",
  headline: { lead: "Capabilities", emphasis: "at a glance." },
  entries: [
    { label: "Brand & Creative", slug: "branding-creative-design" },
    { label: "Digital Marketing", slug: "digital-marketing" },
    { label: "Advertising & Media", slug: "advertising" },
    { label: "SEO & Organic Discovery", slug: "seo" },
    { label: "Lead Generation & Growth", slug: "lead-generation-growth" },
    { label: "Analytics & Performance", slug: "analytics-performance" },
  ],
};

export const attention = {
  id: "attention",
  marker: "Attention",
  headline: { lead: "Attention is bought, earned and kept", emphasis: "in different ways." },
  body: "A brand's buyers are not sitting in one channel waiting to be found. They scroll, search, open email, ask a colleague and compare on marketplaces.",
  modes: [
    { title: "Own", body: "Audiences you build." },
    { title: "Buy", body: "Demand you can capture." },
    { title: "Keep", body: "Customers and long-term value you already have." },
  ],
  closing: "We run all three.",
  kicker: "Show up where the buyer is.",
} as const;

export const work = {
  id: "work",
  marker: "Selected Work",
  headline: { lead: "The work,", emphasis: "the way it actually looks." },
  /** Placeholder: no approved case studies have been supplied yet. Never fill this with invented work. */
  placeholder: "Placeholder — approved case studies will appear here.",
  cta: { label: "View Selected Work", href: "/work" },
} as const;

export const measurement = {
  id: "measurement",
  marker: "Measurement",
  line: ["Measure", "Understand", "Redirect"],
  body: ["Most reporting exists to justify spend. Ours exists to redirect it.", "Opinions are free. Evidence costs money and saves more."],
  loop: ["Analytics", "Learning", "Creative / media change", "Re-measurement"],
  cta: { label: "Our Approach", href: "/approach" },
} as const;

export const ventures = {
  id: "ventures",
  marker: "Our Ventures",
  headline: { lead: "Our", emphasis: "ventures." },
  explore: "Explore",
} as const;

export const parent = {
  id: "kreatif-atelier",
  marker: "Kreatif Atelier",
  body: "Kreatif Atelier is a creative holding ecosystem connecting people, ideas and complementary disciplines to create meaningful opportunities and lasting impact.",
  line: ["Ideas", "People", "Impact"],
  cta: { label: "About Kreatif Atelier", href: "/about/kreatif-atelier" },
  /** The owner's crest for the parent company, as embroidered artwork. Shown only by the footer's hidden door (components/footer/CrestEgg.tsx). */
  crest: {
    src: "/images/logos/kreatif-atelier-crest.webp",
    width: 1672,
    height: 941,
    alt: "The Kreatif Atelier crest in embroidery: a crowned eagle bearing a KA shield, above a KA monogram and the words Create, Design, Inspire",
    /** The verticals shown on the cloth beneath the crest, in order. Slugs from content/verticals.ts. */
    verticals: ["aurelius", "asraya", "valora", "golden-guardian-productions", "rudra-yugen"],
  },
} as const;

export const contactCta = {
  id: "contact",
  headline: { lead: "Have a business challenge?", emphasis: "Let's make the work land." },
  body: "Tell us your goal, what you have tried and what you need help solving.",
  cta: { label: "Start a Project", href: "/contact" },
} as const;
