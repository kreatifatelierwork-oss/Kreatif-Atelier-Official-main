import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PracticeServiceList } from "@/components/aurelius/ServiceNotes";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Heading";
import { Placeholder } from "@/components/ui/Placeholder";
import { SmartLink } from "@/components/ui/SmartLink";
import { aurelius, practiceBySlug, practiceHref, practices } from "@/content/aurelius";
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

const shell = "px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]";
const wrap = "mx-auto w-full max-w-[1280px]";

/** One practice area, from the shared template: point of view, scope, every service, process, related practices. */
export default async function Page({ params }: Props) {
  const practice = practiceBySlug((await params).practice);
  if (!practice) notFound();
  const { labels } = aurelius;
  const related = practice.related.map((slug) => practiceBySlug(slug)).filter((p) => p !== undefined);

  return (
    <PageShell>
      <PageHero eyebrow={[aurelius.name, practice.name]} title={practice.headline} lead={practice.descriptor}>
        {practice.expansion && <p className="eyebrow mt-6 text-[0.6rem] text-gold">{labels.expansion}</p>}
      </PageHero>

      <section className={shell}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}>
          <div className="flex flex-col gap-6">
            {practice.pov.map((line, i) => (
              <p key={line} data-reveal className={i === 0 ? "display text-[clamp(1.8rem,3vw,2.6rem)] leading-snug text-cream" : "display text-[1.5rem] leading-snug text-cream-muted"}>
                {line}
              </p>
            ))}
            <p data-reveal className="mt-2 max-w-xl text-[1.05rem] leading-[1.8] text-cream-muted">
              {practice.scope}
            </p>
            <div data-reveal>
              <Button href="/contact" variant="primary">
                {labels.discuss}
              </Button>
            </div>
          </div>
          <Placeholder className="aspect-[4/5] w-full" />
        </div>
      </section>

      <section aria-labelledby="services-heading" className={shell}>
        <div className={wrap}>
          <Label>{labels.servicesIn}</Label>
          <h2 id="services-heading" data-reveal className="display mt-6 text-[clamp(2rem,4vw,3.4rem)] text-cream">
            {practice.services.length} {labels.services.toLowerCase()}
          </h2>
          <p data-reveal className="mt-4 text-[0.95rem] text-cream-muted">
            {labels.tapHint}
          </p>
          <PracticeServiceList services={practice.services} practice={{ slug: practice.slug, name: practice.name }} />
        </div>
      </section>

      <section aria-labelledby="how-heading" className={shell}>
        <div className={wrap}>
          <Label>{labels.how}</Label>
          <h2 id="how-heading" className="sr-only">
            {labels.how}
          </h2>
          <ol className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
            {aurelius.process.map((step, i) => (
              <li key={step} data-reveal className="border-b border-line py-7 sm:pr-6 lg:border-b-0 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <p className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</p>
                <p className="display mt-3 text-[1.6rem] leading-tight text-cream">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="related-heading" className={shell}>
        <div className={wrap}>
          <Label>{labels.related}</Label>
          <h2 id="related-heading" className="sr-only">
            {labels.related}
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug} data-reveal>
                <SmartLink href={practiceHref(p.slug)} className="group flex h-full flex-col justify-between gap-8 border border-line bg-navy/60 p-7 transition-colors hover:border-gold/70">
                  <span>
                    <span className="display block text-[1.6rem] leading-tight text-cream">{p.name}</span>
                    <span className="mt-3 block text-[0.92rem] leading-relaxed text-cream-muted">{p.descriptor}</span>
                  </span>
                  <span aria-hidden="true" className="text-gold transition-transform duration-500 group-hover:translate-x-1.5">
                    →
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </PageShell>
  );
}
