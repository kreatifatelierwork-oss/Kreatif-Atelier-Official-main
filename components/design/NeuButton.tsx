import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";

type Common = {
  /** primary: polished-gold pill. secondary: the surface itself. icon: a round button (children = the icon). */
  variant?: "primary" | "secondary" | "icon";
  /** sm: compact (chips, nav, small actions), still 44px tall. */
  size?: "md" | "sm";
  /** dark: for dark surfaces (the footer). */
  tone?: "light" | "dark";
  /**
   * The round knob at the right end. Defaults to on for md text buttons, off for sm. Pass a node to put
   * a custom icon in it (cart plus/check); `true` gives the gold arrow.
   */
  knob?: boolean | ReactNode;
  /** Shows a turning ring in the knob and marks the button busy (buttons only). */
  loading?: boolean;
  children: ReactNode;
  className?: string;
};
type LinkProps = Common & { href: string; disabled?: boolean; "aria-label"?: string; onClick?: () => void };
type ButtonProps = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

/**
 * The one button on the Aurelius site (styles: styles/design/buttons.css): a soft raised pill with a bold
 * label and a round knob holding a gold-metal arrow; pressed, it sinks in (inset shadow, 0.97 scale).
 * With `href` it is a link; without, a <button>. `aria-pressed` makes it a toggle (filter chips).
 */
export function NeuButton(props: LinkProps | ButtonProps) {
  const { variant = "secondary", size = "md", tone = "light", knob, loading, children, className = "" } = props;
  const showKnob = variant !== "icon" && (knob === undefined ? size === "md" : knob !== false);
  const cls = ["nb", variant === "primary" && "nb--primary", variant === "icon" && "nb--icon", size === "sm" && "nb--sm", tone === "dark" && "nb--dark", className].filter(Boolean).join(" ");
  const inner = (
    <>
      {variant === "icon" ? children : <span className="nb__label">{children}</span>}
      {showKnob && (
        <span aria-hidden="true" className="nb__knob">
          {loading ? <span className="nb__spinner" /> : knob === true || knob === undefined ? <span className="nb__arrow" /> : knob}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    if (props.disabled)
      return (
        <a aria-disabled="true" role="link" data-knob={showKnob || undefined} className={cls}>
          {inner}
        </a>
      );
    return (
      <SmartLink href={props.href} aria-label={props["aria-label"]} onClick={props.onClick} data-knob={showKnob || undefined} className={cls}>
        {inner}
      </SmartLink>
    );
  }
  const rest: Record<string, unknown> = { ...(props as ButtonProps) };
  for (const k of ["variant", "size", "tone", "knob", "loading", "children", "className", "href"]) delete rest[k];
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      aria-busy={loading || undefined}
      disabled={(rest.disabled as boolean | undefined) || loading}
      data-knob={showKnob || undefined}
      className={cls}
    >
      {inner}
    </button>
  );
}

/** The button's knob on its own, as the "go" mark at the foot of a card that is itself a link. Decorative. */
export function Knob({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`nb__knob nb__knob--card ${className}`}>
      <span className="nb__arrow" />
    </span>
  );
}
