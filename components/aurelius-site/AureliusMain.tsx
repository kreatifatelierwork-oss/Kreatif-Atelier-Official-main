import { Section } from "@/components/design/Section";
import { AttentionNeu } from "@/components/home-neu/AttentionNeu";
import { BeliefsNeu } from "@/components/home-neu/BeliefsNeu";
import { CapabilitiesNeu } from "@/components/home-neu/CapabilitiesNeu";
import { ClientsNeu } from "@/components/home-neu/ClientsNeu";
import { ContactNeu } from "@/components/home-neu/ContactNeu";
import { FilmReelNeu } from "@/components/home-neu/FilmReelNeu";
import { MeasurementNeu } from "@/components/home-neu/MeasurementNeu";
import { PositioningNeu } from "@/components/home-neu/PositioningNeu";
import { ServicesNeu } from "@/components/home-neu/ServicesNeu";
import { VenturesNeu } from "@/components/home-neu/VenturesNeu";
import { aurelius } from "@/content/aurelius";
import { HeroAurelius } from "./HeroAurelius";

/**
 * The main page, the same at "/" and "/aurelius" (owner, 2026-10-21: the KA monogram and the Aurelius link lead to
 * one page). The hero, film reel, positioning, the four pillars, capabilities, what we believe, attention,
 * measurement, where we work, about Aurelius, the call to action, and our ventures at the end.
 */
export function AureliusMain() {
  return (
    <div className="font-ds-text text-ds-text">
      <HeroAurelius primary={{ label: aurelius.labels.allServices, href: "/aurelius/services" }} secondary={null} />
      <FilmReelNeu />
      <PositioningNeu />
      <ServicesNeu />
      <CapabilitiesNeu />
      <BeliefsNeu />
      <AttentionNeu />
      {/* Selected Work is unmounted for now (2026-10-20); restore with <WorkNeu /> from components/home-neu/WorkNeu.tsx. */}
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
      <VenturesNeu />
    </div>
  );
}
