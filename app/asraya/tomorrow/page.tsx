import type { Metadata } from "next";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Chapter, PageHead, Photo, Rows, Tags, allSupplied } from "@/components/asraya/kit";
import { asraya, tomorrow, type PhotoId } from "@/content/asraya";

export const metadata: Metadata = {
  title: `Tomorrow — ${asraya.name} | Kreatif Atelier`,
  description: `${tomorrow.today.join(` ${asraya.name} `)} ${tomorrow.tomorrow.join(" ")}`,
  alternates: { canonical: "/asraya/tomorrow/" },
};

/** One square photograph per initiative, in order. Shown only once all six are supplied, so the set stays whole. */
const initiativePhotos: readonly PhotoId[] = ["D1", "D2", "D3", "D4", "D5", "D6"];

/** Asraya, part four, told as a story: where it's heading → six initiatives → it starts with you. */
export default function Page() {
  const withPhotos = allSupplied(initiativePhotos);

  return (
    <AsrayaShell>
      <PageHead label={asraya.name} title={tomorrow.eyebrow}>
        {/* Today against tomorrow, either side of a rule. */}
        <div className="mt-12 grid gap-10 border-t border-[color:var(--a-ink)] pt-10 md:grid-cols-2 md:gap-0">
          <p className="md:pr-10">
            <span className="a-display a-faint block text-[clamp(2.4rem,5vw,4rem)]">{tomorrow.today[0]}</span>
            <span className="a-lead mt-3 block">
              {asraya.name} {tomorrow.today[1]}
            </span>
          </p>
          <p className="md:border-l md:border-[color:var(--a-ink)] md:pl-10">
            <span className="a-display a-red block text-[clamp(2.4rem,5vw,4rem)]">{tomorrow.tomorrow[0]}</span>
            <span className="a-lead mt-3 block">{tomorrow.tomorrow[1]}</span>
          </p>
        </div>
        <ul className="a-wide mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {tomorrow.more.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </PageHead>

      {/* 01 What we are building towards: six initiatives, each opening to its areas. */}
      <Chapter id="towards" n={1} name={tomorrow.title}>
        <h2 id="towards-heading" data-reveal className="a-display a-h2">
          {tomorrow.title}
        </h2>
        {withPhotos ? (
          <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {tomorrow.initiatives.map((initiative, i) => (
              <li key={initiative.title} data-reveal>
                <Photo id={initiativePhotos[i]} className="aspect-square" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw" />
                <h3 className="a-title mt-4 flex gap-3">
                  <span className="a-red tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {initiative.title}
                </h3>
                <p className="a-body mt-2">{initiative.body}</p>
                <Tags items={initiative.areas} className="mt-4" />
                {"note" in initiative && <p className="a-serif mt-4 text-[1.3rem] leading-snug italic">{initiative.note}</p>}
              </li>
            ))}
          </ol>
        ) : (
          <Rows
            items={tomorrow.initiatives.map((initiative) => ({ ...initiative, listLabel: tomorrow.areasLabel, list: initiative.areas }))}
            numbered
            className="mt-10"
          />
        )}
      </Chapter>

      {/* 02 But it starts with you */}
      <Chapter id="starts" n={2} name={tomorrow.starts}>
        <p data-reveal className="a-quote max-w-3xl">
          {tomorrow.every.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p data-reveal className="a-body mt-8 max-w-xl">
          {tomorrow.found}
        </p>
        <h2 id="starts-heading" data-reveal className="a-display a-h2 a-red mt-10">
          {tomorrow.starts}
        </h2>
      </Chapter>
    </AsrayaShell>
  );
}
