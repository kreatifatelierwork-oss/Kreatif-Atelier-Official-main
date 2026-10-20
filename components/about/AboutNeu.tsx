"use client";

import Image from "next/image";
import { useState } from "react";
import { NeuButton } from "@/components/design/NeuButton";
import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { Dialog } from "@/components/ui/Dialog";
import { founders, foundersIntro } from "@/content/founders";
import { vision } from "@/content/front";
import { parent } from "@/content/home";
import { aboutKaPage } from "@/content/pages";
import { ecosystem } from "@/content/verticals";
import { ScrollDrift } from "./ScrollDrift";

/**
 * The About page's sections on the Aurelius neumorphic system (owner, 2026-10-21: the same design language as the
 * rest of the site). Copy is unchanged (content/front.ts, content/verticals.ts, content/founders.ts, content/home.ts).
 */

/** The opening: a large raised card that settles in, then drifts up as the page scrolls on. */
export function AboutHeroNeu() {
  return (
    <section id="home" aria-labelledby="home-heading" className="px-[var(--ds-gutter)] pt-[calc(var(--nav-h)+var(--ds-space-8))] pb-[var(--ds-space-7)]">
      <ScrollDrift className="mx-auto w-full max-w-[var(--ds-max-width)]">
        <div className="ds-enter neu-card grid gap-[var(--ds-space-7)] p-[var(--ds-space-7)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-[var(--ds-space-9)] lg:p-[var(--ds-space-9)]">
          <div>
            <p className="ds-label">{aboutKaPage.eyebrow.join(" · ")}</p>
            <h1 id="home-heading" className="ds-display mt-[var(--ds-space-4)] uppercase">
              {parent.line.join(". ")}.
            </h1>
          </div>
          <div className="flex flex-col gap-[var(--ds-space-6)]">
            <p className="ds-emphasis text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-text">{parent.body}</p>
            <div className="flex flex-wrap gap-[var(--ds-space-3)]">
              <NeuButton href="#ventures" variant="primary">
                {aboutKaPage.ventures}
              </NeuButton>
              <NeuButton href="/contact">{aboutKaPage.contact}</NeuButton>
            </div>
          </div>
        </div>
      </ScrollDrift>
    </section>
  );
}

/** Vision: the headline and body in a raised card, the three principles as chips. */
export function VisionNeu() {
  const id = `${vision.id}-heading`;
  return (
    <Section id={vision.id} labelledBy={id}>
      <div data-reveal className="neu-card grid gap-[var(--ds-space-6)] p-[var(--ds-space-7)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--ds-space-8)] lg:p-[var(--ds-space-8)]">
        <SectionHeader id={id} label={vision.marker} headline={vision.headline} />
        <div className="flex flex-col gap-[var(--ds-space-5)]">
          <p className="ds-body text-[length:var(--ds-text-lg)]">{vision.body}</p>
          <ul className="flex flex-wrap gap-[var(--ds-space-2)]">
            {vision.principles.map((p) => (
              <li key={p} className="neu-chip">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** Who the ecosystem serves and the impact it works toward: each item its own small raised tile, then the closing line. */
export function ReachNeu() {
  const id = `${ecosystem.id}-heading`;
  return (
    <Section id={ecosystem.id} labelledBy={id}>
      <div className="grid gap-[var(--ds-space-7)] lg:grid-cols-2">
        {[ecosystem.serves, ecosystem.impact].map((group) => (
          <div key={group.label}>
            <p data-reveal className="ds-label">
              {group.label}
            </p>
            <ul className="mt-[var(--ds-space-4)] grid grid-cols-2 gap-[var(--ds-space-3)] sm:grid-cols-3">
              {group.items.map((item) => (
                <li key={item} data-reveal className="neu-card flex min-h-[5.5rem] items-end p-[var(--ds-space-4)] font-ds-accent text-[length:var(--ds-text-xl)] leading-tight text-ds-text">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h2 id={id} data-reveal className="ds-heading mx-auto mt-[var(--ds-space-9)] max-w-4xl text-center">
        {ecosystem.closing.lead} <span className="ds-emphasis block text-ds-muted">{ecosystem.closing.emphasis}</span>
      </h2>
    </Section>
  );
}

/** The founders as raised cards with their portraits in an inset frame; a card opens the full bio. */
export function FoundersNeu() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = founders.find((f) => f.slug === openSlug) ?? null;
  const [shown, setShown] = useState(open);
  if (open && open !== shown) setShown(open);
  const id = `${foundersIntro.id}-heading`;
  return (
    <Section id={foundersIntro.id} labelledBy={id}>
      <SectionHeader id={id} label={foundersIntro.kicker} headline={foundersIntro.headline} />
      <ul className="mt-[var(--ds-space-7)] grid grid-cols-2 gap-[var(--ds-space-5)] lg:grid-cols-4">
        {founders.map((f) => (
          <li key={f.slug} data-reveal className="flex">
            <button type="button" aria-haspopup="dialog" onClick={() => setOpenSlug(f.slug)} className="about-founder neu-card group w-full p-[var(--ds-space-3)] text-left">
              <span className="block overflow-hidden rounded-[var(--ds-radius-md)] shadow-[var(--neu-pressed-sm)]">
                <Image src={f.image} alt="" width={f.imageWidth} height={f.imageHeight} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-square w-full object-cover transition-transform duration-[var(--ds-dur-slow)] ease-[var(--ds-ease-out)] group-hover:scale-[1.03]" />
              </span>
              <span className="block px-[var(--ds-space-2)] pt-[var(--ds-space-4)] pb-[var(--ds-space-2)]">
                <span className="block font-ds-accent text-[length:var(--ds-text-xl)] leading-tight font-semibold text-ds-text">{f.name}</span>
                <span className="ds-label mt-[var(--ds-space-1)] block">{f.role}</span>
                <span className="sr-only">{foundersIntro.openBio(f.name)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onClose={() => setOpenSlug(null)} labelledBy="founder-dialog-title">
        {shown && (
          <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <Image src={shown.image} alt={shown.name} width={shown.imageWidth} height={shown.imageHeight} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-square h-full w-full object-cover" />
            <div className="flex flex-col justify-center p-[var(--ds-space-7)]">
              <p className="ds-label">{foundersIntro.kicker}</p>
              <h2 id="founder-dialog-title" className="ds-heading mt-[var(--ds-space-3)]">
                {shown.name}
              </h2>
              <p className="ds-emphasis mt-[var(--ds-space-2)] text-[length:var(--ds-text-xl)] text-ds-muted">{shown.roleFull}</p>
              <p className="ds-body mt-[var(--ds-space-5)]">{shown.bio}</p>
            </div>
          </div>
        )}
      </Dialog>
    </Section>
  );
}
