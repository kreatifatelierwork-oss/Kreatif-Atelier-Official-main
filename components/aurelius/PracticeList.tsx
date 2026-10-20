import { aurelius, practiceHref, practices, serviceCount, servicesLabel } from "@/content/aurelius";
import { allServices } from "@/content/services-menu";
import { domainArtifact } from "@/content/services";
import { FloatingArtifact } from "@/components/design/FloatingArtifact";
import { Knob } from "@/components/design/NeuButton";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * The eleven practice areas (domains) as raised cards, each with its own floating artifact, linking to its page.
 * `withAll` adds a twelfth card, All services, with the All Services artifact, leading to the full index.
 */
export function PracticeList({ withAll = false }: { withAll?: boolean }) {
  return (
    <ol className="grid gap-[var(--ds-space-5)] sm:grid-cols-2 lg:grid-cols-3">
      {practices.map((practice, i) => {
        return (
          <li key={practice.slug} data-reveal className="flex">
            <SmartLink href={practiceHref(practice.slug)} className="neu-card group flex w-full flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-5)]">
              <div className="relative mx-auto aspect-square w-[min(13rem,72%)]">
                <FloatingArtifact seed={300 + i * 17} className="inset-0" image={domainArtifact(practice.slug)} live={{ kind: "svc", slug: practice.slug }} />
              </div>
              <span className="flex items-baseline justify-between gap-[var(--ds-space-3)]">
                <span className="ds-label">{String(i + 1).padStart(2, "0")}</span>
                <span className="ds-label">{servicesLabel(practice.services.length)}</span>
              </span>
              <span className="font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{practice.name}</span>
              <span className="ds-body">{practice.descriptor}</span>
              {practice.expansion && <span className="neu-chip self-start">{aurelius.labels.expansion}</span>}
              <Knob className="mt-auto self-end" />
            </SmartLink>
          </li>
        );
      })}
      {withAll && (
        <li data-reveal className="flex">
          <SmartLink href="#index" className="neu-card group flex w-full flex-col gap-[var(--ds-space-3)] p-[var(--ds-space-5)]">
            <div className="relative mx-auto aspect-square w-[min(13rem,72%)]">
              <FloatingArtifact seed={511} className="inset-0" image={domainArtifact("all-services")} live={{ kind: "svc", slug: "all-services" }} />
            </div>
            <span className="flex items-baseline justify-end gap-[var(--ds-space-3)]">
              <span className="ds-label">{servicesLabel(serviceCount)}</span>
            </span>
            <span className="font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{allServices.name}</span>
            <span className="ds-body">{allServices.blurb}</span>
            <Knob className="mt-auto self-end" />
          </SmartLink>
        </li>
      )}
    </ol>
  );
}
