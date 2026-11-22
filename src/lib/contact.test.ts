import { describe, expect, it } from "vitest";
import { buildEmail, createRateLimiter, firstError, parseContact, validateContact, type ContactValues } from "./contact";

const REASONS = ["Internship", "Project", "Just saying hi"] as const;

function form(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const valid: ContactValues = {
  reason: "Internship",
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to talk about an internship.",
};

describe("parseContact", () => {
  it("trims every field", () => {
    const v = parseContact(form({ reason: " Project ", name: "  Ada ", email: " ada@example.com ", message: " hi there " }), REASONS);
    expect(v).toEqual({ reason: "Project", name: "Ada", email: "ada@example.com", message: "hi there" });
  });

  it("falls back to the first reason when the submitted one is not allowed", () => {
    expect(parseContact(form({ reason: "Free money" }), REASONS).reason).toBe("Internship");
    expect(parseContact(form({}), REASONS).reason).toBe("Internship");
  });

  it("treats missing and non-string fields as empty", () => {
    const fd = form({});
    fd.set("name", new Blob(["x"]), "x.txt");
    expect(parseContact(fd, REASONS)).toMatchObject({ name: "", email: "", message: "" });
  });
});

describe("validateContact", () => {
  it("accepts a complete message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires a name", () => {
    expect(validateContact({ ...valid, name: "" }).name).toBeDefined();
  });

  it("rejects an over-long name", () => {
    expect(validateContact({ ...valid, name: "a".repeat(101) }).name).toBeDefined();
    expect(validateContact({ ...valid, name: "a".repeat(100) }).name).toBeUndefined();
  });

  it.each(["", "ada", "ada@", "@example.com", "ada@example", "ada @example.com", "ada@exa mple.com"])(
    "rejects the email %j",
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBeDefined();
    },
  );

  it("rejects an email longer than 200 characters", () => {
    expect(validateContact({ ...valid, email: `${"a".repeat(195)}@ex.com` }).email).toBeDefined();
  });

  it("enforces the message length bounds", () => {
    expect(validateContact({ ...valid, message: "too short" }).message).toBeDefined();
    expect(validateContact({ ...valid, message: "a".repeat(10) }).message).toBeUndefined();
    expect(validateContact({ ...valid, message: "a".repeat(5000) }).message).toBeUndefined();
    expect(validateContact({ ...valid, message: "a".repeat(5001) }).message).toBeDefined();
  });
});

describe("firstError", () => {
  it("returns undefined when there are no errors", () => {
    expect(firstError({})).toBeUndefined();
  });

  it("reports errors in field order: name, email, message", () => {
    expect(firstError({ message: "messageShort", email: "emailInvalid", name: "nameMissing" })).toBe("nameMissing");
    expect(firstError({ message: "messageShort", email: "emailInvalid" })).toBe("emailInvalid");
    expect(firstError({ message: "messageShort" })).toBe("messageShort");
  });
});

describe("createRateLimiter", () => {
  it("allows up to the limit and blocks the next call", () => {
    const limited = createRateLimiter(3, 1000, () => 0);
    expect([limited("a"), limited("a"), limited("a")]).toEqual([false, false, false]);
    expect(limited("a")).toBe(true);
  });

  it("tracks keys independently", () => {
    const limited = createRateLimiter(1, 1000, () => 0);
    expect(limited("a")).toBe(false);
    expect(limited("b")).toBe(false);
    expect(limited("a")).toBe(true);
  });

  it("lets calls through again once the window has passed", () => {
    let t = 0;
    const limited = createRateLimiter(1, 1000, () => t);
    expect(limited("a")).toBe(false);
    t = 999;
    expect(limited("a")).toBe(true);
    t = 1000;
    expect(limited("a")).toBe(false);
  });

  it("does not extend the window when a blocked caller keeps retrying", () => {
    let t = 0;
    const limited = createRateLimiter(1, 1000, () => t);
    limited("a");
    t = 500;
    expect(limited("a")).toBe(true);
    t = 1000;
    expect(limited("a")).toBe(false);
  });
});

describe("buildEmail", () => {
  it("puts the reason and name in the subject and all fields in the body", () => {
    const mail = buildEmail(valid);
    expect(mail.subject).toBe("[Internship] New message from Ada Lovelace");
    expect(mail.text).toContain("Email: ada@example.com");
    expect(mail.text.endsWith(valid.message)).toBe(true);
  });

  it("flattens line breaks in header-like fields", () => {
    const mail = buildEmail({ ...valid, name: "Ada\r\nBcc: someone@example.com" });
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(mail.text.split("\n")[1]).toBe("Name: Ada Bcc: someone@example.com");
  });

  it("keeps line breaks inside the message itself", () => {
    expect(buildEmail({ ...valid, message: "line one\nline two" }).text).toContain("line one\nline two");
  });
});
