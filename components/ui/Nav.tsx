"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav, navCta, navLabels, type NavItem } from "@/content/navigation";
import { nav, site } from "@/content/site";
import { config } from "@/lib/config";
import { useScrollStore } from "@/lib/scroll/store";
import { MobileMenu } from "./MobileMenu";
import { SmartLink } from "./SmartLink";
import { Star } from "./Star";

const linkClass =
  "eyebrow relative text-[0.66rem] text-cream-muted transition-colors after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:text-gold-bright aria-[current=true]:text-gold-bright aria-[current=true]:after:scale-x-100";

const isCurrent = (pathname: string, href?: string) =>
  !!href && (pathname === href || pathname === `${href}/` || pathname.startsWith(`${href}/`));

function Item({ item, pathname }: { item: NavItem; pathname: string }) {
  const current = isCurrent(pathname, item.href) || !!item.children?.some((c) => isCurrent(pathname, c.href));
  const label = item.featured ? <span className="font-extrabold">{item.label}</span> : item.label;

  if (!item.children) {
    return (
      <li>
        <SmartLink href={item.href ?? "/"} aria-current={current ? "true" : undefined} className={linkClass}>
          {label}
        </SmartLink>
      </li>
    );
  }

  // Opens on hover and whenever focus is inside it, so it needs no script and works from the keyboard.
  return (
    <li className="group relative">
      {item.href ? (
        <SmartLink href={item.href} aria-current={current ? "true" : undefined} className={linkClass}>
          {label}
        </SmartLink>
      ) : (
        <button type="button" aria-haspopup="true" aria-current={current ? "true" : undefined} className={`${linkClass} cursor-default`}>
          {label}
        </button>
      )}
      <div className="invisible absolute top-full left-1/2 z-10 -translate-x-1/2 pt-5 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul aria-label={navLabels.submenu(item.label)} className="nav-menu min-w-[15rem] border border-line bg-ink/95 p-3 backdrop-blur-md">
          {item.children.map((child) => (
            <li key={child.href}>
              <SmartLink
                href={child.href}
                aria-current={isCurrent(pathname, child.href) ? "true" : undefined}
                className="block px-3 py-2 text-[0.86rem] whitespace-nowrap text-cream-muted transition-colors hover:text-gold-bright aria-[current=true]:text-gold-bright"
              >
                {child.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = useScrollStore((s) => s.scrollY > config.scroll.navSolidAfter);
  // The light block is behind the header (see lib/scroll/veil.ts).
  const light = useScrollStore((s) => s.veil.light && s.veil.exit < config.front.navLightBeforeExit);

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed top-3 left-3 z-[70] -translate-y-24 bg-gold px-4 py-3 text-ink focus:translate-y-0"
      >
        {nav.skipLink}
      </a>

      <header
        data-tone={light ? "light" : "dark"}
        className={`site-header fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-gold/10 bg-ink/75 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1400px] items-center justify-between gap-6 px-[var(--gutter)]">
          <SmartLink
            href={pathname === "/" ? "#home" : "/"}
            aria-label={nav.homeLabel}
            className="display flex items-center gap-2.5 text-[1.05rem] font-medium tracking-[0.24em] whitespace-nowrap text-cream uppercase transition-colors duration-500 hover:text-gold-bright"
          >
            <Star className="text-gold" />
            <span aria-hidden="true">{site.name}</span>
          </SmartLink>

          <nav aria-label={nav.primaryLabel} className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <Item key={item.label} item={item} pathname={pathname} />
              ))}
              <li>
                <SmartLink
                  href={navCta.href}
                  aria-current={isCurrent(pathname, navCta.href) ? "true" : undefined}
                  className="eyebrow inline-flex items-center gap-2 border border-gold/60 px-5 py-2.5 text-[0.66rem] whitespace-nowrap text-gold-bright transition-colors hover:bg-gold hover:text-ink"
                >
                  {navCta.label}
                </SmartLink>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center xl:hidden"
            aria-label={nav.menuOpen}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
              <span className="h-px w-full bg-cream" />
              <span className="h-px w-2/3 self-end bg-gold" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
