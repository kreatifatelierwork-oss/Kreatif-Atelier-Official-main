import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AsrayaShell } from "@/components/asraya/AsrayaShell";
import { Network } from "@/components/asraya/graphics";
import { Amplify, Gift, ServiceIcon, Spotlight, Sunrise, Together, Toolkit, type IconName } from "@/components/asraya/illustrations";
import { Band, Tags } from "@/components/asraya/kit";
import { Button } from "@/components/ui/Button";
import { asraya, home, visibility } from "@/content/asraya";

export const metadata: Metadata = { ...asraya.meta, alternates: { canonical: "/asraya/" } };

const { free, services, outcomes, network, steps, explore } = home;
const outcome = (title: string) => visibility.items.find((item) => item.title === title)!;
const exploreArt = { toolkit: Toolkit, together: Together, sunrise: Sunrise } as const;

/**
 * Asraya's main page: premium marketing, free for NGOs. The cover, the offer, what an NGO gets, why it matters,
 * the gap it closes, how it works, and the way into the other three pages.
 */
export default function Page() {
  return (
    <AsrayaShell next={asraya.nav[1]} network={false}>
      {/* Cover: the wordmark and promise in their own column, the jigsaw of portraits in the other — no overlap. */}
      <header className="grid items-center gap-x-12 gap-y-10 pt-[clamp(2.5rem,6vh,4rem)] pb-[clamp(3.5rem,9vh,6rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <p className="a-wide a-red">{asraya.aegis}</p>
          <h1 id="home-heading" className="a-wordmark mt-5 text-[clamp(4.6rem,19vw,8.6rem)] lg:text-[clamp(5rem,8.4vw,8.6rem)]">
            {asraya.wordmark}
          </h1>
          <p className="a-display mt-8 max-w-md text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.08]">{asraya.promise}</p>
          <p className="a-wide a-faint mt-5">{asraya.tagline}</p>
          <div className="mt-9">
            <Button href={asraya.cta.href}>{asraya.cta.button}</Button>
          </div>
        </div>
        <div data-a-parallax="22">
          <Image
            src={asraya.cover.src}
            alt={asraya.cover.alt}
            width={asraya.cover.width}
            height={asraya.cover.height}
            priority
            decoding="sync"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="a-cover__collage"
          />
        </div>
      </header>

      {/* The offer */}
      <Band deep labelledBy="free-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="a-wide a-red">{free.label}</p>
            <h2 id="free-heading" data-reveal className="a-display a-h2 mt-5">
              {free.title[0]} <span className="a-em block">{free.title[1]}</span>
            </h2>
            <p data-a-words className="a-lead mt-8 max-w-2xl !text-[clamp(1.5rem,2.5vw,2.2rem)]">
              {free.statement}
            </p>
            <Tags items={free.points} className="mt-9" />
          </div>
          <Gift className="mx-auto max-w-[26rem]" />
        </div>
      </Band>

      {/* What you get */}
      <Band labelledBy="services-heading">
        <p className="a-wide a-red">{services.label}</p>
        <h2 id="services-heading" data-reveal className="a-display a-h2 mt-5 max-w-4xl">
          {services.title[0]} <span className="a-em">{services.title[1]}</span>
        </h2>
        <p data-reveal className="a-lead mt-6 max-w-3xl">
          {services.lead}
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((item) => (
            <li key={item.title} data-reveal className="a-card">
              <ServiceIcon name={item.icon as IconName} />
              <h3 className="a-title mt-5">{item.title}</h3>
              <p className="a-body mt-2 !text-[1rem] !leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-10">
          <Button href={services.link.href}>{services.link.label}</Button>
        </div>
      </Band>

      {/* Why it matters: better funding, better reach */}
      <Band labelledBy="outcomes-heading" className="!pt-0">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <p className="a-wide a-red">{outcomes.label}</p>
            <h2 id="outcomes-heading" data-reveal className="a-display a-h2 mt-5">
              {outcomes.funding.title}. <span className="a-em">{outcomes.reach.title}.</span>
            </h2>
          </div>
          <Spotlight className="mx-auto max-w-[24rem]" />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[outcomes.funding, outcomes.reach].map((group, g) => (
            <div key={group.title} data-reveal className={`a-card ${g === 0 ? "a-band--deep" : ""}`}>
              <h3 className="a-display text-[clamp(1.7rem,2.6vw,2.2rem)]">{group.title}</h3>
              <dl className="mt-6 grid gap-5">
                {group.items.map((title) => (
                  <div key={title} className="border-t a-rule pt-4">
                    <dt className="a-title">{title}</dt>
                    <dd className="a-body mt-1 !text-[1rem]">{outcome(title).body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p data-reveal className="a-quote mt-14 max-w-3xl">
          {outcomes.close}
        </p>
      </Band>

      {/* The gap we close: organisations working alone, drawn into one network as you scroll */}
      <Band deep labelledBy="network-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
          <div>
            <p className="a-wide a-red">{network.label}</p>
            <h2 id="network-heading" data-a-words className="a-display a-h2 mt-5">
              {network.line}
            </h2>
          </div>
          <Amplify className="mx-auto max-w-[22rem]" />
        </div>
        <div className="mt-12">
          <Network state="joined" />
        </div>
        <p data-reveal className="a-quote mt-10 max-w-3xl">
          {network.close}
        </p>
      </Band>

      {/* How it works */}
      <Band labelledBy="steps-heading">
        <p className="a-wide a-red">{steps.label}</p>
        <h2 id="steps-heading" data-reveal className="a-display a-h2 mt-5">
          {steps.title}
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.items.map((step) => (
            <li key={step.title} data-reveal className="a-card">
              <ServiceIcon name={step.icon as IconName} />
              <h3 className="a-display mt-5 text-[clamp(1.5rem,2.2vw,1.9rem)]">{step.title}</h3>
              <p className="a-body mt-3 !text-[1rem]">{step.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* More about Asraya */}
      <Band labelledBy="explore-heading" className="!pt-0">
        <h2 id="explore-heading" className="a-wide a-red">
          {explore.label}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {explore.items.map((item) => {
            const Art = exploreArt[item.art];
            return (
              <li key={item.href} data-reveal>
                <Link href={item.href} className="a-card group h-full">
                  <Art className="mx-auto max-w-[15rem]" />
                  <span className="a-display mt-6 flex items-baseline justify-between gap-4 text-[clamp(1.6rem,2.4vw,2rem)]">
                    {item.title}
                    <span aria-hidden="true" className="a-red transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                  <span className="a-body mt-2 block !text-[1rem]">{item.body}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Band>
    </AsrayaShell>
  );
}
