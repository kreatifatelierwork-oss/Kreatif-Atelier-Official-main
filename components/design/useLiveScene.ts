"use client";

import { useEffect, useState } from "react";

/**
 * Whether to load a live 3D scene in place of its poster. Only on screens with a fine pointer (the
 * scene follows the mouse) at tablet width and up, never for reduced motion, and only once the page
 * has loaded and the browser is idle, so the 3D never delays the first paint or input
 * (animation-performance; Lighthouse showed a 10s main-thread block on phones). `?live` forces it.
 */
export function useLiveScene() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has("live");
    const capable = forced || (window.matchMedia("(pointer: fine) and (min-width: 768px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!capable) return;
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setLive(true), { timeout: 2500 });
      else timer = setTimeout(() => setLive(true), 1200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);
  return live;
}
