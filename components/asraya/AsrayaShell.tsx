import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { asraya } from "@/content/asraya";
import { AsrayaNav } from "./AsrayaNav";
import { StoryMotion } from "@/components/story/StoryMotion";
import { Network } from "./graphics";

type Props = {
  children: React.ReactNode;
  /** The Asraya page that follows this one, offered just before the closing section. */
  next?: { label: string; href: string };
  /** The network drawing under the closing call; off where the page has already drawn it. */
  network?: boolean;
};

/**
 * Frame for every Asraya page: the site header and footer, the Asraya masthead, the page's chapters,
 * and the closing call ("Let's build something that matters.") on a deep band, over the network drawing itself in.
 */
export function AsrayaShell({ children, next, network = true }: Props) {
  return (
    <PageShell>
      <div id="home" className="asraya">
        <AsrayaNav />
        <div className="a-wrap">{children}</div>

        <section aria-labelledby="asraya-cta" className="a-band a-band--deep mt-[clamp(3rem,8vh,5rem)]">
          <div className="a-wrap text-center">
            <h2 id="asraya-cta" data-reveal className="a-display mx-auto max-w-4xl text-[clamp(2.6rem,6.6vw,5.6rem)]">
              {asraya.cta.lead} <span className="a-em">{asraya.cta.emphasis}</span>
            </h2>
            <p data-reveal className="a-wordmark mt-8 text-[clamp(2.6rem,5vw,3.8rem)] !text-[color:var(--a-ivory)]">
              {asraya.wordmark}
            </p>
            <p data-reveal className="a-wide a-faint mt-3">
              {asraya.tagline}
            </p>
            <div data-reveal className="mt-10 flex justify-center">
              <Button href={asraya.cta.href}>{asraya.cta.button}</Button>
            </div>
          </div>
          {/* Organisations, drawn together into one network as the page reaches its end. */}
          {network && (
            <div className="a-wrap mt-[clamp(3rem,7vh,5rem)]">
              <Network state="joined" />
            </div>
          )}
        </section>
        {/* The next Asraya page, on the ivory, so the page runs into the footer's sunset. */}
        {next && (
          <div className="a-wrap pt-[clamp(2.5rem,6vh,4rem)]">
            <Link
              href={next.href}
              className="group flex items-baseline justify-between gap-6 border-y border-[color:var(--a-rule)] py-7 transition-colors hover:text-[color:var(--a-red)]"
            >
              <span className="a-wide a-faint">{asraya.next}</span>
              <span className="a-display flex items-baseline gap-4 text-[clamp(1.8rem,4.6vw,3.4rem)]">
                {next.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
          </div>
        )}

        <StoryMotion root=".asraya" />
      </div>
    </PageShell>
  );
}
