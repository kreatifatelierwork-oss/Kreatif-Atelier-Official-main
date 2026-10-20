import { AddToCart } from "@/components/cart/AddToCart";
import { SmartLink } from "@/components/ui/SmartLink";
import { aurelius, practiceHref } from "@/content/aurelius";
import type { ServiceItem } from "@/content/services";

/**
 * One service as a clean raised card (no picture): code and domain as small labels, the name in the
 * display serif, the short note, and Add to cart.
 */
export function ServiceCard({ service, headingLevel = "h3" }: { service: ServiceItem; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="neu-card svc-card h-full">
      <div className="flex items-baseline justify-between gap-[var(--ds-space-3)]">
        <SmartLink href={practiceHref(service.domain)} className="ds-label min-w-0 truncate underline-offset-4 hover:underline focus-visible:underline">
          {service.domainName}
        </SmartLink>
        <span className="svc-card__code">{service.id}</span>
      </div>
      <Heading className="svc-card__name">{service.name}</Heading>
      <p className="svc-card__note">{service.description ?? aurelius.labels.noNote}</p>
      <div className="mt-auto pt-[var(--ds-space-2)]">
        <AddToCart id={service.id} />
      </div>
    </article>
  );
}
