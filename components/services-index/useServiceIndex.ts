"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { pillarById } from "@/content/aurelius";
import type { PracticeSlug } from "@/content/aurelius-services";
import { domains, services, type ServiceItem } from "@/content/services";
import type { SortId } from "@/content/services-index";

/** Cards shown at first and added by each "Show more". */
export const PAGE_SIZE = 24;

const domainOrder = new Map(domains.map((d, i) => [d.slug, i]));
const sorters: Record<SortId, (a: ServiceItem, b: ServiceItem) => number> = {
  order: (a, b) => a.order - b.order,
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
  domain: (a, b) => (domainOrder.get(a.domain)! - domainOrder.get(b.domain)!) || a.name.localeCompare(b.name),
};

/**
 * State for the All Services index: search (name, code or note), domain filter (several at once),
 * sort, and how many cards are showing. Arrives pre-filtered from `?q=`, `?domain=` or `?pillar=`.
 */
export function useServiceIndex() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PracticeSlug[]>([]);
  const [sort, setSort] = useState<SortId>("order");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const domain = params.get("domain");
    const pillar = pillarById(params.get("pillar") ?? "");
    // One-time read of the arrival URL.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (q) setQuery(q);
    if (domain && domainOrder.has(domain as PracticeSlug)) setSelected([domain as PracticeSlug]);
    else if (pillar) setSelected([...pillar.practices]);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const matched = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services
      .filter((s) => selected.length === 0 || selected.includes(s.domain))
      .filter((s) => !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || (s.description ?? "").toLowerCase().includes(q))
      .toSorted(sorters[sort]);
  }, [query, selected, sort]);

  // Any change to what matches starts the list from the top again.
  const update = useCallback(<T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setVisible(PAGE_SIZE);
  }, []);

  const toggleDomain = useCallback((slug: PracticeSlug) => {
    setSelected((cur) => (cur.includes(slug) ? cur.filter((d) => d !== slug) : [...cur, slug]));
    setVisible(PAGE_SIZE);
  }, []);

  const reset = useCallback(() => {
    setQuery("");
    setSelected([]);
    setVisible(PAGE_SIZE);
  }, []);

  return {
    query,
    setQuery: update(setQuery),
    selected,
    setSelected: update(setSelected),
    toggleDomain,
    sort,
    setSort: update(setSort),
    matched,
    shown: matched.slice(0, visible),
    visible: Math.min(visible, matched.length),
    more: () => setVisible((v) => v + PAGE_SIZE),
    reset,
    total: services.length,
  };
}
