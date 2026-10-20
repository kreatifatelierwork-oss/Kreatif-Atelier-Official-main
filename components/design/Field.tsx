import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type Base = { label: string; hint?: string; /** Shown under the field and announced with it; marks it invalid. */ error?: string };

function useDescribed(hint?: string, error?: string) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return { id, hintId, errorId, describedBy };
}

function Notes({ hint, error, hintId, errorId }: { hint?: string; error?: string; hintId?: string; errorId?: string }) {
  return (
    <>
      {hint && (
        <span id={hintId} className="ds-body text-[length:var(--ds-text-sm)]">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="neu-field__error">
          {error}
        </span>
      )}
    </>
  );
}

/** A labelled text input in a pressed well (16px text so phones never zoom on focus). */
export function Field({ label, hint, error, className = "", ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const { id, hintId, errorId, describedBy } = useDescribed(hint, error);
  return (
    <label htmlFor={id} className={`flex flex-col gap-[var(--ds-space-2)] ${className}`}>
      <span className="ds-label">{label}</span>
      <input id={id} className="neu-field" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      <Notes hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </label>
  );
}

/** A labelled textarea in a pressed well. */
export function TextArea({ label, hint, error, className = "", ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { id, hintId, errorId, describedBy } = useDescribed(hint, error);
  return (
    <label htmlFor={id} className={`flex flex-col gap-[var(--ds-space-2)] ${className}`}>
      <span className="ds-label">{label}</span>
      <textarea id={id} rows={4} className="neu-field" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      <Notes hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </label>
  );
}
