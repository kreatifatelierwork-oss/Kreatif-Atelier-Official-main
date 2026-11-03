import type { Metadata } from "next";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { ChapterIndex } from "@/components/asraya/ChapterIndex";
import { SearchSketch } from "@/components/asraya/graphics";
import { Amplify, Toolkit } from "@/components/asraya/illustrations";
import { Chapter, More, PageHead, Photo, Rich, Rows, Tags } from "@/components/asraya/kit";
import { asraya, build, home } from "@/content/asraya";

export const metadata: Metadata = {
  title: `What we build — ${asraya.name} | Kreatif Atelier`,
  description: build.lead,
  alternates: { canonical: "/asraya/what-we-build/" },
};

const { digital, reach, story, seen, moments, anything } = build;

const chapters = [
  { id: "branding", name: build.title.join(" ") },
  { id: "digital", name: digital.title.join(" ") },
  { id: "reach", name: reach.title.join(" ") },
  { id: "story", name: story.title.join(" ") },
  { id: "seen", name: seen.word.charAt(0).toUpperCase() + seen.word.slice(1) },
  { id: "moments", name: moments.title.join(" ") },
  { id: "anything", name: anything.nameIt.join(" ") },
] as const;

const h3 = "a-display text-[clamp(1.9rem,3.6vw,3rem)]";

/**
 * Asraya, part two, told as a story: how you look → where you're found → who hears → how it's seen → the moments
 * → anything else. Each chapter leads with a picture, a headline and one line; the services are titles that open.
 */
