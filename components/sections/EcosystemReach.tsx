import { ecosystem } from "@/content/verticals";
import { Star } from "@/components/ui/Star";

/** Who the ecosystem serves and the outcomes it works toward (from the structure sheet). */
export function EcosystemReach() {
  return (
    <section id={ecosystem.id} aria-labelledby={`${ecosystem.id}-heading`} className="relative px-[var(--gutter)] py-[clamp(6rem,14vh,11rem)]">
      <div className="mx-auto w-full max-w-[1280px]">
        {[ecosystem.serves, ecosystem.impact].map((group) => (
          <div key={group.label} className="mb-16 last:mb-0">
            <h3 data-reveal className="eyebrow flex items-center gap-3 text-gold">
              <Star className="text-[0.9em]" />
              {group.label}
            </h3>
            <ul className="mt-8 grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-6">
              {group.items.map((item) => (
                <li key={item} data-reveal className="display border-b border-line py-7 pr-4 text-[clamp(1.35rem,1.9vw,1.7rem)] leading-tight text-cream lg:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <h2
          id={`${ecosystem.id}-heading`}
          data-reveal
          className="display mx-auto mt-[clamp(5rem,14vh,9rem)] max-w-4xl text-center text-[clamp(2.3rem,5.4vw,4.8rem)] text-cream"
        >
          {ecosystem.closing.lead} <span className="emph block">{ecosystem.closing.emphasis}</span>
        </h2>
      </div>
    </section>
  );
}
