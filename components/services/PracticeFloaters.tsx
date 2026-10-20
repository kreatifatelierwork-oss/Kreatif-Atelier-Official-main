import { FloatingArtifact } from "@/components/design/FloatingArtifact";
import type { PracticeSlug } from "@/content/aurelius-services";
import { practiceArtifacts } from "@/features/home-v2/data/artifactSets";

const poster = (slug: string) => ({ src: `/images/artifacts/${slug}.webp`, width: 420, height: 420 });

/**
 * The floating objects on a practice page, chosen for what the practice does
 * (features/home-v2/data/pageArtifacts.tsx → practiceArtifacts). Decorative; each tilts only under the pointer.
 * - "hero": the first two, tucked around the practice's own artifact in the page header.
 * - "pov": the other two, in the empty right half of the point-of-view card (a row under the text on phones).
 */
export function PracticeFloaters({ slug, zone }: { slug: PracticeSlug; zone: "hero" | "pov" }) {
  const [a, b, c, d] = practiceArtifacts[slug];
  const seed = slug.length * 7;
  if (zone === "hero")
    return (
      <>
        <FloatingArtifact seed={seed + 1} className="pf pf--hero-a" image={poster(a)} live={{ kind: "obj", slug: a }} />
        <FloatingArtifact seed={seed + 2} className="pf pf--hero-b" image={poster(b)} live={{ kind: "obj", slug: b }} />
      </>
    );
  return (
    <div aria-hidden="true" className="pf-pov">
      <div className="pf-pov__slot pf-pov__slot--c">
        <FloatingArtifact seed={seed + 3} className="inset-0" image={poster(c)} live={{ kind: "obj", slug: c }} />
      </div>
      <div className="pf-pov__slot pf-pov__slot--d">
        <FloatingArtifact seed={seed + 4} className="inset-0" image={poster(d)} live={{ kind: "obj", slug: d }} />
      </div>
    </div>
  );
}
