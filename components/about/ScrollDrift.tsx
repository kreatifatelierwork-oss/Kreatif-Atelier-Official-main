"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { config } from "@/lib/config";
import { gsap, useGSAP } from "@/lib/scroll/gsap";

/**
 * A gentle scroll-linked drift for an opening section: as the page scrolls away, the content rises a little and
 * softens (transform and opacity only, scrubbed with Lenis). Reduced motion: still.
 */
export function ScrollDrift({ children, className = "" }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced || !box.current) return;
      const { rise, fade } = config.about.drift;
      gsap.to(box.current, {
        yPercent: -rise,
        opacity: fade,
        ease: "none",
        scrollTrigger: { trigger: box.current, start: "top top+=80", end: "bottom top", scrub: 0.5 },
      });
    },
    { scope: box, dependencies: [reduced] },
  );
  return (
    <div ref={box} className={className}>
      {children}
    </div>
  );
}
