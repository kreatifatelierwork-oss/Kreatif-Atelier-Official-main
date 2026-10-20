import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactNeu } from "@/components/home-neu/ContactNeu";
import { ServiceArtifact } from "@/components/services/ServiceArtifact";
import { PracticeArtifact } from "@/components/services/PracticeArtifact";
import { PracticeFloaters } from "@/components/services/PracticeFloaters";
import { serviceCategories } from "@/content/services-menu";
import { PageHero } from "@/components/layout/PageHero";
import { PracticeServiceList } from "@/components/aurelius/ServiceNotes";
import { PageShell } from "@/components/layout/PageShell";
import { NeuButton } from "@/components/design/NeuButton";
import { SmartLink } from "@/components/ui/SmartLink";
import { aurelius, practiceBySlug, practiceHref, practices, servicesLabel } from "@/content/aurelius";
import { site } from "@/content/site";

type Props = { params: Promise<{ practice: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return practices.map((p) => ({ practice: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const practice = practiceBySlug((await params).practice);
  if (!practice) return {};
  return {
    title: `${practice.name} — ${aurelius.name} | ${site.name}`,
    description: `${practice.descriptor} ${practice.scope}`,
    alternates: { canonical: `${practiceHref(practice.slug)}/` },
  };
}

const shell = "px-[var(--ds-gutter)] py-[var(--ds-space-9)]";
const wrap = "mx-auto w-full max-w-[var(--ds-max-width)]";
const categoryOf = (slug: string) => serviceCategories.find((c) => c.id === slug);

/** One practice area, from the shared template: its 3D artifact, every service, point of view and scope, process, related practices. */
export default async function Page({ params }: Props) {
  const practice = practiceBySlug((await params).practice);
  if (!practice) notFound();
  const { labels } = aurelius;
  const related = practice.related.map((slug) => practiceBySlug(slug)).filter((p) => p !== undefined);

  return (
    <PageShell theme="aurelius">
      <PageHero eyebrow={[aurelius.name, practice.name]} title={practice.headline} lead={practice.descriptor} aside={
          <div className="relative mx-auto w-full max-w-[min(34rem,90vw)]">
            <PracticeArtifact slug={practice.slug} />
            <PracticeFloaters slug={practice.slug} zone="hero" />
          </div>
        }>
        {practice.expansion && <p className="neu-chip mt-[var(--ds-space-5)]">{labels.expansion}</p>}
      </PageHero>

      <section aria-labelledby="services-heading" className={shell}>
        <div className={wrap}>
          <p className="ds-label">{labels.servicesIn}</p>
          <h2 id="services-heading" data-reveal className="ds-heading mt-[var(--ds-space-3)]">
            {servicesLabel(practice.services.length)}
          </h2>
          <p data-reveal className="ds-body mt-[var(--ds-space-3)]">
            {labels.tapHint}
          </p>
          <PracticeServiceList services={practice.services} practice={{ slug: practice.slug, name: practice.name }} />
        </div>
      </section>

      <section className={shell}>
        <div data-reveal className={`${wrap} neu-card relative flex flex-col gap-[var(--ds-space-5)] p-[var(--ds-space-7)] lg:p-[var(--ds-space-8)]`}>
          {practice.pov.map((line, i) => (
            <p key={line} className={`ds-emphasis leading-[var(--ds-leading-heading)] lg:max-w-[58%] ${i === 0 ? "text-[length:var(--ds-text-3xl)] text-ds-text" : "text-[length:var(--ds-text-2xl)] text-ds-muted"}`}>
              {line}
            </p>
          ))}
          <p className="ds-body max-w-2xl text-[length:var(--ds-text-lg)]">{practice.scope}</p>
          <div>
            <NeuButton href="/contact" variant="primary">
              {labels.discuss}
            </NeuButton>
          </div>
          <PracticeFloaters slug={practice.slug} zone="pov" />
        </div>
      </section>

      <section aria-labelledby="how-heading" className={shell}>
        <div className={wrap}>
          <h2 id="how-heading" className="ds-label">
            {labels.how}
          </h2>
          <ol className="mt-[var(--ds-space-6)] grid gap-[var(--ds-space-5)] sm:grid-cols-2 lg:grid-cols-5">
            {aurelius.process.map((step, i) => (
              <li key={step} data-reveal className="neu-card p-[var(--ds-space-5)]">
                <p className="ds-label">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-[var(--ds-space-2)] font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="related-heading" className={shell}>
        <div className={wrap}>
          <h2 id="related-heading" className="ds-label">
            {labels.related}
          </h2>
          <ul className="mt-[var(--ds-space-6)] grid gap-[var(--ds-space-5)] md:grid-cols-3">
            {related.map((p) => {
              const category = categoryOf(p.slug);
              return (
                <li key={p.slug} data-reveal className="flex">
                  <SmartLink href={practiceHref(p.slug)} className="neu-card flex w-full flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-5)]">
                    {category && <ServiceArtifact category={category} size={240} className="mx-auto h-auto w-[min(12rem,70%)]" />}
                    <span className="font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{p.name}</span>
                    <span className="ds-body">{p.descriptor}</span>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactNeu />
    </PageShell>
  );
}
