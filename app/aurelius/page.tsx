import type { Metadata } from "next";
import { PillarsSection } from "@/components/aurelius/PillarsSection";
import { ServiceStaircase } from "@/components/aurelius/ServiceStaircase";
import { AureliusHero } from "@/components/hero/AureliusHero";
import { ContactCta } from "@/components/home/HomeSections";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Heading";
import { aurelius, aureliusHeroFigure } from "@/content/aurelius";

export const metadata: Metadata = { ...aurelius.meta, alternates: { canonical: "/aurelius/" } };

/** The Aurelius page: the shared hero (no copy, no buttons), the four pillars, the eleven practice
 *  areas beside the staircase, the company's own words, and the closing call to action. */
export default function Page() {
  return (
    <PageShell>
      <AureliusHero figure={aureliusHeroFigure} />
      <PillarsSection lightBlock />
      <ServiceStaircase />

      <section aria-labelledby="about-aurelius" className="relative bg-ink px-[var(--gutter)] py-[clamp(5rem,12vh,9rem)] text-cream">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <Label>About Aurelius</Label>
            <h2 id="about-aurelius" className="sr-only">
              About Aurelius
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {aurelius.about.map((paragraph, i) => (
              <p
                key={paragraph}
                data-reveal
                className={i === 0 ? "display text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-cream" : "text-[1.05rem] leading-[1.8] text-cream-muted"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </PageShell>
  );
}
