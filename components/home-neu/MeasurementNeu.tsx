import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { measurement } from "@/content/home";

/** Measure → understand → redirect, and the loop as numbered steps in a pressed track. */
export function MeasurementNeu() {
  const id = `${measurement.id}-heading`;
  return (
    <Section id={measurement.id} labelledBy={id}>
      <p data-reveal className="ds-label">
        {measurement.marker}
      </p>
      <h2 id={id} data-reveal className="ds-heading mt-[var(--ds-space-3)] flex flex-wrap items-baseline gap-x-[var(--ds-space-4)]">
        {measurement.line.map((word, i) => (
          <span key={word} className="flex items-baseline gap-[var(--ds-space-4)]">
            {i > 0 && (
              <span aria-hidden="true" className="ds-gradient-text">
                →
              </span>
            )}
            {word}
          </span>
        ))}
      </h2>
      <div className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-7)] lg:grid-cols-2">
        <div className="flex flex-col gap-[var(--ds-space-4)]">
          {measurement.body.map((line) => (
            <p key={line} data-reveal className="ds-emphasis text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text">
              {line}
            </p>
          ))}
          <div data-reveal className="mt-[var(--ds-space-3)]">
            <NeuButton href={measurement.cta.href}>{measurement.cta.label}</NeuButton>
          </div>
        </div>
        <ol data-reveal className="neu-card neu-card--inset flex flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-5)]">
          {measurement.loop.map((step, i) => (
            <li key={step} className="neu-raised-sm flex items-center gap-[var(--ds-space-4)] rounded-ds-md px-[var(--ds-space-5)] py-[var(--ds-space-4)]">
              <span className="ds-label">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-ds-text text-[length:var(--ds-text-lg)] font-semibold text-ds-text">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
