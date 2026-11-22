import type { ProjectSource } from "../types";

const shot = (name: string) => `/projects/beyond-talent-ats/${name}.jpg`;

export const project: ProjectSource = {
  slug: "beyond-talent-ats",
  title: "Beyond Talent ATS",
  category: { en: "Client work", nl: "Klantproject" },
  kind: { en: "Applicant tracking system", nl: "Rekruteringssysteem" },
  summary: {
    en: "The applicant tracking system a Belgian recruitment agency runs on: candidates, vacancies, clients, a shared agenda and GDPR retention in one place. I designed, built and run it.",
    nl: "Het rekruteringssysteem waarop een Belgisch rekrutatiebureau draait: kandidaten, vacatures, klanten, een gedeelde agenda en GDPR-bewaartermijnen op één plek. Ik ontwierp, bouwde en beheer het.",
  },
  intro: {
    en: "Beyond Talent is a Belgian recruitment agency. This is the system its recruiters work in every day: they follow each candidate through every vacancy, plan interviews together, keep notes for the team and stay within the GDPR, while the agency’s website reads its vacancies from it.",
    nl: "Beyond Talent is een Belgisch rekrutatiebureau. Dit is het systeem waarin de recruiters elke dag werken: ze volgen elke kandidaat door elke vacature, plannen samen gesprekken, houden notities bij voor het team en blijven binnen de GDPR, terwijl de website van het bureau er zijn vacatures uit haalt.",
  },
  role: { en: "Full-stack developer · freelance", nl: "Full-stack developer · freelance" },
  year: "2025–26",
  status: { en: "Live", nl: "In gebruik" },
  stack: "Next.js · TypeScript · PostgreSQL",
  placement: "featured",
  links: [],
  cover: shot("dashboard"),
  coverCaption: { en: "The dashboard: what needs attention today and what is planned.", nl: "Het overzicht: wat vandaag aandacht vraagt en wat er gepland staat." },
  coverAlt: {
    en: "The dashboard: candidates waiting for review, interviews in the coming four weeks and counts of open vacancies, clients and candidates.",
    nl: "Het overzicht: kandidaten die op een beoordeling wachten, gesprekken in de komende vier weken en tellers voor vacatures, klanten en kandidaten.",
  },
  context: {
    en: [
      "A recruiter follows dozens of candidates at once, each in a different stage for a different vacancy, often for several clients. The agency needed one place where the whole team sees where every candidate stands, what happens next and who is talking to whom.",
      "The system stores CVs and personal details, so privacy is part of the design rather than an afterthought: the GDPR decides how long the agency may keep each candidate’s data, and it is built so more than one agency can use it, each seeing only its own data.",
    ],
    nl: [
      "Een recruiter volgt tientallen kandidaten tegelijk op, elk in een andere fase voor een andere vacature, vaak voor verschillende klanten. Het bureau had één plek nodig waar het hele team ziet waar elke kandidaat staat, wat de volgende stap is en wie met wie praat.",
      "Het systeem bewaart cv’s en persoonsgegevens, dus privacy zit in het ontwerp en niet achteraf: de GDPR bepaalt hoe lang het bureau de gegevens van elke kandidaat mag houden. Het is ook zo gebouwd dat meerdere bureaus het kunnen gebruiken, elk met alleen hun eigen gegevens.",
    ],
  },
  built: {
    en: [
      "Every vacancy has its own pipeline, from new to hired, with stages the agency can rename and reorder. A candidate can be in several vacancies at once, each at its own stage, and the dashboard flags anyone who has sat in the first stage for three days.",
      "A candidate’s profile brings everything together: upcoming interviews and follow-ups, the vacancies they are in, notes where colleagues can be mentioned with @, and a timeline of every call, email and status change. CVs and documents are stored privately and only served to signed-in users.",
      "The shared agenda links every appointment to a candidate, vacancy or client, colours it by type and checks whether the recruiter is free. Search with ⌘K finds any candidate, vacancy or company from anywhere in the app.",
      "The agency’s public website, which I also built, reads its vacancies through an API with a key per agency. Applications sent through the website arrive as candidates, and the system checks for duplicates first.",
    ],
    nl: [
      "Elke vacature heeft een eigen pipeline, van nieuw tot aangeworven, met fases die het bureau zelf kan hernoemen en herschikken. Een kandidaat kan in meerdere vacatures tegelijk zitten, elk in een eigen fase, en het overzicht toont wie al drie dagen in de eerste fase staat.",
      "Het profiel van een kandidaat brengt alles samen: komende gesprekken en opvolging, de vacatures waarvoor hij loopt, notities waarin je collega’s met @ vermeldt, en een tijdlijn van elk telefoontje, elke mail en elke statuswijziging. Cv’s en documenten worden privé bewaard en alleen getoond aan wie ingelogd is.",
      "De gedeelde agenda koppelt elke afspraak aan een kandidaat, vacature of klant, kleurt ze per soort en controleert of de recruiter vrij is. Met ⌘K vind je vanuit elke pagina elke kandidaat, vacature of elk bedrijf.",
      "De publieke website van het bureau, die ik ook bouwde, haalt zijn vacatures op via een API met een sleutel per bureau. Sollicitaties via de website komen binnen als kandidaat, en het systeem controleert eerst op dubbels.",
    ],
  },
  stackRows: [
    { label: "Framework", value: "Next.js 16, React 19, TypeScript" },
    { label: { en: "Data", nl: "Database" }, value: "PostgreSQL, Prisma" },
    { label: { en: "Files", nl: "Bestanden" }, value: { en: "Vercel Blob, private store for CVs", nl: "Vercel Blob, privé opslag voor cv’s" } },
    { label: { en: "Background jobs", nl: "Achtergrondtaken" }, value: { en: "Vercel Cron: retention every night, notifications every 5 minutes", nl: "Vercel Cron: bewaartermijnen elke nacht, meldingen elke 5 minuten" } },
    { label: "Monitoring", value: "Sentry" },
    { label: "Tests", value: { en: "Vitest, about 800 tests", nl: "Vitest, ongeveer 800 tests" } },
  ],
  challenges: [
    {
      title: { en: "Not Keeping Data Too Long", nl: "Gegevens niet te lang bewaren" },
      text: {
        en: "Under the GDPR, how long the agency may keep a candidate’s data depends on what happened with that candidate. The system works out when each record expires, shows recruiters which ones need a decision, and deletes expired data every night.",
        nl: "Hoe lang het bureau de gegevens van een kandidaat mag bewaren, hangt onder de GDPR af van wat er met die kandidaat gebeurde. Het systeem berekent wanneer elk dossier vervalt, toont recruiters welke een beslissing nodig hebben en verwijdert vervallen gegevens elke nacht.",
      },
    },
    {
      title: { en: "One System, Several Agencies", nl: "Eén systeem, meerdere bureaus" },
      text: {
        en: "Every record belongs to an organisation, and the server checks the user’s membership before any query runs, so one agency can never see another’s candidates. That check runs on almost every request, so the result is cached for 30 seconds to keep pages fast.",
        nl: "Elk gegeven hoort bij een organisatie, en de server controleert het lidmaatschap van de gebruiker voor er ook maar één query loopt, zodat een bureau nooit de kandidaten van een ander ziet. Die controle gebeurt bij bijna elk verzoek, dus het resultaat wordt 30 seconden bewaard om de pagina’s snel te houden.",
      },
    },
    {
      title: { en: "Notifications Without the Wait", nl: "Meldingen zonder te wachten" },
      text: {
        en: "Mentioning a colleague in a note should not make saving the note slower. The note is saved together with a small outbox record, and a scheduled job turns those records into notifications for each person a few minutes later.",
        nl: "Een collega vermelden in een notitie mag het bewaren niet trager maken. De notitie wordt samen met een klein outbox-record bewaard, en een geplande taak zet die records enkele minuten later om in meldingen voor elke persoon.",
      },
    },
  ],
  gallery: [
    {
      src: shot("agenda"),
      alt: { en: "A week in the shared agenda, full of screenings, interviews, assessments and client meetings, each coloured by type.", nl: "Een week in de gedeelde agenda, vol screenings, interviews, assessments en klantafspraken, elk gekleurd per soort." },
      caption: { en: "The shared agenda, coloured by type of appointment.", nl: "De gedeelde agenda, gekleurd per soort afspraak." },
    },
    {
      src: shot("appointment"),
      alt: { en: "The dialog for editing an appointment, with a day planner on the left and the type, location, candidate and vacancy on the right.", nl: "Het venster om een afspraak te bewerken, met een dagplanning links en het soort gesprek, de locatie, de kandidaat en de vacature rechts." },
      caption: { en: "Planning an interview, with a check that the recruiter is free.", nl: "Een gesprek plannen, met een controle of de recruiter vrij is." },
    },
    {
      src: shot("candidate"),
      alt: { en: "A candidate profile with upcoming interviews, three linked vacancies at different stages and six internal notes from the team.", nl: "Een kandidaatprofiel met komende gesprekken, drie gekoppelde vacatures in verschillende fases en zes interne notities van het team." },
      caption: { en: "One candidate in three vacancies, with the team’s notes.", nl: "Eén kandidaat in drie vacatures, met de notities van het team." },
    },
    {
      src: shot("activity"),
      alt: { en: "A candidate’s timeline of notes, calls, emails and status changes, filtered by type, next to a contact summary.", nl: "De tijdlijn van een kandidaat met notities, telefoons, mails en statuswijzigingen, filterbaar per soort, naast een contactoverzicht." },
      caption: { en: "Every call, email, note and status change on one timeline.", nl: "Elk telefoontje, elke mail, notitie en statuswijziging op één tijdlijn." },
    },
    {
      src: shot("vacancy"),
      alt: { en: "The candidates of one vacancy, each with their stage, next step, source and the date they were linked.", nl: "De kandidaten van één vacature, elk met hun fase, volgende stap, bron en de datum waarop ze gekoppeld werden." },
      caption: { en: "One vacancy: where every candidate stands and what comes next.", nl: "Eén vacature: waar elke kandidaat staat en wat er volgt." },
    },
    {
      src: shot("candidates"),
      alt: { en: "The candidate list with name, contact details, source, status and how many vacancies and talent pools each candidate is in.", nl: "De kandidatenlijst met naam, contactgegevens, bron, status en in hoeveel vacatures en werfreserves elke kandidaat zit." },
      caption: { en: "All candidates, with saved views for daily work.", nl: "Alle kandidaten, met vaste weergaven voor het dagelijkse werk." },
    },
    {
      src: shot("search"),
      alt: { en: "The ⌘K search window over the dashboard, showing a matching candidate.", nl: "Het ⌘K-zoekvenster boven het overzicht, met een gevonden kandidaat." },
      caption: { en: "⌘K finds any candidate, vacancy or company.", nl: "⌘K vindt elke kandidaat, vacature of elk bedrijf." },
    },
    {
      src: shot("company"),
      alt: { en: "A client company with its profile, four contact people, documents and internal notes.", nl: "Een klantbedrijf met zijn profiel, vier contactpersonen, documenten en interne notities." },
      caption: { en: "A client with its contacts, documents and notes.", nl: "Een klant met zijn contactpersonen, documenten en notities." },
    },
    {
      src: shot("talent-pool"),
      alt: { en: "A talent pool of IT candidates with their profile, status, location and when they were last active.", nl: "Een werfreserve met IT-kandidaten, hun profiel, status, locatie en wanneer ze laatst actief waren." },
      caption: { en: "A talent pool of candidates for the next vacancy that fits.", nl: "Een werfreserve met kandidaten voor de volgende vacature die past." },
    },
  ],
};
