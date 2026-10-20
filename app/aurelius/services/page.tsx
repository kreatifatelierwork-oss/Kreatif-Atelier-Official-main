import type { Metadata } from "next";
import { PracticeList } from "@/components/aurelius/PracticeList";
import { FloatingArtifact } from "@/components/design/FloatingArtifact";
import { PracticeArtifact } from "@/components/services/PracticeArtifact";
import { sectionArtifacts } from "@/features/home-v2/data/artifactSets";
import { DisplayHeading } from "@/components/design/DisplayHeading";
import { AllServices } from "@/components/services-index/AllServices";
import { servicesIndex } from "@/content/services-index";
import { ContactCta } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Heading";
import { aurelius } from "@/content/aurelius";
import { servicesPage } from "@/content/pages";

export const metadata: Metadata = { ...servicesPage.meta, alternates: { canonical: "/aurelius/services/" } };

const shell = "px-[var(--ds-gutter)] py-[var(--ds-space-8)]";
const poster = (slug: string) => ({ src: `/images/artifacts/${slug}.webp`, width: 420, height: 420 });

/** The header's artwork: the All Services artifact, with two suiting objects floating around it. */
function HeroArt() {
  const [a, b] = sectionArtifacts.servicesHero;
  return (
    <div className="relative mx-auto w-full max-w-[min(32rem,90vw)]">
      <PracticeArtifact slug="all-services" />
      <FloatingArtifact seed={17} className="pf pf--hero-a" image={poster(a)} live={{ kind: "obj", slug: a }} />
      <FloatingArtifact seed={29} className="pf pf--hero-b" image={poster(b)} live={{ kind: "obj", slug: b }} />
    </div>
  );
}

export default function Page() {
  return (
    <PageShell theme="aurelius">
      <PageHero eyebrow={[...servicesPage.eyebrow]} title={servicesPage.title} lead={servicesPage.lead} aside={<HeroArt />} />
      <section aria-label={aurelius.labels.practiceAreas} className={shell}>
        <div className="mx-auto w-full max-w-[var(--ds-max-width)]">
          <Label>{aurelius.labels.practiceAreas}</Label>
          <div className="mt-8">
            <PracticeList withAll />
          </div>
        </div>
      </section>
      <section id="index" aria-labelledby="all-services-heading" className={`${shell} scroll-mt-24`}>
        <div className="mx-auto w-full max-w-[var(--ds-max-width)]">
          <div className="flex items-center justify-between gap-[var(--ds-space-5)]">
            <DisplayHeading level={2} id="all-services-heading" className="ds-heading">
              {servicesIndex.heading}
            </DisplayHeading>
          </div>
          <div className="mt-[var(--ds-space-6)]">
            <AllServices />
          </div>
        </div>
      </section>
      <ContactCta />
    </PageShell>
  );
}
