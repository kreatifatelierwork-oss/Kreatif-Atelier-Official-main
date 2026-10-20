import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { aurelius, ourServices, pillarHref, pillarServiceCount } from "@/content/aurelius";

/**
 * "Our Services": four pillars over the owner's artwork — the Colosseum with the large red 01–04
 * behind it. From the `lg` width up the heading, the four pillars and the artwork share one screen:
 * the copy takes what it needs and the artwork fills the rest, starting at its numerals. Below that
 * the pillars stack and the artwork follows whole. Each pillar's button opens the services index on
 * its share of the catalogue; the button beside the heading opens all of it.
 *
 * `lightBlock` marks it as the page's light section (the magnetic step lands on it); leave it off
 * when the section already sits inside one.
 */
export function PillarsSection({ lightBlock = false }: { lightBlock?: boolean }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      data-light-block={lightBlock ? "" : undefined}
      className="classic on-light relative flex flex-col overflow-hidden bg-[#f5f4ed] pt-[clamp(5rem,11vh,6.5rem)] text-ink lg:h-[100svh] lg:min-h-[680px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[calc(1280px+2*var(--gutter))] shrink-0 px-[var(--gutter)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <h2 id="services-heading" data-reveal className="display text-[clamp(2.6rem,4.4vw,4.2rem)] leading-none font-bold">
            {ourServices.label}
          </h2>
          <div data-reveal>
            <Button href="/aurelius/services" variant="primary" className="!px-5 !py-3 !text-[0.62rem]">
              {aurelius.labels.allServices}
            </Button>
          </div>
        </div>

        <ol className="mt-10 grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:mt-8 lg:grid-cols-4 lg:gap-x-0">
          {ourServices.items.map((item, i) => (
            <li
              key={item.id}
              data-reveal
              className="flex flex-col px-0 lg:px-7 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-dashed lg:[&:not(:first-child)]:border-ember/60"
            >
              <span className="eyebrow inline-flex h-7 w-9 items-center justify-center bg-ember text-[0.66rem] font-semibold text-cream">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-[clamp(1.45rem,1.9vw,1.75rem)] leading-[1.08] font-bold">{item.title}</h3>
              <p className="mt-3 max-w-[22rem] text-[0.9rem] leading-[1.6] text-ink/75">{item.body}</p>
              <span aria-hidden="true" className="mt-4 block h-px w-12 bg-ember" />
              <ul className="eyebrow mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.58rem] text-ink/70">
                {item.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <Button href={pillarHref(item.id)} className="!px-4 !py-2.5 !text-[0.58rem]">
                  {pillarServiceCount(item.id)} {aurelius.labels.pillarServices}
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* The artwork's top third is empty sky, the same colour as the section, so it is tucked away:
          the picture starts at its numerals and runs down for as much of the screen as is left. */}
      <div className="relative mt-8 min-h-0 overflow-hidden lg:mt-6 lg:flex-1">
        <Image
          src={ourServices.image.src}
          alt={ourServices.image.alt}
          width={ourServices.image.width}
          height={ourServices.image.height}
          loading="eager"
          decoding="sync"
          sizes="100vw"
          aria-hidden="true"
          className="pointer-events-none -mt-[24.5%] block h-auto w-full"
        />
      </div>
    </section>
  );
}
