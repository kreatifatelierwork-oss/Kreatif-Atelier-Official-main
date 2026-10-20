"use client";

import { useRef, useState } from "react";
import { practices } from "@/content/aurelius";
import { Dialog } from "@/components/ui/Dialog";
import { budgetOptions, quoteSchema, timelineOptions } from "@/lib/quote/schema";
import { submitQuote } from "@/lib/quote/submit";
import { useQuoteStore } from "@/stores/quoteStore";

type Errors = Partial<Record<"services" | "name" | "email" | "company" | "phone" | "budget" | "timeline" | "notes", string>>;
type Status = "idle" | "sending" | "done";

const field = "mt-2 block w-full border border-line bg-navy/60 px-4 py-3.5 text-[1rem] text-cream placeholder:text-cream-faint aria-[invalid=true]:border-ember";
const label = "eyebrow text-[0.62rem] text-gold";
const errorText = "mt-2 text-[0.84rem] text-ember";

/**
 * The request form. Opens over the page with the selected services listed at the top (removable),
 * validates with the shared schema, and only reports success once the send has actually resolved.
 */
export function QuoteDrawer() {
  const open = useQuoteStore((s) => s.drawerOpen);
  const setOpen = useQuoteStore((s) => s.setDrawerOpen);
  const items = useQuoteStore((s) => s.items);
  const remove = useQuoteStore((s) => s.remove);
  const clear = useQuoteStore((s) => s.clear);

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [delivery, setDelivery] = useState<"endpoint" | "mailto">("mailto");
  const panelRef = useRef<HTMLDivElement>(null);
  const names = Object.fromEntries(practices.map((p) => [p.slug, p.name]));

  const close = () => {
    setOpen(false);
    if (status === "done") setStatus("idle");
    setErrors({});
    setFormError("");
  };

  /** Keeps Tab inside the drawer while it is open. */
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"),
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const data = new FormData(event.currentTarget);
    const text = (key: string) => String(data.get(key) ?? "");
    const parsed = quoteSchema.safeParse({
      services: items,
      name: text("name"),
      email: text("email"),
      company: text("company"),
      phone: text("phone"),
      budget: text("budget"),
      timeline: text("timeline"),
      notes: text("notes"),
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      setFormError("Please check the highlighted fields.");
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const mode = await submitQuote(parsed.data);
      setDelivery(mode);
      setStatus("done");
      clear();
    } catch {
      setStatus("idle");
      setFormError("Something went wrong and nothing was sent. Your selection is still here; please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={close} labelledBy="quote-title" variant="panel">
      <div ref={panelRef} onKeyDown={trapFocus} data-lenis-prevent className="max-h-[88svh] w-full overflow-y-auto border border-line bg-ink p-7 md:max-w-2xl md:p-10">
        <div className="pr-14">
          <div>
            <p className="eyebrow text-[0.62rem] text-gold">Aurelius</p>
            <h2 id="quote-title" className="display mt-3 text-[clamp(2rem,4vw,3rem)] text-cream">
              Request a quote
            </h2>
          </div>
        </div>

        {status === "done" ? (
          <div role="status" className="mt-10">
            <p className="display text-[1.8rem] text-cream">
              {delivery === "endpoint" ? "Thank you. Your request is in." : "Your email app should open with the request."}
            </p>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-cream-muted">
              {delivery === "endpoint"
                ? "We will be in touch with a combined quote for the services you chose."
                : "Nothing is sent until you press send there. If it did not open, write to us directly at the address on the contact page."}
            </p>
            <button type="button" onClick={close} className="btn mt-8">
              Done
            </button>
          </div>
        ) : (
          <>
            <section aria-labelledby="quote-selected" className="mt-8">
              <h3 id="quote-selected" className="eyebrow text-[0.62rem] text-gold">
                Selected services ({items.length})
              </h3>
              {items.length === 0 ? (
                <p className="mt-3 text-[0.95rem] text-cream-muted">Nothing selected yet. Add practice areas from the list.</p>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((slug) => (
                    <li key={slug}>
                      <button
                        type="button"
                        onClick={() => remove(slug)}
                        aria-label={`Remove ${names[slug]}`}
                        className="eyebrow border border-ember/60 px-3 py-2 text-[0.58rem] text-cream-muted hover:border-ember hover:text-cream"
                      >
                        {names[slug]} <span aria-hidden="true">×</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {errors.services && <p className={errorText}>{errors.services}</p>}
            </section>

            <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6 md:grid-cols-2">
              <Text id="q-name" name="name" label="Name" error={errors.name} autoComplete="name" required />
              <Text id="q-email" name="email" type="email" label="Email" error={errors.email} autoComplete="email" required />
              <Text id="q-company" name="company" label="Company" optional error={errors.company} autoComplete="organization" />
              <Text id="q-phone" name="phone" type="tel" label="Phone" optional error={errors.phone} autoComplete="tel" />

              <Select id="q-budget" name="budget" label="Budget range" options={budgetOptions} error={errors.budget} />
              <Select id="q-timeline" name="timeline" label="Timeline" options={timelineOptions} error={errors.timeline} />

              <div className="md:col-span-2">
                <label htmlFor="q-notes" className={label}>
                  Project notes <span className="text-cream-faint">(optional)</span>
                </label>
                <textarea id="q-notes" name="notes" rows={5} aria-invalid={!!errors.notes} aria-describedby={errors.notes ? "q-notes-err" : undefined} className={field} />
                {errors.notes && (
                  <p id="q-notes-err" className={errorText}>
                    {errors.notes}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                {formError && (
                  <p role="alert" className="mb-4 text-[0.92rem] text-ember">
                    {formError}
                  </p>
                )}
                <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Send request"}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Dialog>
  );
}

type TextProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  optional?: boolean;
  required?: boolean;
  error?: string;
  autoComplete?: string;
};

function Text({ id, name, label: text, type = "text", optional, required, error, autoComplete }: TextProps) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text} {optional && <span className="text-cream-faint">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={field}
      />
      {error && (
        <p id={`${id}-err`} className={errorText}>
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ id, name, label: text, options, error }: { id: string; name: string; label: string; options: readonly string[]; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      <select id={id} name={name} defaultValue="" aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={field}>
        <option value="" disabled>
          Choose one
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-err`} className={errorText}>
          {error}
        </p>
      )}
    </div>
  );
}
