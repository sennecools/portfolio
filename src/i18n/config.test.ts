import { describe, expect, it } from "vitest";
import { formatDate } from "@/lib/posts";
import { fill, isLocale, localePath, splitLocale } from "./config";

describe("localePath", () => {
  it("leaves paths in the default language without a prefix", () => {
    expect(localePath("en", "/")).toBe("/");
    expect(localePath("en", "/blog")).toBe("/blog");
    expect(localePath("en", "/#work")).toBe("/#work");
  });

  it("prefixes other languages, keeping the hash", () => {
    expect(localePath("nl", "/")).toBe("/nl");
    expect(localePath("nl", "/blog/a-post")).toBe("/nl/blog/a-post");
    expect(localePath("nl", "/#work")).toBe("/nl#work");
  });
});

describe("splitLocale", () => {
  it("reads the language from the prefix", () => {
    expect(splitLocale("/nl/work/astrum")).toEqual({ locale: "nl", path: "/work/astrum" });
    expect(splitLocale("/nl")).toEqual({ locale: "nl", path: "/" });
  });

  it("treats an unprefixed path as the default language", () => {
    expect(splitLocale("/work/astrum")).toEqual({ locale: "en", path: "/work/astrum" });
    expect(splitLocale("/")).toEqual({ locale: "en", path: "/" });
    expect(splitLocale("/nlx/page")).toEqual({ locale: "en", path: "/nlx/page" });
  });

  it("round-trips with localePath", () => {
    for (const path of ["/", "/blog", "/work/diffrast"]) {
      expect(splitLocale(localePath("nl", path))).toEqual({ locale: "nl", path });
    }
  });
});

describe("isLocale and fill", () => {
  it("accepts only configured languages", () => {
    expect(isLocale("nl")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it("fills placeholders and leaves unknown ones alone", () => {
    expect(fill("Thanks, {name}", { name: "Ada" })).toBe("Thanks, Ada");
    expect(fill("{n} min read", { n: 4 })).toBe("4 min read");
    expect(fill("Hi {who}", {})).toBe("Hi {who}");
  });
});

describe("formatDate per language", () => {
  it("writes dates in the page's language", () => {
    expect(formatDate("2026-10-01", "long", "nl")).toBe("1 oktober 2026");
    expect(formatDate("2026-10-01", "long", "en")).toBe("1 October 2026");
  });
});
