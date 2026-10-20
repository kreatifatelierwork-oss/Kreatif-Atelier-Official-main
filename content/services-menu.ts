import { practiceHref, practices, type Practice } from "./aurelius";
import type { Service } from "./aurelius-services";

/**
 * The Services mega menu: twelve primary categories (All Services plus the eleven practices), each
 * with its 3D artifact picture. Under each practice the menu names a few services and keeps the
 * rest under "Other services", so nothing from the catalogue is dropped. Featured services are the
 * first ones in the catalogue's own order; nothing here is invented.
 */
export type ServiceCategory = {
  id: string;
  name: string;
  href: string;
  /** Transparent WebP rendered from the category's 3D artifact (features/home-v2/three/services). */
  image: string;
  blurb: string;
  featured: readonly Service[];
  other: readonly Service[];
};

const FEATURED = 4;
const ALL_HREF = "/aurelius/services";
const image = (id: string) => `/images/services/artifacts/${id}.webp`;
const total = practices.reduce((n, p) => n + p.services.length, 0);

const fromPractice = (p: Practice): ServiceCategory => ({
  id: p.slug,
  name: p.name,
  href: practiceHref(p.slug),
  image: image(p.slug),
  blurb: p.descriptor,
  featured: p.services.slice(0, FEATURED),
  other: p.services.slice(FEATURED),
});

export const allServices: ServiceCategory = {
  id: "all-services",
  name: "All Services",
  href: ALL_HREF,
  image: image("all-services"),
  blurb: `Every service in one searchable index: ${total} services across ${practices.length} practices.`,
  featured: [],
  other: [],
};

export const serviceCategories: ServiceCategory[] = [allServices, ...practices.map(fromPractice)];

/**
 * A single service opens its practice page at the top, where the services list sits right under the
 * hero. (It used to jump to the index near the end of the services page.)
 */
export const serviceHref = (service: Service) => {
  const practice = practices.find((p) => p.services.some((s) => s.code === service.code));
  return practice ? practiceHref(practice.slug) : ALL_HREF;
};

export const servicesMenuLabels = {
  menu: "Services",
  categories: "Service categories",
  featured: "Featured",
  other: "Other services",
  otherCount: (n: number) => `${n} more`,
  viewCategory: (name: string) => `View ${name}`,
  browseAll: "Browse the full index",
  byPractice: "By practice",
  keyboardHint: "Press the right arrow key to list this category's services.",
  count: (n: number) => `${n}`,
  noOther: "Every service in this category is listed above.",
} as const;
