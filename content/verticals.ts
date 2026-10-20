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
    blocks: [
      {
        kind: "prose",
        label: "The gap",
        headline: { lead: "The gap isn't knowledge.", emphasis: "It's application." },
        body: [
          "Students can graduate with academic knowledge while still having limited opportunities to repeatedly apply that knowledge in realistic environments.",
          "Valora builds those environments: real industry problems, student teams and feedback from industry.",
        ],
      },
      {
        kind: "list",
        label: "What Valora is not",
        headline: { lead: "It's not a club, a training provider or an event platform.", emphasis: "It is an industry-connected student capability ecosystem." },
        items: [
          { title: "Club", body: "Not just a community." },
          { title: "Training provider", body: "Not just another program." },
          { title: "Event platform", body: "Not just a series of events." },
        ],
      },
      {
        kind: "statement",
        lead: "Real exposure. Meaningful experience.",
        emphasis: "Tangible opportunities.",
      },
      {
        kind: "list",
        label: "How Valora works",
        headline: { lead: "Learn. Build. Showcase.", emphasis: "Connect. Grow." },
        items: [
          { title: "Learn", body: "Acquire skills through real-world opportunities." },
          { title: "Build", body: "Work on projects and gain experience." },
          { title: "Showcase", body: "Create a living profile of your growth." },
          { title: "Connect", body: "Get discovered by industry and opportunities." },
          { title: "Grow", body: "Move forward with clarity and confidence." },
        ],
      },
      {
        kind: "list",
        label: "The ecosystem",
        headline: { lead: "A connected ecosystem that turns", emphasis: "potential into progress." },
        intro: "The bridge between education and a brighter tomorrow.",
        items: [
          { title: "Learn", body: "Industry-relevant training, workshops, certifications." },
          { title: "Experience", body: "Hands-on projects, internships, live briefs." },
          { title: "Connect", body: "Mentorship, industry access, professional network." },
          { title: "Build", body: "Portfolios, personal brand, career readiness." },
          { title: "Launch", body: "Placements, freelance opportunities, entrepreneurship." },
          { title: "Belong", body: "A lifelong community of students, alumni and professionals." },
          { title: "Guide", body: "Career counselling, skill mapping, personalised roadmaps." },
          { title: "Enable", body: "Accessible programmes, scholarships, hybrid learning, inclusive opportunities." },
        ],
      },
      {
        kind: "list",
        label: "Make capability visible",
        headline: { lead: "Make capability visible.", emphasis: "The Valora profile." },
        intro: "Don't just tell people what you learned. Show them what you built, experienced and achieved. The Valora profile is a persistent record containing:",
        items: [
          { title: "Skills" },
          { title: "Projects" },
          { title: "Industry experience" },
          { title: "Achievements" },
          { title: "Leadership" },
          { title: "Contributions" },
          { title: "Progression" },
          { title: "Visual" },
        ],
      },
      {
        kind: "list",
        label: "The ladder",
        headline: { lead: "A stronger you.", emphasis: "A brighter tomorrow." },
        intro: "A journey of growth, contribution and leadership, from your first step to a wider impact.",
        items: [
          { title: "Participant" },
          { title: "Contributor" },
          { title: "Coordinator" },
          { title: "Mentor" },
          { title: "Chapter leader" },
          { title: "Network leader" },
        ],
      },
      {
        kind: "list",
        label: "Faculty",
        headline: { lead: "Faculty connects", emphasis: "the system." },
        intro: "Guiding minds. Opening opportunities. Building what's next.",
        items: [
          { title: "Mentor" },
          { title: "Advisor" },
          { title: "Evaluator" },
          { title: "Researcher" },
          { title: "Challenge curator" },
          { title: "Industry connector" },
        ],
      },
      {
        kind: "list",
        label: "From problem to solution",
        headline: { lead: "From industry problem", emphasis: "to student solution." },
        items: [
          { title: "Industry problem", body: "Real challenges from industry." },
          { title: "Valora challenge", body: "Framed into meaningful, workable briefs." },
          { title: "Student team", body: "Interdisciplinary talent collaborates to build." },
          { title: "Solution", body: "Ideas become tangible prototypes or strategies." },
          { title: "Industry feedback", body: "Validated by industry, which informs future work." },
        ],
      },
      {
        kind: "list",
        label: "Where ideas become outputs",
        headline: { lead: "Where ideas", emphasis: "become outputs." },
        intro: "From classrooms to companies. From ideas to impact.",
        items: [
          { title: "Business", body: "Strategy, entrepreneurship, management." },
          { title: "Technology", body: "Engineering, AI, software, data." },
          { title: "Design & creative", body: "Design, media, communication." },
          { title: "Research", body: "Analysis, discovery." },
          { title: "Impact", body: "Social, community, sustainability." },
          { title: "Venture", body: "Innovation, startups, products." },
        ],
      },
      {
        kind: "statement",
        label: "Opportunity",
        lead: "Students don't need more activities.",
        emphasis: "They need opportunities.",
      },
      {
        kind: "list",
        label: "Every project",
        headline: { lead: "Build something worth showing.", emphasis: "Every project becomes evidence of capability." },
        items: [
          { title: "Problem" },
          { title: "Team" },
          { title: "Process" },
          { title: "Output" },
          { title: "Evidence" },
        ],
      },
      {
        kind: "statement",
        label: "Connected",
        lead: "Connected to India's industry ecosystem.",
        emphasis: "Pathways across diverse industries.",
      },
      {
        kind: "statement",
        label: "Vision",
        lead: "Imagine a network where every campus",
        emphasis: "becomes a launchpad.",
      },
      {
        kind: "link",
        label: "Chapters",
        headline: { lead: "Your campus is the chapter.", emphasis: "Your network is the ecosystem." },
        body: "Four campuses run Valora today: Manipal University Jaipur, JECRC University, IIT Goa and BITS Hyderabad, with IMT Hyderabad proposed next. The chapter radar maps them, with the recruiters each campus shares and its latest placement figures.",
        href: "/valora/chapters/index.html",
        cta: "Open the chapter radar",
      },
    ],
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
  {
    slug: "asraya",
    name: "Asraya",
    tagline: "Communicating impact. Amplifying change.",
    whatWeDo: ["Brand identity & website", "Content & SEO", "Advertising & PR", "Film & campaigns"],
    value: "You do the work. We make sure people know about it.",
    accent: "#d2301f",
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
