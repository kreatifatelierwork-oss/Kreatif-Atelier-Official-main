import type { ServiceCategory } from "@/content/services-menu";
import { SmartLink } from "@/components/ui/SmartLink";

type Props = { category: ServiceCategory; active?: boolean; current?: boolean; hintId?: string; onActivate?: () => void; onNavigate?: () => void; onEnterPanel?: () => void };

/** One category in the mega menu: its name and service count on a glass row (no picture; the artifact shows in the panel on the right). Hover or focus makes it the active category; the right arrow key moves into its services. */
export function ServiceCard({ category, active, current, hintId, onActivate, onNavigate, onEnterPanel }: Props) {
  const count = category.featured.length + category.other.length;
  return (
    <SmartLink
      href={category.href}
      aria-current={current ? "page" : undefined}
      onMouseEnter={onActivate}
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
      <span className="mm-row__name">{category.name}</span>
      {count > 0 && <span aria-hidden="true" className="mm-row__count">{count}</span>}
    </SmartLink>
  );
}
