import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryMotion } from "@/components/story/StoryMotion";
import { Button } from "@/components/ui/Button";
import { valora } from "@/content/valora";
import { Launch } from "./art";
import { Play } from "./kit";
import { ValoraNav } from "./ValoraNav";

type Props = {
  children: React.ReactNode;
  /** The Valora page that follows this one, offered after the closing section. */
  next?: { label: string; href: string };
  /** The closing call; off on the chapter radar, which runs to the footer on its own. */
  cta?: boolean;
  /** Full width (the chapter radar keeps its own layout) instead of the centred column. */
  wide?: boolean;
};

/**
 * Frame for every Valora page: the site header and footer, the Valora masthead and its four pages, the page, and the
 * closing call ("Imagine a network where every campus becomes a launchpad.") beside the launchpad drawing. Night and gold.
 */
export function ValoraShell({ children, next, cta = true, wide = false }: Props) {
  return (
    <PageShell>
      <div id="home" className="valora">
        <ValoraNav />
        {wide ? children : <div className="a-wrap">{children}</div>}

        {cta && (
          <section aria-labelledby="valora-cta" className="a-band a-bleed v-band--panel mt-[clamp(3rem,8vh,5rem)]">
            <div className="a-wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div>
                <h2 id="valora-cta" data-reveal className="a-display text-[clamp(2.4rem,5.4vw,4.6rem)]">
                  {valora.cta.lead} <span className="a-em">{valora.cta.emphasis}</span>
                </h2>
                <p data-reveal className="v-wordmark mt-8 text-[clamp(1.8rem,3vw,2.4rem)]">
                  {valora.wordmark}
                </p>
                <p data-reveal className="a-wide a-faint mt-3">
                  {valora.tagline}
                </p>
                <div data-reveal className="mt-10 flex flex-wrap gap-4">
                  <Button href={valora.cta.href} variant="primary">
                    {valora.cta.button}
                  </Button>
                  <Button href="/valora/chapters">{valora.radarCta}</Button>
                </div>
              </div>
              <Play label={valora.ui.art.launch} className="mx-auto max-w-[26rem]">
                <Launch />
              </Play>
            </div>
          </section>
        )}

        {next && (
          <div className="a-wrap pt-[clamp(2.5rem,6vh,4rem)]">
            <Link
              href={next.href}
              className="group flex items-baseline justify-between gap-6 border-y border-[color:var(--a-rule)] py-7 transition-colors hover:text-[color:var(--a-accent)]"
            >
              <span className="a-wide a-faint">{valora.next}</span>
              <span className="a-display flex items-baseline gap-4 text-[clamp(1.8rem,4.6vw,3.4rem)]">
                {next.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
          </div>
        )}

        <StoryMotion root=".valora" />
      </div>
    </PageShell>
  );
}
