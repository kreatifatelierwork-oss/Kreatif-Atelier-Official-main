import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { VerticalPage } from "@/components/vertical/VerticalPage";
import { site } from "@/content/site";
import { verticalBySlug, verticals } from "@/content/verticals";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Valora, Golden Guardian Productions and Rudra Yugen. Aurelius and Asraya have their own routes. */
const OWN_ROUTE = ["aurelius", "asraya"];

export function generateStaticParams() {
  return verticals.filter((v) => !OWN_ROUTE.includes(v.slug)).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = verticalBySlug((await params).slug);
  if (!vertical) return {};
  return {
    title: vertical.meta?.title ?? `${vertical.name} — ${site.name}`,
    description: vertical.meta?.description ?? `${vertical.tagline} ${vertical.value}`,
    alternates: { canonical: `/${vertical.slug}/` },
  };
}

export default async function Page({ params }: Props) {
  const vertical = verticalBySlug((await params).slug);
  if (!vertical) notFound();

  return (
    <PageShell>
      <VerticalPage vertical={vertical} />
    </PageShell>
  );
}
