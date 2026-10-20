import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { StepWire } from "@/components/design/StepWire";
import { loopSteps } from "@/content/approach";
import { measurement } from "@/content/home";

/** Measure → understand → redirect, and the loop as separate steps on a wire that draws round and back to the start. */
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
        <StepWire steps={loopSteps} loop label={measurement.marker} />
      </div>
    </Section>
  );
}
