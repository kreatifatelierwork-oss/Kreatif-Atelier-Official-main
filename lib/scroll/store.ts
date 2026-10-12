import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

/** A section's extent in page progress (0–1), measured where its top/bottom reach the viewport top. */
export type SectionRange = { id: string; start: number; end: number };

export type PinId = "services" | "process";

export type Veil = { light: boolean; exit: number };

export type ScrollState = {
  /** 0–1 over the whole page. The single source of truth for the 3D scene. */
  progress: number;
  /** px scrolled; for DOM chrome (nav, back-to-top) only — never read inside useFrame. */
  scrollY: number;
  /** px/s, signed. */
  velocity: number;
  /** Section whose area contains the viewport's centre line. */
  activeSection: string;
  sectionRanges: SectionRange[];
  /** 0–1 progress through each pinned section (stays 0 / 1 outside it, and when not pinned). */
  pins: Record<PinId, number>;
  /** Home page (see lib/scroll/veil.ts): `light` while the light block is under the header, `exit` 0–1 as the dark returns. */
  veil: Veil;
  reducedMotion: boolean;
  /** True while Lenis drives scrolling (false with reduced motion). */
  smooth: boolean;
};

export const scrollStore = createStore<ScrollState>()(() => ({
  progress: 0,
  scrollY: 0,
  velocity: 0,
  activeSection: "home",
  sectionRanges: [],
  pins: { services: 0, process: 0 },
  veil: { light: false, exit: 0 },
  reducedMotion: false,
  smooth: false,
}));

export const setPinProgress = (id: PinId, value: number) => {
  const { pins } = scrollStore.getState();
  if (pins[id] !== value) scrollStore.setState({ pins: { ...pins, [id]: value } });
};

export const setVeil = (next: Partial<Veil>) => {
  const { veil } = scrollStore.getState();
  const merged = { ...veil, ...next };
  if (merged.light !== veil.light || merged.exit !== veil.exit) scrollStore.setState({ veil: merged });
};

/** React hook for DOM components. Select narrowly — the store updates every scrolled frame. */
export function useScrollStore<T>(selector: (state: ScrollState) => T): T {
  return useStore(scrollStore, selector);
}
