import type { Metadata } from "next";
import { Section } from "@/components/design/Section";
import { AttentionNeu } from "@/components/home-neu/AttentionNeu";
import { BeliefsNeu } from "@/components/home-neu/BeliefsNeu";
import { CapabilitiesNeu } from "@/components/home-neu/CapabilitiesNeu";
import { ClientsNeu } from "@/components/home-neu/ClientsNeu";
import { ContactNeu } from "@/components/home-neu/ContactNeu";
import { FilmReelNeu } from "@/components/home-neu/FilmReelNeu";
import { MeasurementNeu } from "@/components/home-neu/MeasurementNeu";
import { PositioningNeu } from "@/components/home-neu/PositioningNeu";
import { HeroAurelius } from "@/components/aurelius-site/HeroAurelius";
import { ServicesNeu } from "@/components/home-neu/ServicesNeu";
import { PageShell } from "@/components/layout/PageShell";
import { aurelius } from "@/content/aurelius";

export const metadata: Metadata = { ...aurelius.meta, alternates: { canonical: "/aurelius/" } };

/**
 * The Aurelius page: everything about Aurelius (the home page only introduces it). The hero, the film reel,
 * positioning, the four pillars, the eleven capabilities, what we believe, attention (with the platforms), measurement,
 * where we serve clients, the company's own words, and the call to action.
 */
export default function Page() {
  return (
    <PageShell theme="aurelius">
      <div className="font-ds-text text-ds-text">
        <HeroAurelius primary={{ label: aurelius.labels.allServices, href: "/aurelius/services" }} secondary={null} />
        <FilmReelNeu />
        <PositioningNeu />
        <ServicesNeu />
        <CapabilitiesNeu />
        <BeliefsNeu />
        <AttentionNeu />
        {/* Selected Work is unmounted for now (2026-10-20, Aurelius revamp); restore with
            <WorkNeu /> from components/home-neu/WorkNeu.tsx. Its data is content/home.ts → work. */}
        <MeasurementNeu />
        <ClientsNeu />
        <Section id="about-aurelius" labelledBy="about-aurelius-heading">
          <div data-reveal className="neu-card grid gap-[var(--ds-space-6)] p-[var(--ds-space-7)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-[var(--ds-space-8)] lg:p-[var(--ds-space-8)]">
            <h2 id="about-aurelius-heading" className="ds-heading">
              About <span className="ds-emphasis block text-ds-muted">{aurelius.name}</span>
            </h2>
            <div className="flex flex-col gap-[var(--ds-space-4)]">
              {aurelius.about.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? "ds-emphasis text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text" : "ds-body text-[length:var(--ds-text-lg)]"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>
        <ContactNeu />
      </div>
    </PageShell>
  );
}
