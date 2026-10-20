import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { work } from "@/content/home";

/** Selected work: pressed wells holding the honest placeholder until approved case studies arrive. */
export function WorkNeu() {
  const id = `${work.id}-heading`;
  return (
    <Section id={work.id} labelledBy={id}>
      <SectionHeader id={id} label={work.marker} headline={work.headline} />
      <ul className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-6)] md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <li key={i} data-reveal className="neu-card neu-card--inset grid aspect-[4/5] place-items-center p-[var(--ds-space-6)] text-center">
            <span className="ds-label">{work.placeholder}</span>
          </li>
        ))}
      </ul>
      <div data-reveal className="mt-[var(--ds-space-7)]">
        <NeuButton href={work.cta.href}>{work.cta.label}</NeuButton>
      </div>
    </Section>
  );
}
