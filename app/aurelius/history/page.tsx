import type { Metadata } from "next";
import { HistoryTimeline } from "@/components/aurelius/HistoryTimeline";
import { ContactCta } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Heading, Label } from "@/components/ui/Heading";
import { SmartLink } from "@/components/ui/SmartLink";
import { historyPage } from "@/content/history";

export const metadata: Metadata = { ...historyPage.meta, alternates: { canonical: "/aurelius/history/" } };

const shell = "px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]";
const wrap = "mx-auto w-full max-w-[1280px]";

/** A history of branding, marketing and advertising: three words, five eras as an infographic, and what stayed the same. */
export default function Page() {
  const { intro, words, eras, labels, closing, note } = historyPage;

  return (
    <PageShell>
      <PageHero eyebrow={[...historyPage.eyebrow]} title={historyPage.title} lead={historyPage.lead} />

      <section className={shell}>
        <div className={`${wrap} grid gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
          <div className="flex flex-col gap-5">
            {intro.map((paragraph, i) => (
              <p key={paragraph} data-reveal className={i === 0 ? "display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug text-cream" : "text-[1.05rem] leading-[1.8] text-cream-muted"}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* The five eras at a glance; each jumps to its place on the timeline. */}
          <nav aria-label={labels.eras}>
            <Label>{labels.eras}</Label>
            <ol className="mt-6 border-t border-line">
              {eras.map((era, i) => (
                <li key={era.id} data-reveal className="border-b border-line">
                  <SmartLink href={`#${era.id}`} className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-4">
                    <span className="eyebrow text-[0.6rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[clamp(1.4rem,2.2vw,1.9rem)] text-cream transition-transform duration-500 group-hover:translate-x-2">{era.name}</span>
                    <span className="eyebrow hidden text-[0.58rem] text-cream-faint sm:block">{era.dates}</span>
                    <span className="col-start-2 mt-1 text-[0.92rem] text-cream-muted">{era.medium}</span>
                  </SmartLink>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <section aria-labelledby="words-heading" className={shell}>
        <div className={wrap}>
          <h2 id="words-heading" data-reveal className="eyebrow text-[0.68rem] text-accent">
            {words.label}
          </h2>
          <dl className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {words.items.map((word) => (
              <div key={word.term} data-reveal className="bg-ink p-8 md:p-10">
                <dt className="display text-[clamp(2rem,3.2vw,2.8rem)] text-cream">{word.term}</dt>
                <dd className="mt-3">
                  <p className="display text-[1.15rem] leading-snug text-gold italic">{word.origin}</p>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-cream-muted">{word.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <HistoryTimeline />

      <section aria-labelledby="closing-heading" className={shell}>
        <div className={wrap}>
          <Label>{closing.label}</Label>
          <Heading id="closing-heading" headline={closing.headline} className="mt-6 text-cream" />
          <ol className="mt-12 grid border-t border-line md:grid-cols-3">
            {closing.items.map((item, i) => (
              <li key={item.title} data-reveal className="border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
                <p className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-[2rem] leading-tight text-cream">{item.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-cream-muted">{item.body}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-10">
            <Button href={closing.cta.href}>{closing.cta.label}</Button>
          </div>
          <p data-reveal className="mt-14 max-w-3xl border-t border-line pt-6 text-[0.84rem] leading-relaxed text-cream-faint">
            {note}
          </p>
        </div>
      </section>

      <ContactCta />
    </PageShell>
  );
}
