import type { SplitHeadline } from "./types";

/**
 * The five verticals. Each one is a page at /<slug>, built entirely from this file:
 * add a `hero` image, more `blocks`, or change copy here and the page follows.
 *
 * Sources: names, three-word lines, "what we do" and "how we create value" come from the
 * company structure sheet; Golden Guardian's extra copy from the old site; Valora's from its profile.
 * Asraya has its own pages (app/asraya, content/asraya.ts); only its summary lives here.
 */

export type VerticalImage = { src: string; alt: string; width: number; height: number };

export type Block =
  /** A heading beside running paragraphs. */
  | { kind: "prose"; label?: string; headline?: SplitHeadline; body: string[] }
  /** A heading over a grid of short titled items. */
  | { kind: "list"; label?: string; headline?: SplitHeadline; intro?: string; items: { title: string; body?: string }[]; footnote?: string }
  /** One large line. */
  | { kind: "statement"; label?: string; lead: string; emphasis?: string }
  /** A heading and a line of copy beside one button to a standalone page. */
  | { kind: "link"; label?: string; headline: SplitHeadline; body: string; href: string; cta: string }
  /** An image beside a line or two of copy. */
  | { kind: "feature"; label?: string; image: VerticalImage; headline?: SplitHeadline; body?: string[]; flip?: boolean }
  /** An image shown whole, like a poster on a wall. */
  | { kind: "poster"; label?: string; image: VerticalImage; caption?: string };

export type Vertical = {
  slug: string;
  name: string;
  /** The three-word line under the name. */
  tagline: string;
  /** Four short lines for the home page row and the top of the page. */
  whatWeDo: string[];
  /** "How we create value" — one sentence. */
  value: string;
  /** The venture's own mark, from the owner's files. Shown on its page and home tile. */
  logo?: { src: string; alt: string; width: number; height: number };
  /** One-line positioning, and the "About" paragraphs (the home page shows the first two). */
  positioning?: string;
  about?: string[];
  /** Page title and description for search and sharing, when they differ from the defaults. */
  meta?: { title: string; description: string };
  /** Shown beside the value line when present. */
  valueImage?: VerticalImage;
  /** CSS colour for this page's accents; champagne gold when omitted. */
  accent?: string;
  /** `cover` fills the hero behind the title; `portrait` stands beside it. No hero image: a typographic hero. */
  hero?: { image: VerticalImage; layout: "cover" | "portrait"; background?: string };
  blocks: Block[];
};

export const verticalsIntro = {
  id: "verticals",
  marker: "Our Verticals",
  headline: { lead: "A connected", emphasis: "ecosystem." },
  labels: { whatWeDo: "What We Do", value: "How We Create Value", explore: "Explore", index: "Venture", others: "Our Ventures" },
} as const;

const AURELIUS_ABOUT = [
  "Aurelius is the marketing and advertising company within Kreatif Atelier, bringing together strategy, creative, media and technology to help brands move from ideas to execution and measurable outcomes.",
  "We believe marketing works best when its parts work together. Brand positioning informs the creative. Creative connects with the right audience. Media creates opportunities for discovery and demand. Digital platforms, automation and analytics help turn that attention into meaningful action and inform what happens next.",
  "Our capabilities span branding and creative design, digital marketing, advertising, public relations, promotions, search engine optimization, film and photography, lead generation, analytics, technology and strategic advisory.",
  "Rather than treating each activity as an isolated service, Aurelius approaches them as connected parts of a larger business objective: building stronger brands, reaching the right people and making marketing efforts more accountable to the work they are meant to achieve.",
];

