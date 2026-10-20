import { notFound } from "next/navigation";
import { RenderStage } from "@/features/home-v2/lab/RenderStage";

export const metadata = { title: "Artifact render", robots: { index: false } };

/** Dev-only: one service artifact on a transparent stage, for exporting its picture (scripts in tests/visual). */
export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <RenderStage />;
}
