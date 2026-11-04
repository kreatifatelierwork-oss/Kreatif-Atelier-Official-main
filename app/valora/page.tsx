import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Journey } from "@/components/story/Journey";
import { Button } from "@/components/ui/Button";
import { Bridge, Constellation, valoraArt } from "@/components/valora/art";
import { Band, Heading, Play, WithArt } from "@/components/valora/kit";
import { ValoraShell } from "@/components/valora/ValoraShell";
import { overview, valora } from "@/content/valora";

export const metadata: Metadata = { ...valora.meta, alternates: { canonical: "/valora/" } };

const { gap, not, promise, works, opportunity, explore } = overview;

/**
 * Valora's main page, night and gold: the cover, the gap, what Valora is not, the promise, how it works told as one
 * student's road, the line about opportunities, and the way into the other three pages.
 */
export default function Page() {
  return (
    <ValoraShell next={valora.nav[1]}>
      {/* Cover: the swan, the wordmark and the line; the star chart of campuses beside them. */}
      <header className="grid items-center gap-x-12 gap-y-10 pt-[clamp(2.5rem,6vh,4rem)] pb-[clamp(3.5rem,9vh,6rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <p className="a-wide a-red">{valora.aegis}</p>
          <div className="mt-6 flex items-end gap-5">
            <Image src={valora.logo.src} alt={valora.logo.alt} width={valora.logo.width} height={valora.logo.height} priority className="h-[clamp(3.6rem,7vw,5.6rem)] w-auto" />
            <h1 id="home-heading" className="v-wordmark text-[clamp(2.3rem,8.4vw,5.2rem)]">
              {valora.wordmark}
            </h1>
          </div>
          <p className="a-wide a-faint mt-6">{valora.tagline}</p>
          <p className="a-display mt-8 max-w-xl text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05]">{valora.positioning}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={valora.cta.href} variant="primary">
              {valora.cta.button}
            </Button>
            <Button href="/valora/chapters">{valora.radarCta}</Button>
          </div>
        </div>
        <Play>
          <Constellation />
        </Play>
      </header>

      {/* What Valora is, in its own two sentences. */}
      <Band panel labelledBy="about-heading">
        <h2 id="about-heading" className="sr-only">
          {valora.name}
        </h2>
        <p data-a-words className="a-lead max-w-4xl !text-[clamp(1.7rem,3vw,2.6rem)]">
          {overview.about[0]}
        </p>
        <p data-reveal className="a-body mt-8 max-w-2xl">
          {overview.about[1]}
        </p>
      </Band>

      {/* The gap */}
      <Band labelledBy="gap-heading">
        <WithArt
          art={
            <Play>
              <Bridge />
            </Play>
          }
        >
          <Heading id="gap-heading" label={gap.label} title={gap.title} />
          <p data-reveal className="a-lead mt-8">
            {gap.body[0]}
          </p>
          <p data-reveal className="a-body mt-5 max-w-xl">
            {gap.body[1]}
          </p>
        </WithArt>
      </Band>

      {/* What Valora is not: three things struck through, then what it is. */}
      <Band labelledBy="not-heading" className="!pt-0">
        <p className="a-wide a-red">{not.label}</p>
        <h2 id="not-heading" data-reveal className="a-display a-h2 mt-5 max-w-4xl">
          {not.title[0]}
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {not.items.map((item) => (
            <li key={item.title} data-reveal className="a-card v-not">
              <p className="v-not__word a-display text-[clamp(2rem,3.4vw,2.8rem)]">
                <span>{item.title}</span>
              </p>
              <p className="a-body mt-4">{item.body}</p>
            </li>
          ))}
        </ul>
        <p data-reveal className="a-quote mt-12 max-w-3xl">
          {not.title[1]}
        </p>
      </Band>

      {/* The promise, filling in word by word. */}
      <Band panel labelledBy="promise-heading">
        <h2 id="promise-heading" data-a-words className="a-display text-[clamp(2.6rem,7vw,6rem)] leading-[1]">
          {promise.map((line, i) => (
            <span key={line} className={`block ${i === 2 ? "a-em" : ""}`}>
              {line}
            </span>
          ))}
        </h2>
      </Band>

      {/* How Valora works, as one student's road. */}
      <Journey
        id="works"
        label={works.label}
        title={works.title}
        steps={works.steps.map((step) => {
          const Art = valoraArt[step.art];
          return { ...step, art: <Art /> };
        })}
      />

      {/* Opportunity */}
      <Band labelledBy="opportunity-heading" className="!pt-0">
        <p className="a-wide a-red">{opportunity.label}</p>
        <h2 id="opportunity-heading" data-reveal className="a-display a-h2 mt-5 max-w-4xl">
          {opportunity.lead} <span className="a-em block">{opportunity.emphasis}</span>
        </h2>
      </Band>

      {/* More about Valora */}
      <Band labelledBy="explore-heading" className="!pt-0">
        <h2 id="explore-heading" className="a-wide a-red">
          {explore.label}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {explore.items.map((item) => {
            const Art = valoraArt[item.art];
            return (
              <li key={item.href} data-reveal>
                <Link href={item.href} className="a-card group h-full">
                  <Play className="mx-auto max-w-[15rem]">
                    <Art />
                  </Play>
                  <span className="a-display mt-6 flex items-baseline justify-between gap-4 text-[clamp(1.6rem,2.4vw,2rem)]">
                    {item.title}
                    <span aria-hidden="true" className="a-red transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                  <span className="a-body mt-2 block !text-[1rem]">{item.body}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Band>
    </ValoraShell>
  );
}
