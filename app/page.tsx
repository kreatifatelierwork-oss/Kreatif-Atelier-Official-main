import { AureliusHero } from "@/components/hero/AureliusHero";
import { heroFigure } from "@/content/home";
import { Attention, Capabilities, ContactCta, Measurement, ParentContext, Positioning, Ventures, WorkTeaser } from "@/components/home/HomeSections";
import { PillarsSection } from "@/components/aurelius/PillarsSection";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/content/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "IN",
  },
};

/** Home: Aurelius-led, with the ventures and the parent grouped near the end (docs/website-blueprint.md §4). */
export default function Home() {
  return (
    <PageShell>
      <AureliusHero figure={heroFigure} showCtas />
      {/* Light block: transparent over the canvas, which paints the page and the dark rising at its end.
          The long bottom padding is the room that rise needs. */}
      <div data-light-block data-dome className="light-block pb-[92vh]">
        <Positioning />
        <PillarsSection />
        <Capabilities />
      </div>
      <Attention />
      <WorkTeaser />
      <Measurement />
      <Ventures />
      <ParentContext />
      <ContactCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </PageShell>
  );
}
