"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { config } from "@/lib/config";
import { motion } from "@/lib/motion";
import { gsap, ScrollTrigger } from "@/lib/scroll/gsap";

/**
 * The sky above the footer, after the owner's reference: the page fades into a sunset (cream, amber,
 * orange, crimson, deep maroon) over two dark rolling hills, each ridge traced by a thin gold line.
 * It rises as it scrolls into view; silky streaks drift through the glow and a spark of light runs
 * along each ridge. Ambient motion pauses off screen and stops for reduced motion. Decorative.
 * Styles and timings: styles/design/footer.css; shapes: config.footerSky.
 */
export function FooterSky() {
  const box = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const { back, front, backRidge, frontRidge, viewBox } = config.footerSky;

  useGSAP(
    () => {
      if (reduced || !glow.current) return;
      const { from, to } = motion.parallax.glow;
      gsap.fromTo(glow.current, { yPercent: from }, { yPercent: to, ease: motion.ease.scrub, scrollTrigger: { trigger: box.current, start: "top bottom", end: "bottom bottom", scrub: true } });
      ScrollTrigger.refresh();
    },
    { scope: box, dependencies: [reduced] },
  );

  // Ambient motion only while the sky is on screen (animation-performance).
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.dataset.play = "";
      else delete el.dataset.play;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const id = (name: string) => `ft-${name}-${uid}`;
  return (
    <div ref={box} aria-hidden="true" className="ft-sky">
      <div ref={glow} className="ft-sky__glow">
        <span className="ft-sky__silk ft-sky__silk--light" />
        <span className="ft-sky__silk ft-sky__silk--amber" />
        <span className="ft-sky__silk ft-sky__silk--crimson" />
      </div>
      <svg className="ft-sky__hills" viewBox={viewBox} preserveAspectRatio="none">
        <defs>
          <linearGradient id={id("back")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="ft-stop-back-top" />
            <stop offset="1" className="ft-stop-ground" />
          </linearGradient>
          <linearGradient id={id("front")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="ft-stop-front-top" />
            <stop offset="0.7" className="ft-stop-ground" />
          </linearGradient>
          {/* The rims fade in and out along their length; the brightest point sits on the crest. */}
          <linearGradient id={id("rim-back")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0" className="ft-stop-rim-none" />
            <stop offset="0.35" className="ft-stop-rim" />
            <stop offset="0.62" className="ft-stop-rim-hot" />
            <stop offset="1" className="ft-stop-rim-none" />
          </linearGradient>
          <linearGradient id={id("rim-front")} gradientUnits="userSpaceOnUse" x1="620" y1="0" x2="1536" y2="0">
            <stop offset="0" className="ft-stop-rim-none" />
            <stop offset="0.3" className="ft-stop-rim" />
            <stop offset="0.55" className="ft-stop-rim-hot" />
            <stop offset="0.85" className="ft-stop-rim" />
            <stop offset="1" className="ft-stop-rim-fade" />
          </linearGradient>
          <filter id={id("blur")} x="-10%" y="-200%" width="120%" height="500%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <path d={back} fill={`url(#${id("back")})`} />
        <path d={front} fill={`url(#${id("front")})`} />
        {/* Glow under each rim, the rim itself, then a spark running along it. */}
        <path d={backRidge} className="ft-rim-glow" stroke={`url(#${id("rim-back")})`} filter={`url(#${id("blur")})`} />
        <path d={frontRidge} className="ft-rim-glow" stroke={`url(#${id("rim-front")})`} filter={`url(#${id("blur")})`} />
        <path d={backRidge} className="ft-rim" stroke={`url(#${id("rim-back")})`} />
        <path d={frontRidge} className="ft-rim" stroke={`url(#${id("rim-front")})`} />
        <path d={backRidge} className="ft-spark" pathLength={1000} />
        <path d={frontRidge} className="ft-spark ft-spark--front" pathLength={1000} />
      </svg>
    </div>
  );
}
