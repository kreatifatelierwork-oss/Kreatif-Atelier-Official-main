"use client";

import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

export type CartState = {
  /** Service ids (blueprint codes), in the order they were added. Persisted. */
  items: string[];
  /** Whether the cart drawer is open. Not persisted. */
  open: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => boolean;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

/** localStorage, with every call guarded: private modes and blocked storage fall back to an in-memory cart. */
const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Storage full or blocked: the cart still works for this visit.
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // As above.
    }
  },
};

/**
 * The service cart, shared by every Aurelius page. Persisted, but hydrated only after mount
 * (`skipHydration`, see `useCartHydration`), so the server render and the first client render agree.
 */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      add: (id) => set((s) => (s.items.includes(id) ? s : { items: [...s.items, id] })),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x !== id) })),
      toggle: (id) => {
        const has = get().items.includes(id);
        set((s) => ({ items: has ? s.items.filter((x) => x !== id) : [...s.items, id] }));
        return !has;
      },
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "aurelius-cart",
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      skipHydration: true,
      partialize: (s) => ({ items: s.items }),
    },
  ),
);
