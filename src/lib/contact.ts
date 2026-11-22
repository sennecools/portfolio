export type ContactValues = {
  reason: string;
  name: string;
  email: string;
  message: string;
};

/** Validation problems as codes; the text for each code, per language, is in the dictionary. */
export type ContactErrorCode = "nameMissing" | "nameLong" | "emailInvalid" | "messageShort" | "messageLong";

export type ContactErrors = Partial<Record<"name" | "email" | "message", ContactErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = { name: 100, email: 200, messageMin: 10, messageMax: 5000 } as const;

/** Read and trim the fields we care about. Unknown reasons fall back to the first allowed one. */
export function parseContact(data: FormData, reasons: readonly string[]): ContactValues {
  const text = (key: string) => {
    const v = data.get(key);
    return typeof v === "string" ? v.trim() : "";
  };
  const reason = text("reason");
  return {
    reason: reasons.includes(reason) ? reason : (reasons[0] ?? ""),
    name: text("name"),
    email: text("email"),
    message: text("message"),
  };
}

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!v.name) errors.name = "nameMissing";
  else if (v.name.length > LIMITS.name) errors.name = "nameLong";
  if (!EMAIL_RE.test(v.email) || v.email.length > LIMITS.email) errors.email = "emailInvalid";
  if (v.message.length < LIMITS.messageMin) errors.message = "messageShort";
  else if (v.message.length > LIMITS.messageMax) errors.message = "messageLong";
  return errors;
}

/** First error in field order, for the single error line under the form. */
export function firstError(errors: ContactErrors): ContactErrorCode | undefined {
  return errors.name ?? errors.email ?? errors.message;
}

/**
 * Sliding-window rate limiter. Best effort only: state lives in one server
 * instance, which is enough to stop a script hammering the form.
 */
export function createRateLimiter(limit: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return function limited(key: string): boolean {
    const t = now();
    const recent = (hits.get(key) ?? []).filter((h) => t - h < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return true;
    }
    recent.push(t);
    hits.set(key, recent);
    return false;
  };
}

/** Plain-text email body. Header-like fields are single-lined so they can't inject extra headers. */
export function buildEmail(v: ContactValues) {
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
  return {
    subject: `[${oneLine(v.reason)}] New message from ${oneLine(v.name)}`,
    text: `Reason: ${oneLine(v.reason)}\nName: ${oneLine(v.name)}\nEmail: ${oneLine(v.email)}\n\n${v.message}`,
  };
}
