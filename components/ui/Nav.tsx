"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav, navCta, navLabels, type NavItem } from "@/content/navigation";
import { nav } from "@/content/site";
import { config } from "@/lib/config";
import { useScrollStore } from "@/lib/scroll/store";
import { MegaNavItem } from "./MegaNavItem";
import { CartButton } from "@/components/cart/CartButton";
import { CallButton } from "./CallButton";
import { NeuButton } from "@/components/design/NeuButton";
import { MobileMenu } from "./MobileMenu";
import { KaMonogram } from "./Brand";
import { SmartLink } from "./SmartLink";

const linkClass =
  "eyebrow relative whitespace-nowrap text-[0.66rem] text-cream-muted transition-colors after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:text-gold-bright aria-[current=true]:text-gold-bright aria-[current=true]:after:scale-x-100";

/** How many of the main links sit left of the monogram; the rest and the call to action sit right. */
const SPLIT = 2;

const isCurrent = (pathname: string, href?: string) => !!href && (pathname === href || pathname === `${href}/` || pathname.startsWith(`${href}/`));

function Item({ item, pathname, mark = false }: { item: NavItem; pathname: string; mark?: boolean }) {
  const current = isCurrent(pathname, item.href) || !!item.children?.some((c) => isCurrent(pathname, c.href));
  const label = item.featured ? (
    <span className="inline-flex items-center gap-[var(--ds-space-2)] font-extrabold">
      {mark && <span aria-hidden="true" className="au-logo-mark au-logo-mark--nav" />}
      {item.label}
    </span>
  ) : (
    item.label
  );

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
  // Escape closes it by moving focus back out of the panel.
  const closeOnEscape = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape" && document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };
  if (item.mega && item.href) {
    return <MegaNavItem href={item.href} label={label} current={current} pathname={pathname} linkClass={linkClass} />;
  }
  return (
    <li className="group relative" onKeyDown={closeOnEscape}>
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

export function Nav({ variant = "bar" }: { variant?: "bar" | "pill" }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = useScrollStore((s) => s.scrollY > config.scroll.navSolidAfter);
  // The light block is behind the header (see lib/scroll/veil.ts).
  const light = useScrollStore((s) => s.veil.light && s.veil.exit < config.front.navLightBeforeExit);

  return (
    <>
      <a href="#main" className="eyebrow fixed top-3 left-3 z-[70] -translate-y-24 bg-gold px-4 py-3 text-ink focus:translate-y-0">
        {nav.skipLink}
      </a>

      <header
        data-tone={light ? "light" : "dark"}
        data-scrolled={solid || undefined}
        data-variant={variant}
        className="site-header ds-header isolate fixed inset-x-0 top-0 z-40"
      >
        <div className="ds-header__inner relative mx-auto flex h-[var(--nav-h)] max-w-[1560px] items-center justify-between gap-6 px-[var(--gutter)]">
          {/* Left half of the links (wide screens) */}
          <nav aria-label={nav.primaryLabel} className="hidden flex-1 pr-24 xl:block">
            <ul className={`flex items-center ${variant === "pill" ? "gap-6 min-[1400px]:gap-8" : "gap-8"}`}>
              {mainNav.slice(0, variant === "pill" ? SPLIT + 1 : SPLIT).map((item) => (
                <Item key={item.label} item={item} pathname={pathname} mark={variant === "pill"} />
              ))}
            </ul>
          </nav>

          {/* The KA monogram from the visiting card, in the middle */}
          <SmartLink
            href={pathname === "/" ? "#home" : "/"}
            aria-label={nav.homeLabel}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5e1a17] transition-colors duration-300 hover:text-[#8a2a22]"
          >
            <KaMonogram className="h-9 md:h-10" />
          </SmartLink>

          <nav aria-label={nav.secondaryLabel} className="hidden flex-1 pl-24 xl:block">
            <ul className={`flex items-center justify-end ${variant === "pill" ? "gap-6 min-[1400px]:gap-8" : "gap-8"}`}>
              {mainNav.slice(variant === "pill" ? SPLIT + 1 : SPLIT).map((item) => (
                <Item key={item.label} item={item} pathname={pathname} />
              ))}
              {variant === "pill" && (
                <>
                  <li>
                    <CartButton />
                  </li>
                </>
              )}
              <li>
                <NeuButton href={navCta.href} variant="primary" size="sm" knob className="nb--xs">
                  {navCta.label}
                </NeuButton>
              </li>
              {variant === "pill" && (
                <li>
                  <CallButton />
                </li>
              )}
            </ul>
          </nav>

          {variant === "pill" && (
            <>
              {/* Phones: cart and call together on the left, the menu on the right, so the centred monogram stays clear. */}
              <div className="flex items-center gap-[var(--ds-space-2)] xl:hidden">
                <CartButton />
                <CallButton />
              </div>
            </>
          )}
          <button
            type="button"
            className={`${variant === "pill" ? "nb nb--icon nb--sm ml-auto" : "ml-auto grid h-11 w-11 place-items-center"} xl:hidden`}
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
