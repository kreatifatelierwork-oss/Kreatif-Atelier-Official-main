import type { Metadata } from "next";
import { ContactCta, Ventures } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { EcosystemReach } from "@/components/sections/EcosystemReach";
import { Founders } from "@/components/sections/Founders";
import { Heading, Label } from "@/components/ui/Heading";
import { vision } from "@/content/front";
import { parent } from "@/content/home";
import { aboutKaPage } from "@/content/pages";

export const metadata: Metadata = { ...aboutKaPage.meta, alternates: { canonical: "/about/kreatif-atelier/" } };

/** The parent ecosystem: what it is, its vision, the five ventures, who it serves, and the founders. */
export default function Page() {
  return (
    <PageShell>
      <PageHero eyebrow={[...aboutKaPage.eyebrow]} title={aboutKaPage.title} lead={parent.body} />

      <section aria-labelledby={`${vision.id}-heading`} className="px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]">
        <div className="mx-auto w-full max-w-[1280px] border-t border-line pt-12">
          <Label>{vision.marker}</Label>
          <Heading id={`${vision.id}-heading`} headline={vision.headline} className="mt-6 text-cream" />
          <p data-reveal className="mt-8 max-w-3xl text-[1.15rem] leading-[1.8] text-cream-muted">
            {vision.body}
          </p>
          <p data-reveal className="eyebrow mt-8 text-[0.66rem] text-gold">
            {vision.principles.join(" · ")}
          </p>
        </div>
      </section>

      <Ventures />
      <EcosystemReach />
      <Founders />
      <ContactCta />
    </PageShell>
  );
}
