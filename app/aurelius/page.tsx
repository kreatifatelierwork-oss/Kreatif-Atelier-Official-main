import type { Metadata } from "next";
import { AureliusMain } from "@/components/aurelius-site/AureliusMain";
import { PageShell } from "@/components/layout/PageShell";
import { aurelius } from "@/content/aurelius";

// The same page as the home page (owner, 2026-10-21), so search engines are pointed at "/".
export const metadata: Metadata = { ...aurelius.meta, alternates: { canonical: "/" } };

/** /aurelius: the main page, identical to "/" (old links keep working). */
export default function Page() {
  return (
    <PageShell theme="aurelius">
      <AureliusMain />
    </PageShell>
  );
}
