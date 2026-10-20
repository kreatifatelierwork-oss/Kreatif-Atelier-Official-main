import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Heading";
import { VerticalPage } from "@/components/vertical/VerticalPage";
import { site } from "@/content/site";
import { valoraRadar, verticalBySlug } from "@/content/verticals";

const valora = verticalBySlug("valora")!;

export const metadata: Metadata = {
  title: valora.meta?.title ?? `${valora.name} — ${site.name}`,
  description: valora.meta?.description ?? `${valora.tagline} ${valora.value}`,
  alternates: { canonical: "/valora/" },
};

/** Valora: the shared venture page, plus the way into its chapter radar. */
export default function Page() {
  const { teaser } = valoraRadar;
  return (
    <PageShell>
      <VerticalPage vertical={valora}>
        <section aria-labelledby="radar-heading" className="px-[var(--gutter)] py-[clamp(3.5rem,8vh,6rem)]">
          <div className="heat mx-auto grid w-full max-w-[1280px] gap-8 p-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
            <div aria-hidden="true" className="topo topo--ridge opacity-50" />
            <div className="relative">
              <Label className="text-[#f3f0e9]/80">{teaser.label}</Label>
              <h2 id="radar-heading" data-reveal className="a-display mt-5 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.92]">
                {teaser.title}
              </h2>
              <p data-reveal className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#f3f0e9]/85">
                {teaser.body}
              </p>
            </div>
            <div data-reveal className="on-dark relative lg:justify-self-end">
              <Button href="/valora/chapters" variant="primary">
                {teaser.cta}
              </Button>
            </div>
          </div>
        </section>
      </VerticalPage>
    </PageShell>
  );
}
