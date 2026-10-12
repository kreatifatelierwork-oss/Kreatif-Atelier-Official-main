import type { Metadata } from "next";
import Image from "next/image";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Art, Body, Poster, Rich } from "@/components/asraya/kit";
import { asraya, closes, gap, problem, visibility, why } from "@/content/asraya";

export const metadata: Metadata = { ...asraya.meta, alternates: { canonical: "/asraya/" } };

/** Asraya, part one: the cover, the why, the two gaps, what visibility does, and what Asraya is. */
export default function Page() {
  return (
    <AsrayaShell next={asraya.nav[1]}>
      {/* Cover */}
      <Poster tone="paper" labelledBy="home-heading" className="a-cover !pt-[clamp(2.5rem,6vh,4.5rem)] !pb-[clamp(2.5rem,5vh,3.5rem)]">
        {/* Wide screens: wordmark and promise down the left, the jigsaw filling the right two thirds.
            Narrow screens: wordmark, jigsaw edge to edge, then the promise. */}
        <div className="grid gap-y-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,9fr)] lg:grid-rows-[1fr_auto] lg:gap-x-4">
          <h1 id="home-heading" className="a-serif relative z-10 text-[clamp(5.5rem,23vw,8rem)] leading-[0.8] font-normal tracking-[-0.03em] lg:self-center lg:text-[clamp(6.5rem,10.6vw,11rem)]">
            {asraya.wordmark}
          </h1>
          {/* Multiplied onto the poster, so the picture's white paper takes the poster's own colour. */}
          <Image
            src={asraya.cover.src}
            alt={asraya.cover.alt}
            width={asraya.cover.width}
            height={asraya.cover.height}
            priority
            decoding="sync"
            sizes="(min-width: 1024px) 72vw, 110vw"
            className="a-cover__collage lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
          />
          <div className="relative z-10 border-t a-rule pt-6 lg:col-start-1 lg:row-start-2 lg:self-end">
            <p className="a-display text-[clamp(1.9rem,6vw,3rem)] lg:text-[clamp(1.8rem,2.6vw,2.6rem)]">{asraya.promise}</p>
            <p className="a-wide a-accent mt-6">
              {asraya.aegis}
              <span className="mt-2 block text-[color:var(--a-fg)]">{asraya.tagline}</span>
            </p>
          </div>
        </div>
      </Poster>

      {/* The why */}
      <Poster tone="slate" labelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <h2 id="why-heading" data-reveal className="a-display text-[clamp(4rem,11vw,9.5rem)]">
              {why.title}
            </h2>
            <p data-reveal className="a-wide a-accent mt-6 max-w-sm">
              {why.question}
            </p>
            <Art name="statue" sizes="(min-width: 1024px) 34vw, 80vw" className="a-art--plinth mt-8 max-w-[24rem]" />
          </div>
          <Body paragraphs={why.body} />
        </div>
      </Poster>

      {/* The visibility gap */}
      <Poster tone="paper" labelledBy="gap-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <p data-reveal className="a-display a-accent max-w-md text-[clamp(1.5rem,2.6vw,2.2rem)]">
            {gap.kicker}
          </p>
          <h2 id="gap-heading" data-reveal className="lg:text-right">
            <span className="a-wide block text-[1rem]">{gap.title[0]}</span>
            <span className="a-serif block text-[clamp(3.4rem,9vw,8rem)] uppercase">{gap.title[1]}</span>
            <span className="a-display block text-[clamp(4.5rem,13vw,11rem)] leading-[0.85]">{gap.title[2]}</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-12 border-t a-rule pt-12 lg:grid-cols-2 lg:gap-20">
          <Body paragraphs={gap.left} />
          <Body paragraphs={gap.right} />
        </div>
      </Poster>

      {/* The communication problem */}
      <Poster tone="kraft" labelledBy="problem-heading">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end lg:gap-16">
          <div>
        <h2 id="problem-heading" data-reveal>
          <span className="a-display block text-[clamp(3rem,7vw,6rem)]">{problem.title[0]}</span>
          <span className="a-serif block text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.86] lowercase">{problem.title[1]}</span>
          <span className="a-display block text-[clamp(3rem,7vw,6rem)]">{problem.title[2]}</span>
        </h2>
        <p data-reveal className="a-serif mt-6 max-w-md text-[clamp(1.5rem,2.4vw,2rem)] font-bold">
          {problem.subtitle}
        </p>
          </div>
          <Art name="speaker" blend="multiply" sizes="(min-width: 1024px) 30vw, 70vw" className="mx-auto max-w-[18rem] lg:max-w-none" />
        </div>
        <ol className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {problem.beats.map((beat, i) => (
            <li key={beat} data-reveal className={`a-body border-t a-rule pt-5 ${i % 3 === 1 ? "lg:mt-16" : i % 3 === 2 ? "lg:mt-32" : ""}`}>
              <span className="a-display a-accent mb-3 block text-[1.6rem]">{String(i + 1).padStart(2, "0")}</span>
              <Rich text={beat} />
            </li>
          ))}
        </ol>
        <p data-reveal className="a-serif mx-auto mt-16 max-w-4xl text-center text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">
          {problem.close}
        </p>
      </Poster>

      {/* What visibility can do */}
      <Poster tone="paper" labelledBy="visibility-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <h2 id="visibility-heading" data-reveal>
              <span className="a-display block text-[clamp(3rem,7.5vw,6.5rem)]">{visibility.title[0]}</span>
              <span className="a-serif inline text-[clamp(3rem,7.5vw,6.5rem)] uppercase">{visibility.title[1]} </span>
              <span className="a-display inline text-[clamp(1.8rem,3.4vw,3rem)]">{visibility.title[2]}</span>
            </h2>
            <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {visibility.items.map((item) => (
                <div key={item.title} data-reveal>
                  <dt className="a-display text-[1.7rem]">{item.title}</dt>
                  <dd className="a-body mt-3 text-[0.96rem]">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <Art name="houses" blend="multiply" sizes="(min-width: 1024px) 38vw, 90vw" />
            <p data-reveal className="a-display text-[clamp(2.8rem,6vw,5.4rem)] lg:text-right">
              {visibility.close}
            </p>
          </div>
        </div>
      </Poster>

      {/* Asraya exists to close the gap */}
      <Poster tone="red" labelledBy="closes-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="closes-heading" data-reveal>
            <span className="a-serif a-accent block text-[clamp(3.6rem,9vw,7.5rem)] tracking-[0.02em] uppercase">{asraya.name}</span>
            <span className="a-display mt-2 block text-[clamp(2rem,4.6vw,3.8rem)]">{closes.title}</span>
          </h2>
          <p data-reveal className="a-display self-end text-[clamp(1.9rem,3.6vw,3rem)]">
            {closes.lead}
          </p>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden border a-rule bg-[color:var(--a-rule)] md:grid-cols-2 lg:grid-cols-3">
          {closes.items.map((item) => (
            <li key={item} className="a-body bg-[color:var(--a-bg)] p-7 md:p-8">
              <p data-reveal>
                <Rich text={item} />
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-20">
          <p data-reveal className="a-body max-w-md">
            <Rich text={closes.standard} />
          </p>
          <p data-reveal className="a-display text-[clamp(2.2rem,4.6vw,3.8rem)] lg:text-right">
            {asraya.promise}
          </p>
        </div>
      </Poster>

      {/* All of it, given */}
      <Poster tone="paper">
        <p data-reveal className="a-display a-accent max-w-5xl text-[clamp(3rem,9vw,8rem)]">
          {closes.given}
        </p>
      </Poster>
    </AsrayaShell>
  );
}
