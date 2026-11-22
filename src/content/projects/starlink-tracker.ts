import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "starlink-tracker",
  placement: "index",
  category: { en: "Side project", nl: "Zijproject" },
  title: "Starlink Tracker",
  kind: "Web app",
  summary: {
    en: "A 3D globe in the browser that shows every Starlink satellite where it is right now, more than 11,000 of them.",
    nl: "Een 3D-wereldbol in de browser die elke Starlink-satelliet toont waar hij nu is, meer dan 11.000 stuks.",
  },
  intro: {
    en: "Starlink Tracker draws the whole Starlink constellation on a 3D globe and moves every satellite in real time. You can spin the Earth, click a satellite to follow it and fly in close enough to see a 3D model of it.",
    nl: "Starlink Tracker tekent de volledige Starlink-constellatie op een 3D-wereldbol en beweegt elke satelliet in realtime. Je kan de aarde draaien, op een satelliet klikken om hem te volgen en zo dicht invliegen dat je er een 3D-model van ziet.",
  },
  role: { en: "Sole developer", nl: "Enige developer" },
  year: "2026",
  status: "Live",
  stack: "TypeScript · CesiumJS · Web Workers",
  links: [
    { kind: "site", href: "https://starlink.sennerd.com" },
    { kind: "source", href: "https://github.com/sennecools/starlink-tracker" },
  ],
  cover: "/projects/starlink-tracker/cover.jpg",
  coverAlt: {
    en: "The Earth seen from space, wrapped in thousands of white dots and thin lines for the Starlink satellites and the links between them, with a count of 11,206 satellites in orbit.",
    nl: "De aarde vanuit de ruimte, omringd door duizenden witte puntjes en dunne lijnen voor de Starlink-satellieten en de verbindingen ertussen, met de teller 11.206 satellieten in een baan.",
  },
  context: {
    en: [
      "CelesTrak publishes the orbit of every Starlink satellite as a short set of numbers. From those numbers you can work out where a satellite is at any moment, but doing that for more than 11,000 satellites, many times a second, is too much for the page itself.",
    ],
    nl: [
      "CelesTrak publiceert de baan van elke Starlink-satelliet als een korte reeks getallen. Daaruit kan je berekenen waar een satelliet op elk moment is, maar dat voor meer dan 11.000 satellieten, vele keren per seconde, is te veel voor de pagina zelf.",
    ],
  },
  built: {
    en: [
      "A background worker calculates the position of every satellite with SGP4, the standard model for this, and hands the results to the graphics card, which draws them all in one go. The page itself stays smooth while the worker does the maths.",
      "Click a satellite to see its orbit, its shell and the area on the ground it can cover. Up close, real 3D models of the three satellite generations appear. The laser links between satellites are modelled, because SpaceX does not publish them, and the page says so.",
    ],
    nl: [
      "Een worker op de achtergrond berekent de positie van elke satelliet met SGP4, het standaardmodel hiervoor, en geeft de resultaten door aan de grafische kaart, die ze allemaal in één keer tekent. De pagina zelf blijft vlot terwijl de worker rekent.",
      "Klik op een satelliet om zijn baan, zijn schil en het gebied op de grond dat hij kan bedienen te zien. Van dichtbij verschijnen 3D-modellen van de drie generaties satellieten. De laserverbindingen tussen satellieten zijn gemodelleerd, omdat SpaceX ze niet publiceert, en de pagina zegt dat ook.",
    ],
  },
  stackRows: [
    { label: { en: "Globe", nl: "Wereldbol" }, value: "CesiumJS" },
    { label: { en: "Orbits", nl: "Banen" }, value: "satellite.js (SGP4) in a Web Worker" },
    { label: { en: "Data", nl: "Data" }, value: { en: "CelesTrak orbital elements", nl: "Baangegevens van CelesTrak" } },
    { label: { en: "Hosting", nl: "Hosting" }, value: "Vite · Vercel" },
  ],
  challenges: [],
  gallery: [],
};
