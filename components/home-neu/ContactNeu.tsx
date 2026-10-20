import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { contactCta } from "@/content/home";
import { site } from "@/content/site";

/** The closing invitation, in a deep pressed well with a soft gradient glow. */
export function ContactNeu() {
  const id = `${contactCta.id}-heading`;
  return (
    <Section id={contactCta.id} labelledBy={id}>
      <div data-reveal className="neu-card neu-card--inset relative overflow-hidden px-[var(--ds-space-6)] py-[var(--ds-space-9)] text-center">
        <span aria-hidden="true" className="absolute -top-[20%] left-1/2 aspect-square w-[60%] -translate-x-1/2 rounded-full bg-[image:var(--ds-accent-gradient)] opacity-20 blur-3xl" />
        <div className="relative">
          <SectionHeader id={id} headline={contactCta.headline} align="center" className="mx-auto max-w-4xl" />
          <p className="ds-body mx-auto mt-[var(--ds-space-5)] max-w-xl text-[length:var(--ds-text-lg)]">{contactCta.body}</p>
          <div className="mt-[var(--ds-space-7)] flex flex-wrap justify-center gap-[var(--ds-space-4)]">
            <NeuButton href={contactCta.cta.href} variant="primary">
              {contactCta.cta.label}
            </NeuButton>
            <NeuButton href={site.phoneHref}>
              {site.callLabel} · {site.phone}
            </NeuButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
