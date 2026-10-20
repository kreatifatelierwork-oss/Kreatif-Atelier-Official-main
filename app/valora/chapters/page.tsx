import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ValoraRadar } from "@/components/valora/ValoraRadar";
import { valoraRadar } from "@/content/verticals";

export const metadata: Metadata = { ...valoraRadar.meta, alternates: { canonical: "/valora/chapters/" } };

/** Valora's chapter radar, inside the site's header and footer. */
export default function Page() {
  return (
    <PageShell>
      <ValoraRadar />
    </PageShell>
  );
}
