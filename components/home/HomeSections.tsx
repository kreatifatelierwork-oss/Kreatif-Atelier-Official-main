import Image from "next/image";
import { aurelius, practiceBySlug, practiceHref, profileArt } from "@/content/aurelius";
import { attention, capabilities, contactCta, measurement, parent, positioning, ventures, work } from "@/content/home";
import { verticals } from "@/content/verticals";
import { Button } from "@/components/ui/Button";
import { Heading, Label } from "@/components/ui/Heading";
import { Placeholder } from "@/components/ui/Placeholder";
import { SmartLink } from "@/components/ui/SmartLink";

const shell = "relative px-[var(--gutter)] py-[clamp(5rem,12vh,9rem)]";
const wrap = "mx-auto w-full max-w-[1280px]";

/** 02 — Why Aurelius exists: the gap between beautiful work and accountable media. */
export function Positioning() {
  return (
    <section id={positioning.id} aria-labelledby={`${positioning.id}-heading`} className={shell}>
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(0,3fr)] lg:gap-14">
          <Heading id={`${positioning.id}-heading`} headline={positioning.headline} />
          <div className="flex flex-col gap-5 lg:pt-3">
            {positioning.body.map((paragraph, i) => (
              <p key={paragraph} data-reveal className={i === 0 ? "display text-[1.7rem] leading-snug" : "text-[1.08rem] leading-[1.8] text-ink/75"}>
                {paragraph}
              </p>
            ))}
          </div>
          <Image
            data-reveal
            src={profileArt.tower.src}
            alt={profileArt.tower.alt}
            width={profileArt.tower.width}
            height={profileArt.tower.height}
            sizes="(min-width: 1024px) 22vw, 60vw"
            className="mx-auto h-auto w-full max-w-[15rem] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}

/** 03 — Six ways in; the full eleven live on the services page. */
export function Capabilities() {
  return (
    <section id={capabilities.id} aria-labelledby={`${capabilities.id}-heading`} className={shell}>
      <div className={wrap}>
        <Label className="text-ink/60">{capabilities.marker}</Label>
        <Heading id={`${capabilities.id}-heading`} headline={capabilities.headline} className="mt-6" />
        <ol className="mt-14 border-t border-ink/15">
          {capabilities.entries.map((entry, i) => {
            const practice = practiceBySlug(entry.slug);
            return (
              <li key={entry.slug} data-reveal className="border-b border-ink/15">
                <SmartLink
                  href={practiceHref(entry.slug)}
                  className="group grid gap-x-10 gap-y-2 py-7 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,5fr)_auto] md:items-baseline"
                >
                  <span className="eyebrow text-[0.64rem] text-ink/50">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-none transition-transform duration-500 group-hover:translate-x-2">
                    {entry.label}
                  </span>
                  <span className="text-[0.98rem] leading-relaxed text-ink/70">{practice?.descriptor}</span>
                  <span aria-hidden="true" className="text-[1.2rem] transition-transform duration-500 group-hover:translate-x-1.5">
                    →
                  </span>
                </SmartLink>
              </li>
            );
          })}
        </ol>
        <div data-reveal className="mt-10">
          <Button href="/aurelius/services" variant="primary">
            {aurelius.labels.allPractices}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** 04 — Own, buy, keep. */
export function Attention() {
  return (
    <section id={attention.id} aria-labelledby={`${attention.id}-heading`} className={shell}>
      <div className={wrap}>
        <Label>{attention.marker}</Label>
        <Heading id={`${attention.id}-heading`} headline={attention.headline} className="mt-6 max-w-5xl text-cream" />
        <p data-reveal className="mt-8 max-w-2xl text-[1.08rem] leading-[1.8] text-cream-muted">
          {attention.body}
        </p>
        <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {attention.modes.map((mode) => (
            <li key={mode.title} className="bg-ink p-9 md:p-11">
              <div data-reveal>
                <h3 className="display text-[clamp(3rem,6vw,5.4rem)] leading-none font-medium text-cream uppercase">{mode.title}</h3>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-cream-muted">{mode.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p data-reveal className="display mt-12 text-[clamp(1.8rem,3.4vw,3rem)] text-cream">
          {attention.closing} <span className="text-cream-muted italic">{attention.kicker}</span>
        </p>
      </div>
    </section>
  );
}

/** 05 — Selected work. Only approved, real work goes here; until then, an honest placeholder. */
export function WorkTeaser() {
  return (
    <section id={work.id} aria-labelledby={`${work.id}-heading`} className={shell}>
      <div className={wrap}>
        <Label>{work.marker}</Label>
        <Heading id={`${work.id}-heading`} headline={work.headline} className="mt-6 text-cream" />
        <div data-reveal className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Placeholder key={i} label={work.placeholder} className="aspect-[4/5]" />
          ))}
        </div>
        <div data-reveal className="mt-10">
          <Button href={work.cta.href}>{work.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}

/** 06 — Measure → understand → redirect. */
export function Measurement() {
  return (
    <section id={measurement.id} aria-labelledby={`${measurement.id}-heading`} className={shell}>
      <div className={wrap}>
        <Label>{measurement.marker}</Label>
        <h2
          id={`${measurement.id}-heading`}
          data-reveal
          className="display mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[clamp(2.4rem,6vw,5.4rem)] font-medium text-cream uppercase"
        >
          {measurement.line.map((word, i) => (
            <span key={word} className="flex items-baseline gap-5">
              {i > 0 && (
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              )}
              {word}
            </span>
          ))}
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-4">
            {measurement.body.map((line) => (
              <p key={line} data-reveal className="display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug text-cream-muted">
                {line}
              </p>
            ))}
            <div data-reveal className="mt-4">
              <Button href={measurement.cta.href}>{measurement.cta.label}</Button>
            </div>
          </div>
          <ol className="border-t border-line">
            {measurement.loop.map((step, i) => (
              <li key={step} data-reveal className="flex items-baseline gap-6 border-b border-line py-5">
                <span className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[1.6rem] text-cream">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 07 — Five ventures, each a real link. Aurelius leads, Asraya follows, the other three stay quiet. */
export function Ventures() {
  const [first, second, ...rest] = [
    ...verticals.filter((v) => v.slug === "aurelius"),
    ...verticals.filter((v) => v.slug === "asraya"),
    ...verticals.filter((v) => v.slug !== "aurelius" && v.slug !== "asraya"),
  ];
  const tile = "group relative flex flex-col justify-between gap-10 border border-line bg-navy/60 p-8 transition-colors hover:border-gold/70 md:p-10";
  const arrow = (
    <span className="eyebrow flex items-center gap-3 text-[0.64rem] text-gold">
      {ventures.explore}
      <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
        →
      </span>
    </span>
  );

  return (
    <section id={ventures.id} aria-labelledby={`${ventures.id}-heading`} className={shell}>
      <div className={wrap}>
        <Label>{ventures.marker}</Label>
        <Heading id={`${ventures.id}-heading`} headline={ventures.headline} className="mt-6 text-cream" />
        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <SmartLink href={`/${first.slug}`} data-reveal className={`${tile} min-h-[24rem]`}>
            <span>
              <span className="eyebrow block text-[0.64rem] text-gold">{first.tagline}</span>
              <span className="display mt-5 block text-[clamp(3rem,7vw,6rem)] leading-none font-medium text-cream">{first.name}</span>
              <span className="display mt-5 block max-w-xl text-[1.5rem] leading-snug text-cream-muted italic">{aurelius.tagline}</span>
            </span>
            {arrow}
          </SmartLink>
          <SmartLink href={`/${second.slug}`} data-reveal className={`${tile} min-h-[24rem]`}>
            <span>
              <span className="eyebrow block text-[0.64rem] text-gold">{second.tagline}</span>
              <span className="display mt-5 block text-[clamp(2.4rem,4.6vw,4rem)] leading-none text-cream">{second.name}</span>
              <span className="mt-5 block text-[1rem] leading-relaxed text-cream-muted">{second.whatWeDo.join(" · ")}</span>
            </span>
            {arrow}
          </SmartLink>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((venture) => (
            <SmartLink key={venture.slug} href={`/${venture.slug}`} data-reveal className={tile}>
              <span>
                {venture.logo && (
                  <Image src={venture.logo.src} alt="" width={venture.logo.width} height={venture.logo.height} sizes="6rem" className="mb-6 h-16 w-auto" />
                )}
                <span className="display block text-[1.9rem] leading-tight text-cream">{venture.name}</span>
                <span className="eyebrow mt-3 block text-[0.6rem] text-cream-faint">{venture.tagline}</span>
              </span>
              {arrow}
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 08 — The parent, in one breath. */
export function ParentContext() {
  return (
    <section id={parent.id} aria-labelledby={`${parent.id}-heading`} className={shell}>
      <div className={`${wrap} grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20`}>
        <div>
          <Label>{parent.marker}</Label>
          <h2 id={`${parent.id}-heading`} data-reveal className="eyebrow mt-6 text-[0.8rem] text-cream">
            {parent.line.join(". ")}.
          </h2>
        </div>
        <div>
          <p data-reveal className="display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-snug text-cream">
            {parent.body}
          </p>
          <div data-reveal className="mt-8">
            <Button href={parent.cta.href}>{parent.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 09 — The closing invitation; also closes every inner page. */
export function ContactCta() {
  return (
    <section id={contactCta.id} aria-labelledby={`${contactCta.id}-heading`} className={shell}>
      <div className={`${wrap} text-center`}>
        <Heading id={`${contactCta.id}-heading`} headline={contactCta.headline} className="mx-auto max-w-4xl text-cream" />
        <p data-reveal className="mx-auto mt-7 max-w-xl text-[1.08rem] leading-relaxed text-cream-muted">
          {contactCta.body}
        </p>
        <div data-reveal className="mt-10 flex justify-center">
          <Button href={contactCta.cta.href} variant="primary">
            {contactCta.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
