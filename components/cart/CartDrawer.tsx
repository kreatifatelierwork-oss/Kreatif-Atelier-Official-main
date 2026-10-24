"use client";

import { Drawer } from "@base-ui/react/drawer";
import { useRef, useState, type FormEvent } from "react";
import { Field, TextArea } from "@/components/design/Field";
import { DisplayHeading } from "@/components/design/DisplayHeading";
import { NeuButton } from "@/components/design/NeuButton";
import { cart } from "@/content/cart";
import { domainArtifact, serviceById } from "@/content/services";
import { cartRequestMailto, cartRequestSchema, sendCartRequest } from "@/lib/cart/request";
import { useCart } from "@/lib/cart/store";


type Errors = Partial<Record<"name" | "email" | "phone" | "services", string>>;

/**
 * The cart: a glass drawer from the right (base-ui Drawer: focus is trapped inside, Escape and a swipe
 * close it, focus returns to the cart button). Lists the selected services with remove and clear, then
 * the quote request, emailed to the team like the contact form (if that fails, the visitor can send it from
 * their own email app). A sent request empties the cart. No payments.
 */
export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const [errors, setErrors] = useState<Errors>({});
  // What just happened, said in the drawer's own status line: toasts sit outside the modal, where they
  // can be neither reached nor heard while it is open. A removal or clear carries its Undo.
  const [undo, setUndo] = useState<{ message: string; items?: string[]; mailto?: string } | null>(null);
  const [sending, setSending] = useState(false);
  const list = useRef<HTMLUListElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { form } = cart;

  // Removing an item must not drop focus: move it to the neighbouring remove button (or Close) first, so
  // the focused element is never the one that disappears.
  const removeAt = (id: string, index: number) => {
    const buttons = list.current?.querySelectorAll<HTMLButtonElement>("button[data-remove]");
    (buttons?.[index + 1] ?? buttons?.[index - 1] ?? closeRef.current)?.focus();
    setUndo({ message: cart.toastRemoved(serviceById(id)?.name ?? id), items: [...items] });
    remove(id);
  };

  const onClear = () => {
    setUndo({ message: cart.toastCleared, items: [...items] });
    clear();
    closeRef.current?.focus();
  };

  const onUndo = () => {
    if (undo?.items) useCart.setState({ items: undo.items });
    setUndo(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const el = event.currentTarget;
    const data = new FormData(el);
    const parsed = cartRequestSchema.safeParse({
      services: items,
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      // Focus the first field that needs attention.
      const first = (["name", "email", "phone"] as const).find((k) => next[k]);
      if (first) el.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setSending(true);
    setUndo({ message: form.sending });
    try {
      await sendCartRequest(parsed.data);
      clear();
      setUndo({ message: form.sent(parsed.data.email) });
      closeRef.current?.focus();
    } catch {
      setUndo({ message: form.failed, mailto: cartRequestMailto(parsed.data) });
    } finally {
      setSending(false);
    }
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setUndo(null);
      }}
      swipeDirection="right"
    >
      <Drawer.Portal>
        <Drawer.Backdrop className="cart-backdrop" />
        <Drawer.Viewport className="cart-viewport theme-aurelius">
          <Drawer.Popup className="cart-drawer glass-panel" data-lenis-prevent>
            <div className="flex items-start justify-between gap-[var(--ds-space-4)]">
              <div>
                <Drawer.Title render={(props) => <DisplayHeading level={2} id={props.id} className="ds-heading">{cart.title}</DisplayHeading>} />
                <Drawer.Description className="ds-body mt-[var(--ds-space-2)] text-[length:var(--ds-text-sm)]">{cart.description}</Drawer.Description>
              </div>
              <Drawer.Close ref={closeRef} aria-label={cart.close} className="nb nb--icon nb--sm shrink-0">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
              </Drawer.Close>
            </div>

            <div role="status" className="mt-[var(--ds-space-5)] flex min-h-[var(--ds-tap)] flex-wrap items-center justify-between gap-[var(--ds-space-3)]">
              <p className="ds-label">
                {undo ? undo.message : cart.count(items.length)}
                {undo?.mailto && (
                  <>
                    {" "}
                    <a href={undo.mailto} className="underline underline-offset-4">
                      {form.fallback}
                    </a>
                  </>
                )}
              </p>
              {undo?.items && (
                <NeuButton size="sm" onClick={onUndo}>
                  {cart.undo}
                </NeuButton>
              )}
            </div>

            {items.length === 0 ? (
              <div className="mt-[var(--ds-space-4)] flex flex-col items-start gap-[var(--ds-space-4)]">
                <p className="ds-body">{cart.empty}</p>
                <NeuButton href="/aurelius/services/" variant="primary">
                  {cart.browse}
                </NeuButton>
              </div>
            ) : (
              <>
                <ul ref={list} className="mt-[var(--ds-space-4)] flex flex-col gap-[var(--ds-space-3)]">
                  {items.map((id, i) => {
                    const s = serviceById(id);
                    if (!s) return null;
                    const art = domainArtifact(s.domain);
                    return (
                      <li key={id} className="cart-item">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={art.src} alt="" width={art.width} height={art.height} loading="lazy" decoding="async" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ds-text">{s.name}</p>
                          <p className="ds-label mt-[var(--ds-space-1)] truncate">
                            {s.id} · {s.domainName}
                          </p>
                        </div>
                        <NeuButton variant="icon" size="sm" data-remove aria-label={cart.remove(s.name)} onClick={() => removeAt(id, i)}>
                          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
                        </NeuButton>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-[var(--ds-space-3)] flex justify-end">
                  <NeuButton size="sm" onClick={onClear}>
                    {cart.clear}
                  </NeuButton>
                </div>

                <form noValidate onSubmit={onSubmit} className="mt-[var(--ds-space-6)] flex flex-col gap-[var(--ds-space-4)]">
                  <h3 className="font-ds-display text-[length:var(--ds-text-xl)] leading-[var(--ds-leading-heading)] text-ds-text uppercase">{form.heading}</h3>
                  <Field label={form.name} name="name" autoComplete="name" required error={errors.name} />
                  <Field label={form.email} name="email" type="email" autoComplete="email" required error={errors.email} />
                  <Field label={form.phone} name="phone" type="tel" autoComplete="tel" error={errors.phone} />
                  <TextArea label={form.message} name="message" hint={form.messageHint} />
                  {errors.services && <p className="neu-field__error">{errors.services}</p>}
                  <p className="ds-body text-[length:var(--ds-text-sm)]">{form.note}</p>
                  <div>
                    <NeuButton type="submit" variant="primary" loading={sending}>
                      {sending ? form.sending : form.submit}
                    </NeuButton>
                  </div>
                </form>
              </>
            )}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
