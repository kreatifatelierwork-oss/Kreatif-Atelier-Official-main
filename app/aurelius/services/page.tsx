import type { Metadata } from "next";
import { PracticeList } from "@/components/aurelius/PracticeList";
import { ServiceIndex } from "@/components/aurelius/ServiceIndex";
import { ContactCta } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Heading";
import { aurelius } from "@/content/aurelius";
import { servicesPage } from "@/content/pages";

export const metadata: Metadata = { ...servicesPage.meta, alternates: { canonical: "/aurelius/services/" } };

const shell = "px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]";

export default function Page() {
  return (
    <PageShell>
      <PageHero eyebrow={[...servicesPage.eyebrow]} title={servicesPage.title} lead={servicesPage.lead} />
      <section aria-label={aurelius.labels.practiceAreas} className={shell}>
        <div className="mx-auto w-full max-w-[1280px]">
          <Label>{aurelius.labels.practiceAreas}</Label>
          <div className="mt-8">
            <PracticeList />
          </div>
        </div>
      </section>
      <section id="index" aria-label={aurelius.labels.index} className={`${shell} scroll-mt-24`}>
        <div className="mx-auto w-full max-w-[1280px]">
          <Label>{aurelius.labels.index}</Label>
          <div className="mt-8">
            <ServiceIndex />
          </div>
        </div>
      </section>
      <ContactCta />
    </PageShell>
  );
}
