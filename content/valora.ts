/**
 * Valora — the student capability ecosystem under the aegis of Kreatif Atelier. Four pages (app/valora): Overview,
 * The ecosystem, Industry & campuses, and the chapter radar. Every line of copy below is Valora's profile wording as it
 * stood on the old /valora page (content/verticals.ts blocks), regrouped by page; only navigation and button labels
 * are new. Nothing is added about students, campuses, results or partners.
 */

export const valora = {
  name: "Valora",
  wordmark: "VALORA",
  aegis: "under the aegis of Kreatif Atelier",
  tagline: "People. Skills. Opportunities.",
  positioning: "Turning academic potential into professional capability.",
  logo: { src: "/images/logos/valora-swan.webp", alt: "Valora swan emblem", width: 900, height: 1098 },
  nav: [
    { label: "Overview", href: "/valora" },
    { label: "The ecosystem", href: "/valora/ecosystem" },
    { label: "Industry & campuses", href: "/valora/industry" },
    { label: "Chapter radar", href: "/valora/chapters" },
  ],
  navLabel: "Valora",
  next: "Next",
  cta: { lead: "Imagine a network where every campus", emphasis: "becomes a launchpad.", button: "Start a conversation", href: "/contact" },
  radarCta: "Open the chapter radar",
  meta: {
    title: "Valora | Student Capability Ecosystem — Kreatif Atelier",
    description:
      "Valora is an industry-connected student capability ecosystem under the aegis of Kreatif Atelier, turning academic potential into professional capability.",
  },
} as const;

/* ── /valora ─────────────────────────────────────────────── */

export const overview = {
  about: [
    "Universities create knowledge. Students need environments where that knowledge can become capability, experience and opportunity.",
    "Valora is an industry-connected student capability ecosystem, under the aegis of Kreatif Atelier. It connects students, institutions, industry, mentors and communities so that learning is applied to real problems, and every project becomes evidence of capability.",
  ],
  gap: {
    label: "The gap",
    title: ["The gap isn't knowledge.", "It's application."],
    body: [
      "Students can graduate with academic knowledge while still having limited opportunities to repeatedly apply that knowledge in realistic environments.",
      "Valora builds those environments: real industry problems, student teams and feedback from industry.",
    ],
  },
  not: {
    label: "What Valora is not",
    title: ["It's not a club, a training provider or an event platform.", "It is an industry-connected student capability ecosystem."],
    items: [
      { title: "Club", body: "Not just a community." },
      { title: "Training provider", body: "Not just another program." },
      { title: "Event platform", body: "Not just a series of events." },
    ],
  },
  promise: ["Real exposure.", "Meaningful experience.", "Tangible opportunities."],
  /** How Valora works, told as one student's road. */
  works: {
    label: "How Valora works",
    title: ["Learn. Build. Showcase.", "Connect. Grow."],
    steps: [
      { art: "learn", title: "Learn", body: "Acquire skills through real-world opportunities." },
      { art: "build", title: "Build", body: "Work on projects and gain experience." },
      { art: "showcase", title: "Showcase", body: "Create a living profile of your growth." },
      { art: "connect", title: "Connect", body: "Get discovered by industry and opportunities." },
      { art: "grow", title: "Grow", body: "Move forward with clarity and confidence." },
    ],
  },
  opportunity: { label: "Opportunity", lead: "Students don't need more activities.", emphasis: "They need opportunities." },
  explore: {
    label: "More about Valora",
    items: [
      { href: "/valora/ecosystem", title: "The ecosystem", body: "What it offers, the Valora profile, the ladder and the faculty.", art: "orbit" },
      { href: "/valora/industry", title: "Industry & campuses", body: "From industry problem to student solution.", art: "challenge" },
      { href: "/valora/chapters", title: "Chapter radar", body: "The campuses that run Valora, on the map.", art: "constellation" },
    ],
  },
} as const;

/* ── /valora/ecosystem ───────────────────────────────────── */

export const ecosystem = {
  head: { title: ["The", "ecosystem"], lead: "The bridge between education and a brighter tomorrow." },
  wheel: {
    label: "The ecosystem",
    title: ["A connected ecosystem that turns", "potential into progress."],
    hint: "Choose a part of the ecosystem",
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
  profile: {
    label: "Make capability visible",
    title: ["Make capability visible.", "The Valora profile."],
    intro:
      "Don't just tell people what you learned. Show them what you built, experienced and achieved. The Valora profile is a persistent record containing:",
    items: ["Skills", "Projects", "Industry experience", "Achievements", "Leadership", "Contributions", "Progression", "Visual"],
  },
  ladder: {
    label: "The ladder",
    title: ["A stronger you.", "A brighter tomorrow."],
    intro: "A journey of growth, contribution and leadership, from your first step to a wider impact.",
    hint: "Choose a rung",
    items: ["Participant", "Contributor", "Coordinator", "Mentor", "Chapter leader", "Network leader"],
  },
  faculty: {
    label: "Faculty",
    title: ["Faculty connects", "the system."],
    intro: "Guiding minds. Opening opportunities. Building what's next.",
    items: ["Mentor", "Advisor", "Evaluator", "Researcher", "Challenge curator", "Industry connector"],
  },
} as const;

/* ── /valora/industry ────────────────────────────────────── */

export const industry = {
  head: { title: ["Industry &", "campuses"], lead: "Valora builds those environments: real industry problems, student teams and feedback from industry." },
  flow: {
    label: "From problem to solution",
    title: ["From industry problem", "to student solution."],
    steps: [
      { art: "problem", title: "Industry problem", body: "Real challenges from industry." },
      { art: "challenge", title: "Valora challenge", body: "Framed into meaningful, workable briefs." },
      { art: "team", title: "Student team", body: "Interdisciplinary talent collaborates to build." },
      { art: "solution", title: "Solution", body: "Ideas become tangible prototypes or strategies." },
      { art: "feedback", title: "Industry feedback", body: "Validated by industry, which informs future work." },
    ],
  },
  outputs: {
    label: "Where ideas become outputs",
    title: ["Where ideas", "become outputs."],
    intro: "From classrooms to companies. From ideas to impact.",
    items: [
      { icon: "business", title: "Business", body: "Strategy, entrepreneurship, management." },
      { icon: "technology", title: "Technology", body: "Engineering, AI, software, data." },
      { icon: "design", title: "Design & creative", body: "Design, media, communication." },
      { icon: "research", title: "Research", body: "Analysis, discovery." },
      { icon: "impact", title: "Impact", body: "Social, community, sustainability." },
      { icon: "venture", title: "Venture", body: "Innovation, startups, products." },
    ],
  },
  project: {
    label: "Every project",
    title: ["Build something worth showing.", "Every project becomes evidence of capability."],
    items: ["Problem", "Team", "Process", "Output", "Evidence"],
  },
  connected: { label: "Connected", lead: "Connected to India's industry ecosystem.", emphasis: "Pathways across diverse industries." },
  chapters: {
    label: "Chapters",
    title: ["Your campus is the chapter.", "Your network is the ecosystem."],
    body: "Four campuses run Valora today: Manipal University Jaipur, JECRC University, IIT Goa and BITS Hyderabad, with IMT Hyderabad proposed next. The chapter radar maps them, with the recruiters each campus shares and its latest placement figures.",
  },
} as const;

export type ValoraArt =
  | (typeof overview.works.steps)[number]["art"]
  | (typeof industry.flow.steps)[number]["art"]
  | (typeof overview.explore.items)[number]["art"];
