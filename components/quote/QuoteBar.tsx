"use client";

import { useEffect } from "react";
import { practices } from "@/content/aurelius";
import { useQuoteStore } from "@/stores/quoteStore";
import { QuoteDrawer } from "./QuoteDrawer";

/**
 * Persistent, unobtrusive "Your selection (n)" bar. Shown only once something is selected. Also
 * rehydrates the saved selection after mount (the store skips hydration to keep SSR consistent).
 */
export function QuoteBar() {
  const items = useQuoteStore((s) => s.items);
  const remove = useQuoteStore((s) => s.remove);
  const setDrawerOpen = useQuoteStore((s) => s.setDrawerOpen);

  useEffect(() => {
    void useQuoteStore.persist.rehydrate();
  }, []);

  const names = Object.fromEntries(practices.map((p) => [p.slug, p.name]));

  return (
    <>
      {items.length > 0 && (
        <aside
          aria-label="Your selection"
          className="fixed bottom-3 left-[var(--gutter)] z-30 flex max-w-[calc(100vw-2*var(--gutter)-4.5rem)] items-center gap-3 border border-line bg-ink/95 py-2 pr-2 pl-4 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md md:bottom-4 md:gap-5 md:py-3 md:pr-4"
        >
          <p aria-live="polite" className="eyebrow text-[0.6rem] whitespace-nowrap text-cream">
            <span className="hidden sm:inline">Your </span>selection ({items.length})
          </p>
          <ul className="hidden max-w-md items-center gap-2 overflow-hidden md:flex">
            {items.map((slug) => (
              <li key={slug}>
                <button
                  type="button"
                  onClick={() => remove(slug)}
                  aria-label={`Remove ${names[slug]}`}
                  className="eyebrow max-w-[13rem] truncate border border-ember/60 px-2.5 py-1.5 text-[0.56rem] text-cream-muted transition-colors hover:border-ember hover:text-cream"
                >
                  {names[slug]} <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setDrawerOpen(true)} className="btn btn-primary !px-4 !py-2.5 !text-[0.6rem]">
            Request a quote
            <span aria-hidden="true" className="btn-arrow">
              →
            </span>
          </button>
        </aside>
      )}
      <QuoteDrawer />
    </>
  );
}
