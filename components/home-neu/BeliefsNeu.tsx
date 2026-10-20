import { Knob } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { SmartLink } from "@/components/ui/SmartLink";
import { aurelius, practiceHref, practices } from "@/content/aurelius";

/**
 * What we believe: Aurelius's point of view in its own words, one line per practice (the profile's lines,
 * as on each practice page), as raised cards that lead to that practice. Content beyond the service list.
 */
export function BeliefsNeu() {
  const id = "beliefs-heading";
  const { beliefs } = aurelius;
  return (
    <Section id="beliefs" labelledBy={id}>
      <SectionHeader id={id} label={beliefs.label} headline={beliefs.headline} />
      <ul className="mt-[var(--ds-space-7)] gap-[var(--ds-space-5)] sm:columns-2 lg:columns-3">
        {practices.map((p) => (
          <li key={p.slug} data-reveal className="mb-[var(--ds-space-5)] break-inside-avoid">
            <SmartLink href={practiceHref(p.slug)} className="neu-card group flex flex-col gap-[var(--ds-space-5)] p-[var(--ds-space-6)]">
              <blockquote className="ds-emphasis text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text">{p.pov[0]}</blockquote>
              <span className="flex items-center justify-between gap-[var(--ds-space-3)]">
                <span className="ds-label">{p.name}</span>
                <Knob />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
