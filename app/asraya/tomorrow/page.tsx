import type { Metadata } from "next";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Poster } from "@/components/asraya/kit";
import { asraya, tomorrow } from "@/content/asraya";

export const metadata: Metadata = {
  title: `Tomorrow — ${asraya.name} | Kreatif Atelier`,
  description: `${tomorrow.today.join(` ${asraya.name} `)} ${tomorrow.tomorrow.join(" ")}`,
  alternates: { canonical: "/asraya/tomorrow/" },
};

/** Asraya, part four: where it is heading — six initiatives of its own. */
export default function Page() {
  return (
    <AsrayaShell>
      {/* Today / Tomorrow */}
      <Poster tone="kraft" labelledBy="home-heading">
        <p className="a-wide a-accent">{tomorrow.eyebrow}</p>
        <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
          <h1 id="home-heading">
            <span className="a-display a-accent block text-[clamp(3rem,8vw,7rem)]">{tomorrow.today[0]}</span>
            <span className="a-serif block text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight">
              <span className="a-accent font-bold tracking-[0.04em] uppercase">{asraya.name}</span> {tomorrow.today[1]}
            </span>
            <span className="a-display mt-8 block text-[clamp(3rem,8vw,7rem)]">{tomorrow.tomorrow[0]}</span>
            <span className="a-serif block max-w-3xl text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight">{tomorrow.tomorrow[1]}</span>
          </h1>
          <ul className="a-display flex flex-col gap-2 self-end text-[clamp(1.5rem,2.6vw,2.2rem)] lg:text-right">
            {tomorrow.more.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Poster>

      {/* What we are building towards */}
      <Poster tone="paper" labelledBy="towards-heading">
        <h2 id="towards-heading" data-reveal className="a-display a-accent max-w-3xl text-[clamp(2.8rem,7vw,6rem)]">
          {tomorrow.title}
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden border a-rule bg-[color:var(--a-rule)] md:grid-cols-2">
          {tomorrow.initiatives.map((initiative, i) => (
            <li key={initiative.title} className="bg-[color:var(--a-bg)] p-8 md:p-10">
              <div data-reveal>
                <span aria-hidden="true" className="a-display a-accent block text-[clamp(3.4rem,6vw,5rem)] leading-[0.8]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="a-display mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)]">{initiative.title}</h3>
                <p className="a-body mt-4">{initiative.body}</p>
                <p className="a-wide a-accent mt-6">{tomorrow.areasLabel}</p>
                <ul className="a-serif mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[1.15rem] font-bold">
                  {initiative.areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
                {"note" in initiative && <p className="a-serif mt-5 text-[1.3rem] leading-snug italic">{initiative.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Poster>

      {/* But it starts with you */}
      <Poster tone="oxblood" labelledBy="starts-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <p data-reveal className="a-serif text-[clamp(1.9rem,3.8vw,3.2rem)] leading-tight">
            {tomorrow.every.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="self-end lg:text-right">
            <h2 id="starts-heading" data-reveal className="a-display a-accent text-[clamp(3rem,7.6vw,6.6rem)]">
              {tomorrow.starts}
            </h2>
            <p data-reveal className="a-body mt-6 lg:ml-auto lg:max-w-md">
              {tomorrow.found}
            </p>
          </div>
        </div>
      </Poster>
    </AsrayaShell>
  );
}
