import type { Metadata } from "next";
import { AboutHeroNeu, FoundersNeu, ReachNeu, VisionNeu } from "@/components/about/AboutNeu";
import { HistoryTimeline } from "@/components/aurelius/HistoryTimeline";
import { ContactNeu } from "@/components/home-neu/ContactNeu";
import { VenturesNeu } from "@/components/home-neu/VenturesNeu";
import { PageShell } from "@/components/layout/PageShell";
import { Heading, Label } from "@/components/ui/Heading";
import { historyPage } from "@/content/history";
import { aboutKaPage } from "@/content/pages";

export const metadata: Metadata = { ...aboutKaPage.meta, alternates: { canonical: "/about/kreatif-atelier/" } };

/**
 * The parent ecosystem, on the site's neumorphic system (owner, 2026-10-21): the opening card, vision, the five
 * ventures, who it serves and its impact, the founders, then the history of the trade it works in (the history
 * blocks keep their own design, unchanged), and the call to action.
 */
export default function Page() {
  return (
    <PageShell theme="aurelius">
      <div className="font-ds-text text-ds-text">
        <AboutHeroNeu />
        <VisionNeu />
        <VenturesNeu />
        <ReachNeu />
        <FoundersNeu />
      </div>

      {/* The history of branding, marketing and advertising */}
      <section id="history" aria-labelledby="history-heading" className="relative overflow-hidden px-[var(--gutter)] pt-[clamp(4rem,10vh,7rem)] pb-[clamp(3rem,7vh,5rem)]">
        <div aria-hidden="true" className="topo topo--fade-left text-cream opacity-[0.13]" />
        <div className="relative mx-auto w-full max-w-[1280px]">
          <Label>{historyPage.marker}</Label>
          <Heading id="history-heading" headline={historyPage.headline} className="mt-6 text-cream" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-16">
            {historyPage.intro.map((paragraph, i) => (
              <p key={paragraph} data-reveal className={i === 0 ? "display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug text-cream" : "text-[1.05rem] leading-[1.8] text-cream-muted"}>
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {historyPage.words.items.map((word) => (
              <div key={word.term} data-reveal className="bg-ink p-8 md:p-10">
                <dt className="a-display text-[clamp(2rem,3.2vw,2.8rem)] text-cream">{word.term}</dt>
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
      <section className="px-[var(--gutter)] py-[clamp(3rem,7vh,5rem)]">
        <div className="mx-auto w-full max-w-[1280px]">
          <ol className="grid border-t border-line md:grid-cols-3">
            {historyPage.closing.items.map((item, i) => (
              <li key={item.title} data-reveal className="border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
                <p className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="a-display mt-4 text-[2rem] text-cream">{item.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-cream-muted">{item.body}</p>
              </li>
            ))}
          </ol>
          <p data-reveal className="mt-10 max-w-3xl text-[0.84rem] leading-relaxed text-cream-faint">
            {historyPage.note}
          </p>
        </div>
      </section>
      <ContactNeu />
    </PageShell>
  );
}
