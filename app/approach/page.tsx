import type { Metadata } from "next";
import { DisplayHeading } from "@/components/design/DisplayHeading";
import { FloatCluster } from "@/components/design/FloatCluster";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { AttentionNeu } from "@/components/home-neu/AttentionNeu";
import { ContactNeu } from "@/components/home-neu/ContactNeu";
import { MeasurementNeu } from "@/components/home-neu/MeasurementNeu";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { PracticeArtifact } from "@/components/services/PracticeArtifact";
import { aurelius } from "@/content/aurelius";
import { approachPage } from "@/content/pages";
import { sectionArtifacts } from "@/features/home-v2/data/artifactSets";

export const metadata: Metadata = { ...approachPage.meta, alternates: { canonical: "/approach/" } };

/**
 * How Aurelius works, on the Aurelius design system: the four parts it holds together as raised cards,
 * the five-step process in a pressed track (with fitting objects floating beside it), the attention model,
 * measurement, the closing line and the call to action. Copy unchanged (content/pages.ts, content/aurelius.ts).
 */
export default function Page() {
  return (
    <PageShell theme="aurelius">
      <div className="font-ds-text text-ds-text">
        <PageHero
          eyebrow={[...approachPage.eyebrow]}
          title={approachPage.title}
          lead={approachPage.lead}
          aside={<PracticeArtifact slug="all-services" className="mx-auto max-w-[min(32rem,90vw)]" />}
        />

        <Section id="parts" labelledBy="parts-heading">
          <h2 id="parts-heading" className="sr-only">
            {aurelius.labels.pillars}
          </h2>
          <ol className="grid gap-[var(--ds-space-5)] sm:grid-cols-2 lg:grid-cols-4">
            {aurelius.pillars.map((pillar, i) => (
              <li key={pillar.title} data-reveal className="neu-card flex flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-6)]">
                <span className="ds-label">{String(i + 1).padStart(2, "0")}</span>
                <DisplayHeading level={3} className="font-ds-display text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] uppercase">
                  {pillar.title}
                </DisplayHeading>
                <p className="ds-body">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="process" labelledBy="process-heading">
          <div className="relative lg:min-h-[20rem]">
            <SectionHeader id="process-heading" label={approachPage.processLabel} headline={approachPage.processHeadline} className="lg:max-w-[58%]" />
            <FloatCluster slugs={sectionArtifacts.approach} seed={5} />
          </div>
          <ol data-reveal className="neu-card neu-card--inset mt-[var(--ds-space-7)] grid gap-[var(--ds-space-4)] p-[var(--ds-space-5)] sm:grid-cols-2 lg:grid-cols-5">
            {aurelius.process.map((step, i) => (
              <li key={step} className="neu-card flex flex-col gap-[var(--ds-space-2)] p-[var(--ds-space-5)]">
                <span className="ds-label">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <AttentionNeu />
        <MeasurementNeu />

        <Section id="closing" labelledBy="closing-heading">
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <DisplayHeading level={2} id="closing-heading" className="ds-heading">
              {approachPage.closing.lead}
            </DisplayHeading>
            <p className="ds-body mx-auto mt-[var(--ds-space-5)] max-w-xl text-[length:var(--ds-text-lg)]">{approachPage.closing.body}</p>
          </div>
        </Section>

        <ContactNeu />
      </div>
    </PageShell>
  );
}
