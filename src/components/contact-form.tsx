"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { rv } from "@/components/rv";
import { useSlidingIndicator } from "@/components/use-indicator";
import { fill, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const initial: ContactState = { status: "idle" };

/** How long the outgoing side of a swap gets to fade before the other side mounts (matches --t-fast). */
const SWAP_MS = 180;

type Props = {
  locale: Locale;
  /** Each option posts its id and shows its label. */
  reasons: readonly { id: string; label: string }[];
  t: Dictionary["contact"];
};

export function ContactForm({ locale, reasons, t }: Props) {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const [reason, setReason] = useState(reasons[0]?.id ?? "");
  // "Send another" remembers which success it dismissed and remounts the form to clear it.
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const [round, setRound] = useState(0);
  // The form and the confirmation swap in two beats: the visible side fades out, then the other mounts.
  // It starts from the action state: a form posted without JavaScript (or before hydration) comes
  // back from the server already successful, and effects never run there.
  const [view, setView] = useState<"form" | "done">(state.status === "success" ? "done" : "form");
  const [leaving, setLeaving] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const seg = useRef<HTMLDivElement>(null);
  const swap = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useSlidingIndicator(seg, ".seg__opt:has(input:checked)", `${reason}/${round}/${view}`);

  const success = state.status === "success" && dismissed !== state;

  useEffect(() => {
    if (!success || view === "done") return;
    // Hold the card at the height the form had, so nothing below it moves when the fields go.
    const el = box.current;
    if (el) el.style.minHeight = `${el.offsetHeight}px`;
    setLeaving(true);
    swap.current = setTimeout(() => {
      setLeaving(false);
      setView("done");
    }, SWAP_MS);
    return () => clearTimeout(swap.current);
  }, [success, view]);

  useEffect(() => () => clearTimeout(swap.current), []);

  const sendAnother = () => {
    if (leaving) return;
    clearTimeout(swap.current);
    setLeaving(true);
    swap.current = setTimeout(() => {
      if (box.current) box.current.style.minHeight = "";
      setDismissed(state);
      setRound((r) => r + 1);
      setView("form");
      setLeaving(false);
    }, SWAP_MS);
  };

  const values = state.status === "error" ? state.values : undefined;
  // The four blocks only arrive with the scroll the first time; a form that comes back after
  // "Send another" fades in as a whole instead.
  const arrive = round === 0 ? rv("up-s", { d0: 150, step: "s" }) : {};
  const fading = leaving ? " form--leaving" : "";
  const formClass = `${round > 0 ? "form--back" : ""}${fading}`.trim() || undefined;

  return (
    <div className="form" ref={box} {...rv("fade")}>
      {view === "done" ? (
        <div className={`form__done${fading}`} role="status">
          <p className="t-meta dim">{t.sent}</p>
          <p className="t-title">{fill(t.thanks, { name: state.values?.name ?? "" })}</p>
          <p>{fill(t.reply, { email: state.values?.email ?? "" })}</p>
          <button className="btn btn--wash t-ui" type="button" onClick={sendAnother}>
            {t.sendAnother}
          </button>
        </div>
      ) : (
        <form key={round} className={formClass} action={action} noValidate>
          <div {...arrive}>
            <span className="t-meta form__label" id="reason-label">
              {t.reasonLabel}
            </span>
            <div className="form__seg" role="radiogroup" aria-labelledby="reason-label" ref={seg}>
              <span className="links__ind" aria-hidden="true" />
              {/* Real radios: one tab stop, arrow keys move the choice, and the value posts by itself. */}
              {reasons.map((r) => (
                <label key={r.id} className="links__tab seg__opt">
                  <input
                    className="sr-only"
                    type="radio"
                    name="reason"
                    value={r.id}
                    checked={reason === r.id}
                    onChange={() => setReason(r.id)}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </div>
          <input type="hidden" name="locale" value={locale} />
          {/* Honeypot, hidden from people and assistive tech */}
          <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="form__row" {...arrive}>
            <label className="form__field">
              <span className="t-meta form__label">{t.name}</span>
              <input
                className="input"
                type="text"
                name="name"
                autoComplete="name"
                placeholder={t.namePlaceholder}
                defaultValue={values?.name}
                required
              />
            </label>
            <label className="form__field">
              <span className="t-meta form__label">{t.email}</span>
              <input
                className="input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                defaultValue={values?.email}
                required
              />
            </label>
          </div>
          <label className="form__field form__msg" {...arrive}>
            <span className="t-meta form__label">{t.message}</span>
            <textarea
              className="input"
              name="message"
              rows={6}
              placeholder={t.messagePlaceholder}
              defaultValue={values?.message}
              required
            />
          </label>
          {state.status === "error" && state.error && (
            <p className="form__err" role="alert">
              {state.error}
            </p>
          )}
          <div className="form__foot" {...arrive}>
            <span className="t-meta dim">{t.footnote}</span>
            {/* `disabled` still guards against a double submit; `aria-busy` is what the pending look hangs on. */}
            <button className="btn btn--hue t-ui" type="submit" disabled={pending} aria-busy={pending}>
              {pending ? t.sending : t.send}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
