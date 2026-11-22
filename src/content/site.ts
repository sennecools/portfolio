import type { Localized } from "@/content/types";
import type { Locale } from "@/i18n/config";

/**
 * Everything personal on the site lives here: facts that read the same in every language in
 * `site`, and the text per language in `siteText`.
 * Leave a fact out until it is real: nothing in [brackets] should ever reach the page.
 */
export const site = {
  name: "Senne Cools",
  /** Used for RSS, the sitemap and social cards. NEXT_PUBLIC_SITE_URL overrides it. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sennerd.com",
  email: "sennecools2004@gmail.com",

  links: {
    github: "https://github.com/sennecools",
    linkedin: "https://www.linkedin.com/in/senne-cools/",
    /** A CV per language in /public; the CV links switch on once the file exists. */
    cv: { en: "/senne-cools-cv-en.pdf", nl: "/senne-cools-cv-nl.pdf" },
  },

  photos: {
    hero: "/about/hero.jpg",
    about: "/about/about.jpg",
  },

  /** The contact form's options. Their labels per language are in the dictionary. */
  contactReasons: ["internship", "project", "hi"] as const,
} as const;

export type ContactReason = (typeof site.contactReasons)[number];

type SiteText = {
  location: string;
  description: string;
  hero: { title: string[]; intro: string; photoAlt: string };
  /** The four facts directly under the hero. */
  glance: { label: string; value: string }[];
  about: { lead: string; text: string; photoAlt: string; facts: { label: string; value: string }[] };
  contact: { text: string };
  blog: { intro: string };
};

const siteText: Localized<SiteText> = {
  en: {
    location: "Belgium",
    description:
      "Senne Cools is a full-stack developer and Applied Computer Science student in Belgium, building web apps, server tooling and self-hosted infrastructure.",
    hero: {
      title: ["Web apps,", "server tools", "& game mods"],
      intro:
        "I’m an Applied Computer Science student at Odisee in Belgium. I built the applicant tracking system and website of a Belgian recruitment agency, and I write the tools and mods for the Minecraft servers I run.",
      photoAlt: "Senne Cools smiling on a rocky hilltop, with Athens and its hills in the background.",
    },
    glance: [
      { label: "Studying", value: "Applied CS · Odisee" },
      { label: "Focus", value: "Full-stack · Systems" },
      { label: "Based in", value: "Belgium" },
      { label: "Languages", value: "Dutch · English" },
    ],
    about: {
      lead: "I build software people rely on every day, and I want to understand it all the way down.",
      text: "My biggest project is the applicant tracking system of Beyond Talent, which I took from first sketch to production and still run. Alongside it I build things I want to get to the bottom of: a 3D renderer for the GPU, a game engine in Rust and a Minecraft mod with more than 10,000 downloads.",
      photoAlt: "Senne Cools leaning on a snowy railing at a mountain viewpoint, with clouds behind him.",
      facts: [
        { label: "Studying", value: "Applied Computer Science, Odisee, graduating 2027" },
        { label: "Code", value: "TypeScript, Rust, Java, Python" },
        { label: "Web", value: "React, Next.js, PostgreSQL" },
        { label: "Systems", value: "Linux, Docker, Vercel, Cloudflare" },
      ],
    },
    contact: {
      text: "A question about something I built, a project, or an opening in your team? Write to me in Dutch or English. I usually reply within a few days.",
    },
    blog: {
      intro: "Project updates, things I learned and the decisions behind them.",
    },
  },
  nl: {
    location: "België",
    description:
      "Senne Cools is full-stack developer en student Toegepaste Informatica in België. Hij bouwt webapps, servertools en zelfgehoste infrastructuur.",
    hero: {
      title: ["Webapps,", "servertools", "& gamemods"],
      intro:
        "Ik studeer Toegepaste Informatica aan Odisee. Ik bouwde het rekruteringssysteem en de website van een Belgisch rekrutatiebureau, en ik schrijf de tools en mods voor de Minecraft-servers die ik draai.",
      photoAlt: "Senne Cools lachend op een rotsige heuvel, met Athene en de heuvels op de achtergrond.",
    },
    glance: [
      { label: "Studie", value: "Toegepaste Informatica · Odisee" },
      { label: "Focus", value: "Full-stack · Systemen" },
      { label: "Woont in", value: "België" },
      { label: "Talen", value: "Nederlands · Engels" },
    ],
    about: {
      lead: "Ik bouw software waar mensen elke dag op rekenen, en ik wil begrijpen hoe ze tot onderaan werkt.",
      text: "Mijn grootste project is het rekruteringssysteem van Beyond Talent, dat ik van eerste schets tot productie bracht en nog altijd beheer. Daarnaast bouw ik dingen die ik tot op de bodem wil begrijpen: een 3D-renderer voor de GPU, een game-engine in Rust en een Minecraft-mod met meer dan 10.000 downloads.",
      photoAlt: "Senne Cools leunend op een besneeuwde reling op een uitkijkpunt in de bergen, met wolken achter hem.",
      facts: [
        { label: "Studie", value: "Toegepaste Informatica, Odisee, afstuderen in 2027" },
        { label: "Code", value: "TypeScript, Rust, Java, Python" },
        { label: "Web", value: "React, Next.js, PostgreSQL" },
        { label: "Systemen", value: "Linux, Docker, Vercel, Cloudflare" },
      ],
    },
    contact: {
      text: "Een vraag over iets wat ik bouwde, een project, of een plaats in je team? Schrijf me in het Nederlands of Engels. Meestal antwoord ik binnen een paar dagen.",
    },
    blog: {
      intro: "Projectupdates, wat ik leerde en de keuzes erachter.",
    },
  },
};

export function getSiteText(locale: Locale): SiteText {
  return siteText[locale];
}
