"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { filmReel } from "@/content/home";

const FilmReelStage = dynamic(() => import("@/features/home-v2/scene/film/FilmReelStage"), { ssr: false });

/**
 * "What we create": two strips of film carrying the service names, moving in opposite directions.
 * The 3D loads only when the section nears the viewport, so it never weighs on the first paint. The
 * names are also a real list for screen readers and search.
 */
export function FilmReelNeu() {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    // Start watching only once the page has loaded and gone idle, so the 3D never competes with the first paint.
    const watch = () => {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setNear(true);
            io?.disconnect();
          }
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(el);
    };
    let idle = 0;
    const afterLoad = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(watch, { timeout: 2000 });
      else watch();
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    return () => {
      window.removeEventListener("load", afterLoad);
      if (idle) window.cancelIdleCallback(idle);
      io?.disconnect();
    };
  }, []);
  const id = `${filmReel.id}-heading`;
  return (
    <section id={filmReel.id} aria-labelledby={id} className="relative overflow-hidden pt-[var(--ds-space-9)]">
      <header data-reveal className="mx-auto max-w-[var(--ds-max-width)] px-[var(--ds-gutter)] text-center">
        <p className="ds-label">{filmReel.eyebrow}</p>
        <h2 id={id} className="ds-heading mt-[var(--ds-space-3)]">
          {filmReel.headline.lead} <span className="ds-emphasis text-ds-muted">{filmReel.headline.emphasis}</span>
        </h2>
      </header>
      <ul className="sr-only">
        {filmReel.services.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
      <div ref={box} className="relative h-[var(--ds-reel-h-narrow)] md:h-[var(--ds-reel-h)]">
        {near && <FilmReelStage />}
      </div>
    </section>
  );
}
