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
  cover: "/projects/beyond-talent-ats/dashboard.jpg",
  coverAlt: {
    en: "The ATS dashboard with counts of active vacancies, clients and candidates, and a list of interviews planned for the coming weeks. Shown with fictitious demo data.",
    nl: "Het overzicht van het ATS met tellers voor actieve vacatures, klanten en kandidaten, en een lijst met gesprekken in de komende weken. Getoond met fictieve demodata.",
  },
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
  gallery: [
    {
      src: "/projects/beyond-talent-ats/candidate.jpg",
      alt: {
        en: "A candidate profile with upcoming follow-ups, the vacancy the candidate is linked to and its stage, and internal notes from the team.",
        nl: "Een kandidaatprofiel met de komende opvolging, de gekoppelde vacature en de fase waarin de kandidaat zit, en interne notities van het team.",
      },
      caption: {
        en: "A candidate’s profile: what needs to happen next, which vacancies they are in, and notes only the team can see.",
        nl: "Het profiel van een kandidaat: wat er nog moet gebeuren, voor welke vacatures die loopt, en notities die alleen het team ziet.",
      },
    },
    {
      src: "/projects/beyond-talent-ats/planning.jpg",
      alt: {
        en: "A week view of the shared agenda with screenings, interviews and an assessment, coloured by type.",
        nl: "Een weekoverzicht van de gedeelde agenda met screenings, interviews en een assessment, gekleurd per soort.",
      },
      caption: {
        en: "The shared agenda, where every interview is linked to a candidate and a vacancy.",
        nl: "De gedeelde agenda, waarin elk gesprek gekoppeld is aan een kandidaat en een vacature.",
      },
    },
    {
      src: "/projects/beyond-talent-ats/appointment.jpg",
      alt: {
        en: "The dialog for editing an appointment, with a day planner on the left and the type, location, candidate and vacancy on the right.",
        nl: "Het venster om een afspraak te bewerken, met een dagplanning links en het soort gesprek, de locatie, de kandidaat en de vacature rechts.",
      },
      caption: {
        en: "Planning an interview: drag it to a free moment, and the system checks the recruiter is available.",
        nl: "Een gesprek plannen: sleep het naar een vrij moment, en het systeem controleert of de recruiter beschikbaar is.",
      },
    },
  ],
};
