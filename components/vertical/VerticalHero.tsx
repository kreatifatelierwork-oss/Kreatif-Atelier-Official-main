import Image from "next/image";
import { site } from "@/content/site";
import { verticalsIntro, type Vertical } from "@/content/verticals";
import { Star } from "@/components/ui/Star";

/**
 * Top of a vertical's page. Three looks, chosen by the content file:
 * `cover` (image behind the title), `portrait` (image standing beside it), or type alone.
 */
export function VerticalHero({ vertical, index }: { vertical: Vertical; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const layout = vertical.hero?.layout ?? "type";
  const image = vertical.hero?.image;
  const longName = vertical.name.length > 14;

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-[var(--gutter)] pt-[calc(var(--nav-h)+2rem)] pb-[clamp(2.5rem,7vh,5rem)]"
    >
      {layout === "cover" && image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/55" />
        </>
      )}

      {vertical.logo && (
        <div className="pointer-events-none absolute top-[10svh] right-[var(--gutter)] w-[min(30vw,20rem)]">
          <Image src={vertical.logo.src} alt={vertical.logo.alt} width={vertical.logo.width} height={vertical.logo.height} sizes="(min-width: 1024px) 20rem, 60vw" className="h-auto w-full" />
        </div>
      )}

      {layout === "type" && !vertical.logo && (
        <p
          aria-hidden="true"
          className="display outline-numeral pointer-events-none absolute top-[12svh] right-[var(--gutter)] text-[clamp(11rem,34vw,30rem)] leading-none select-none"
        >
          {number}
        </p>
      )}

      <div
        className={`relative mx-auto grid w-full max-w-[1400px] gap-10 ${
          layout === "portrait" ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16" : ""
        }`}
      >
        {layout === "portrait" && image && (
          <div
            className="relative mx-auto w-full max-w-[22rem] lg:order-2 lg:max-w-none"
            style={vertical.hero?.background ? { background: vertical.hero.background } : undefined}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(min-width: 1024px) 38vw, 22rem"
              className="h-[min(52svh,34rem)] w-full object-cover object-top lg:h-[min(78svh,52rem)]"
            />
            <div aria-hidden="true" className="absolute inset-0 border border-cream/15" />
          </div>
        )}

        <div>
          <p className="eyebrow flex flex-wrap items-center gap-3 text-[0.66rem] text-cream-muted">
            <span>{site.name}</span>
            <Star className="text-accent" />
            <span>
              {verticalsIntro.labels.index} {number}
            </span>
          </p>
          <h1
            id="home-heading"
            className={`display mt-6 font-medium text-cream ${
              longName
                ? "text-[clamp(2.9rem,8.4vw,8rem)] leading-[0.95]"
                : "text-[clamp(4rem,15vw,13rem)] leading-[0.86]"
            }`}
          >
            {vertical.name}
          </h1>
          <p className="eyebrow mt-8 text-[0.74rem] text-accent md:text-[0.82rem]">{vertical.tagline}</p>
          {vertical.positioning && <p className="display mt-6 max-w-2xl text-[clamp(1.5rem,2.4vw,2.2rem)] leading-snug text-cream-muted italic">{vertical.positioning}</p>}
        </div>
      </div>
    </section>
  );
}
