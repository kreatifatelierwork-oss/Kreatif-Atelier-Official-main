"use client";

import { useRef } from "react";
import { Chip } from "@/components/design/Chip";
import { NeuButton } from "@/components/design/NeuButton";
import { domains } from "@/content/services";
import { servicesIndex as t, type SortId } from "@/content/services-index";
import { PAGE_SIZE, useServiceIndex } from "./useServiceIndex";
import { ServiceCard } from "./ServiceCard";

/**
 * All 206 services in one place: a live count, search, domain chips (several can be on), sort, and
 * cards added 24 at a time. "Show more" moves focus to the first new card so keyboard and screen-reader
 * users carry on where the list grew.
 */
export function AllServices() {
  const s = useServiceIndex();
  const grid = useRef<HTMLUListElement>(null);
  const remaining = s.matched.length - s.visible;

  const more = () => {
    const first = s.visible;
    s.more();
    requestAnimationFrame(() => grid.current?.querySelectorAll<HTMLElement>("li")[first]?.querySelector<HTMLElement>("a, button")?.focus());
  };

  return (
    <div>
      <div className="flex flex-col gap-[var(--ds-space-5)]">
        <div className="flex flex-col gap-[var(--ds-space-4)] md:flex-row md:items-end">
          <label className="flex flex-1 flex-col gap-[var(--ds-space-2)]">
            <span className="ds-label">{t.search}</span>
            <input
              id="service-search"
              type="search"
              value={s.query}
              onChange={(e) => s.setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="neu-field !rounded-[var(--ds-radius-pill)] !px-[var(--ds-space-5)]"
            />
          </label>
          <label className="flex flex-col gap-[var(--ds-space-2)] md:w-60">
            <span className="ds-label">{t.sort}</span>
            <select value={s.sort} onChange={(e) => s.setSort(e.target.value as SortId)} className="neu-field !rounded-[var(--ds-radius-pill)] !px-[var(--ds-space-5)]">
              {t.sorts.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div role="group" aria-label={t.domains} className="flex flex-wrap gap-[var(--ds-space-2)]">
          <Chip pressed={s.selected.length === 0} onClick={() => s.setSelected([])}>
            {t.all}
          </Chip>
          {domains.map((d) => (
            <Chip key={d.slug} pressed={s.selected.includes(d.slug)} onClick={() => s.toggleDomain(d.slug)}>
              {d.name} <span className="text-ds-subtle">{d.count}</span>
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-[var(--ds-space-3)]">
          <p role="status" className="font-ds-display text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">
            {t.count(s.matched.length, s.total)}
          </p>
          {(s.query || s.selected.length > 0) && (
            <NeuButton size="sm" onClick={s.reset}>
              {t.reset}
            </NeuButton>
          )}
        </div>
      </div>

      {s.matched.length === 0 ? (
        <p className="ds-body mt-[var(--ds-space-6)]">{t.none}</p>
      ) : (
        <ul ref={grid} className="mt-[var(--ds-space-6)] grid gap-[var(--ds-space-5)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {s.shown.map((service) => (
            <li key={service.id} className="flex">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      )}

      {s.matched.length > 0 && (
        <div className="mt-[var(--ds-space-7)] flex flex-col items-center gap-[var(--ds-space-3)]">
          <p className="ds-label">{t.showing(s.visible, s.matched.length)}</p>
          {remaining > 0 && <NeuButton onClick={more}>{t.loadMore(Math.min(PAGE_SIZE, remaining))}</NeuButton>}
        </div>
      )}
    </div>
  );
}
