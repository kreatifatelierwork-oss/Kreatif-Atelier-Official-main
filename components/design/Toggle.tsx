"use client";

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
  /** The words on the thumb. */
  onText?: string;
  offText?: string;
  tone?: "light" | "dark";
};

/** A switch (the third reference): a sunken pill track with a raised thumb that carries its state. */
export function Toggle({ checked, onChange, label, disabled, onText = "On", offText = "Off", tone = "light" }: Props) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} className={`nb-toggle ${tone === "dark" ? "nb-toggle--dark" : ""}`}>
      <span aria-hidden="true" className="nb-toggle__thumb">
        {checked ? onText : offText}
      </span>
    </button>
  );
}
