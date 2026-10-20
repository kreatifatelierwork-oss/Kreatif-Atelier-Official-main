import { Knob, NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { aurelius, practiceBySlug, practiceHref } from "@/content/aurelius";
import { capabilities } from "@/content/home";
import { SmartLink } from "@/components/ui/SmartLink";
import { ServiceArtifact } from "@/components/services/ServiceArtifact";
import { serviceCategories } from "@/content/services-menu";

/** Six ways in, as linked cards, each with its practice's 3D artifact; the full eleven live on the services page. */
export function CapabilitiesNeu() {
  const id = `${capabilities.id}-heading`;
  return (
    <Section id={capabilities.id} labelledBy={id}>
      <SectionHeader id={id} label={capabilities.marker} headline={capabilities.headline} />
      <ol className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-5)] sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.entries.map((entry, i) => (
          <li key={entry.slug} data-reveal className="flex">
            <SmartLink href={practiceHref(entry.slug)} className="neu-card group flex w-full flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-6)]">
              {(() => {
                const category = serviceCategories.find((c) => c.id === entry.slug);
                return (
                  category && (
                    <ServiceArtifact
                      category={category}
                      size={260}
                      className="mx-auto h-auto w-[min(13rem,72%)] transition-transform duration-[var(--ds-dur-base)] ease-[var(--ds-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:-translate-y-1"
                    />
                  )
                );
              })()}
              <span className="ds-label">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{entry.label}</span>
              <span className="ds-body">{practiceBySlug(entry.slug)?.descriptor}</span>
              <Knob className="mt-auto" />
            </SmartLink>
          </li>
        ))}
      </ol>
      <div data-reveal className="mt-[var(--ds-space-7)]">
        <NeuButton href="/aurelius/services" variant="primary">
          {aurelius.labels.allPractices}
        </NeuButton>
      </div>
    </Section>
  );
}
