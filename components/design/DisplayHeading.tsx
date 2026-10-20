import type { ReactNode } from "react";

type Props = {
  level: 1 | 2 | 3;
  id?: string;
  /** The element to render (defaults to h1/h2/h3 by level). */
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: ReactNode;
};

/**
 * The Aurelius heading: real, selectable text in maroon. Level 2 carries a soft maroon gradient fill
 * (lighter at the top); levels 1 and 3 are solid. Styles: `.au-heading*` in styles/design/materials.css.
 */
export function DisplayHeading({ level, id, as, className = "", children }: Props) {
  const Tag = as ?? (`h${level}` as const);
  return (
    <Tag id={id} className={`au-heading au-heading--${level} ${className}`}>
      {children}
    </Tag>
  );
}
