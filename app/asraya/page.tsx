import type { Metadata } from "next";
import Image from "next/image";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Network } from "@/components/asraya/graphics";
import { Art, Body, Chapter, More, Photo, Rich, Rows } from "@/components/asraya/kit";
import { asraya, closes, gap, problem, visibility, why } from "@/content/asraya";

export const metadata: Metadata = { ...asraya.meta, alternates: { canonical: "/asraya/" } };

/**
 * Asraya, part one, told as a story: the work exists → nobody sees it → NGOs can't find each other →
 * what being seen changes → Asraya. Each chapter leads with a picture, a headline and one line; the rest
 * of its copy is folded under "Read more".
 */
export default function Page() {
  const whyKey = why.body[why.body.length - 1];
  const [gapKey, ...gapRest] = gap.right;
  const beats = problem.beats.slice(0, -1);
  const secondGap = problem.beats[problem.beats.length - 1];

  return (
    <AsrayaShell next={asraya.nav[1]}>
      {/* Cover: wordmark and promise down the left, the jigsaw of portraits across the rest. */}
      <header className="grid gap-y-6 pt-[clamp(2rem,5vh,3.5rem)] pb-[clamp(3rem,7vh,5rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,9fr)] lg:grid-rows-[1fr_auto] lg:gap-x-6">
        <h1 id="home-heading" className="a-serif relative z-10 text-[clamp(5.5rem,23vw,8rem)] leading-[0.8] font-normal tracking-[-0.03em] lg:self-center lg:text-[clamp(6.5rem,10.6vw,11rem)]">
          {asraya.wordmark}
        </h1>
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
        <div className="relative z-10 border-t border-[color:var(--a-ink)] pt-6 lg:col-start-1 lg:row-start-2 lg:self-end">
          <p className="a-display text-[clamp(1.9rem,6vw,2.9rem)] lg:text-[clamp(1.8rem,2.5vw,2.5rem)]">{asraya.promise}</p>
          <p className="a-wide a-red mt-6">{asraya.aegis}</p>
          <p className="a-wide mt-2">{asraya.tagline}</p>
        </div>
      </header>

      {/* 01 The why: the question, the answer in one line, the reasoning folded. */}
      <Chapter id="why" n={1} name={why.title}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
          <div>
            <h2 id="why-heading" data-reveal className="a-display a-h2">
              {why.title}
            </h2>
            <p data-reveal className="a-quote mt-6 max-w-2xl">
              {why.question}
            </p>
            <p data-reveal className="a-lead a-callout mt-8 max-w-2xl [&_strong]:font-semibold">
              <Rich text={whyKey} />
            </p>
            <More>
              <Body paragraphs={why.body.slice(0, -1)} />
            </More>
          </div>
          <Art name="statue" sizes="(min-width: 1024px) 16rem, 70vw" className="a-art--plinth mx-auto max-w-[16rem] lg:self-start" />
        </div>
        <div className="mt-12">
          <Photo id="A1" />
        </div>
      </Chapter>

      {/* 02 The visibility gap: the work is real, the record of it does not exist. */}
      <Chapter id="gap" n={2} name={gap.title.join(" ")}>
        <h2 id="gap-heading" data-reveal className="a-display a-h2">
          {gap.title.join(" ")}
        </h2>
        <p data-reveal className="a-quote a-red mt-6 max-w-3xl">
          {gap.kicker}
        </p>
        <div className="mt-10">
          <Photo id="A2" className="aspect-[16/9]" />
        </div>
        <p data-reveal className="a-lead mt-10 max-w-3xl [&_strong]:font-semibold">
          <Rich text={gapKey} />
        </p>
        <More>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <Body paragraphs={gap.left} />
            <Body paragraphs={gapRest} />
          </div>
        </More>
      </Chapter>

      {/* 03 The communication problem: two organisations a few hundred kilometres apart, neither aware of the other. */}
      <Chapter id="problem" n={3} name={problem.title.join(" ")}>
        <h2 id="problem-heading" data-reveal className="a-display a-h2">
          {problem.title.join(" ")}
        </h2>
        <p data-reveal className="a-lead mt-6 max-w-xl">
          {problem.subtitle}
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
          <Photo id="A3" className="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 50vw" />
          <Photo id="A4" className="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 50vw" />
        </div>
        <div data-reveal className="mt-8">
          <Network state="apart" places={problem.places} />
        </div>
        <p data-reveal className="a-lead a-callout mt-8 max-w-3xl [&_strong]:font-semibold">
          <Rich text={secondGap} />
        </p>
        <More>
          <ol className="grid gap-x-12 md:grid-cols-2">
            {beats.map((beat, i) => (
              <li key={beat} className="a-body grid grid-cols-[2.5rem_1fr] border-t a-rule py-5">
                <span className="a-red font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <Rich text={beat} />
                </span>
              </li>
            ))}
          </ol>
        </More>
        <p data-reveal className="a-quote mt-12 max-w-3xl">
          {problem.close}
        </p>
      </Chapter>

      {/* 04 What visibility can do: six titles to scan, each opening to its line. */}
      <Chapter id="visibility" n={4} name={visibility.title.join(" ")}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-14">
          <h2 id="visibility-heading" data-reveal className="a-display a-h2">
            {visibility.title.join(" ")}
          </h2>
          <Art name="houses" blend="multiply" sizes="(min-width: 1024px) 18rem, 80vw" className="a-art--soft mx-auto max-w-[18rem]" />
        </div>
        <Rows items={visibility.items} numbered className="mt-8" />
        <p data-reveal className="a-quote mt-12 max-w-3xl">
          {visibility.close}
        </p>
      </Chapter>

      {/* 05 Asraya exists to close the gap. */}
      <Chapter id="closes" n={5} name={`${asraya.name} ${closes.title}`}>
        <h2 id="closes-heading" data-reveal className="a-display a-h2">
          <span className="a-red">{asraya.name}</span> {closes.title}
        </h2>
        <p data-reveal className="a-lead mt-6 max-w-3xl">
          {closes.lead}
        </p>
        <div className="mt-10">
          <Photo id="A5" />
        </div>
        <p data-reveal className="a-body a-callout mt-10 max-w-2xl">
          <Rich text={closes.standard} />
        </p>
        <More>
          <ol className="grid gap-x-12 md:grid-cols-2">
            {closes.items.map((item, i) => (
              <li key={item} className="a-body grid grid-cols-[2.5rem_1fr] border-t a-rule py-5">
                <span className="a-red font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <Rich text={item} />
                </span>
              </li>
            ))}
          </ol>
        </More>
        <p data-reveal className="a-display a-red mt-14 max-w-4xl text-[clamp(2.4rem,5.6vw,4.8rem)]">
          {closes.given}
        </p>
      </Chapter>
    </AsrayaShell>
  );
}
