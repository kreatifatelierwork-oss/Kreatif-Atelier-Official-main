import type { Metadata } from "next";
import { ContactForm } from "@/components/aurelius/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Heading";
import { contactPage } from "@/content/pages";
import { contact, mailtoHref, site } from "@/content/site";

export const metadata: Metadata = { ...contactPage.meta, alternates: { canonical: "/contact/" } };

export default function Page() {
  const { details } = contact;

  return (
    <PageShell>
      <PageHero eyebrow={[...contactPage.eyebrow]} title={contactPage.title} lead={contactPage.lead} />
      <section className="px-[var(--gutter)] pb-[clamp(5rem,12vh,9rem)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <ContactForm />
          <aside>
            <Label>{contactPage.detailsLabel}</Label>
            <dl className="mt-8 flex flex-col gap-8">
              <div>
                <dt className="eyebrow text-[0.62rem] text-gold">{details.emailLabel}</dt>
                <dd className="display mt-2 text-[1.4rem] text-cream">
                  <a href={mailtoHref()} className="underline decoration-gold/40 underline-offset-4 hover:text-gold-bright">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.62rem] text-gold">{details.locationLabel}</dt>
                <dd className="display mt-2 text-[1.4rem] leading-snug text-cream">
                  {details.location[0]}
                  <br />
                  <span className="text-cream-muted">{details.location[1]}</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.62rem] text-gold">{details.socialLabel}</dt>
                <dd className="display mt-2 text-[1.4rem] text-cream">{site.handle}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
