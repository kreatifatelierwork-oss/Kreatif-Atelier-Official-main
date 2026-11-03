"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/scroll/gsap";

/**
 * Scroll motion for the Asraya pages, scrubbed to the scroll (Lenis drives ScrollTrigger site-wide):
 * - `[data-a-link]` network links draw themselves in;
 * - drawings assemble: `[data-a-slide]` parts slide together, `[data-a-rise]` comes up, `[data-a-lift]` lifts,
 *   `[data-a-beam]` sweeps down, `[data-a-fade]` appears last;
 * - `[data-a-words]` statements fill in word by word;
 * - `[data-a-parallax]` drifts slightly against the scroll.
 * Nothing runs for reduced motion, and without JavaScript every part simply sits in its final place.
 */
export function AsrayaMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = document.querySelector<HTMLElement>(".asraya");
      if (!root) return;
      const q = <T extends Element>(selector: string) => gsap.utils.toArray<T>(root.querySelectorAll(selector));
      // Each drawing is scrubbed from when it enters until its middle reaches the centre of the screen.
      const along = (el: Element) => ({ trigger: el.closest("svg") ?? el, start: "top 88%", end: "center 52%", scrub: 0.6 });

      const networks = new Set(q<SVGLineElement>("[data-a-link]").map((link) => link.closest("svg")!));
      networks.forEach((svg) => {
        const links = svg.querySelectorAll("[data-a-link]");
        gsap.fromTo(links, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", stagger: 0.04, scrollTrigger: along(svg) });
      });

      q<SVGGElement>("[data-a-slide]").forEach((el) => {
        const x = el.dataset.aSlide === "left" ? -36 : 36;
        gsap.fromTo(el, { x }, { x: 0, ease: "none", scrollTrigger: along(el) });
      });
      q<SVGGElement>("[data-a-rise]").forEach((el) => gsap.fromTo(el, { y: 90 }, { y: 0, ease: "none", scrollTrigger: along(el) }));
      q<SVGGElement>("[data-a-lift]").forEach((el) => gsap.fromTo(el, { y: 22 }, { y: 0, ease: "none", scrollTrigger: along(el) }));
      q<SVGPathElement>("[data-a-beam]").forEach((el) =>
        gsap.fromTo(el, { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, ease: "none", scrollTrigger: along(el) }),
      );
      q<SVGElement>("[data-a-fade]").forEach((el) =>
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { ...along(el), start: "top 70%" } }),
      );

      const splits = q<HTMLElement>("[data-a-words]").map((el) =>
        SplitText.create(el, {
          type: "words",
          wordsClass: "a-word",
          aria: "auto",
          onSplit: (self) =>
            gsap.fromTo(self.words, { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.5 } }),
        }),
      );

      q<HTMLElement>("[data-a-parallax]").forEach((el) => {
        const amount = Number(el.dataset.aParallax) || 40;
        gsap.fromTo(el, { y: amount }, { y: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => splits.forEach((split) => split.revert());
    });
    return () => mm.revert();
  });

  return null;
}
