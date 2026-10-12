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
 * The shared hero for the home page and the Aurelius page: red mahogany, a figure, and AURELIUS.
 * The stage holds (sticky) and the scroll choreography lives in lib/scroll/veil.ts.
 *
 * A `full` figure (the horse) is built in three layers: the picture, the word set edge to edge in a
 * heavy serif along the foot of the screen, and the horse's head and chest again on top, so the
 * animal runs in front of the letters. A `cutout` figure lets the title slide out from behind it.
 */
export function AureliusHero({ figure, showCtas = false }: Props) {
  const cutout = figure.mode === "cutout";

  const copy = (
    <>
      <p className="display text-[clamp(1.7rem,2.5vw,2.7rem)] leading-[1.08] text-cream">{aurelius.tagline}</p>
      <p className="hero-copy__support mt-4 max-w-md text-[0.98rem] leading-relaxed text-cream/80">{aurelius.support}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={hero.primaryCta.href} variant="primary">
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Button>
      </div>
    </>
  );

  const list = (items: readonly string[], side: "start" | "end") => (
    <ul aria-hidden="true" className={`hero-words hero-words--${side} eyebrow`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
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
          {cutout ? (
            <>
              <div data-hero-title className="absolute inset-x-[var(--gutter)] top-[13svh] text-center lg:inset-x-auto lg:top-[16svh] lg:left-[41%] lg:text-left">
                <h1 id="home-heading" className="display text-[clamp(3.2rem,16.5vw,8rem)] leading-[0.82] font-bold tracking-[0.02em] text-cream uppercase lg:text-[min(11vw,27svh)]">
                  {aurelius.name}
                </h1>
                <p className="eyebrow mt-4 text-[0.56rem] tracking-[0.34em] text-cream/75 lg:mt-5 lg:text-[0.62rem]">{aurelius.byline}</p>
              </div>
              <div
                data-hero-figure
                className="pointer-events-none absolute bottom-0 left-1/2 h-[66svh] origin-bottom -translate-x-1/2 lg:left-[5%] lg:h-[92svh] lg:translate-x-0 lg:origin-bottom-left"
              >
                <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} priority decoding="sync" sizes="(min-width: 1024px) 52svh, 38svh" className="h-full w-auto max-w-none" />
              </div>
              {showCtas && <div className="absolute top-[46svh] right-[var(--gutter)] left-[41%] hidden lg:block">{copy}</div>}
            </>
          ) : (
            <>
              {/* 1 — the picture */}
              <div data-hero-image className="hero-horse">
                <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} priority decoding="sync" sizes="(min-width: 1024px) 128vw, 300vw" />
              </div>
              <div aria-hidden="true" className="hero-full__shade absolute inset-0" />

              {list(hero.words.start, "start")}
              {list(hero.words.end, "end")}

              {/* 2 — the word, edge to edge */}
              <h1 id="home-heading" className="hero-word">
                {aurelius.name}
              </h1>

              {/* 3 — the horse again, head and chest only, in front of the letters */}
              {figure.front && (
                <div data-hero-image aria-hidden="true" className="hero-horse hero-horse--front">
                  <Image src={figure.front} alt="" width={figure.width} height={figure.height} priority decoding="sync" sizes="(min-width: 1024px) 128vw, 300vw" />
                </div>
              )}

              <p className="hero-byline eyebrow">{aurelius.byline}</p>
              {showCtas && <div className="hero-copy">{copy}</div>}
            </>
          )}
        </div>
      </div>

      {showCtas && cutout && <div className="relative px-[var(--gutter)] pt-8 pb-16 lg:hidden">{copy}</div>}
    </section>
  );
}
