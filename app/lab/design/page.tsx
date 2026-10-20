import { notFound } from "next/navigation";
import { DesignFoundations } from "@/features/design-lab/DesignFoundations";

export const metadata = { title: "Design foundations", robots: { index: false } };

/** Dev-only: the revamp's tokens and materials on one page, for review before they reach the site. */
export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DesignFoundations />;
}
