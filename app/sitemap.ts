import type { MetadataRoute } from "next";
import { practiceHref, practices } from "@/content/aurelius";
import { site } from "@/content/site";
import { verticals } from "@/content/verticals";

export const dynamic = "force-static";

const page = (path: string, priority: number) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority });

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1),
    page("/aurelius/", 0.9),
    page("/aurelius/services/", 0.9),
    ...practices.map((p) => page(`${practiceHref(p.slug)}/`, 0.8)),
    page("/approach/", 0.7),
    page("/about/kreatif-atelier/", 0.6),
    ...verticals.filter((v) => v.slug !== "aurelius").map((v) => page(`/${v.slug}/`, 0.6)),
    page("/valora/chapters/", 0.6),
    page("/asraya/what-we-build/", 0.5),
    page("/asraya/partnership/", 0.5),
    page("/asraya/tomorrow/", 0.5),
    page("/contact/", 0.7),
  ];
}
