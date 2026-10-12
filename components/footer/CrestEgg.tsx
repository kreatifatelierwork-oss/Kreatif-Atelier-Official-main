"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { SmartLink } from "@/components/ui/SmartLink";
import { Star } from "@/components/ui/Star";
import { hero, parent, ventures } from "@/content/home";
import { site } from "@/content/site";
import { verticalBySlug } from "@/content/verticals";

/**
 * The footer's wordmark, and what it hides: click it and the Kreatif Atelier crest — the owner's
 * embroidered artwork — fills the screen. Scroll, and on the same cloth the verticals appear as
 * stitched patches, each one a way in. Nothing on the page says it is there.
 */
export function CrestEgg() {
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const { crest } = parent;
  const patches = crest.verticals.map((slug) => verticalBySlug(slug)).filter((v) => v !== undefined);

  // The patches are sewn on as they scroll into view, one after another.
  useEffect(() => {
    const root = scroller.current;
    if (!open || !root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { root, threshold: 0.25 },
    );
    root.querySelectorAll("[data-stitch]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group display flex items-center gap-3 text-left text-[1.5rem] font-medium tracking-[0.2em] text-cream uppercase"
      >
        <Star className="text-gold transition-transform duration-700 ease-out group-hover:rotate-180 group-focus-visible:rotate-180" />
        {site.name}
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="crest-title" variant="sheet" tone="light">
        <div ref={scroller} className="crest-egg">
          <section className="crest-egg__cloth">
            <h2 id="crest-title" className="sr-only">
              {site.name}
            </h2>
            <Image
              src={crest.src}
              alt={crest.alt}
              width={crest.width}
              height={crest.height}
              loading="eager"
              decoding="sync"
              sizes="(min-width: 768px) 100vw, 190vw"
              className="crest-egg__crest"
            />
            <p aria-hidden="true" className="crest-egg__cue eyebrow">
              {hero.scrollCue}
              <span />
            </p>
          </section>

          <section aria-labelledby="crest-verticals" className="crest-egg__verticals">
            <h3 id="crest-verticals" data-stitch className="crest-egg__title display">
              {ventures.headline.lead} <em>{ventures.headline.emphasis}</em>
            </h3>
            <ol className="crest-egg__grid">
              {patches.map((vertical, i) => (
                <li key={vertical.slug} data-stitch style={{ "--i": i } as React.CSSProperties}>
                  <SmartLink href={`/${vertical.slug}`} onClick={() => setOpen(false)} className="crest-patch">
                    <span className="eyebrow crest-patch__no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display crest-patch__name">{vertical.name}</span>
                    <span className="eyebrow crest-patch__line">{vertical.tagline}</span>
                    <span className="eyebrow crest-patch__go">
                      {ventures.explore} <span aria-hidden="true">→</span>
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </Dialog>
    </>
  );
}
