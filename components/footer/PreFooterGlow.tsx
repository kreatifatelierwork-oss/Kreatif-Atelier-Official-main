"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/scroll/gsap";

/**
 * The sunset arc from the hero, set just above the footer on every page. The arc rises into place
 * as it scrolls into view and its bottom merges into the footer's black. Decorative only.
 */
export function PreFooterGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const { from, to } = motion.parallax.glow;
      gsap.fromTo(
        ref.current,
        { yPercent: from },
        {
          yPercent: to,
          ease: motion.ease.scrub,
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true },
        },
      );
      ScrollTrigger.refresh();
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div aria-hidden="true" className="pre-footer-glow">
      <div ref={ref} className="pre-footer-glow__arc" />
    </div>
  );
}
