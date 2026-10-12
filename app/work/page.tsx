import type { Metadata } from "next";
import { ContactCta } from "@/components/home/HomeSections";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Placeholder } from "@/components/ui/Placeholder";
import { workPage } from "@/content/pages";

export const metadata: Metadata = { ...workPage.meta, alternates: { canonical: "/work/" } };

/** Selected work. Shows placeholders until approved case studies are supplied — never invented projects. */
export default function Page() {
  return (
    <PageShell>
      <PageHero eyebrow={[...workPage.eyebrow]} title={workPage.title} lead={workPage.lead} />
      <section className="px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Placeholder key={i} label={workPage.placeholder} className="aspect-[4/5]" />
          ))}
        </div>
      </section>
      <ContactCta />
    </PageShell>
  );
}
