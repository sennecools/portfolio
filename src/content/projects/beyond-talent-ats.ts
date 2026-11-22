import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "beyond-talent-ats",
  title: "Beyond Talent ATS",
  category: { en: "Client work", nl: "Klantproject" },
  kind: "Web app",
  summary: {
    en: "The system a Belgian recruitment agency uses to manage its candidates, vacancies and client companies. I built it as the only developer.",
    nl: "Het systeem waarmee een Belgisch rekrutatiebureau zijn kandidaten, vacatures en klantbedrijven beheert. Ik bouwde het als enige developer.",
  },
  intro: {
    en: "Beyond Talent is a Belgian recruitment agency. This is the system its recruiters work in: every candidate, vacancy and client company, and all contact between them, in one place.",
    nl: "Beyond Talent is een Belgisch rekrutatiebureau. Dit is het systeem waarin de recruiters werken: elke kandidaat, vacature en klant, en al het contact daartussen, op één plek.",
  },
  role: { en: "Sole developer", nl: "Enige developer" },
  year: "2025–26",
  status: { en: "Live", nl: "In gebruik" },
  stack: "Next.js · PostgreSQL",
  placement: "featured",
  links: [],
  context: {
    en: [
      "A recruiter follows many candidates at once, each at a different stage for a different vacancy. The agency needed one place to keep track of all of it. Because the system stores CVs and personal details, it also has to follow the GDPR.",
    ],
    nl: [
      "Een recruiter volgt veel kandidaten tegelijk op, elk in een andere fase voor een andere vacature. Het bureau had één plek nodig om dat allemaal bij te houden. Omdat het systeem cv’s en persoonsgegevens bewaart, moet het ook de GDPR volgen.",
    ],
  },
  built: {
    en: [
      "Recruiters can add and search candidates, vacancies and companies, keep a pool of promising candidates for later, plan appointments in a shared agenda, log calls and emails, and store CVs.",
      "The system is connected to the agency’s public website, which I also built. A vacancy published here appears on the website, and an application sent through the website arrives here as a new candidate, or is added to the candidate if they are already known.",
    ],
    nl: [
      "Recruiters kunnen kandidaten, vacatures en bedrijven toevoegen en doorzoeken, een werfreserve bijhouden voor later, afspraken plannen in een gedeelde agenda, telefoons en mails noteren en cv’s bewaren.",
      "Het systeem is gekoppeld aan de publieke website van het bureau, die ik ook bouwde. Een vacature die hier gepubliceerd wordt, verschijnt op de website, en een sollicitatie via de website komt hier binnen als nieuwe kandidaat, of wordt toegevoegd aan de kandidaat als die al gekend is.",
    ],
  },
  stackRows: [
    { label: "Framework", value: "Next.js, React, TypeScript" },
    { label: { en: "Data", nl: "Database" }, value: "PostgreSQL" },
    { label: "Hosting", value: "Vercel" },
  ],
  challenges: [
    {
      title: { en: "Not Keeping Data Too Long", nl: "Gegevens niet te lang bewaren" },
      text: {
        en: "Under the GDPR, how long the agency may keep a candidate’s data depends on what happened with that candidate. The system works out when each record expires, shows recruiters which ones need a decision, and deletes expired data every night.",
        nl: "Hoe lang het bureau de gegevens van een kandidaat mag bewaren, hangt onder de GDPR af van wat er met die kandidaat gebeurde. Het systeem berekent wanneer elk dossier vervalt, toont recruiters welke een beslissing nodig hebben en verwijdert vervallen gegevens elke nacht.",
      },
    },
  ],
  gallery: [],
};
