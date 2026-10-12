import type { Metadata } from "next";
import { PracticeList } from "@/components/aurelius/PracticeList";
import { ContactCta } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Heading";
import { aurelius } from "@/content/aurelius";
import { aboutAureliusPage } from "@/content/pages";

export const metadata: Metadata = { ...aboutAureliusPage.meta, alternates: { canonical: "/about/aurelius/" } };

const shell = "px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]";
const wrap = "mx-auto w-full max-w-[1280px]";

export default function Page() {
  return (
    <PageShell>
      <PageHero eyebrow={[...aboutAureliusPage.eyebrow]} title={aurelius.tagline} lead={aurelius.support} />

      <section className={shell}>
        <div className={`${wrap} grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20`}>
          <Label>{aboutAureliusPage.aboutLabel}</Label>
          <div className="flex flex-col gap-6">
            {aurelius.about.map((paragraph, i) => (
              <p key={paragraph} data-reveal className={i === 0 ? "display text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-cream" : "text-[1.08rem] leading-[1.8] text-cream-muted"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={shell}>
        <div className={wrap}>
          <Label>{aboutAureliusPage.pillarsLabel}</Label>
          <ol className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {aurelius.pillars.map((pillar, i) => (
              <li key={pillar.title} data-reveal className="border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <p className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="display mt-4 text-[2rem] leading-tight text-cream">{pillar.title}</h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-cream-muted">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={shell}>
        <div className={wrap}>
          <Label>{aurelius.labels.practiceAreas}</Label>
          <div className="mt-8">
            <PracticeList />
          </div>
        </div>
      </section>

      <ContactCta />
    </PageShell>
  );
}
