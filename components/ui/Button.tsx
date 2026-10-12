import { SmartLink } from "./SmartLink";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "quiet"; className?: string };

/** The one action button used across the site (styles: `.btn` in app/globals.css). */
export function Button({ href, children, variant = "quiet", className = "" }: Props) {
  return (
    <SmartLink href={href} className={`btn ${variant === "primary" ? "btn-primary" : ""} ${className}`}>
      {children}
      <span aria-hidden="true" className="btn-arrow">
        →
      </span>
    </SmartLink>
  );
}
