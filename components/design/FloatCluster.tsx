import { FloatingArtifact } from "@/components/design/FloatingArtifact";

const poster = (slug: string) => ({ src: `/images/artifacts/${slug}.webp`, width: 420, height: 420 });

/**
 * Three floating objects in the empty side of a section (its parent must be `relative`): spread over the
 * right part on wide screens, a row under the content on phones. Each is a page object
 * (features/home-v2/data/pageArtifacts.tsx) and turns in live 3D near the pointer. Decorative.
 */
export function FloatCluster({ slugs, seed = 1 }: { slugs: readonly string[]; seed?: number }) {
  return (
    <div aria-hidden="true" className="fc">
      {slugs.slice(0, 3).map((slug, i) => (
        <div key={slug} className={`fc__slot fc__slot--${i + 1}`}>
          <FloatingArtifact seed={seed * 11 + i * 5} className="inset-0" image={poster(slug)} live={{ kind: "obj", slug }} />
        </div>
      ))}
    </div>
  );
}
