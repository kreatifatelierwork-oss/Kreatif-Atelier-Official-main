import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { asraya } from "@/content/asraya";
import { AsrayaNav } from "./AsrayaNav";
import { Network } from "./graphics";

type Props = {
  children: React.ReactNode;
  /** The Asraya page that follows this one, offered just before the closing section. */
  next?: { label: string; href: string };
};

/**
 * Frame for every Asraya page: the site header and footer, the Asraya masthead, the page's chapters,
 * and the profile's closing line ("Let's build something that matters.") over the joined network.
 */
export function AsrayaShell({ children, next }: Props) {
  return (
    <PageShell>
      <div id="home" className="asraya">
        <AsrayaNav />
        <div className="a-wrap">{children}</div>

        {next && (
          <div className="a-wrap">
            <Link
              href={next.href}
              className="group flex items-baseline justify-between gap-6 border-y border-[color:var(--a-ink)] py-7 transition-colors hover:text-[color:var(--a-red)]"
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

        <section aria-labelledby="asraya-cta" className="pt-[clamp(4.5rem,11vh,8rem)]">
          <div className="a-wrap text-center">
            <h2 id="asraya-cta" data-reveal className="a-display mx-auto max-w-4xl text-[clamp(2.8rem,7.6vw,6.4rem)]">
              {asraya.cta.lead} <span className="a-red">{asraya.cta.emphasis}</span>
            </h2>
            <p data-reveal className="a-serif mt-8 text-[clamp(2rem,4.4vw,3.4rem)] tracking-[0.08em] uppercase">
              {asraya.name}
            </p>
            <p data-reveal className="a-wide a-faint mt-3">
              {asraya.tagline}
            </p>
            <div data-reveal className="mt-10 flex justify-center">
              <Button href={asraya.cta.href}>{asraya.cta.button}</Button>
            </div>
          </div>
          {/* The same organisations as on the first page, now joined. */}
          <div data-reveal className="a-wrap mt-[clamp(3rem,7vh,5rem)]">
            <Network state="joined" />
          </div>
          <div className="h-[clamp(3rem,8vh,5rem)]" />
        </section>
      </div>
    </PageShell>
  );
}
