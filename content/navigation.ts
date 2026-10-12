import { practiceHref, practices } from "./aurelius";
import { verticals } from "./verticals";

export type NavLink = { label: string; href: string };
export type NavItem = { label: string; href?: string; featured?: boolean; children?: NavLink[] };

/** Header navigation (docs/website-blueprint.md §3). Service names stay out of the header: practice areas only. */
export const mainNav: NavItem[] = [
  { label: "Aurelius", href: "/aurelius", featured: true },
  {
    label: "Services",
    href: "/aurelius/services",
    children: practices.map((p) => ({ label: p.name, href: practiceHref(p.slug) })),
  },
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/approach" },
  {
    label: "About",
    children: [
      { label: "Aurelius", href: "/about/aurelius" },
      { label: "Kreatif Atelier", href: "/about/kreatif-atelier" },
      { label: "History of advertising", href: "/aurelius/history" },
    ],
  },
  { label: "Our Ventures", children: verticals.map((v) => ({ label: v.name, href: `/${v.slug}` })) },
];

export const navCta: NavLink = { label: "Start a Project", href: "/contact" };

export const navLabels = {
  allServices: "All services",
  submenu: (label: string) => `${label} menu`,
} as const;
