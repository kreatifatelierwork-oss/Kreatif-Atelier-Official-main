import { notFound } from "next/navigation";
import { ArtifactLab } from "@/features/home-v2/lab/ArtifactLab";

export const metadata = { title: "Artifact lab", robots: { index: false } };

/** Dev-only gallery of the home-v2 3D artifacts beside their references. Not built for production. */
export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ArtifactLab />;
}
