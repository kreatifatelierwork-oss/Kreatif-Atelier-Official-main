import { AureliusMain } from "@/components/aurelius-site/AureliusMain";
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

/** Home: the main Aurelius page (components/aurelius-site/AureliusMain.tsx), the same as /aurelius. */
export default function Home() {
  return (
    <PageShell theme="aurelius">
      <AureliusMain />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </PageShell>
  );
}
