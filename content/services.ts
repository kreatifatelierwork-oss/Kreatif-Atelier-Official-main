import { catalogue, type PracticeSlug } from "./aurelius-services";
import { serviceNotes } from "./aurelius-service-notes";

/**
 * Every Aurelius service as one flat list: the single services data file for the index, the cart and
 * the quote request. Built from the blueprint catalogue (codes and names exact) and the service notes
 * (DRAFT copy awaiting the owner's review). There are no prices: none have been supplied, so none are
 * shown or invented.
 */
export type ServiceItem = {
  /** The blueprint code, e.g. "DM-01". Stable: the cart stores it. */
  id: string;
  name: string;
  /** The practice area (domain) it belongs to. */
  domain: PracticeSlug;
  domainName: string;
  description: string | null;
  /** Position in the blueprint, for the default sort. */
  order: number;
};

export const services: readonly ServiceItem[] = (Object.entries(catalogue) as [PracticeSlug, (typeof catalogue)[PracticeSlug]][]).flatMap(([domain, practice]) =>
  practice.services.map((s) => ({ id: s.code, name: s.name, domain, domainName: practice.name, description: serviceNotes[s.code] ?? null })),
).map((s, order) => ({ ...s, order }));

const byId = new Map(services.map((s) => [s.id, s]));
export const serviceById = (id: string) => byId.get(id);

export type Domain = { slug: PracticeSlug; name: string; count: number };
export const domains: readonly Domain[] = (Object.keys(catalogue) as PracticeSlug[]).map((slug) => ({
  slug,
  name: catalogue[slug].name,
  count: catalogue[slug].services.length,
}));

/** Each domain's artifact poster (rendered from its 3D scene, features/home-v2/three/services). */
export const domainArtifact = (slug: string) => ({ src: `/images/services/artifacts/${slug}.webp`, width: 640, height: 640 });
