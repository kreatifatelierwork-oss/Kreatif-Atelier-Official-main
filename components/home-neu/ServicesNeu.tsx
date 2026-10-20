import { FloatingArtifact } from "@/components/design/FloatingArtifact";
import { DisplayHeading } from "@/components/design/DisplayHeading";
import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { aurelius, ourServices, pillarHref, pillarServiceCount, servicesLabel } from "@/content/aurelius";

/**
 * Our Services: the four pillars as raised cards, each opening its share of the service index, with the
 * 3D artifact of the practice it leads with floating beside it (tilts under the pointer).
 */
export function ServicesNeu() {
  const id = "our-services-heading";
  return (
    <Section id="our-services" labelledBy={id}>
      <div data-reveal className="flex flex-wrap items-end justify-between gap-[var(--ds-space-5)]">
        <DisplayHeading level={2} id={id} className="ds-heading">
          {ourServices.label}
        </DisplayHeading>
        <NeuButton href="/aurelius/services" variant="primary">
          {aurelius.labels.allServices}
        </NeuButton>
      </div>
      <ol className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-6)] md:grid-cols-2">
        {ourServices.items.map((item, i) => (
          <li
            key={item.id}
            data-reveal
            className="neu-card grid gap-[var(--ds-space-4)] p-[var(--ds-space-6)] sm:grid-cols-[minmax(0,1fr)_minmax(0,10rem)] md:p-[var(--ds-space-7)] lg:grid-cols-[minmax(0,1fr)_minmax(0,12rem)]"
          >
            <div className="flex min-w-0 flex-col gap-[var(--ds-space-4)]">
              <span className="ds-label">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-ds-display text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{item.title}</h3>
              <p className="ds-body">{item.body}</p>
              <ul className="flex flex-wrap gap-[var(--ds-space-2)]">
                {item.keywords.map((k) => (
                  <li key={k} className="neu-chip">
                    {k}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-[var(--ds-space-3)]">
                <NeuButton href={pillarHref(item.id)}>{servicesLabel(pillarServiceCount(item.id))}</NeuButton>
              </div>
            </div>
            <div className="relative order-first aspect-square w-[min(11rem,55%)] justify-self-end sm:order-none sm:w-full sm:self-start">
              <FloatingArtifact seed={200 + i * 13} className="inset-0" image={{ src: `/images/services/artifacts/${item.practices[0]}.webp`, width: 640, height: 640 }} live={{ kind: "svc", slug: item.practices[0] }} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
