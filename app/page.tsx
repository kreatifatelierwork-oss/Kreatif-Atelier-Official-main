import { AureliusTeaserNeu } from "@/components/home-neu/AureliusTeaserNeu";
import { ClientsNeu } from "@/components/home-neu/ClientsNeu";
import { ContactNeu } from "@/components/home-neu/ContactNeu";
import { HeroAurelius } from "@/components/aurelius-site/HeroAurelius";
import { ParentNeu } from "@/components/home-neu/ParentNeu";
import { VenturesNeu } from "@/components/home-neu/VenturesNeu";
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

/**
 * Home (2026-10-20): the front door. The Aurelius hero, a short word on Aurelius that leads to its own
 * page (where the depth lives: film, positioning, pillars, capabilities, attention, measurement), where we
 * serve clients, the ventures, the parent company and the way to get in touch.
 */
export default function Home() {
  return (
    <PageShell theme="aurelius">
      <div className="font-ds-text text-ds-text">
        <HeroAurelius secondary={null} />
        <AureliusTeaserNeu />
        <ClientsNeu />
        <VenturesNeu />
        <ParentNeu />
        <ContactNeu />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </PageShell>
  );
}
