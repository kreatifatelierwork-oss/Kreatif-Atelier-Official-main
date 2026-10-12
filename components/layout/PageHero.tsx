import { Star } from "@/components/ui/Star";

type Props = {
  eyebrow: string[];
  title: string;
  /** One line under the title, set in italic serif. */
  lead?: string;
  children?: React.ReactNode;
};

/** Typographic opening for inner pages. `id="home"` gives "back to top" a target. */
export function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative px-[var(--gutter)] pt-[calc(var(--nav-h)+clamp(4rem,14vh,9rem))] pb-[clamp(3rem,8vh,6rem)]"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <p className="eyebrow flex flex-wrap items-center gap-3 text-[0.66rem] text-cream-muted">
          {eyebrow.map((part, i) => (
            <span key={part} className="flex items-center gap-3">
              {i > 0 && <Star className="text-accent" />}
              {part}
            </span>
          ))}
        </p>
        <h1 id="home-heading" className="display mt-6 max-w-5xl text-[clamp(2.8rem,7.4vw,7rem)] leading-[0.98] font-medium text-cream">
          {title}
        </h1>
        {lead && <p className="display mt-7 max-w-3xl text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-cream-muted italic">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
