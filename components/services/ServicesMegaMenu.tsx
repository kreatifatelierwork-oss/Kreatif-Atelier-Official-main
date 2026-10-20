"use client";

import { useId, useRef, useState } from "react";
import { serviceCategories, servicesMenuLabels as L } from "@/content/services-menu";
import { SmartLink } from "@/components/ui/SmartLink";
import { OtherServices } from "./OtherServices";
import { ServiceArtifact } from "./ServiceArtifact";
import { ServiceCard } from "./ServiceCard";

const isCurrent = (pathname: string, href: string) => pathname === href || pathname === `${href}/`;

/**
 * The desktop Services panel, on glass: the twelve categories as clean text rows on the left, and on the
 * right the active category with its artifact (hovered or focused) with its featured and other services. It opens with the
 * nav item on hover or focus (CSS, in Nav), so it works from the keyboard without script.
 */
export function ServicesMegaMenu({ pathname }: { pathname: string }) {
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const active = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];
  const panel = useRef<HTMLElement>(null);
  const hintId = useId();
  const enterPanel = () => panel.current?.querySelector<HTMLElement>("a")?.focus();
  return (
    <div className="mm mx-auto grid w-[min(64rem,calc(100vw-2*var(--gutter)))] grid-cols-[minmax(0,1fr)_21rem] gap-6 rounded-3xl p-5 glass-panel">
      <ul aria-label={L.categories} className="grid auto-rows-fr grid-cols-2 gap-1">
        {serviceCategories.map((c) => (
          <li key={c.id}>
            <ServiceCard category={c} active={c.id === active.id} current={isCurrent(pathname, c.href)} hintId={hintId} onActivate={() => setActiveId(c.id)} onEnterPanel={enterPanel} />
          </li>
        ))}
      </ul>
      <p id={hintId} className="sr-only">
        {L.keyboardHint}
      </p>
      <section ref={panel} aria-live="polite" aria-label={active.name} className="mm-panel flex max-h-[min(36rem,72vh)] min-h-0 flex-col rounded-2xl p-4">
        <div className="flex flex-col items-center text-center">
          <ServiceArtifact category={active} size={160} className="h-28 w-28 shrink-0" />
          <p className="mm-panel__name mt-2">{active.name}</p>
          <p className="mt-1 text-[0.8rem] leading-snug text-cream-muted">{active.blurb}</p>
        </div>
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          {active.featured.length + active.other.length > 0 ? (
            <OtherServices category={active} />
          ) : (
            <div className="flex min-h-0 flex-col">
              <p className="eyebrow px-2 text-[0.58rem] text-gold">{L.byPractice}</p>
              <ul className="mt-2 min-h-0 overflow-y-auto overscroll-contain pr-1" data-lenis-prevent>
                {serviceCategories
                  .filter((c) => c.featured.length > 0)
                  .map((c) => (
                    <li key={c.id}>
                      <SmartLink
                        href={c.href}
                        className="flex items-baseline justify-between gap-3 rounded-md px-2 py-1.5 text-[0.84rem] leading-snug text-cream-muted transition-colors hover:bg-cream/[0.04] hover:text-cream focus-visible:outline-2 focus-visible:outline-gold"
                      >
                        <span className="min-w-0">{c.name}</span>
                        <span className="text-[0.72rem] text-cream-faint tabular-nums">{L.count(c.featured.length + c.other.length)}</span>
                      </SmartLink>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <SmartLink
          href={active.href}
          className="eyebrow mt-4 inline-flex items-center justify-between rounded-full border border-gold/60 px-4 py-2.5 text-[0.6rem] text-gold-bright transition-colors hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {active.featured.length ? L.viewCategory(active.name) : L.browseAll}
          <span aria-hidden="true">→</span>
        </SmartLink>
      </section>
    </div>
  );
}
