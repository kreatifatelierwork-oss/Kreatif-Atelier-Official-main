import type { SplitHeadline } from "./types";

export const site = {
  name: "Kreatif Atelier",
  wordmark: "KREATIF ATELIER",
  url: "https://kreatifatelier.com",
  title: "Kreatif Atelier — Ideas. People. Impact.",
  description:
    "Kreatif Atelier is a creative holding ecosystem connecting people, ideas and complementary disciplines to create meaningful opportunities and lasting impact.",
  locale: "en_IN",
  email: "contact@kreatifatelier.com",
  /** Supplied by the owner (2026-10-20). `phoneHref` is the dialable form for tel: links. */
  phone: "+91 94609 23782",
  phoneHref: "tel:+919460923782",
  /** Every number to call (owner, 2026-10-20); the first is the main line (the floating call button). */
  phones: [
    { label: "+91 94609 23782", href: "tel:+919460923782" },
    { label: "+91 83779 25834", href: "tel:+918377925834" },
    { label: "+91 96048 96235", href: "tel:+919604896235" },
    { label: "+91 70012 72866", href: "tel:+917001272866" },
  ],
  callLabel: "Call us",
  handle: "@kreatifatelier",
  /** Fill these in and the handle / labels render as links automatically. */
  instagramUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  city: "Hyderabad",
  region: "Telangana",
  country: "India",
} as const;

export const nav = {
  homeLabel: "Kreatif Atelier — back to top",
  skipLink: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  primaryLabel: "Primary",
  secondaryLabel: "More",
} as const;

export const hero = {
  id: "home",
  /** Live site: "Hyderabad · Est. 2024 · Creative Enterprise" — "Est." withheld until the year is confirmed. */
  eyebrow: ["Hyderabad", "Creative Enterprise"],
  /** Set in uppercase via CSS so screen readers read words, not letters. */
  wordmark: ["Kreatif", "Atelier"],
  positioning: ["Where Strategy Meets Story.", "Where Story Becomes Legacy."],
  brandLine: ["Bold", "Radiant", "Timeless"],
  stats: [
    { value: "6+", label: "Core Services" },
    { value: "4", label: "Divisions" },
    /** Drawn as an inline SVG (neither font has ∞); `srValue` is what screen readers hear. */
    { value: "∞", srValue: "Infinite", label: "Creative Vision" },
  ],
  scrollCue: "Scroll",
} as const;

export const contact: {
  id: string;
  marker: string;
  headline: SplitHeadline;
  body: string;
  cta: { label: string; subject: string };
  details: {
    locationLabel: string;
    location: [string, string];
    emailLabel: string;
    phoneLabel: string;
    socialLabel: string;
    socialNetworks: { label: string; key: "instagramUrl" | "linkedinUrl" }[];
  };
} = {
  id: "contact",
  marker: "09 · Let's Begin",
  headline: { lead: "Ready to build something", emphasis: "worth remembering?" },
  body: "Every great brand started with a single conversation. We offer a complimentary 30-minute brand audit call — no obligation, no pitch deck. Just honest strategy.",
  cta: { label: "Schedule Your Free Brand Audit", subject: "Free Brand Audit Request" },
  details: {
    locationLabel: "Studio Location",
    location: ["Hyderabad & Secunderabad", "Telangana, India"],
    emailLabel: "Email",
    phoneLabel: "Phone",
    socialLabel: "Social",
    socialNetworks: [
      { label: "instagram", key: "instagramUrl" },
      { label: "linkedin", key: "linkedinUrl" },
    ],
  },
};

export const footer = {
  socialNetworks: [
    { label: "Instagram", key: "instagramUrl" },
    { label: "LinkedIn", key: "linkedinUrl" },
    { label: "YouTube", key: "youtubeUrl" },
  ] as const,
  /** Bottom-row links. Privacy and Terms are added here once those pages exist (not built yet). */
  legal: [{ label: "Contact", href: "/contact" }],
  /** Shown as "© {year} Kreatif Atelier. All rights reserved." */
  rightsLine: "All rights reserved.",
  email: (address: string) => `Email ${address}`,
  call: (number: string) => `Call ${number}`,
  /** Rendered as "© {year} Kreatif Atelier · All Rights Reserved" with the current year. */
  rights: "All Rights Reserved",
  venturesLabel: "Our Ventures",
  aureliusLinks: [
    { label: "Services", href: "/aurelius/services" },
    { label: "Approach", href: "/approach" },
    { label: "About & history", href: "/about/kreatif-atelier" },
  ],
  backToTop: "Back to top",
} as const;

export const ui = {
  close: "Close",
} as const;

export const mailtoHref = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
