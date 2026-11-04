/** Helpers shared by the venture pages' drawings (components/asraya, components/valora). */

/** A part that leans towards the pointer inside <Play>; deeper parts lean further. */
export const d = (depth: number) => ({ "data-d": "", style: { "--d": depth } as React.CSSProperties });

/** CSS variables for one part's played state (an offset, an index for staggering). */
export const vars = (values: Record<string, number>) =>
  Object.fromEntries(Object.entries(values).map(([key, value]) => [`--${key}`, value])) as React.CSSProperties;
