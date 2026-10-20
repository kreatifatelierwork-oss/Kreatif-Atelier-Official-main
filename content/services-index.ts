/** Copy for the All Services index (components/services-index/). */
export const servicesIndex = {
  heading: "All services",
  search: "Search services",
  searchPlaceholder: "Search by name, code or description",
  domains: "Filter by domain",
  all: "All",
  sort: "Sort",
  sorts: [
    { id: "order", label: "Catalogue order" },
    { id: "az", label: "Name, A to Z" },
    { id: "za", label: "Name, Z to A" },
    { id: "domain", label: "Domain" },
  ],
  count: (shown: number, total: number) => (shown === total ? `${total} services` : `${shown} of ${total} services`),
  showing: (visible: number, matched: number) => `Showing ${visible} of ${matched}`,
  loadMore: (n: number) => `Show ${n} more`,
  none: "No services match. Try another word or clear the filters.",
  reset: "Clear filters",
  domainLink: (name: string) => `${name} →`,
  readMore: "Read more",
} as const;

export type SortId = (typeof servicesIndex.sorts)[number]["id"];
