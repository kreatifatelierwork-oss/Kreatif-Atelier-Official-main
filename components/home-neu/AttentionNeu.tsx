import { Section } from "@/components/design/Section";
import { FloatCluster } from "@/components/design/FloatCluster";
import { SectionHeader } from "@/components/design/SectionHeader";
import { sectionArtifacts } from "@/features/home-v2/data/artifactSets";
import { attention } from "@/content/home";

/** Own, buy, keep: the platforms floating beside the heading, three raised cards, then the closing line. */
export function AttentionNeu() {
  const id = `${attention.id}-heading`;
  return (
    <Section id={attention.id} labelledBy={id}>
      <div className="relative lg:min-h-[20rem]">
        <SectionHeader id={id} label={attention.marker} headline={attention.headline} className="max-w-4xl lg:max-w-[58%]" />
        <p data-reveal className="ds-body mt-[var(--ds-space-5)] max-w-2xl text-[length:var(--ds-text-lg)] lg:max-w-[52%]">
          {attention.body}
        </p>
        {/* The platforms where attention is owned, bought and kept. */}
        <FloatCluster slugs={sectionArtifacts.attention} seed={3} />
      </div>
      <ol className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-6)] md:grid-cols-3">
        {attention.modes.map((mode) => (
          <li key={mode.title} data-reveal className="neu-card p-[var(--ds-space-7)]">
            <h3 className="ds-display ds-gradient-text">{mode.title}</h3>
            <p className="ds-body mt-[var(--ds-space-3)]">{mode.body}</p>
          </li>
        ))}
      </ol>
      <p data-reveal className="ds-heading mt-[var(--ds-space-8)] text-center">
        {attention.closing} <span className="ds-emphasis text-ds-muted">{attention.kicker}</span>
      </p>
    </Section>
  );
}
