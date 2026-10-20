"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "@/lib/scroll/gsap";

/**
 * The sunset between the dark hero and the white page: the dark hangs down as a bowl with a burning
 * rim, and lifts away as the page scrolls on. Decorative. Depth and colours: `config.front.sunset`.
 */
export function SunsetEdge() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const { from, to } = config.front.sunset.depth;
      gsap.fromTo(
        ref.current,
        { "--depth": `${from}%` },
        { "--depth": `${to}%`, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      ScrollTrigger.refresh();
    },
    { scope: ref, dependencies: [reduced] },
  );

  return <div ref={ref} aria-hidden="true" className="sunset-edge" />;
}
