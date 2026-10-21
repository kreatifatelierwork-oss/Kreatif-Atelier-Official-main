"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { preload } from "react-dom";
import { FloatingArtifact } from "@/components/design/FloatingArtifact";
import { NeuButton } from "@/components/design/NeuButton";
import { useLiveScene } from "@/components/design/useLiveScene";
import { aurelius } from "@/content/aurelius";
import { hero } from "@/content/home";
import { heroObjects, type HeroObject } from "@/features/home-v2/data/heroScene";
import { HeroBackdrop } from "./HeroBackdrop";

// The live factory loads after first paint; the hero text never waits for WebGL.
const FactoryStage = dynamic(() => import("@/features/home-v2/scene/FactoryStage"), { ssr: false });

/** The owner's gold wordmark, cut out from the supplied artwork (public/images/logos/aurelius-wordmark.webp). */
const wordmark = { src: "/images/logos/aurelius-wordmark.webp", small: "/images/logos/aurelius-wordmark-700.webp", width: 1400, height: 346 };

const posterSrc = (o: HeroObject) => (o.kind === "hero" ? `/images/hero/objects/${o.slug}.webp` : `/images/artifacts/${o.slug}.webp`);

/** The hero quote with its last two words picked out in gold. */
function Tagline() {
  const words = hero.quote.split(" ");
  return (
    <>
      {words.slice(0, -2).join(" ")} <span className="au-gold-text">{words.slice(-2).join(" ")}</span>
    </>
  );
}

/**
 * The Aurelius home hero, one screen tall at any size: the owner's gold AURELIUS wordmark, the tagline and calls to action, and the content factory on its
 * podium with eleven objects floating around it, over misty mountains and glossy spheres.
 * Centred layout (chosen 2026-10-20 over the split comparison). `primary` sets the main call to action
 * (home: Explore Aurelius; the Aurelius page: its services).
 */
export function HeroAurelius({ primary = hero.primaryCta, secondary = hero.secondaryCta }: { primary?: { label: string; href: string }; secondary?: { label: string; href: string } | null } = {}) {
  // The factory runs live on phones too (owner, 2026-10-21); the floating objects stay off there.
  const live = useLiveScene({ allowTouch: true });
  // Fetch the factory still from the start of the page load (in the document head), the one for this screen only.
  preload("/images/home/hero-stage-wide.webp", { as: "image", fetchPriority: "high", media: "(min-aspect-ratio: 1/1)" });
  preload("/images/home/hero-stage-narrow.webp", { as: "image", fetchPriority: "high", media: "(max-aspect-ratio: 1/1)" });
  const [ready, setReady] = useState(false);

  return (
    <section id={hero.id} aria-labelledby="home-heading" className="au-hero relative isolate flex h-[100svh] min-h-[560px] flex-col overflow-hidden">
      <HeroBackdrop />

      {/* Words */}
      <div className="ds-enter relative z-20 flex flex-col items-center px-[var(--ds-gutter)] pt-[calc(var(--nav-h)+var(--ds-space-7))] text-center">
        <p className="ds-label tracking-[0.3em]">{hero.words.start.join("  ·  ")}</p>
        {/* The owner's gold AURELIUS wordmark (2026-10-20), as the page's heading: the picture carries the
            name as its alt text, so the heading still reads "Aurelius". */}
        <h1 id="home-heading" className="ds-enter-rise mt-[var(--ds-space-3)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={wordmark.src}
            srcSet={`${wordmark.small} 700w, ${wordmark.src} 1400w`}
            sizes="(max-width: 767px) 92vw, 1100px"
            alt={aurelius.name}
            width={wordmark.width}
            height={wordmark.height}
            fetchPriority="high"
            decoding="async"
            className="au-wordmark-img"
          />
        </h1>
        {/* The quote with the two calls to action beside it (stacked under it on narrow screens). */}
        <div className="mt-[var(--ds-space-4)] flex flex-col items-center gap-[var(--ds-space-4)] lg:flex-row lg:gap-[var(--ds-space-7)]">
          <p className="au-tagline ds-emphasis leading-[1.1] text-ds-text lg:text-left">
            <Tagline />
          </p>
          <div className="flex flex-wrap justify-center gap-[var(--ds-space-3)]">
            <NeuButton href={primary.href} variant="primary">
              {primary.label}
            </NeuButton>
            {secondary && <NeuButton href={secondary.href}>{secondary.label}</NeuButton>}
          </div>
        </div>
      </div>

      {/* The live factory on its podium (with its rendered still first, and on phones). It takes the
          space left under the words, so nothing in it can sit on the text or the buttons. */}
      <div className="relative z-10 mt-[var(--ds-space-3)] min-h-0 w-full flex-1 md:mx-auto md:w-[min(100%,1180px)]">
        <div data-stage className="absolute inset-0">
          {/* The live factory's exact framing as stills (one per framing), contained in the stage like the live
              camera, so the swap to live 3D is invisible. Which one shows follows the stage's own shape, the same
              rule the camera uses (portrait below 1:1), via a container query (.au-stage-poster). */}
          <div data-stage-poster data-hidden={ready || undefined} className="au-stage-poster absolute inset-0 data-[hidden]:opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-framing="landscape" src="/images/home/hero-stage-wide.webp" alt="" width={2100} height={1421} loading="lazy" decoding="async" fetchPriority="high" className="h-full w-full object-contain" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-framing="portrait" src="/images/home/hero-stage-narrow.webp" alt="" width={1400} height={1400} loading="lazy" decoding="async" fetchPriority="high" className="h-full w-full object-contain" />
          </div>
          {live && <FactoryStage onReady={() => setReady(true)} />}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
          {heroObjects
            .filter((o) => o.layer === "stage")
            .map((o) => (
              <FloatingArtifact
                key={o.slug}
                seed={o.seed}
                className={`pointer-events-auto ${o.mobile} ${o.centered}`}
                image={{ src: posterSrc(o), width: o.size[0], height: o.size[1] }}
                live={{ kind: o.kind, slug: o.slug }}
              />
            ))}
        </div>
      </div>

      {/* The eleven objects and the small spheres, floating; each tilts only under the pointer. Not on phones. */}
      <div aria-hidden="true" data-hero-float className="pointer-events-none absolute inset-0 z-20">
        {heroObjects
          .filter((o) => o.layer !== "stage")
          .map((o) => (
            <FloatingArtifact
              key={o.slug}
              seed={o.seed}
              className={`pointer-events-auto ${o.mobile} ${o.centered}`}
              image={{ src: posterSrc(o), width: o.size[0], height: o.size[1] }}
                live={{ kind: o.kind, slug: o.slug }}
            />
          ))}
      </div>

      <p className="au-scroll-cue absolute bottom-[var(--ds-space-3)] left-1/2 z-20 hidden -translate-x-1/2 md:block">{hero.scrollCue}</p>
    </section>
  );
}
