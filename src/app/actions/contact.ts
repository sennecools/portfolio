"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { defaultLocale, fill, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import {
  buildEmail,
  createRateLimiter,
  firstError,
  parseContact,
  validateContact,
  type ContactValues,
} from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error";
  error?: string;
  values?: ContactValues;
};

const limited = createRateLimiter(3, 10 * 60_000);

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // The form posts the language it was shown in, so errors come back in that language.
  const posted = formData.get("locale");
  const locale = typeof posted === "string" && isLocale(posted) ? posted : defaultLocale;
  const t = getDictionary(locale).contact.errors;
  const values = parseContact(formData, site.contactReasons);

  // Honeypot: people never see or fill this field, bots usually do.
  if (formData.get("company")) return { status: "success", values };

  const code = firstError(validateContact(values));
  if (code) return { status: "error", error: t[code], values };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return { status: "error", error: t.tooMany, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not set; message was not sent.");
    return { status: "error", error: fill(t.notConnected, { email: site.email }), values };
  }

  // The email to me always names the reason in English, whatever language the form was in.
  const reason = getDictionary(defaultLocale).contact.reasons[values.reason as (typeof site.contactReasons)[number]];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: values.email,
        ...buildEmail({ ...values, reason: reason ?? values.reason }),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("[contact]", err);
    return { status: "error", error: fill(t.failed, { email: site.email }), values };
  }

  return { status: "success", values };
}
