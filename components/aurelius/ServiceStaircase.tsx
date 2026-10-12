"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { aurelius, domainsImage, practiceHref } from "@/content/aurelius";
import { useServiceSearch } from "@/hooks/useServiceSearch";
import { motion } from "@/lib/motion";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { gsap } from "@/lib/scroll/gsap";
import { QuoteToggle } from "@/components/quote/QuoteToggle";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * The eleven practice areas, one row each, beside the staircase photo. The staircase drifts slowly
 * while the rows reveal. On narrow screens the photo becomes a slim strip above the list.
 * Search is the shared `useServiceSearch` hook, so it behaves exactly as on the services page.
 */
export function ServiceStaircase() {
  const ref = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { query, setQuery, groups, count, total, searching } = useServiceSearch();
  const { labels } = aurelius;

  useGSAP(
    () => {
      if (reduced || !photo.current) return;
      const { from, to } = motion.parallax.staircase;
      gsap.fromTo(
        photo.current,
        { yPercent: from },
        { yPercent: to, ease: motion.ease.scrub, scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      ref={ref}
      id="service-domains"
      aria-labelledby="domains-heading"
      className="relative overflow-hidden bg-cream px-[var(--gutter)] py-[clamp(4rem,10vh,7rem)] text-ink"
    >
      {/* Narrow screens: the staircase as a slim strip. */}
      <div aria-hidden="true" className="relative mb-10 h-28 overflow-hidden lg:hidden">
        <Image src={domainsImage.src} alt={domainsImage.alt} fill sizes="100vw" className="object-cover object-[50%_40%]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        {/* Wide screens: the staircase, sticky beside the rows. */}
        <div aria-hidden="true" className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+2rem)] h-[calc(100svh-var(--nav-h)-4rem)] overflow-hidden">
            <div ref={photo} className="absolute inset-0 will-change-transform">
              <Image src={domainsImage.src} alt={domainsImage.alt} fill sizes="33vw" className="object-contain object-top" />
            </div>
          </div>
        </div>

        <div>
          <p data-reveal className="eyebrow flex items-center gap-3 text-[0.68rem] text-ember">
            {labels.practiceAreas}
          </p>
          <h2 id="domains-heading" data-reveal className="display mt-5 text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.02]">
            Our practice areas
          </h2>

          <div className="mt-8 max-w-xl">
            <label htmlFor="domain-search" className="eyebrow text-[0.62rem] text-ink/60">
              {labels.search}
            </label>
            <input
              id="domain-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="mt-3 block w-full border border-ink/20 bg-transparent px-5 py-4 text-[1rem] text-ink placeholder:text-ink/45"
            />
            <p role="status" className="eyebrow mt-3 text-[0.62rem] text-ink/60">
              {searching ? `${count} / ${total}` : `${total}`}
            </p>
          </div>

          {groups.length === 0 && <p className="mt-10 text-ink/70">{labels.noResults}</p>}

          <ol className="mt-10 border-t border-ink/15">
            {groups.map(({ practice, services }, i) => (
              <li key={practice.slug} data-reveal className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-5 border-b border-ink/15 py-6 md:py-7">
                <span className="eyebrow pt-2 text-[0.64rem] text-ink/50">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <SmartLink
                    href={practiceHref(practice.slug)}
                    className="display block text-[clamp(1.6rem,2.8vw,2.3rem)] leading-none transition-colors hover:text-ember focus-visible:text-ember"
                  >
                    {practice.name}
                  </SmartLink>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{practice.descriptor}</p>
                  {practice.expansion && (
                    <span className="eyebrow mt-3 inline-block border border-ember/60 px-2 py-1 text-[0.56rem] text-ember">
                      {labels.expansion}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="eyebrow text-[0.62rem] text-ink/60">{services.length}</span>
                  <QuoteToggle slug={practice.slug} name={practice.name} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
