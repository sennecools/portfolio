import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "beyond-talent",
  title: "Beyond Talent website",
  category: { en: "Client work", nl: "Klantproject" },
  kind: "Website",
  summary: {
    en: "The public website of a Belgian recruitment agency, in Dutch and English, where candidates find vacancies and apply.",
    nl: "De publieke website van een Belgisch rekrutatiebureau, in het Nederlands en Engels, waar kandidaten vacatures vinden en solliciteren.",
  },
  intro: {
    en: "The website of Beyond Talent, a Belgian recruitment agency. Companies read about its services, and candidates browse open vacancies and apply, in Dutch or English.",
    nl: "De website van Beyond Talent, een Belgisch rekrutatiebureau. Bedrijven lezen er over de diensten, en kandidaten bekijken openstaande vacatures en solliciteren, in het Nederlands of Engels.",
  },
  role: { en: "Full-stack developer · freelance", nl: "Full-stack developer · freelance" },
  year: "2025–26",
  status: "Live",
  stack: "Next.js · Tailwind CSS",
  placement: "index",
  links: [{ kind: "site", href: "https://www.beyond-talent.be" }],
  cover: "/projects/beyond-talent/cover.png",
  coverAlt: {
    en: "Home page of the Beyond Talent website: the headline Unlock What’s Beyond with buttons for companies and candidates.",
    nl: "Startpagina van de Beyond Talent-website: de titel Unlock What’s Beyond met knoppen voor bedrijven en kandidaten.",
  },
  context: {
    en: [
      "The agency’s recruiters manage their vacancies in the ATS I built for them. The website had to show those vacancies to candidates without anyone copying them over by hand.",
    ],
    nl: [
      "De recruiters van het bureau beheren hun vacatures in het ATS dat ik voor hen bouwde. De website moest die vacatures tonen aan kandidaten, zonder dat iemand ze met de hand moest overnemen.",
    ],
  },
  built: {
    en: [
      "I built the pages for companies and for candidates, the pages about the team and its values, a contact form and a vacancy overview with search.",
      "Vacancies come straight from the ATS: one published there appears on the site within five minutes, and an application sent through the site lands in the ATS as a candidate.",
    ],
    nl: [
      "Ik bouwde de pagina’s voor bedrijven en voor kandidaten, de pagina’s over het team en zijn waarden, een contactformulier en een vacatureoverzicht met zoekfunctie.",
      "De vacatures komen rechtstreeks uit het ATS: wat daar gepubliceerd wordt, staat binnen vijf minuten op de site, en een sollicitatie via de site komt in het ATS terecht als kandidaat.",
    ],
  },
  stackRows: [
    { label: "Framework", value: "Next.js, React, TypeScript, Tailwind CSS" },
    { label: { en: "Languages", nl: "Talen" }, value: { en: "Dutch and English", nl: "Nederlands en Engels" } },
    { label: "Hosting", value: "Vercel" },
  ],
  challenges: [],
  gallery: [],
};
