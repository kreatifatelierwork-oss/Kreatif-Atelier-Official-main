"use client";

import { useEffect } from "react";
import { aurelius, ourServices, pillarById, practiceHref, practices } from "@/content/aurelius";
import { useServiceSearch } from "@/hooks/useServiceSearch";
import { SmartLink } from "@/components/ui/SmartLink";
import { ServiceNoteDialog, ServiceRow, useServiceNote } from "./ServiceNotes";

/** All 206 services, searchable by name or code and filterable by pillar or practice area. `?pillar=<id>` opens it on that pillar. */
export function ServiceIndex() {
  const { query, setQuery, filter, setFilter, groups, count, total, searching } = useServiceSearch();
  const { labels } = aurelius;
  const note = useServiceNote();

  // Arriving from a pillar button: start on that pillar's share of the catalogue.
  useEffect(() => {
    const pillar = pillarById(new URLSearchParams(window.location.search).get("pillar") ?? "");
    if (pillar) setFilter(pillar.id);
  }, [setFilter]);
  const chip =
    "eyebrow border px-3.5 py-2 text-[0.6rem] transition-colors aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-ink border-line text-cream-muted hover:border-gold/70 hover:text-gold-bright";

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="service-search" className="eyebrow text-[0.62rem] text-gold">
            {labels.search}
          </label>
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="mt-3 block w-full max-w-xl border border-line bg-navy/60 px-5 py-4 text-[1rem] text-cream placeholder:text-cream-faint"
          />
        </div>
        <div role="group" aria-label={labels.pillars} className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={chip}>
            {labels.all}
          </button>
          {ourServices.items.map((p) => (
            <button key={p.id} type="button" aria-pressed={filter === p.id} onClick={() => setFilter(p.id)} className={chip}>
              {p.title}
            </button>
          ))}
        </div>
        <div role="group" aria-label={labels.practiceAreas} className="flex flex-wrap gap-2">
          {practices.map((p) => (
            <button key={p.slug} type="button" aria-pressed={filter === p.slug} onClick={() => setFilter(p.slug)} className={chip}>
              {p.name}
            </button>
          ))}
        </div>
        <p role="status" className="eyebrow text-[0.62rem] text-cream-faint">
          {count} / {total}
        </p>
        <p className="text-[0.95rem] text-cream-muted">{labels.tapHint}</p>
      </div>

      {groups.length === 0 && <p className="mt-10 text-cream-muted">{labels.noResults}</p>}

      <div className="mt-10 border-t border-line">
        {groups.map(({ practice, services }) => (
          // Open while searching or filtering, so matches are never hidden inside a closed group.
          <details key={practice.slug} open={searching} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <span className="display text-[clamp(1.6rem,2.6vw,2.3rem)] text-cream">{practice.name}</span>
              <span className="eyebrow flex items-center gap-4 text-[0.62rem] text-cream-faint">
                {services.length}
                <span aria-hidden="true" className="text-[0.9rem] text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <ul className="grid gap-x-10 pb-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <li key={service.code} className="border-t border-line/60">
                  <ServiceRow variant="index" service={service} onOpen={() => note.show(service, { slug: practice.slug, name: practice.name })} />
                </li>
              ))}
            </ul>
            <p className="pb-7">
              <SmartLink href={practiceHref(practice.slug)} className="eyebrow text-[0.62rem] text-gold-bright hover:text-cream">
                {practice.name} →
              </SmartLink>
            </p>
          </details>
        ))}
      </div>
      <ServiceNoteDialog selected={note.selected} open={note.open} onClose={note.close} />
    </div>
  );
}
