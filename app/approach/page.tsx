import type { Metadata } from "next";
import { Attention, ContactCta, Measurement } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Heading, Label } from "@/components/ui/Heading";
import { aurelius } from "@/content/aurelius";
import { approachPage } from "@/content/pages";

export const metadata: Metadata = { ...approachPage.meta, alternates: { canonical: "/approach/" } };

const shell = "px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]";
const wrap = "mx-auto w-full max-w-[1280px]";

/** How Aurelius works: the four parts it holds together, its process, the attention model and measurement. */
export default function Page() {
  return (
    <PageShell>
      <PageHero eyebrow={[...approachPage.eyebrow]} title={approachPage.title} lead={approachPage.lead} />

      <section className={shell}>
        <ol className={`${wrap} grid border-t border-line sm:grid-cols-2 lg:grid-cols-4`}>
          {aurelius.pillars.map((pillar, i) => (
            <li key={pillar.title} data-reveal className="border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <p className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display mt-4 text-[2rem] leading-tight text-cream">{pillar.title}</h2>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-cream-muted">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="process-heading" className={shell}>
        <div className={wrap}>
          <Label>{approachPage.processLabel}</Label>
          <Heading id="process-heading" headline={approachPage.processHeadline} className="mt-6 text-cream" />
          <ol className="mt-12 border-t border-line">
            {aurelius.process.map((step, i) => (
              <li key={step} data-reveal className="flex items-baseline gap-8 border-b border-line py-6">
                <span className="eyebrow text-[0.64rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(1.8rem,3.4vw,3rem)] text-cream">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Attention />
      <Measurement />

      <section className={shell}>
        <div className={`${wrap} text-center`}>
          <p data-reveal className="display mx-auto max-w-4xl text-[clamp(2rem,4.6vw,4rem)] text-cream">
            {approachPage.closing.lead}
          </p>
          <p data-reveal className="mx-auto mt-6 max-w-xl text-[1.08rem] leading-relaxed text-cream-muted">
            {approachPage.closing.body}
          </p>
        </div>
      </section>

      <ContactCta />
    </PageShell>
  );
}
