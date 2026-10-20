"use client";

import { useSyncExternalStore } from "react";
import { aurelius, practiceHref, practices } from "@/content/aurelius";
import { parent } from "@/content/home";
import { navCta } from "@/content/navigation";
import { footer, site } from "@/content/site";
import { verticals } from "@/content/verticals";
import { CrestEgg } from "@/components/footer/CrestEgg";
import { SmartLink } from "@/components/ui/SmartLink";

const BUILD_YEAR = new Date().getFullYear();
const noopSubscribe = () => () => {};

/** Network icons, drawn in the footer's gold. Shown only for networks with a URL in content/site.ts. */
const icons: Record<(typeof footer.socialNetworks)[number]["key"] | "mail" | "phone", React.ReactNode> = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  linkedinUrl: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10.5 9h2.9v1.4c.5-.9 1.7-1.6 3.2-1.6 3 0 3.4 2 3.4 4.5V19h-3v-5c0-1.2 0-2.6-1.7-2.6s-1.8 1.2-1.8 2.5V19h-3z" />
    </svg>
  ),
  instagramUrl: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtubeUrl: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M3 8.2C3 6.4 4.4 5 6.2 5h11.6C19.6 5 21 6.4 21 8.2v7.6c0 1.8-1.4 3.2-3.2 3.2H6.2A3.2 3.2 0 0 1 3 15.8zM10 9v6l5.2-3z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  ),
};

/** The footer on every page, after the owner's reference (sky above it: components/footer/FooterSky.tsx). */
export function Footer() {
  // Static export: HTML carries the build year; the visitor's clock takes over after hydration.
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  const linkedNetworks = footer.socialNetworks.filter((n) => site[n.key]);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <div>
          <CrestEgg />
          <p className="ft-tagline">{parent.line.join(". ")}.</p>
          <p className="ft-body">{parent.body}</p>
          <p className="ft-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.phones.map((p) => (
              <a key={p.href} href={p.href}>
                {p.label}
              </a>
            ))}
          </p>
          <ul className="ft-social">
            {linkedNetworks.map((n) => (
              <li key={n.key}>
                <a href={site[n.key]} target="_blank" rel="noopener noreferrer" aria-label={n.label}>
                  {icons[n.key]}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} aria-label={footer.email(site.email)}>
                {icons.mail}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} aria-label={footer.call(site.phone)}>
                {icons.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <nav aria-labelledby="ft-aurelius">
            <h2 id="ft-aurelius" className="ft-head">
              {aurelius.name}
            </h2>
            <ul className="ft-links">
              {[...footer.aureliusLinks, navCta].map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} className="ft-link">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-practices">
            <h2 id="ft-practices" className="ft-head">
              {aurelius.labels.practiceAreas}
            </h2>
            <ul className="ft-links">
              {practices.map((p) => (
                <li key={p.slug}>
                  <SmartLink href={practiceHref(p.slug)} className="ft-link">
                    {p.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-ventures">
            <h2 id="ft-ventures" className="ft-head">
              {footer.venturesLabel}
            </h2>
            <ul className="ft-links">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <SmartLink href={`/${v.slug}`} className="ft-link">
                    {v.name}
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href={parent.cta.href} className="ft-link">
                  {parent.cta.label}
                </SmartLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="site-footer__inner ft-bottom">
        <p>
          © {year} {site.name}. {footer.rightsLine}
        </p>
        <ul className="flex gap-[var(--ds-space-6)]">
          {footer.legal.map((link) => (
            <li key={link.href}>
              <SmartLink href={link.href}>{link.label}</SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
