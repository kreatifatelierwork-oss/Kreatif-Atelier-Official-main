import type { SplitHeadline } from "@/content/types";
import { Star } from "./Star";

/** Small ✦ label that opens a section. */
export function Label({ children, className = "text-accent" }: { children: React.ReactNode; className?: string }) {
  return (
    <p data-reveal className={`eyebrow flex items-center gap-3 text-[0.68rem] ${className}`}>
      <Star className="text-[0.9em]" />
      {children}
    </p>
  );
}

type HeadingProps = { id?: string; headline: SplitHeadline; as?: "h1" | "h2"; className?: string };

/** Display headline whose second half is set in italic. Colour is inherited, so it works on dark and light. */
export function Heading({ id, headline, as: Tag = "h2", className = "" }: HeadingProps) {
  return (
    <Tag id={id} data-reveal-lines className={`display text-[clamp(2.4rem,5.6vw,5rem)] ${className}`}>
      {headline.lead} <span className="block italic opacity-80">{headline.emphasis}</span>
    </Tag>
  );
}
