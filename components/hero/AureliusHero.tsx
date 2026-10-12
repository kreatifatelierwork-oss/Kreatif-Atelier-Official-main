import Image from "next/image";
import { aurelius } from "@/content/aurelius";
import { hero } from "@/content/home";
import type { HeroFigure } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";

type Props = {
  figure: HeroFigure;
  /** Home: the headline, subline and two buttons. Aurelius: the graphic alone. */
  showCtas?: boolean;
};

/**
 * The shared hero for the home page and the Aurelius page: red mahogany, a figure, and AURELIUS in
 * bold. The stage holds (sticky) and the scroll choreography lives in lib/scroll/veil.ts. A `cutout`
 * figure lets the title slide out from behind it; a `full` figure is a full-bleed picture with the title
 * set large along its foot, and it drifts slowly forward while the stage holds.
 */
export function AureliusHero({ figure, showCtas = false }: Props) {
  const cutout = figure.mode === "cutout";

  const copy = (
    <>
      <p className="display text-[clamp(1.9rem,3.1vw,3.2rem)] leading-[1.08] text-cream">{aurelius.tagline}</p>
      <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-cream/80">{aurelius.support}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href={hero.primaryCta.href} variant="primary">
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Button>
      </div>
    </>
  );

  const title = (
    <div
      data-hero-title
      className={
        cutout
          ? "absolute inset-x-[var(--gutter)] top-[13svh] text-center lg:inset-x-auto lg:top-[16svh] lg:left-[41%] lg:text-left"
          : "absolute inset-x-[var(--gutter)] bottom-[9svh] z-10 text-center lg:bottom-[8svh] lg:text-left"
      }
    >
      <h1
        id="home-heading"
        className={`display text-[clamp(3.2rem,16.5vw,8rem)] leading-[0.82] font-bold tracking-[0.02em] text-cream uppercase ${
          cutout ? "lg:text-[min(11vw,27svh)]" : "lg:text-[min(9.6vw,24svh)]"
        }`}
      >
        {aurelius.name}
      </h1>
      <p className="eyebrow mt-4 text-[0.56rem] tracking-[0.34em] text-cream/75 lg:mt-5 lg:text-[0.62rem]">{aurelius.byline}</p>
    </div>
  );

  return (
    <section id={hero.id} aria-labelledby="home-heading" className="relative bg-mahogany">
      <div
        data-hero-stage
        data-hero-mode={figure.mode}
        className="hero-stage"
        style={{ "--hero-stage": config.front.hero.stageVh } as React.CSSProperties}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          {!cutout && (
            <div data-hero-image className="hero-full absolute inset-0">
              <Image
                src={figure.src}
                alt={figure.alt}
                fill
                priority
                decoding="sync"
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: figure.position ?? "center" }}
              />
            </div>
          )}

          {/* Full-bleed: the foot of the picture sinks into the mahogany so the title and copy read cleanly. */}
          {!cutout && <div aria-hidden="true" className="hero-full__shade absolute inset-0" />}

          {title}

          {cutout && (
            <div
              data-hero-figure
              className="pointer-events-none absolute bottom-0 left-1/2 h-[66svh] origin-bottom -translate-x-1/2 lg:left-[5%] lg:h-[92svh] lg:translate-x-0 lg:origin-bottom-left"
            >
              <Image
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                priority
                decoding="sync"
                sizes="(min-width: 1024px) 52svh, 38svh"
                className="h-full w-auto max-w-none"
              />
            </div>
          )}

          {showCtas && (
            <div
              className={
                cutout
                  ? "absolute top-[46svh] right-[var(--gutter)] left-[41%] hidden lg:block"
                  : "absolute right-[var(--gutter)] bottom-[8svh] z-10 hidden w-[min(31rem,34vw)] lg:block"
              }
            >
              {copy}
            </div>
          )}

          {showCtas && cutout && (
            <a
              href="#positioning"
              className="eyebrow absolute right-[var(--gutter)] bottom-7 hidden flex-col items-center gap-3 text-[0.62rem] text-cream/70 transition-colors hover:text-cream lg:flex"
            >
              {hero.scrollCue}
              <span aria-hidden="true" className="block h-9 w-px bg-gradient-to-b from-cream/70 to-transparent" />
            </a>
          )}
        </div>
      </div>

      {showCtas && <div className="relative px-[var(--gutter)] pt-8 pb-16 lg:hidden">{copy}</div>}
    </section>
  );
}
