import type { Metadata } from "next";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Art, Poster, Rich } from "@/components/asraya/kit";
import { asraya, build } from "@/content/asraya";

export const metadata: Metadata = {
  title: `What we build — ${asraya.name} | Kreatif Atelier`,
  description: build.lead,
  alternates: { canonical: "/asraya/what-we-build/" },
};

const itemTitle = "a-display text-[clamp(1.6rem,2.6vw,2.2rem)]";

/** Asraya, part two: everything it builds for an NGO, practice by practice. */
export default function Page() {
  const { digital, reach, story, seen, moments, anything } = build;

  return (
    <AsrayaShell next={asraya.nav[2]}>
      {/* NGO branding & profiling */}
      <Poster tone="oxblood" labelledBy="home-heading">
        <p className="a-wide a-accent">{build.eyebrow}</p>
        <h1 id="home-heading" className="a-display mt-6 text-[clamp(3.4rem,10.5vw,9rem)]">
          {build.title[0]}
          <span className="block">{build.title[1]}</span>
        </h1>
        <p className="a-serif mt-10 max-w-3xl border-t a-rule pt-8 text-[clamp(1.9rem,3.8vw,3.2rem)]">{build.lead}</p>
      </Poster>

      <Poster tone="kraft">
        <ol className="grid gap-x-14 gap-y-12 lg:grid-cols-3">
          {build.brand.map((item, i) => (
            <li key={item.title} data-reveal className="border-t-2 border-[color:var(--a-accent)] pt-6">
              <span className="a-wide a-accent">{String(i + 1).padStart(2, "0")}</span>
              <h2 className={`${itemTitle} a-accent mt-3`}>{item.title}</h2>
              <p className="a-body mt-4">{item.body}</p>
            </li>
          ))}
        </ol>
      </Poster>

      {/* Enter the digital realm */}
      <Poster tone="oxblood" labelledBy="digital-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 id="digital-heading" data-reveal className="a-display text-[clamp(3rem,8vw,7rem)]">
            {digital.title[0]}
            <span className="block">{digital.title[1]}</span>
          </h2>
          <div data-reveal>
            <p aria-hidden="true" className="a-body inline-flex min-w-[15rem] items-center justify-between gap-6 rounded-full bg-[color:var(--a-fg)] px-5 py-2.5 text-[0.95rem] !text-[color:var(--a-bg)]">
              {digital.search}
              <span>⌕</span>
            </p>
            <p className="a-serif mt-6 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">{digital.lead}</p>
          </div>
        </div>
        <Art name="door" blend="lighten" sizes="(min-width: 1024px) 46vw, 100vw" className="a-art--soft mx-auto mt-12 max-w-[40rem]" />
        <ul className="mt-12 grid gap-x-14 gap-y-12 border-t a-rule pt-12 md:grid-cols-2">
          {digital.items.map((item) => (
            <li key={item.title} data-reveal>
              <h3 className={itemTitle}>{item.title}</h3>
              {"sub" in item && <p className="a-wide a-accent mt-2">{item.sub}</p>}
              <p className="a-body mt-4 max-w-xl">{item.body}</p>
            </li>
          ))}
        </ul>
      </Poster>

      {/* Brand up, stand out */}
      <Poster tone="paper" labelledBy="reach-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="reach-heading" data-reveal className="a-display text-[clamp(3.2rem,9vw,8rem)]">
            {reach.title[0]}
            <span className="a-accent block">{reach.title[1]}</span>
          </h2>
          <p data-reveal className="a-display self-end text-[clamp(1.6rem,3vw,2.5rem)] lg:text-right">
            {reach.lead}
          </p>
        </div>
        <ul className="mt-14 grid gap-x-14 gap-y-12 border-t a-rule pt-12 md:grid-cols-2">
          {reach.items.map((item) => (
            <li key={item.title} data-reveal>
              <h3 className={itemTitle}>{item.title}</h3>
              <p className="a-body mt-4 max-w-xl">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-20 grid gap-10 border-t a-rule pt-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h3 className="a-display text-[clamp(2.2rem,5vw,4.2rem)]">
              {reach.campaign.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <p className="a-wide a-accent mt-4">{reach.campaign.sub}</p>
          </div>
          <div className="self-end">
            <p data-reveal className="a-body max-w-xl">
              {reach.campaign.body}
            </p>
            <p data-reveal className="a-serif mt-6 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">
              {reach.campaign.close}
            </p>
          </div>
        </div>
        <Art name="lion" blend="multiply" sizes="(min-width: 1024px) 44vw, 100vw" className="mx-auto mt-14 max-w-[38rem]" />
      </Poster>

      {/* Your work is a story */}
      <Poster tone="kraft" labelledBy="story-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="story-heading" data-reveal className="a-accent">
              <span className="a-display block text-[clamp(3rem,7.6vw,6.6rem)]">{story.title[0]}</span>
              <span className="a-serif block text-[clamp(3.4rem,9vw,8rem)] uppercase">{story.title[1]}</span>
            </h2>
            <p data-reveal className="a-display mt-6 text-[clamp(1.6rem,3vw,2.5rem)]">
              {story.lead}
            </p>
          </div>
          <p data-reveal className="a-body self-end">
            {story.body}
          </p>
        </div>

        <div className="mt-16 grid gap-10 border-t a-rule pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h3 data-reveal className="a-display a-accent text-[clamp(3rem,7vw,6rem)]">
            {story.press.title}
          </h3>
          <div data-reveal>
            <ul className="a-wide flex flex-wrap gap-x-6 gap-y-2">
              {story.press.list.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
            <p className="a-body mt-5 max-w-xl">{story.press.body}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-12 border-t a-rule pt-12 md:grid-cols-2 lg:grid-cols-3">
          <div data-reveal>
            <h3 className={`${itemTitle} a-accent`}>{story.recognition.title}</h3>
            <p className="a-body mt-4">{story.recognition.body}</p>
          </div>
          <div data-reveal>
            <h3 className={`${itemTitle} a-accent`}>{story.recognition.wrongTitle}</h3>
            <p className="a-body mt-4">{story.recognition.wrong}</p>
          </div>
          <div data-reveal>
            <p className="a-body">{story.recognition.grants}</p>
            <p className="a-display a-accent mt-4 text-[clamp(4rem,9vw,7.5rem)] leading-[0.85]">{story.recognition.weDo}</p>
          </div>
        </div>
        <p data-reveal className="a-serif a-accent mt-14 max-w-4xl text-[clamp(1.6rem,3vw,2.5rem)] leading-snug font-bold">
          {story.recognition.room}
        </p>
      </Poster>

      {/* The camera's beam, as a band that grows out of the kraft page above it. */}
      <Poster tone="kraft" bleed>
        <Art name="camera" sizes="100vw" className="a-band__wide" />
      </Poster>

      {/* They have to be seen */}
      <Poster tone="paper" labelledBy="seen-heading">
        <div aria-hidden="true" className="a-film mb-12" />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="seen-heading" data-reveal>
            <span className="a-display block max-w-md text-[clamp(1.6rem,3vw,2.5rem)]">{seen.lead}</span>
            <span className="a-serif block text-[clamp(6rem,20vw,17rem)] leading-[0.8] lowercase">{seen.word}</span>
          </h2>
          <p data-reveal className="a-wide self-end lg:text-right">
            {seen.list}
          </p>
        </div>
        <ul className="mt-14 grid gap-x-14 gap-y-12 border-t a-rule pt-12 lg:grid-cols-3">
          {seen.items.map((item) => (
            <li key={item.title} data-reveal>
              <h3 className={itemTitle}>{item.title}</h3>
              <p className="a-body mt-4">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 border-t a-rule pt-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h3 className="a-display text-[clamp(3rem,8vw,7rem)]">
              {seen.alive.title[0]}
              <span className="block">{seen.alive.title[1]}</span>
            </h3>
            <p className="a-body mt-6 max-w-md">{seen.alive.body}</p>
          </div>
          <div data-reveal className="self-end">
            <h3 className={itemTitle}>{seen.alive.photoTitle}</h3>
            <p className="a-body mt-4 max-w-xl">{seen.alive.photo}</p>
            <p className="a-body a-strong mt-4 max-w-xl">{seen.alive.crew}</p>
          </div>
        </div>
        <p data-reveal className="a-display mt-14 text-center text-[clamp(2rem,4.6vw,3.8rem)]">
          {seen.alive.close}
        </p>
        <div aria-hidden="true" className="a-film mt-12" />
      </Poster>

      {/* Some work needs a moment around it */}
      <Poster tone="slate" labelledBy="moments-heading">
        <h2 id="moments-heading" data-reveal className="text-center">
          <span className="a-serif block text-[clamp(3rem,8vw,7rem)] uppercase">{moments.title[0]}</span>
          <span className="a-serif a-accent block text-[clamp(2rem,4.6vw,3.8rem)] italic">{moments.title[1]}</span>
        </h2>
        <ul data-reveal className="a-display mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[clamp(1.3rem,2.4vw,2rem)]">
          {moments.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden="true" className="h-6 w-px bg-current opacity-50" />}
              {tag}
            </li>
          ))}
        </ul>
        <p data-reveal className="a-body mx-auto mt-10 max-w-2xl text-center">
          {moments.body}
        </p>
        <p data-reveal className="a-display mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[clamp(2.2rem,5.6vw,4.8rem)]">
          {moments.reason.lead}
          <span className="a-wide a-accent flex flex-col text-left text-[0.72rem] leading-tight">
            {moments.reason.words.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </span>
          {moments.reason.tail}
        </p>
        <p data-reveal className="a-serif mx-auto mt-6 max-w-2xl text-center text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">
          {moments.give}
        </p>

        <div className="mt-20 grid gap-10 border-t a-rule pt-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h3 className="a-display text-[clamp(2.4rem,5.4vw,4.6rem)]">{moments.planned.title}</h3>
            <p className="a-wide a-accent mt-3">{moments.planned.sub}</p>
            <ul className="a-display mt-8 flex flex-col gap-2 text-[clamp(1.3rem,2.2vw,1.8rem)]">
              {moments.planned.occasions.map((occasion) => (
                <li key={occasion} className="border-t a-rule pt-2">
                  {occasion}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-end">
            <p data-reveal className="a-body">
              {moments.planned.network}
            </p>
            <p data-reveal className="a-display a-accent mt-8 text-[clamp(1.4rem,2.6vw,2.2rem)]">
              {moments.planned.ground}
            </p>
            <p data-reveal className="a-display mt-2 text-[clamp(1.8rem,3.6vw,3rem)]">
              {moments.planned.capture}
            </p>
          </div>
        </div>
        <Art name="offering" blend="lighten" sizes="(min-width: 1024px) 70vw, 100vw" className="a-art--soft mx-auto mt-14 max-w-[60rem]" />
      </Poster>

      {/* Not everything fits into a category */}
      <Poster tone="paper" labelledBy="anything-heading">
        <h2 id="anything-heading" data-reveal className="a-display max-w-5xl text-[clamp(2.4rem,6vw,5rem)]">
          {anything.title}
        </h2>
        <div className="mt-12 grid gap-10 border-t a-rule pt-12 lg:grid-cols-3 lg:gap-14">
          <p data-reveal className="a-serif text-[clamp(1.4rem,2.3vw,1.9rem)] leading-snug [&_strong]:font-bold">
            <Rich text={anything.whatever} />
          </p>
          <p data-reveal className="a-serif text-[clamp(1.4rem,2.3vw,1.9rem)] leading-snug">
            {anything.ask[0]} <span className="a-display a-accent block text-[clamp(2.6rem,5vw,4.2rem)]">{anything.ask[1]}</span>
          </p>
          <p data-reveal className="a-display text-[clamp(1.6rem,2.8vw,2.4rem)]">
            {anything.studio[0]} <span className="a-accent block">{anything.studio[1]}</span>
          </p>
        </div>

        <div className="mt-20 grid gap-10 border-t a-rule pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h3 data-reveal className="a-display text-[clamp(3rem,7.6vw,6.6rem)] lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            {anything.nameIt[0]}
            <span className="a-accent block">{anything.nameIt[1]}</span>
          </h3>
          <dl className="flex flex-col">
            {anything.items.map((item) => (
              <div key={item.title} data-reveal className="border-t a-rule py-6 first:border-t-0 first:pt-0">
                <dt className={itemTitle}>{item.title}</dt>
                <dd className="a-body mt-3">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Poster>
    </AsrayaShell>
  );
}