export const verticals: Vertical[] = [
  {
    slug: "aurelius",
    name: "Aurelius",
    tagline: "Brands. Strategy. Growth.",
    whatWeDo: ["Brand Strategy & Identity", "Marketing & Communication", "Creative Consulting", "Business Advisory"],
    value: "Builds brands that lead and last",
    accent: "#e0584b",
    logo: { src: "/images/logos/horse-color.webp", alt: "Aurelius horse emblem", width: 900, height: 1025 },
    positioning: "We make the work. And we make sure it lands.",
    about: AURELIUS_ABOUT,
    meta: {
      title: "Aurelius | Marketing, Advertising & Growth — Kreatif Atelier",
      description:
        "Aurelius connects brand strategy, creative, advertising, media and technology to help businesses strengthen their brands, reach the right audiences and build more measurable marketing systems.",
    },
    hero: {
      image: { src: "/images/mood/aurelius-figure.webp", alt: "A veiled, seated figure wearing a gold crown", width: 941, height: 1672 },
      layout: "portrait",
      background: "#440000",
    },
    blocks: [
      {
        kind: "prose",
        label: "About Aurelius",
        headline: { lead: "We make the work.", emphasis: "And we make sure it lands." },
        body: AURELIUS_ABOUT,
      },
    ],
  },
  {
    slug: "asraya",
    name: "Asraya",
    tagline: "Communicating impact. Amplifying change.",
    whatWeDo: ["Brand identity & website", "Content & SEO", "Advertising & PR", "Film & campaigns"],
    value: "You do the work. We make sure people know about it.",
    accent: "#d2301f",
    blocks: [],
  },
  {
    slug: "valora",
    name: "Valora",
    tagline: "People. Skills. Opportunities.",
    whatWeDo: ["Student Capability Ecosystem", "Industry Connect", "Mentorship & Placement", "Global Opportunities"],
    value: "Bridges education with real-world opportunities",
    logo: { src: "/images/logos/valora-swan.webp", alt: "Valora swan emblem", width: 900, height: 1098 },
    positioning: "Turning academic potential into professional capability.",
    about: [
      "Universities create knowledge. Students need environments where that knowledge can become capability, experience and opportunity.",
      "Valora is an industry-connected student capability ecosystem, under the aegis of Kreatif Atelier. It connects students, institutions, industry, mentors and communities so that learning is applied to real problems, and every project becomes evidence of capability.",
    ],
    meta: {
      title: "Valora | Student Capability Ecosystem — Kreatif Atelier",
      description: "Valora is an industry-connected student capability ecosystem under the aegis of Kreatif Atelier, turning academic potential into professional capability.",
    },
    // Valora has its own pages (app/valora, content/valora.ts); only its summary lives here.
    blocks: [],
  },
  {
    slug: "golden-guardian-productions",
    name: "Golden Guardian Productions",
    tagline: "Stories. Visuals. Impact.",
    whatWeDo: ["Film & Video Production", "Branded Content", "Live Events", "Creative IP Development"],
    value: "Creates powerful stories that inspire and influence",
    blocks: [
      {
        kind: "prose",
        headline: { lead: "Premium production for brands that", emphasis: "take storytelling seriously." },
        body: [
          "A dedicated production house delivering brand films, commercials, digital series, and cinematic content. Golden Guardian brings the quality of film production to brand storytelling — with a sharp commercial sensibility.",
        ],
      },
    ],
  },
  {
    slug: "rudra-yugen",
    name: "Rudra Yugen",
    tagline: "Innovation. Culture. Futures.",
    whatWeDo: ["Emerging Tech & AI", "Cultural Projects", "R&D and Innovation Labs", "Strategic Ventures"],
    value: "Builds what's next at the intersection of creativity and technology",
    blocks: [],
  },
];

/** Valora's chapter radar (/valora/chapters): campuses running Valora, the recruiters they share and their published placement figures. */
export const valoraRadar = {
  meta: {
    title: "Valora Chapter Radar — Campuses, Recruiters & Placements | Kreatif Atelier",
    description: "Valora chapter radar: campuses, shared recruiters and placement figures.",
  },
  teaser: {
    label: "Chapter radar",
    title: "Four campuses live. One on the table.",
    body: "A live map of the campuses that run Valora: the recruiters they share and the placement figures each one has published, with every source named.",
    cta: "Open the chapter radar",
  },
} as const;

export const verticalBySlug = (slug: string) => verticals.find((v) => v.slug === slug);

/** From the structure sheet: who the ecosystem serves and what comes of it. */
export const ecosystem = {
  id: "ecosystem",
  serves: {
    label: "Our Ecosystem Serves",
    items: ["Students", "Professionals", "Businesses", "Creators", "Global Partners", "Communities"],
  },
  impact: {
    label: "Impact",
    items: ["Skilled Talent", "Stronger Brands", "Meaningful Content", "Innovative Solutions", "Healthier Lives", "A Brighter Tomorrow"],
  },
  closing: { lead: "Disciplines today.", emphasis: "A brighter tomorrow." },
} as const;
