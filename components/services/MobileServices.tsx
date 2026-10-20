import { serviceCategories, servicesMenuLabels as L } from "@/content/services-menu";
import { SmartLink } from "@/components/ui/SmartLink";
import { OtherServices } from "./OtherServices";
import { ServiceArtifact } from "./ServiceArtifact";

const summary = "flex cursor-pointer list-none items-center justify-between gap-3 py-2 [&::-webkit-details-marker]:hidden";

/**
 * The Services section of the mobile menu: the twelve categories as rows with their artifact, and a
 * separate "Other services" section that opens per category. Native <details>, so it needs no script.
 */
export function MobileServices({ onNavigate }: { onNavigate: () => void }) {
  const practicesOnly = serviceCategories.filter((c) => c.featured.length > 0);
  return (
    <div className="pb-4">
      <ul aria-label={L.categories} className="grid grid-cols-1 gap-0.5 min-[420px]:grid-cols-2">
        {serviceCategories.map((c) => (
          <li key={c.id}>
            <SmartLink href={c.href} onClick={onNavigate} className="flex items-center gap-3 rounded-xl py-1.5 pr-2 text-[0.98rem] leading-snug text-cream-muted hover:text-cream">
              <ServiceArtifact category={c} size={56} className="h-12 w-12 shrink-0" />
              <span className="min-w-0">{c.name}</span>
            </SmartLink>
          </li>
        ))}
      </ul>
      <details className="group/other mt-4 border-t border-line pt-3">
        <summary className={`${summary} eyebrow text-[0.66rem] text-gold`}>
          {L.other}
          <span aria-hidden="true" className="transition-transform group-open/other:rotate-45">
            +
          </span>
        </summary>
        <ul className="mt-2">
          {practicesOnly.map((c) => (
            <li key={c.id} className="border-b border-line last:border-b-0">
              <details className="group/cat">
                <summary className={`${summary} text-[0.95rem] text-cream`}>
                  <span className="min-w-0">{c.name}</span>
                  <span aria-hidden="true" className="eyebrow text-[0.7rem] text-gold transition-transform group-open/cat:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-3">
                  <OtherServices category={c} onNavigate={onNavigate} />
                </div>
              </details>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
