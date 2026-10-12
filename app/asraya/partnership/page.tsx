import type { Metadata } from "next";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Art, Body, IsoSteps, Poster, Rich } from "@/components/asraya/kit";
import { asraya, partnership } from "@/content/asraya";

export const metadata: Metadata = {
  title: `Partnership — ${asraya.name} | Kreatif Atelier`,
  description: partnership.model.statement,
  alternates: { canonical: "/asraya/partnership/" },
};

/** Asraya, part three: what it costs, what Asraya changes, what an NGO brings, and how progress is read. */
export default function Page() {
  const { costs, changes, needs, model, measures } = partnership;

  return (
    <AsrayaShell next={asraya.nav[3]}>
      {/* What it normally costs */}
      <Poster tone="navy" labelledBy="home-heading">
        <p className="a-wide a-accent">{partnership.eyebrow}</p>
        <h1 id="home-heading" className="a-serif a-accent mt-6 text-[clamp(3.4rem,10vw,8.5rem)] font-bold">
          {costs.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <dl className="mt-14 grid gap-px overflow-hidden border a-rule bg-[color:var(--a-rule)] md:grid-cols-2">
          {costs.rows.map((row) => (
            <div key={row.label} className="bg-[color:var(--a-bg)] p-8 md:p-10">
              <dt className="a-wide a-accent">{row.label}</dt>
              <dd>
                <span className="a-serif mt-4 block text-[clamp(3rem,7vw,6rem)] font-bold">{row.figure}</span>
                <span className="a-body mt-4 block max-w-md">{row.body}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="a-serif mt-10 max-w-3xl text-[clamp(1.6rem,3vw,2.5rem)] leading-snug">{costs.close}</p>
      </Poster>

      {/* What Asraya changes */}
      <Poster tone="navy" labelledBy="changes-heading" className="!pt-0">
        <div className="grid gap-12 border-t a-rule pt-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="changes-heading" data-reveal className="a-serif a-accent text-[clamp(3rem,8vw,7rem)] font-bold">
              {changes.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p data-reveal className="a-display mt-6 text-[clamp(1.6rem,3vw,2.5rem)]">
              {changes.lead}
            </p>
          </div>
          <div data-reveal className="self-end">
            <p className="a-serif text-[clamp(4rem,11vw,9rem)] leading-[0.85] font-bold">{changes.fee}</p>
            <p className="a-body mt-5 max-w-xl">{changes.feeLine}</p>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {changes.points.map((point) => (
            <li key={point.title} data-reveal className="border-t-2 border-[color:var(--a-accent)] pt-6">
              <h3 className="a-display text-[clamp(1.6rem,2.8vw,2.4rem)]">{point.title}</h3>
              <p className="a-body mt-4">{point.body}</p>
            </li>
          ))}
        </ul>
        <p data-reveal className="a-serif mt-14 max-w-4xl text-[clamp(1.6rem,3vw,2.5rem)] leading-snug">
          {changes.market}
        </p>

        <div className="mt-16 grid gap-10 border-t a-rule pt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <Body paragraphs={changes.presence} />
          <p data-reveal className="a-display a-accent self-end text-[clamp(1.9rem,3.6vw,3rem)] lg:text-right">
            {changes.owe}
          </p>
        </div>
      </Poster>

      {/* What we need from you */}
      <Poster tone="paper" labelledBy="needs-heading" className="!pb-0">
        <h2 id="needs-heading" data-reveal className="a-display a-accent max-w-xl text-[clamp(3rem,8vw,7rem)]">
          {needs.title}
        </h2>
        <ol className="mt-14 grid gap-x-14 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {needs.items.map((item, i) => (
            <li key={item.title} data-reveal>
              <span aria-hidden="true" className="a-display block text-[clamp(4.5rem,8vw,7rem)] leading-[0.8]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="a-serif mt-3 text-[clamp(1.7rem,2.6vw,2.2rem)] uppercase">{item.title}</h3>
              <p className="a-body mt-4">
                <Rich text={item.body} />
              </p>
              {"list" in item && (
                <ul className="a-serif mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[1.15rem] font-bold">
                  {item.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              )}
              {"note" in item && <p className="a-display a-accent mt-4 text-[1.3rem] leading-[1.05]">{item.note}</p>}
            </li>
          ))}
          <li data-reveal className="a-display a-accent self-center text-[clamp(3.4rem,7vw,6rem)]">
            {needs.thatsIt}
          </li>
        </ol>
        <p data-reveal className="mt-16 lg:text-right">
          <span className="a-display block text-[clamp(2.6rem,7vw,6rem)]">{needs.close[0]}</span>
          <span className="a-display block text-[clamp(1.5rem,3.4vw,2.8rem)]">{needs.close[1]}</span>
        </p>
        <IsoSteps heights={[2.4, 4.8, 2.2, 3.4, 1.8, 3.8, 5.6]} className="mt-6 block h-[clamp(11rem,34vw,26rem)] w-full" />
      </Poster>

      {/* The partnership model */}
      <Poster tone="kraft" labelledBy="model-heading" className="!pb-[clamp(1.5rem,4vh,3rem)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="model-heading" data-reveal className="a-display a-accent text-[clamp(3rem,8vw,7rem)] lg:text-right">
            {model.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="a-accent flex flex-col gap-6">
            {model.body.map((paragraph) => (
              <p key={paragraph} data-reveal className="a-serif text-[clamp(1.4rem,2.3vw,1.9rem)] leading-snug font-semibold">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Poster>

      {/* The two hands of the profile, reaching for each other from the edges of the screen. */}
      <Poster tone="kraft" bleed>
        <div className="a-band a-band--pair">
          <Art name="handAsraya" className="a-band__from-left" />
          <Art name="handYou" className="a-band__from-right" />
        </div>
      </Poster>

      <Poster tone="kraft" className="!pt-[clamp(1.5rem,4vh,3rem)]">
        <p data-reveal className="a-display a-accent border-t a-rule pt-10 text-center text-[clamp(1.9rem,4.4vw,3.6rem)]">
          {model.statement}
        </p>
      </Poster>

      {/* What changed because we were here */}
      <Poster tone="blue" labelledBy="measures-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="measures-heading" data-reveal className="a-display a-accent text-[clamp(2.8rem,7vw,6rem)]">
            {measures.title}
          </h2>
          <div className="flex flex-col gap-4 self-end">
            {measures.intro.map((paragraph) => (
              <p key={paragraph} data-reveal className="a-body a-strong font-bold !text-[#151413]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <ul className="mt-14 grid gap-x-14 gap-y-12 border-t a-rule pt-12 md:grid-cols-2 lg:grid-cols-3">
          {measures.items.map((item) => (
            <li key={item.title} data-reveal>
              <h3 className="a-display flex items-end gap-3 text-[clamp(1.8rem,2.8vw,2.4rem)] text-[#151413]">
                <span aria-hidden="true" className="text-[3.2rem] leading-[0.9] font-normal normal-case">
                  {item.piece}
                </span>
                {item.title}
              </h3>
              <p className="a-serif mt-4 text-[1.45rem] leading-snug">{item.question}</p>
              <ul className="a-serif mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[1.1rem] font-bold">
                {item.list.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Poster>
    </AsrayaShell>
  );
}
