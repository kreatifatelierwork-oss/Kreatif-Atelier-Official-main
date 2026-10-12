import Image from "next/image";
import Link from "next/link";
import { verticals, verticalsIntro, type Vertical } from "@/content/verticals";
import { ContactCta } from "@/components/home/HomeSections";
import { Star } from "@/components/ui/Star";
import { BlockView } from "./Blocks";
import { VerticalHero } from "./VerticalHero";

type Props = {
  vertical: Vertical;
  /** Extra sections that are not plain content blocks (e.g. Aurelius's practice areas), placed after the blocks. */
  children?: React.ReactNode;
};

/** One vertical's page, laid out from its entry in content/verticals.ts. */
export function VerticalPage({ vertical, children }: Props) {
  const index = verticals.indexOf(vertical);
  const { labels } = verticalsIntro;

  return (
    <div style={vertical.accent ? ({ "--accent": vertical.accent } as React.CSSProperties) : undefined}>
      <VerticalHero vertical={vertical} index={index} />

      <section aria-labelledby="what-heading" className="px-[var(--gutter)] py-[clamp(4.5rem,11vh,8.5rem)]">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 id="what-heading" data-reveal className="eyebrow flex items-center gap-3 text-[0.68rem] text-accent">
            <Star className="text-[0.9em]" />
            {labels.whatWeDo}
          </h2>
          <ol className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {vertical.whatWeDo.map((item, i) => (
              <li key={item} data-reveal className="border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <p className="eyebrow text-[0.62rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</p>
                <p className="display mt-4 text-[clamp(1.6rem,2.3vw,2.1rem)] leading-tight text-cream">{item}</p>
              </li>
            ))}
          </ol>

          <div
            className={`mt-[clamp(4.5rem,11vh,8.5rem)] grid items-center gap-12 ${
              vertical.valueImage ? "lg:grid-cols-2 lg:gap-20" : ""
            }`}
          >
            <div>
              <p data-reveal className="eyebrow flex items-center gap-3 text-[0.68rem] text-accent">
                <Star className="text-[0.9em]" />
                {labels.value}
              </p>
              <p data-reveal className="display mt-7 max-w-5xl text-[clamp(2.3rem,5.4vw,4.8rem)] text-cream italic">
                {vertical.value}
              </p>
            </div>
            {vertical.valueImage && (
              <div data-reveal className="relative">
                <Image
                  src={vertical.valueImage.src}
                  alt={vertical.valueImage.alt}
                  width={vertical.valueImage.width}
                  height={vertical.valueImage.height}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="h-auto w-full"
                />
                <div aria-hidden="true" className="absolute inset-0 border border-cream/15" />
              </div>
            )}
          </div>
        </div>
      </section>

      {vertical.about && (
        <section aria-labelledby="about-heading" className="px-[var(--gutter)] py-[clamp(4.5rem,11vh,8.5rem)]">
          <div className="mx-auto grid w-full max-w-[1280px] gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
            <h2 id="about-heading" className="eyebrow flex items-center gap-3 text-[0.68rem] text-accent">
              <Star className="text-[0.9em]" />
              About {vertical.name}
            </h2>
            <div className="flex flex-col gap-6">
              {vertical.about.map((paragraph, i) => (
                <p key={paragraph} data-reveal className={i === 0 ? "display text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-cream" : "text-[1.05rem] leading-[1.8] text-cream-muted"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {vertical.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}

      {children}

      <nav aria-labelledby="others-heading" className="px-[var(--gutter)] py-[clamp(4rem,9vh,7rem)]">
        <div className="mx-auto w-full max-w-[1280px] border-t border-line pt-10">
          <h2 id="others-heading" className="eyebrow text-[0.68rem] text-gold">
            {labels.others}
          </h2>
          <ul className="mt-8 flex flex-col gap-x-10 gap-y-3 md:flex-row md:flex-wrap">
            {verticals.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/${v.slug}`}
                  aria-current={v === vertical ? "page" : undefined}
                  className="display text-[clamp(1.6rem,2.6vw,2.3rem)] text-cream-faint transition-colors hover:text-cream aria-[current=page]:text-cream aria-[current=page]:italic"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <ContactCta />
    </div>
  );
}
