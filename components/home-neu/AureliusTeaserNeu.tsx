import { DisplayHeading } from "@/components/design/DisplayHeading";
import { FloatCluster } from "@/components/design/FloatCluster";
import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { aurelius } from "@/content/aurelius";
import { hero } from "@/content/home";
import { sectionArtifacts } from "@/features/home-v2/data/artifactSets";

/**
 * The home page's short word on Aurelius (Roo, 2026-10-20: the home page points to Aurelius; the
 * Aurelius page carries the depth). Existing copy only: the descriptor, the support line, the four parts,
 * and the way in. The platforms float beside it.
 */
export function AureliusTeaserNeu() {
  const id = "aurelius-teaser-heading";
  return (
    <Section id="aurelius" labelledBy={id}>
      <div data-reveal className="neu-card relative p-[var(--ds-space-7)] lg:p-[var(--ds-space-8)]">
        <div className="lg:max-w-[58%]">
          <p className="ds-label">
            {aurelius.name} · {aurelius.byline}
          </p>
          <DisplayHeading level={2} id={id} className="ds-heading mt-[var(--ds-space-3)]">
            {aurelius.descriptor}
          </DisplayHeading>
          <p className="ds-emphasis mt-[var(--ds-space-4)] text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-muted">{aurelius.support}</p>
          <ul className="mt-[var(--ds-space-5)] flex flex-wrap gap-[var(--ds-space-2)]">
            {aurelius.pillars.map((p) => (
              <li key={p.title} className="neu-chip">
                {p.title}
              </li>
            ))}
          </ul>
          <div className="mt-[var(--ds-space-6)]">
            <NeuButton href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </NeuButton>
          </div>
        </div>
        <FloatCluster slugs={sectionArtifacts.homeTeaser} seed={7} />
      </div>
    </Section>
  );
}
