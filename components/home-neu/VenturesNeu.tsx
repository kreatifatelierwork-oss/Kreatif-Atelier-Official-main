import { VentureMark } from "@/components/aurelius/art";
import { Play } from "@/components/aurelius/Play";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { Knob } from "@/components/design/NeuButton";
import { SmartLink } from "@/components/ui/SmartLink";
import { aurelius } from "@/content/aurelius";
import { ventures } from "@/content/home";
import { verticals } from "@/content/verticals";

/**
 * The five ventures as linked raised cards, names in type with a small drawn mark each (not their logos) that plays on
 * hover. Aurelius leads across the full row; the other four follow.
 */
export function VenturesNeu() {
  const id = `${ventures.id}-heading`;
  const ordered = [...verticals.filter((v) => v.slug === "aurelius"), ...verticals.filter((v) => v.slug !== "aurelius")];
  return (
    <Section id={ventures.id} labelledBy={id}>
      <SectionHeader id={id} label={ventures.marker} headline={ventures.headline} />
      <ul className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-5)] md:grid-cols-2 lg:grid-cols-4">
        {ordered.map((venture, i) => (
          <li key={venture.slug} data-reveal className={`flex ${i === 0 ? "md:col-span-2 lg:col-span-4" : ""}`}>
            <SmartLink href={`/${venture.slug}`} className="au-venture neu-card relative flex w-full flex-col justify-between gap-[var(--ds-space-6)] p-[var(--ds-space-6)] md:p-[var(--ds-space-7)]">
              <span className={`absolute ${i === 0 ? "top-1/2 right-[var(--ds-space-8)] hidden w-[clamp(7rem,13vw,11rem)] -translate-y-1/2 md:block" : "top-[var(--ds-space-6)] right-[var(--ds-space-6)] w-14"}`}>
                <Play>
                  <VentureMark slug={venture.slug} />
                </Play>
              </span>
              <span className={i === 0 ? "md:pr-[clamp(9rem,16vw,13rem)]" : "pr-16"}>
                <span className="ds-label block">{venture.tagline}</span>
                <span className={`mt-[var(--ds-space-3)] block font-ds-display leading-none text-ds-text uppercase ${i === 0 ? "text-[length:var(--ds-text-display)]" : "text-[length:var(--ds-text-2xl)]"}`}>{venture.name}</span>
                {i === 0 && <span className="ds-emphasis mt-[var(--ds-space-4)] block text-[length:var(--ds-text-xl)] text-ds-muted">{aurelius.tagline}</span>}
              </span>
              <span className="ds-label flex items-center gap-[var(--ds-space-2)] text-ds-blue">
                {ventures.explore} <Knob />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
