import { Balance } from "@/components/aurelius/art";
import { Play } from "@/components/aurelius/Play";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { positioning } from "@/content/home";

/** Why Aurelius exists: the headline over a scale that comes level when played, beside the argument. */
export function PositioningNeu() {
  const id = `${positioning.id}-heading`;
  return (
    <Section id={positioning.id} labelledBy={id}>
      <div className="grid gap-[var(--ds-space-7)] lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader id={id} label={positioning.marker} headline={positioning.headline} />
          <Play className="mt-[var(--ds-space-6)] max-w-[24rem]">
            <Balance />
          </Play>
        </div>
        <div data-reveal className="neu-card flex flex-col gap-[var(--ds-space-4)] p-[var(--ds-space-7)]">
          {positioning.body.map((paragraph, i) => (
            <p key={paragraph} className={i === 0 ? "ds-emphasis text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text" : "ds-body"}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
