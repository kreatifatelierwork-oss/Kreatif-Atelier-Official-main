import type { ServiceCategory } from "@/content/services-menu";

/**
 * A service category's 3D artifact, as its pre-rendered transparent picture. Decorative: the
 * category name is always next to it. Fixed size, so it never shifts the layout while loading.
 */
export function ServiceArtifact({ category, size = 160, className = "" }: { category: ServiceCategory; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={category.image} alt="" width={size} height={size} loading="lazy" decoding="async" draggable={false} className={`aspect-square select-none ${className}`} />
  );
}
