import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "simple-economy",
  placement: "index",
  category: { en: "Source available", nl: "Broncode beschikbaar" },
  title: "Simple Economy",
  kind: { en: "Minecraft server mod", nl: "Minecraft-servermod" },
  summary: {
    en: "A Minecraft server mod that gives players money and lets them open their own shops. About 900 downloads on Modrinth.",
    nl: "Een Minecraft-servermod die spelers geld geeft en ze hun eigen winkel laat openen. Ongeveer 900 downloads op Modrinth.",
  },
  intro: {
    en: "Simple Economy adds money and player shops to a Minecraft server. Players earn and pay coins, set up shops, and browse every shop on the server from a menu. It only runs on the server, so players need nothing extra.",
    nl: "Simple Economy voegt geld en spelerswinkels toe aan een Minecraft-server. Spelers verdienen en betalen munten, openen winkels en bekijken elke winkel op de server vanuit een menu. De mod draait alleen op de server, dus spelers hoeven niets te installeren.",
  },
  role: { en: "Sole developer", nl: "Enige developer" },
  year: "2026",
  status: { en: "~900 downloads", nl: "~900 downloads" },
  stack: "Java · NeoForge",
  links: [
    { kind: "modrinth", href: "https://modrinth.com/mod/simple-economies" },
    { kind: "source", href: "https://github.com/sennecools/SimpleEconomy" },
  ],
  context: {
    en: [
      "On the servers I run, players wanted to trade with each other without having to be online at the same time. Most economy mods need a separate plugin platform or a mod on every player’s computer.",
    ],
    nl: [
      "Op de servers die ik draai, wilden spelers met elkaar handelen zonder tegelijk online te moeten zijn. De meeste economiemods hebben een apart pluginplatform nodig, of een mod op de computer van elke speler.",
    ],
  },
  built: {
    en: [
      "Every player has a balance that is kept between sessions, can pay others and can look up their transaction history and the richest players. Shop sales are taxed by a percentage the server owner sets.",
      "Shops are browsed in a chest-style menu that works with an unmodified game. Sellers earn money while they are offline and get a summary of their sales when they log back in.",
    ],
    nl: [
      "Elke speler heeft een saldo dat bewaard blijft tussen sessies, kan anderen betalen en kan zijn transacties en de rijkste spelers opvragen. Op verkopen in winkels gaat een belasting die de servereigenaar instelt.",
      "Winkels bekijk je in een menu in de vorm van een kist, dat werkt met een gewone, onaangepaste game. Verkopers verdienen geld terwijl ze offline zijn en krijgen een overzicht van hun verkopen als ze weer inloggen.",
    ],
  },
  stackRows: [
    { label: { en: "Language", nl: "Taal" }, value: "Java" },
    { label: { en: "Mod loader", nl: "Modloader" }, value: "NeoForge 1.21.1" },
    { label: { en: "Runs on", nl: "Draait op" }, value: { en: "The server only", nl: "Alleen de server" } },
  ],
  challenges: [],
  gallery: [],
};
