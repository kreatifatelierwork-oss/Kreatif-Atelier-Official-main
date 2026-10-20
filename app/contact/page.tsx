import type { Metadata } from "next";
import { ContactForm } from "@/components/aurelius/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Heading";
import { contactPage } from "@/content/pages";
import { NeuButton } from "@/components/design/NeuButton";
import { contact, mailtoHref, site } from "@/content/site";

const phoneIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const metadata: Metadata = { ...contactPage.meta, alternates: { canonical: "/contact/" } };

export default function Page() {
  const { details } = contact;

  return (
    <PageShell theme="aurelius">
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
                <dt className="eyebrow text-[0.62rem] text-gold">{details.phoneLabel}</dt>
                {site.phones.map((p, i) => (
                  <dd key={p.href} className="mt-3 flex flex-wrap items-center gap-[var(--ds-space-4)]">
                    <a href={p.href} className="display text-[1.4rem] text-cream underline decoration-gold/40 underline-offset-4 hover:text-gold-bright">
                      {p.label}
                    </a>
                    <NeuButton href={p.href} variant={i === 0 ? "primary" : "secondary"} size="sm" knob={phoneIcon} aria-label={`${site.callLabel}: ${p.label}`}>
                      {site.callLabel}
                    </NeuButton>
                  </dd>
                ))}
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
