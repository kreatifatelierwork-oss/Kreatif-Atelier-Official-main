import type { Metadata } from "next";
import { ValoraRadar } from "@/components/valora/ValoraRadar";
import { ValoraShell } from "@/components/valora/ValoraShell";
import { valoraRadar } from "@/content/verticals";

export const metadata: Metadata = { ...valoraRadar.meta, alternates: { canonical: "/valora/chapters/" } };

/** Valora's chapter radar, the fourth Valora page, under the Valora masthead. */
export default function Page() {
  return (
    <ValoraShell cta={false} wide>
      <ValoraRadar />
    </ValoraShell>
  );
}