export default function Page() {
  return (
    <AsrayaShell next={asraya.nav[2]}>
      <PageHead label={asraya.name} title={["What we", "build"]} lead={home.services.lead} art={<Toolkit />} />

      <div className="a-has-index">
        <ChapterIndex items={chapters} label={build.eyebrow} />

        {/* 01 How you look */}
        <Chapter id="branding" n={1} name={chapters[0].name} className="!border-t-0">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end md:gap-12">
            <div>
              <h2 id="branding-heading" data-reveal className="a-display a-h2">
                {build.title.join(" ")}
              </h2>
              <p data-reveal className="a-quote mt-6">
                {build.lead}
              </p>
            </div>
            <Photo id="B1" className="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" />
          </div>
          <Rows items={build.brand} numbered className="mt-10" />
        </Chapter>

        {/* 02 Where you're found */}
        <Chapter id="digital" n={2} name={chapters[1].name}>
          <h2 id="digital-heading" data-reveal className="a-display a-h2">
            {digital.title.join(" ")}
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
            <p data-reveal className="a-lead">
              {digital.lead}
            </p>
            <div data-reveal>
              <SearchSketch query={digital.search} />
            </div>
          </div>
          <div className="mt-10">
            <Photo id="B2" />
          </div>
          <Rows items={digital.items} className="mt-10" />
        </Chapter>

        {/* 03 Who hears */}
        <Chapter id="reach" n={3} name={chapters[2].name}>
          <h2 id="reach-heading" data-reveal className="a-display a-h2">
            {reach.title[0]} <span className="a-red">{reach.title[1]}</span>
          </h2>
          <p data-reveal className="a-lead mt-6 max-w-2xl">
            {reach.lead}
          </p>
          <div className="mt-10">
            <Photo id="B3" className="aspect-[16/9]" />
          </div>
          <Rows items={reach.items} className="mt-10" />

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center lg:gap-14">
            <div>
              <h3 data-reveal className="a-quote">
                {reach.campaign.title.join(" ")}
              </h3>
              <p data-reveal className="a-wide a-red mt-4">
                {reach.campaign.sub}
              </p>
              <p data-reveal className="a-lead a-callout mt-8 max-w-xl">
                {reach.campaign.close}
              </p>
              <More>
                <p className="a-body max-w-xl">{reach.campaign.body}</p>
              </More>
            </div>
            <Amplify className="mx-auto max-w-[18rem]" />
          </div>
        </Chapter>

        {/* 04 Your work is a story */}
        <Chapter id="story" n={4} name={chapters[3].name}>
          <h2 id="story-heading" data-reveal className="a-display a-h2">
            {story.title.join(" ")}
          </h2>
          <p data-reveal className="a-quote mt-6">
            {story.lead}
          </p>
          <p data-reveal className="a-body mt-8 max-w-[40rem]">
            {story.body}
          </p>
          <Rows
            items={[
              { title: story.press.title, body: story.press.body, list: story.press.list },
              { title: story.recognition.title, body: story.recognition.body },
              { title: story.recognition.wrongTitle, body: story.recognition.wrong },
            ]}
            className="mt-10"
          />
          <div data-reveal className="a-callout mt-10 max-w-2xl">
            <p className="a-body">{story.recognition.grants}</p>
            <p className="a-display a-red mt-2 text-[clamp(2.2rem,4vw,3.2rem)]">{story.recognition.weDo}</p>
          </div>
          <p data-reveal className="a-lead mt-12 max-w-3xl">
            {story.recognition.room}
          </p>
        </Chapter>

        {/* 05 How it's seen */}
        <Chapter id="seen" n={5} name={chapters[4].name}>
          <h2 id="seen-heading" data-reveal>
            <span className="a-lead block max-w-2xl">{seen.lead}</span>
            <span className="a-display a-red mt-2 block text-[clamp(4.5rem,13vw,10rem)] leading-[0.85]">{seen.word}</span>
          </h2>
          <p data-reveal className="a-wide a-faint mt-6">
            {seen.list}
          </p>
          <div className="mt-10">
            <Photo id="B4" className="aspect-[16/9]" />
          </div>
          <Rows
            items={[...seen.items, { title: seen.alive.photoTitle, body: `${seen.alive.photo} **${seen.alive.crew}**` }]}
            className="mt-10"
          />
          <h3 data-reveal className={`${h3} mt-14`}>
            {seen.alive.title.join(" ")}
          </h3>
          <p data-reveal className="a-body mt-4 max-w-xl">
            {seen.alive.body}
          </p>
          <p data-reveal className="a-quote mt-10 max-w-3xl">
            {seen.alive.close}
          </p>
        </Chapter>

        {/* 06 The moments */}
        <Chapter id="moments" n={6} name={chapters[5].name}>
          <h2 id="moments-heading" data-reveal className="a-display a-h2">
            {moments.title[0]} <span className="a-red">{moments.title[1]}</span>
          </h2>
          <Tags items={moments.tags} className="mt-6" />
          <p data-reveal className="a-quote mt-8 max-w-3xl">
            {moments.reason.lead} <span className="a-red">{`${moments.reason.words[0]}, ${moments.reason.words[1]} ${moments.reason.words[2]}`}</span>{" "}
            {moments.reason.tail}
          </p>
          <div className="mt-10">
            <Photo id="B5" />
          </div>
          <p data-reveal className="a-body mt-8 max-w-[40rem]">
            {moments.body} {moments.give}
          </p>
          <h3 data-reveal className={`${h3} mt-14`}>
            {moments.planned.title}
          </h3>
          <p data-reveal className="a-wide a-red mt-3">
            {moments.planned.sub}
          </p>
          <Tags items={moments.planned.occasions} className="mt-6" />
          <p data-reveal className="a-lead mt-8 max-w-3xl">
            {moments.planned.ground} <span className="a-red">{moments.planned.capture}</span>
          </p>
          <More>
            <p className="a-body max-w-[40rem]">{moments.planned.network}</p>
          </More>
        </Chapter>

        {/* 07 Anything else */}
        <Chapter id="anything" n={7} name={chapters[6].name}>
          <h2 id="anything-heading" data-reveal className="a-display a-h2">
            {anything.nameIt[0]} <span className="a-red">{anything.nameIt[1]}</span>
          </h2>
          <p data-reveal className="a-lead mt-6 max-w-3xl">
            {anything.title}
          </p>
          <p data-reveal className="a-body mt-4 max-w-3xl">
            <Rich text={anything.whatever} />
          </p>
          <Rows items={anything.items} className="mt-10" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <p data-reveal className="a-lead a-callout">
              {anything.ask[0]} <span className="a-red block">{anything.ask[1]}</span>
            </p>
            <p data-reveal className="a-lead a-callout">
              {anything.studio[0]} <span className="a-red block">{anything.studio[1]}</span>
            </p>
          </div>
        </Chapter>
      </div>
    </AsrayaShell>
  );
}
