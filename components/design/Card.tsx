import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";

/** A neumorphic card: `raised` (default) or `inset` (a pressed well). With `href` it is a link that lifts on hover. */
export function Card({ variant = "raised", href, className = "", children }: { variant?: "raised" | "inset"; href?: string; className?: string; children: ReactNode }) {
  const cls = `neu-card ${variant === "inset" ? "neu-card--inset" : ""} ${className}`;
  return href ? (
    <SmartLink href={href} className={cls}>
      {children}
    </SmartLink>
  ) : (
    <div className={cls}>{children}</div>
  );
}
