import { practiceHref, practices } from "./aurelius";
import { verticals } from "./verticals";

export type NavLink = { label: string; href: string };
/** `mega`: open the Services mega menu (components/services) instead of a plain list of `children`. */
export type NavItem = { label: string; href?: string; featured?: boolean; mega?: boolean; children?: NavLink[] };

/** Header navigation (docs/website-blueprint.md §3). Service names stay out of the header: practice areas only. */
export const mainNav: NavItem[] = [
  { label: "Aurelius", href: "/aurelius", featured: true },
  {
    label: "Services",
    href: "/aurelius/services",
    mega: true,
    children: practices.map((p) => ({ label: p.name, href: practiceHref(p.slug) })),
  },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about/kreatif-atelier" },
  { label: "Our Ventures", children: verticals.map((v) => ({ label: v.name, href: `/${v.slug}` })) },
];

export const navCta: NavLink = { label: "Start a Project", href: "/contact" };
/** The Aurelius pill navigation also carries a plain Contact Us link. */
export const navContact: NavLink = { label: "Contact Us", href: "/contact" };

export const navLabels = {
  allServices: "All services",
  submenu: (label: string) => `${label} menu`,
} as const;
