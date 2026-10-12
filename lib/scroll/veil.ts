"use client";

import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "./gsap";
import { getLenis } from "./lenis";
import { setVeil } from "./store";

/**
 * Scroll choreography, for any page that has a hero or a light section:
 *   - Hero (`[data-hero-stage]`): on a cut-out hero (`data-hero-mode="cutout"`), the title slides out
 *     from behind the figure while the figure settles forward. A full-bleed hero drifts slowly forward.
 *   - Light section (`[data-light-block]`, the first one on the page): `veil.light` tells the header
 *     it is over the light page, and leaving the hero pulls the scroll on to it (the magnetic step).
 *   - Dome (`data-dome`, home only): `veil.exit` (0–1) drives the dark rising from below at the
 *     block's end (components/three/Veil.tsx).
 */
export function createVeil(reducedMotion: boolean) {
  const hero = document.querySelector<HTMLElement>("[data-hero-stage]");
  const light = document.querySelector<HTMLElement>("[data-light-block]");
  const triggers: ScrollTrigger[] = [];
  const mm = gsap.matchMedia();

  if (light) {
    const { exitLead } = config.front;
    triggers.push(
      ScrollTrigger.create({
        trigger: light,
        start: "top top+=1",
        end: "bottom top",
        onToggle: (self) => setVeil({ light: self.isActive }),
        onRefresh: (self) => setVeil({ light: self.isActive }),
      }),
      ScrollTrigger.create({
        trigger: light,
        start: `bottom ${100 + exitLead * 100}%`,
        end: "bottom top",
        onUpdate: (self) => setVeil({ exit: self.progress }),
        onRefresh: (self) => setVeil({ exit: self.progress }),
      }),
    );
  } else {
    setVeil({ light: false, exit: 0 });
  }

  if (hero && !reducedMotion) {
    if (hero.dataset.heroMode === "cutout") {
      const { titleShiftVw, titleRiseSvh, figureScale } = config.front.hero;
      const scrollTrigger = { trigger: hero, start: "top top", end: "bottom bottom", scrub: true };

      // Wide screens: the title starts behind the figure and slides right into the clear.
      mm.add("(min-width: 1024px)", () => {
        gsap
          .timeline({ scrollTrigger })
          .fromTo("[data-hero-title]", { x: () => (-window.innerWidth * titleShiftVw) / 100 }, { x: 0, ease: "none" }, 0)
          .fromTo("[data-hero-figure]", { scale: 1 }, { scale: figureScale, ease: "none" }, 0);
      });
      // Narrow screens: it starts behind the figure's head and rises above the crown.
      mm.add("(max-width: 1023.98px)", () => {
        gsap
          .timeline({ scrollTrigger })
          .fromTo("[data-hero-title]", { y: () => (window.innerHeight * titleRiseSvh) / 100 }, { y: 0, ease: "none" }, 0)
          .fromTo("[data-hero-figure]", { scale: 1 }, { scale: figureScale, ease: "none" }, 0);
      });
    }

    if (hero.dataset.heroMode === "full") {
      const { fullScale, fullDriftPercent } = config.front.hero;
      gsap.fromTo(
        "[data-hero-image]",
        { scale: fullScale.from, xPercent: fullDriftPercent },
        { scale: fullScale.to, xPercent: -fullDriftPercent, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } },
      );
    }

    if (light) {
      // Magnetic step between the hero and the light section (smooth scrolling on a fine pointer only).
      mm.add("(pointer: fine)", () => {
        const { magnet } = config.front;
        // Only when the visitor is scrolling into the gap itself: a jump or "back to top" that merely
        // passes through is left alone.
        const pull = (self: ScrollTrigger, top: number) => {
          const lenis = getLenis();
          if (!lenis || lenis.targetScroll < self.start - 2 || lenis.targetScroll > self.end) return;
          lenis.scrollTo(top, { duration: magnet.duration, lock: true, easing: magnet.ease });
        };
        const step = ScrollTrigger.create({
          trigger: light,
          start: "top bottom-=2",
          end: "top top",
          onEnter: (self) => pull(self, self.end),
          onEnterBack: (self) => pull(self, self.start - 2),
        });
        return () => step.kill();
      });
    }
  }

  return () => {
    triggers.forEach((t) => t.kill());
    mm.revert();
    if (hero) gsap.set("[data-hero-title], [data-hero-figure], [data-hero-image]", { clearProps: "transform" });
    setVeil({ light: false, exit: 0 });
  };
}
