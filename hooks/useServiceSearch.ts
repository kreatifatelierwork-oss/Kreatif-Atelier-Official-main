"use client";

import { useMemo, useState } from "react";
import { pillarById, practices, type PillarId, type Practice } from "@/content/aurelius";
import type { PracticeSlug, Service } from "@/content/aurelius-services";

export type ServiceGroup = { practice: Practice; services: readonly Service[] };

/**
 * The service search shared by the services page and the Aurelius page. Matches on service name
 * or code (case-insensitive) and can be narrowed to one practice area or to one of the four pillars. Behaviour is unchanged
 * from the services page; only where it is rendered differs.
 */
export function useServiceSearch() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PracticeSlug | PillarId | "all">("all");

  const groups = useMemo<ServiceGroup[]>(() => {
    const q = query.trim().toLowerCase();
    return practices
      .filter((p) => filter === "all" || p.slug === filter || pillarById(filter)?.practices.includes(p.slug))
      .map((p) => ({
        practice: p,
        services: q ? p.services.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) : p.services,
      }))
      .filter((g) => g.services.length > 0);
  }, [query, filter]);

  const total = practices.reduce((sum, p) => sum + p.services.length, 0);
  const count = groups.reduce((sum, g) => sum + g.services.length, 0);
  const searching = query.trim() !== "" || filter !== "all";

  return { query, setQuery, filter, setFilter, groups, count, total, searching };
}
