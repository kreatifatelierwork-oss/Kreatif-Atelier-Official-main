import type { SplitHeadline } from "./types";

/** Kreatif Atelier's vision, word for word from the company structure sheet (shown on /about/kreatif-atelier). */
export const vision: {
  id: string;
  marker: string;
  headline: SplitHeadline;
  body: string;
  principles: string[];
  closing: SplitHeadline;
} = {
  id: "vision",
  marker: "Vision",
  headline: { lead: "A creative holding ecosystem", emphasis: "for a better tomorrow." },
  body: "To build an interdisciplinary ecosystem that creates meaningful opportunities, cultural value and long-term impact through creativity, education, production and innovation.",
  principles: ["Multiple verticals", "One vision", "Exponential impact"],
  closing: { lead: "Different expertise.", emphasis: "A stronger tomorrow." },
};
