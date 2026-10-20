import { serviceHref, servicesMenuLabels as L, type ServiceCategory } from "@/content/services-menu";
import { SmartLink } from "@/components/ui/SmartLink";

const link = "block rounded-md px-2 py-1.5 text-[0.84rem] leading-snug text-cream-muted transition-colors hover:bg-cream/[0.04] hover:text-cream focus-visible:outline-2 focus-visible:outline-gold";

/** A category's services: the featured few, then the rest under "Other services", each opening the index on it. */
export function OtherServices({ category, onNavigate }: { category: ServiceCategory; onNavigate?: () => void }) {
  return (
    <div className="flex min-h-0 flex-col gap-5">
      {category.featured.length > 0 && (
        <div>
          <p className="eyebrow px-2 text-[0.58rem] text-gold">{L.featured}</p>
          <ul className="mt-2">
            {category.featured.map((s) => (
              <li key={s.code}>
                <SmartLink href={serviceHref(s)} onClick={onNavigate} className={`${link} text-cream`}>
                  {s.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {category.other.length > 0 && (
        <div className="flex min-h-0 flex-col">
          <p className="eyebrow flex items-baseline justify-between px-2 text-[0.58rem] text-gold">
            {L.other}
            <span className="text-cream-faint">{L.otherCount(category.other.length)}</span>
          </p>
          <ul className="mt-2 max-h-[min(15rem,32vh)] overflow-y-auto overscroll-contain pr-1" data-lenis-prevent>
            {category.other.map((s) => (
              <li key={s.code}>
                <SmartLink href={serviceHref(s)} onClick={onNavigate} className={link}>
                  {s.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
