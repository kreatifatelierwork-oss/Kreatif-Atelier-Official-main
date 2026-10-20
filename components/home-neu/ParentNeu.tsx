import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { parent } from "@/content/home";

/** The parent company in one breath. */
export function ParentNeu() {
  const id = `${parent.id}-heading`;
  return (
    <Section id={parent.id} labelledBy={id}>
      <div data-reveal className="neu-card grid gap-[var(--ds-space-6)] p-[var(--ds-space-7)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-[var(--ds-space-8)] lg:p-[var(--ds-space-8)]">
        <div>
          <p className="ds-label">{parent.marker}</p>
          <h2 id={id} className="ds-heading mt-[var(--ds-space-3)]">
            {parent.line.join(". ")}.
          </h2>
        </div>
        <div className="flex flex-col gap-[var(--ds-space-5)]">
          <p className="ds-emphasis text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text">{parent.body}</p>
          <div>
            <NeuButton href={parent.cta.href}>{parent.cta.label}</NeuButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
