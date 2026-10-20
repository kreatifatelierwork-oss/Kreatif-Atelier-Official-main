import { useRef } from "react";
import type { ServiceCategory } from "@/content/services-menu";
import { SmartLink } from "@/components/ui/SmartLink";
import { config } from "@/lib/config";

type Props = { category: ServiceCategory; active?: boolean; current?: boolean; hintId?: string; onActivate?: () => void; onNavigate?: () => void; onEnterPanel?: () => void };

/**
 * One practice in the mega menu: its name, a one-line description and an arrow, on a glass row (no picture;
 * the artifact shows in the panel on the right). Hovering makes it active after a short intent delay
 * (config.megaMenu.intentMs), so a diagonal move toward the panel does not flick through the rows it
 * crosses; focus activates at once. The right arrow key moves into its services.
 */
export function ServiceCard({ category, active, current, hintId, onActivate, onNavigate, onEnterPanel }: Props) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  return (
    <SmartLink
      href={category.href}
      aria-current={current ? "page" : undefined}
      onMouseEnter={() => {
        cancel();
        timer.current = setTimeout(() => onActivate?.(), config.megaMenu.intentMs);
      }}
      onMouseLeave={cancel}
      onFocus={onActivate}
      onClick={onNavigate}
      aria-describedby={hintId}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" && onEnterPanel) {
          event.preventDefault();
          onEnterPanel();
        }
      }}
      data-active={active || undefined}
      className="mm-row"
    >
      <span className="min-w-0">
        <span className="mm-row__name">{category.name}</span>
        <span className="mm-row__line">{category.blurb}</span>
      </span>
      <span aria-hidden="true" className="mm-row__arrow">
        →
      </span>
    </SmartLink>
  );
}
