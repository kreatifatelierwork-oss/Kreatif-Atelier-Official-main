import type { Metadata } from "next";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Checklist, Growth, Puzzle, Together } from "@/components/asraya/illustrations";
import { Play } from "@/components/asraya/Play";
import { Body, Chapter, More, PageHead, Photo, Rich, Rows, Tags, WithArt } from "@/components/asraya/kit";
import { asraya, home, partnership, ui } from "@/content/asraya";

export const metadata: Metadata = {
  title: `Partnership — ${asraya.name} | Kreatif Atelier`,
  description: partnership.personalised.body,
  alternates: { canonical: "/asraya/partnership/" },
};

const { personalised, changes, needs, model, measures } = partnership;

/**
 * Asraya, part three, told as a story: how we work together → what we need from you → what changes.
 * No prices, by the owner's instruction: the services are personalised.
 */
export default function Page() {
  const [presenceKey, ...presenceRest] = changes.presence;

  return (
    <AsrayaShell next={asraya.nav[3]}>
      <PageHead label={asraya.name} title={[partnership.eyebrow]} lead={home.free.title.join(" ")} art={
          <Play label={ui.art.together}>
            <Together />
          </Play>
        } />

      {/* 01 Personalised, not packaged */}
      <Chapter id="personalised" n={1} name={personalised.title.join(" ")}>
        <WithArt
          art={
            <Play label={ui.art.puzzle}>
              <Puzzle />
            </Play>
          }
        >
          <h2 id="personalised-heading" data-reveal className="a-display a-h2">
            {personalised.title[0]} <span className="a-em">{personalised.title[1]}</span>
          </h2>
          <p data-reveal className="a-lead mt-6 max-w-3xl">
            {personalised.body}
          </p>
        </WithArt>
        <div className="mt-10">
          <Photo id="C1" className="aspect-[16/9]" />
        </div>
        <p data-reveal className="a-body a-callout mt-10 max-w-2xl">
          <Rich text={presenceKey} />
        </p>
        <More>
          <Body paragraphs={presenceRest} />
        </More>
        <p data-reveal className="a-display a-red mt-12 max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          {changes.owe}
        </p>
      </Chapter>

      {/* 02 What we need from you: seven asks to scan, each opening to its detail. */}
      <Chapter id="needs" n={2} name={needs.title}>
        <WithArt
          art={
            <Play label={ui.art.checklist}>
              <Checklist />
            </Play>
          }
        >
          <h2 id="needs-heading" data-reveal className="a-display a-h2">
            {needs.title}
          </h2>
        </WithArt>
        <Rows items={needs.items} numbered className="mt-10" />
        <div className="mt-10">
          <Photo id="C2" />
        </div>
        <p data-reveal className="a-display a-red mt-12 text-[clamp(2.6rem,5vw,4rem)]">
          {needs.thatsIt}
        </p>
        <p data-reveal className="a-quote mt-4 max-w-3xl">
          {needs.close[0]} <span className="block">{needs.close[1]}</span>
        </p>
      </Chapter>

      {/* 03 The partnership model */}
      <Chapter id="model" n={3} name={model.title.join(" ")}>
        <WithArt
          art={
            <Play label={ui.art.growth}>
              <Growth />
            </Play>
          }
        >
          <h2 id="model-heading" data-reveal className="a-display a-h2">
            {model.title[0]} <span className="a-red">{model.title[1]}</span> {model.title[2]}
          </h2>
          <p data-reveal className="a-quote a-callout mt-8 max-w-3xl">
            {model.statement}
          </p>
        </WithArt>
        <More>
          <Body paragraphs={model.body} />
        </More>
      </Chapter>

      {/* 04 What changed because we were here: six measures as cards. */}
      <Chapter id="measures" n={4} name={measures.title}>
        <h2 id="measures-heading" data-reveal className="a-display a-h2">
          {measures.title}
        </h2>
        <p data-reveal className="a-lead mt-6 max-w-3xl">
          {measures.intro[0]}
        </p>
        <More>
          <Body paragraphs={measures.intro.slice(1)} />
        </More>
        <div className="mt-10">
          <Photo id="C3" className="aspect-[4/5] max-w-md" />
        </div>
        <ul className="mt-10 grid gap-px border border-[color:var(--a-rule)] bg-[color:var(--a-rule)] sm:grid-cols-2 lg:grid-cols-3">
          {measures.items.map((item) => (
            <li key={item.title} data-reveal className="a-measure bg-[color:var(--a-ivory)] p-6 md:p-7">
              <h3 className="a-title flex items-end gap-3">
                <span aria-hidden="true" className="a-measure__piece a-red text-[2.6rem] leading-[0.9] font-normal">
                  {item.piece}
                </span>
                {item.title}
              </h3>
              <p className="a-serif mt-4 text-[1.4rem] leading-snug">{item.question}</p>
              <Tags items={item.list} className="mt-5" />
            </li>
          ))}
        </ul>
      </Chapter>
    </AsrayaShell>
  );
}
