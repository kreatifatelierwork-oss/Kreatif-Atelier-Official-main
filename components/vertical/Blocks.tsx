import Image from "next/image";
import type { Block } from "@/content/verticals";
import type { SplitHeadline } from "@/content/types";
import { Star } from "@/components/ui/Star";

const shell = "px-[var(--gutter)] py-[clamp(4.5rem,11vh,8.5rem)]";
const inner = "mx-auto w-full max-w-[1280px]";

function Label({ children }: { children: string }) {
  return (
    <p data-reveal className="eyebrow flex items-center gap-3 text-[0.68rem] text-accent">
      <Star className="text-[0.9em]" />
      {children}
    </p>
  );
}

function Headline({ headline, className = "" }: { headline: SplitHeadline; className?: string }) {
  return (
    <h2 data-reveal-lines className={`display text-[clamp(2.1rem,4.6vw,4rem)] text-cream ${className}`}>
      {headline.lead} <span className="block text-accent italic">{headline.emphasis}</span>
    </h2>
  );
}

/** Renders one editorial block from a vertical's content. New kinds are added here and in content/verticals.ts. */
export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return (
        <section className={shell}>
          <div className={`${inner} grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20`}>
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
              {block.label && <Label>{block.label}</Label>}
              {block.headline && <Headline headline={block.headline} className={block.label ? "mt-6" : ""} />}
            </div>
            <div className="flex flex-col gap-6">
              {block.body.map((paragraph) => (
                <p key={paragraph} data-reveal className="text-[1.08rem] leading-[1.8] text-cream-muted first:text-[1.3rem] first:leading-[1.6] first:text-cream">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      );

    case "list":
      return (
        <section className={shell}>
          <div className={`${inner} border-t border-line pt-12`}>
            <div className="max-w-4xl">
              {block.label && <Label>{block.label}</Label>}
              {block.headline && <Headline headline={block.headline} className={block.label ? "mt-6" : ""} />}
              {block.intro && (
                <p data-reveal className="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-cream-muted">
                  {block.intro}
                </p>
              )}
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {block.items.map((item, i) => (
                <li key={item.title} className="bg-ink p-8 md:p-9">
                  <div data-reveal>
                    <p className="eyebrow text-[0.62rem] text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display mt-4 text-[1.75rem] leading-tight text-cream">{item.title}</h3>
                    {item.body && <p className="mt-4 text-[0.98rem] leading-relaxed text-cream-muted">{item.body}</p>}
                  </div>
                </li>
              ))}
            </ol>
            {block.footnote && (
              <p data-reveal className="display mt-12 max-w-3xl text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-cream italic">
                {block.footnote}
              </p>
            )}
          </div>
        </section>
      );

    case "statement":
      return (
        <section className={shell}>
          <div className={`${inner} text-center`}>
            {block.label && (
              <div className="flex justify-center">
                <Label>{block.label}</Label>
              </div>
            )}
            <p
              data-reveal
              className={`display mx-auto max-w-5xl text-[clamp(2.2rem,5.6vw,5rem)] text-cream ${block.label ? "mt-8" : ""}`}
            >
              {block.lead} {block.emphasis && <span className="block text-accent italic">{block.emphasis}</span>}
            </p>
          </div>
        </section>
      );

    case "feature":
      return (
        <section className={shell}>
          <div className={`${inner} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <div data-reveal className={`relative ${block.flip ? "lg:order-2" : ""}`}>
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="h-auto w-full"
              />
              <div aria-hidden="true" className="absolute inset-0 border border-cream/15" />
            </div>
            <div>
              {block.label && <Label>{block.label}</Label>}
              {block.headline && <Headline headline={block.headline} className={block.label ? "mt-6" : ""} />}
              {block.body?.map((paragraph) => (
                <p key={paragraph} data-reveal className="mt-6 max-w-xl text-[1.08rem] leading-[1.8] text-cream-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      );

    case "poster":
      return (
        <section className={shell}>
          <figure className={`${inner} flex flex-col items-center`}>
            {block.label && <Label>{block.label}</Label>}
            <div data-reveal className={`relative w-full max-w-[30rem] ${block.label ? "mt-8" : ""}`}>
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes="(min-width: 640px) 30rem, 92vw"
                className="h-auto w-full"
              />
              <div aria-hidden="true" className="absolute inset-0 border border-cream/15" />
            </div>
            {block.caption && <figcaption className="eyebrow mt-6 text-[0.64rem] text-cream-faint">{block.caption}</figcaption>}
          </figure>
        </section>
      );
  }
}
