"use client";

import { useSyncExternalStore } from "react";
import { aurelius, practiceHref, practices } from "@/content/aurelius";
import { parent } from "@/content/home";
import { navCta } from "@/content/navigation";
import { footer, site } from "@/content/site";
import { verticals } from "@/content/verticals";
import { CrestEgg } from "@/components/footer/CrestEgg";
import { SmartLink } from "@/components/ui/SmartLink";
import { SocialLink } from "@/components/ui/SocialLink";

const BUILD_YEAR = new Date().getFullYear();
const noopSubscribe = () => () => {};
const linkClass = "text-[0.92rem] text-cream-muted transition-colors hover:text-gold-bright";
const headClass = "eyebrow text-[0.62rem] text-gold";

export function Footer() {
  // Static export: HTML carries the build year; the visitor's clock takes over after hydration.
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  const linkedNetworks = footer.socialNetworks.filter((n) => site[n.key]);

  return (
    <footer className="bg-black px-[var(--gutter)] pt-16 pb-10">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <CrestEgg />
          <p className="eyebrow mt-4 text-[0.62rem] text-cream-faint">{parent.line.join(". ")}.</p>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-cream-muted">{parent.body}</p>
          <p className="mt-6 text-[0.92rem] text-cream-muted">
            <a href={`mailto:${site.email}`} className="hover:text-gold-bright">
              {site.email}
            </a>
            <span className="mx-2 text-cream-faint">·</span>
            {site.handle}
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <nav aria-label={aurelius.name}>
            <h2 className={headClass}>{aurelius.name}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footer.aureliusLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} className={linkClass}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href={navCta.href} className={linkClass}>
                  {navCta.label}
                </SmartLink>
              </li>
            </ul>
          </nav>

          <nav aria-label={aurelius.labels.practiceAreas}>
            <details>
              <summary className={`${headClass} cursor-pointer`}>{aurelius.labels.practiceAreas}</summary>
              <ul className="mt-4 flex flex-col gap-2.5">
                {practices.map((p) => (
                  <li key={p.slug}>
                    <SmartLink href={practiceHref(p.slug)} className={linkClass}>
                      {p.name}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </details>
          </nav>

          <nav aria-label={footer.venturesLabel}>
            <h2 className={headClass}>{footer.venturesLabel}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <SmartLink href={`/${v.slug}`} className={linkClass}>
                    {v.name}
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href={parent.cta.href} className={linkClass}>
                  {parent.cta.label}
                </SmartLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="text-[0.8rem] text-cream-faint">
          © {year} {site.name} · {footer.rights}
        </p>
        {linkedNetworks.length > 0 && (
          <ul className="eyebrow flex gap-6 text-[0.62rem] text-cream-muted">
            {linkedNetworks.map((n) => (
              <li key={n.key}>
                <SocialLink network={n.key}>{n.label}</SocialLink>
              </li>
            ))}
          </ul>
        )}
        <a href="#home" className="eyebrow text-[0.62rem] text-cream-faint transition-colors hover:text-gold-bright">
          ↑ {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
