"use client";

import { create } from "zustand";

/** Which model a poster stands for: a page object, a hero object, or a practice's service artifact. */
/** How much nearer (px) another artifact must be before it takes the live slot. */
const SWITCH_MARGIN = 40;

export type LiveKind = "obj" | "hero" | "svc";
export type LiveTarget = { el: HTMLElement; img: HTMLImageElement; kind: LiveKind; slug: string };

type LiveState = {
  /** The poster whose model is (or is becoming) live. One at a time. */
  target: LiveTarget | null;
  /** Pointer over the target's box, 0–1 each way; and whether it is still over it. */
  u: number;
  v: number;
  hovering: boolean;
  /** How far the pointer is from the target's edge (px, 0 inside); the nearest artifact wins. */
  dist: number;
  /** The model has drawn: the poster can hide. */
  ready: boolean;
  enter: (t: LiveTarget, dist?: number) => void;
  move: (u: number, v: number, dist?: number) => void;
  leave: (el: HTMLElement) => void;
  setReady: (ready: boolean) => void;
  clear: () => void;
};

/**
 * The live-artifact hover state (lib/artifacts/live.ts), shared by every DOM FloatingArtifact (which
 * reports enter/move/leave) and the one LiveArtifactLayer (which draws the model). Only the artifact
 * under the cursor is ever live.
 */
export const useLive = create<LiveState>()((set, get) => ({
  target: null,
  u: 0.5,
  v: 0.5,
  hovering: false,
  dist: Infinity,
  ready: false,
  enter: (t, dist = 0) => {
    const { target: cur, hovering, dist: curDist } = get();
    if (cur?.el === t.el) return set({ hovering: true, dist });
    // Another artifact is live and not clearly farther: leave it be (only one is ever live, and close
    // neighbours must not keep swapping it).
    if (cur && hovering && dist > curDist - SWITCH_MARGIN) return;
    if (cur) delete cur.el.dataset.live;
    set({ target: t, hovering: true, ready: false, u: 0.5, v: 0.5, dist });
  },
  move: (u, v, dist = 0) => set({ u, v, dist }),
  leave: (el) => {
    if (get().target?.el === el) set({ hovering: false, u: 0.5, v: 0.5, dist: Infinity });
  },
  setReady: (ready) => {
    const t = get().target;
    if (t) {
      if (ready) t.el.dataset.live = "";
      else delete t.el.dataset.live;
    }
    set({ ready });
  },
  clear: () => {
    const t = get().target;
    if (t) delete t.el.dataset.live;
    set({ target: null, ready: false, hovering: false });
  },
}));

/**
 * True while the page is scrolling (and for config.artifacts.live.scrollQuietMs after). Chrome fires hover events
 * as content slides under a still pointer; starting a live model then would load and compile 3D mid-scroll.
 */
let lastScroll = 0;
if (typeof window !== "undefined") window.addEventListener("scroll", () => (lastScroll = performance.now()), { passive: true });
export function isScrolling(quietMs: number) {
  return performance.now() - lastScroll < quietMs;
}

/** Live 3D only with a fine pointer and motion allowed (touch keeps the CSS wobble). */
export function liveCapable() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
