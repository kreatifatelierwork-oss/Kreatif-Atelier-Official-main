"use client";

import { useEffect, useState } from "react";

/**
 * Whether to load a live 3D scene in place of its poster. Only on screens with a fine pointer (the
 * scene follows the mouse) at tablet width and up, never for reduced motion, and only once the page
 * has loaded and the browser is idle (`allowTouch`: phones and tablets too, for the home factory), so the 3D never delays the first paint or input
 * (animation-performance; Lighthouse showed a 10s main-thread block on phones). `?live` forces it.
 */
export function useLiveScene({ allowTouch = false }: { allowTouch?: boolean } = {}) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has("live");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const capable = forced || (!reduced && (allowTouch || window.matchMedia("(pointer: fine) and (min-width: 768px)").matches));
    if (!capable) return;
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setLive(true), { timeout: 2500 });
      else timer = setTimeout(() => setLive(true), 1200);
    };
    // Touch screens: wait for the first touch or scroll (the still picture shows until then), so building the 3D
    // never blocks the page while it loads on a phone.
    const touch = allowTouch && !forced && window.matchMedia("(pointer: coarse)").matches;
    const events = ["touchstart", "pointerdown", "scroll", "wheel", "keydown"] as const;
    const onFirst = () => {
      events.forEach((e) => window.removeEventListener(e, onFirst));
      go();
    };
    if (touch) events.forEach((e) => window.addEventListener(e, onFirst, { passive: true, once: true }));
    else if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      events.forEach((e) => window.removeEventListener(e, onFirst));
      if (idle) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, [allowTouch]);
  return live;
}
