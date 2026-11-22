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
    /** Drop your CV at public/cv.pdf and the CV links switch on by themselves. */
    cv: "/cv.pdf",
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
    location: "Heist-op-den-Berg, Belgium",
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
      { label: "Looking for", value: "Internship · Feb–May 2027" },
      { label: "Based in", value: "Heist o/d Berg" },
      { label: "Languages", value: "Dutch · English" },
    ],
    about: {
      lead: "I like building the tools around a product as much as the product itself: the CLI that makes an update safe, the mod that shows what a server is doing, the site that explains it all.",
      text: "Most of what I build starts with Sen’s Network, the modded Minecraft servers I run. That is where the update tool in Rust and the tab-list mod, now at about 10,000 downloads, came from. Next I want an internship where I can work on real systems with people who know more than I do.",
      photoAlt: "Senne Cools leaning on a snowy railing at a mountain viewpoint, with clouds behind him.",
      facts: [
        { label: "Studying", value: "Applied Computer Science, Odisee, graduating 2027" },
        { label: "Works with", value: "TypeScript · React · Rust · Java · Linux" },
      ],
    },
    contact: {
      text: "I’m looking for an internship from 15 February to 27 May 2027, Monday to Thursday on site, around Mechelen and Heist-op-den-Berg. Have an opening, or a question about something I built? Write to me in Dutch or English. I usually reply within a few days.",
    },
    blog: {
      intro: "Project updates, things I learned and the decisions behind them.",
    },
  },
  nl: {
    location: "Heist-op-den-Berg, België",
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
      { label: "Op zoek naar", value: "Stage · feb–mei 2027" },
      { label: "Woont in", value: "Heist o/d Berg" },
      { label: "Talen", value: "Nederlands · Engels" },
    ],
    about: {
      lead: "Ik bouw de tools rond een product even graag als het product zelf: de CLI die een update veilig maakt, de mod die toont wat een server doet, de site die alles uitlegt.",
      text: "Veel van wat ik bouw begint bij Sen’s Network, de modded Minecraft-servers die ik draai. Daar kwamen de updatetool in Rust en de spelerslijst-mod vandaan, die intussen zo’n 10.000 downloads heeft. Nu zoek ik een stage waar ik aan echte systemen werk, met mensen die meer weten dan ik.",
      photoAlt: "Senne Cools leunend op een besneeuwde reling op een uitkijkpunt in de bergen, met wolken achter hem.",
      facts: [
        { label: "Studie", value: "Toegepaste Informatica, Odisee, afstuderen in 2027" },
        { label: "Werkt met", value: "TypeScript · React · Rust · Java · Linux" },
      ],
    },
    contact: {
      text: "Ik zoek een stage van 15 februari tot 27 mei 2027, van maandag tot donderdag ter plaatse, in de regio Mechelen en Heist-op-den-Berg. Heb je een stageplaats, of een vraag over iets wat ik bouwde? Schrijf me in het Nederlands of Engels. Meestal antwoord ik binnen een paar dagen.",
    },
    blog: {
      intro: "Projectupdates, wat ik leerde en de keuzes erachter.",
    },
  },
};

export function getSiteText(locale: Locale): SiteText {
  return siteText[locale];
}
