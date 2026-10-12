"use client";

import { useState } from "react";
import { practices } from "@/content/aurelius";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";

const field = "mt-2 block w-full border border-line bg-navy/60 px-4 py-3.5 text-[1rem] text-cream placeholder:text-cream-faint";
const label = "eyebrow text-[0.62rem] text-gold";

/**
 * Project enquiry form. The site is static, so there is no server to post to: submitting builds
 * an email in the visitor's own mail app. Swap `onSubmit` for a real endpoint when one exists.
 */
export function ContactForm() {
  const { form } = contactPage;
  const [areas, setAreas] = useState<string[]>([]);

  const toggle = (name: string) => setAreas((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const line = (title: string, value: FormDataEntryValue | string | null) => `${title}: ${value || "—"}`;
    const body = [
      line(form.name, data.get("name")),
      line(form.email, data.get("email")),
      line(form.company, data.get("company")),
      line(form.help, areas.join(", ")),
      line(form.budget, data.get("budget")),
      "",
      form.outcome,
      String(data.get("outcome") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className={label}>
          {form.name}
        </label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          {form.email}
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-company" className={label}>
          {form.company} <span className="text-cream-faint">({form.optional})</span>
        </label>
        <input id="cf-company" name="company" type="text" autoComplete="organization" className={field} />
      </div>
      <fieldset className="md:col-span-2">
        <legend className={label}>{form.help}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {practices.map((p) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={areas.includes(p.name)}
              onClick={() => toggle(p.name)}
              className="eyebrow border border-line px-3.5 py-2 text-[0.6rem] text-cream-muted transition-colors hover:border-gold/70 hover:text-gold-bright aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-ink"
            >
              {p.name}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <label htmlFor="cf-outcome" className={label}>
          {form.outcome}
        </label>
        <textarea id="cf-outcome" name="outcome" required rows={5} className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-budget" className={label}>
          {form.budget} <span className="text-cream-faint">({form.optional})</span>
        </label>
        <input id="cf-budget" name="budget" type="text" className={field} />
      </div>
      <label className="flex items-start gap-3 text-[0.95rem] text-cream-muted md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--gold)]" />
        {form.consent}
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary">
          {form.submit}
          <span aria-hidden="true" className="btn-arrow">
            →
          </span>
        </button>
        <p className="mt-4 max-w-xl text-[0.86rem] text-cream-faint">{form.note}</p>
      </div>
    </form>
  );
}
