"use client";

import { mainNav, navCta, navLabels } from "@/content/navigation";
import { nav, site } from "@/content/site";
import { MobileServices } from "@/components/services/MobileServices";
import { KaWordmark } from "./Brand";
import { Dialog } from "./Dialog";
import { SmartLink } from "./SmartLink";

type Props = { open: boolean; onClose: () => void };

const rowClass = "display flex items-baseline justify-between py-4 text-[2rem] text-cream transition-colors hover:text-gold-bright";

/** Full-screen menu for narrow screens. Groups open in place; Services opens its category list and "Other services". */
export function MobileMenu({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy="mobile-menu-title" variant="sheet">
      <div className="flex min-h-full flex-col px-[var(--gutter)] pt-24 pb-10">
        <p id="mobile-menu-title" className="text-gold">
          <KaWordmark className="h-9" label />
        </p>
        <nav aria-label={nav.primaryLabel} className="mt-8">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-line">
                {item.children ? (
                  <details className="group">
                    <summary className={`${rowClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
                      {item.label}
                      <span aria-hidden="true" className="eyebrow text-[0.8rem] text-gold transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    {item.mega ? (
                      <MobileServices onNavigate={onClose} />
                    ) : (
                      <ul className="pb-4">
                        {item.href && (
                          <li>
                            <SmartLink href={item.href} onClick={onClose} className="block py-2 text-[1.02rem] text-gold-bright">
                              {navLabels.allServices}
                            </SmartLink>
                          </li>
                        )}
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <SmartLink href={child.href} onClick={onClose} className="block py-2 text-[1.02rem] text-cream-muted hover:text-gold-bright">
                              {child.label}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                ) : (
                  <SmartLink href={item.href ?? "/"} onClick={onClose} className={rowClass}>
                    {item.label}
                  </SmartLink>
                )}
              </li>
            ))}
            <li className="border-b border-line">
              <SmartLink href={navCta.href} onClick={onClose} className={`${rowClass} text-gold-bright`}>
                {navCta.label}
                <span aria-hidden="true" className="eyebrow text-[0.8rem] text-gold">
                  →
                </span>
              </SmartLink>
            </li>
          </ul>
        </nav>
        <p className="mt-auto pt-12 text-sm text-cream-muted">
          <a href={`mailto:${site.email}`} className="hover:text-gold-bright">
            {site.email}
          </a>
          <br />
          {site.handle}
        </p>
      </div>
    </Dialog>
  );
}
