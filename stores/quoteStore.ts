"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PracticeSlug } from "@/content/aurelius-services";

export type QuoteState = {
  /** Selected practice areas, in the order they were added. Persisted. */
  items: PracticeSlug[];
  /** Whether the request drawer is open. Not persisted. */
  drawerOpen: boolean;
  toggle: (slug: PracticeSlug) => void;
  remove: (slug: PracticeSlug) => void;
  clear: () => void;
  setDrawerOpen: (open: boolean) => void;
};

/**
 * The quote selection. Persisted to localStorage, but hydrated only after mount
 * (`skipHydration`, rehydrated by QuoteBar), so server and first client render agree.
 * Storage is read through a guard so private or blocked storage degrades to an in-memory selection.
 */
export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      toggle: (slug) => set((s) => ({ items: s.items.includes(slug) ? s.items.filter((x) => x !== slug) : [...s.items, slug] })),
      remove: (slug) => set((s) => ({ items: s.items.filter((x) => x !== slug) })),
      clear: () => set({ items: [] }),
      setDrawerOpen: (open) => set({ drawerOpen: open }),
    }),
    {
      name: "ka-quote-selection",
      version: 1,
      storage: createJSONStorage(() => {
        try {
          return window.localStorage;
        } catch {
          return undefined as unknown as Storage;
        }
      }),
      skipHydration: true,
      partialize: (s) => ({ items: s.items }),
    },
  ),
);
