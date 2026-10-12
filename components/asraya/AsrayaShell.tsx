import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";
import { asraya } from "@/content/asraya";
import { AsrayaNav } from "./AsrayaNav";
import { Art, Poster } from "./kit";

type Props = {
  children: React.ReactNode;
  /** The Asraya page that follows this one, offered just before the closing poster. */
  next?: { label: string; href: string };
};

/**
 * Frame for every Asraya page: the site header and footer, the Asraya masthead, the page's posters,
 * and the profile's closing poster ("Let's build something that matters.").
 */
export function AsrayaShell({ children, next }: Props) {
  return (
    <PageShell>
      <div id="home" className="asraya">
        <AsrayaNav />
        {children}

        {next && (
          <Link
            href={next.href}
            className="group flex items-baseline justify-between gap-6 bg-[#151413] px-[var(--gutter)] py-8 text-[#f3eee4] transition-colors hover:bg-[#d2301f]"
          >
            <span className="a-wide text-[#f3eee4]/70 group-hover:text-[#151413]">{asraya.next}</span>
            <span className="a-display flex items-baseline gap-4 text-[clamp(1.8rem,4.6vw,3.6rem)]">
              {next.label}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        )}

        <Poster tone="blue" labelledBy="asraya-cta" className="!pb-0 text-center">
          <h2 id="asraya-cta" data-reveal className="a-display mx-auto max-w-4xl text-[clamp(2.8rem,8.4vw,7rem)] text-[#151413]">
            {asraya.cta.lead} {asraya.cta.emphasis}
          </h2>
          <p data-reveal className="a-serif a-accent mt-8 text-[clamp(2.4rem,6vw,4.6rem)] tracking-[0.08em] uppercase">
            {asraya.name}
          </p>
          <p data-reveal className="a-wide mt-3">
            {asraya.tagline}
          </p>
          <div data-reveal className="mt-10 flex justify-center">
            <Button href={asraya.cta.href}>{asraya.cta.button}</Button>
          </div>
          <Art name="teacher" sizes="100vw" className="a-art--rise mx-auto mt-10 max-w-[64rem]" />
        </Poster>
      </div>
    </PageShell>
  );
}
