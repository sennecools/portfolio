import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "taskboard",
  placement: "index",
  category: { en: "School project", nl: "Schoolproject" },
  title: "ToriBoard",
  kind: "Web app",
  summary: {
    en: "A task board for teams where everyone sees each other’s changes live. It began as a school project, and I rebuilt it on my own.",
    nl: "Een takenbord voor teams waarop iedereen elkaars wijzigingen live ziet. Het begon als schoolproject, en ik bouwde het daarna alleen opnieuw.",
  },
  intro: {
    en: "ToriBoard is a task board for teams: columns of tasks that you drag from stage to stage. Everyone on a board sees changes, cursors and who is online as it happens, and it keeps working offline.",
    nl: "ToriBoard is een takenbord voor teams: kolommen met taken die je van fase naar fase sleept. Iedereen op een bord ziet wijzigingen, cursors en wie online is terwijl het gebeurt, en het blijft offline werken.",
  },
  role: {
    en: "Lead developer, then sole developer of the rebuild",
    nl: "Hoofdontwikkelaar, daarna enige developer van de herbouw",
  },
  year: "2025–26",
  status: { en: "Live, rebuilt in 2026", nl: "Live, herbouwd in 2026" },
  stack: "React · SpacetimeDB",
  links: [
    { kind: "demo", href: "https://toriboard.sennerd.com/demo" },
    { kind: "site", href: "https://toriboard.sennerd.com/" },
  ],
  cover: "/projects/taskboard/board.jpg",
  coverAlt: {
    en: "A ToriBoard board in dark mode, with a second participant’s live cursor and presence avatar.",
    nl: "Een ToriBoard-bord in donkere modus, met de live cursor en avatar van een tweede deelnemer.",
  },
  context: {
    en: [
      "ToriBoard started as a school project for two people: my teammate built the login, home page and settings, and I built the board. Afterwards I rebuilt the whole app on my own, on SpacetimeDB, a database that sends every change straight to everyone looking at it.",
    ],
    nl: [
      "ToriBoard begon als schoolproject met twee: mijn teamgenoot bouwde de login, de startpagina en de instellingen, en ik het bord. Daarna bouwde ik de hele app alleen opnieuw op SpacetimeDB, een database die elke wijziging meteen doorstuurt naar iedereen die meekijkt.",
    ],
  },
  built: {
    en: [
      "Tasks have checklists, comments, labels and due dates, and also appear in a week or month calendar. Each board has four roles, from owner to viewer, and the server checks what each person may do.",
      "The app can be installed on a phone or computer like a regular app, and sends notifications.",
    ],
    nl: [
      "Taken hebben checklists, reacties, labels en deadlines, en verschijnen ook in een week- of maandkalender. Elk bord heeft vier rollen, van eigenaar tot kijker, en de server controleert wat iedereen mag doen.",
      "De app kan je op je gsm of computer installeren als een gewone app, en hij stuurt meldingen.",
    ],
  },
  stackRows: [
    { label: "Frontend", value: "React, TypeScript, Tailwind CSS" },
    { label: "Backend", value: "SpacetimeDB" },
    { label: "Hosting", value: "Vercel" },
  ],
  challenges: [
    {
      title: { en: "Moving Cards at the Same Time", nl: "Tegelijk kaartjes verslepen" },
      text: {
        en: "When two people move cards at once, both must end up seeing the same order. A move only goes through if the cards around its new spot haven’t changed in the meantime, so the board never gets out of step.",
        nl: "Als twee mensen tegelijk kaartjes verslepen, moeten ze allebei dezelfde volgorde te zien krijgen. Een verplaatsing gaat pas door als de kaartjes rond de nieuwe plek intussen niet veranderd zijn, zodat het bord nooit uit de pas loopt.",
      },
    },
  ],
  gallery: [
    {
      src: "/projects/taskboard/login-dark.jpg",
      alt: {
        en: "ToriBoard landing page in dark mode with the heading Plan together, live, a preview board and a Try the live demo button.",
        nl: "Landingspagina van ToriBoard in donkere modus met de titel Plan together, live, een voorbeeldbord en een knop om de demo te proberen.",
      },
      caption: {
        en: "The landing page. Anyone can try a shared demo board without an account.",
        nl: "De landingspagina. Iedereen kan zonder account een gedeeld demobord uitproberen.",
      },
    },
    {
      src: "/projects/taskboard/board-light.jpg",
      alt: {
        en: "A ToriBoard board in light mode with Backlog, To do, In progress and Done columns full of task cards.",
        nl: "Een ToriBoard-bord in lichte modus met de kolommen Backlog, To do, In progress en Done vol taken.",
      },
      caption: { en: "A board in light mode.", nl: "Een bord in lichte modus." },
    },
    {
      src: "/projects/taskboard/calendar.jpg",
      alt: {
        en: "Month calendar view of November 2026 with tasks placed on their due dates.",
        nl: "Maandkalender van november 2026 met de taken op hun deadline.",
      },
      caption: {
        en: "The calendar shows every task on its due date.",
        nl: "De kalender toont elke taak op haar deadline.",
      },
    },
    {
      src: "/projects/taskboard/task-modal.jpg",
      alt: {
        en: "Task dialog with a description, a checklist, comments, assignee, priority, due date, tags and a colour picker.",
        nl: "Taakvenster met een beschrijving, een checklist, reacties, de toegewezen persoon, prioriteit, deadline, labels en een kleurkiezer.",
      },
      caption: {
        en: "An open task with its checklist and comments. Changes save automatically.",
        nl: "Een geopende taak met checklist en reacties. Wijzigingen worden automatisch bewaard.",
      },
    },
  ],
};
