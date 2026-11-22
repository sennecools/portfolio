import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "better-tablist",
  title: "Better TabList",
  category: { en: "Source available", nl: "Broncode beschikbaar" },
  kind: { en: "Minecraft server mod", nl: "Minecraft-servermod" },
  summary: {
    en: "A Minecraft server mod that lets server owners design the player list. About 10,000 downloads on Modrinth.",
    nl: "Een Minecraft-servermod waarmee servereigenaars de spelerslijst zelf vormgeven. Ongeveer 10.000 downloads op Modrinth.",
  },
  intro: {
    en: "Better TabList lets Minecraft server owners design the player list you see when you hold Tab: animated headers and footers, rank prefixes, AFK markers and live server statistics.",
    nl: "Met Better TabList geven Minecraft-servereigenaars de spelerslijst vorm die je ziet als je Tab ingedrukt houdt: bewegende kop- en voetteksten, rangen voor spelersnamen, AFK-markeringen en live serverstatistieken.",
  },
  role: { en: "Author and maintainer", nl: "Auteur en onderhouder" },
  year: "2025–26",
  status: "v1.7 · ~10,000 downloads",
  stack: "Java · NeoForge · Fabric",
  placement: "strand",
  links: [
    { kind: "modrinth", href: "https://modrinth.com/mod/better-tablist" },
    { kind: "source", href: "https://github.com/sennecools/Better-TabList" },
  ],
  cover: "/projects/better-tablist/cover.png",
  coverAlt: {
    en: "In-game Minecraft tab list with a Season 3 header, ranked player names with ping, and a footer showing players, TPS and MSPT.",
    nl: "Minecraft-spelerslijst in de game met een Season 3-kop, spelersnamen met rang en ping, en een voettekst met spelers, TPS en MSPT.",
  },
  context: {
    en: [
      "Minecraft’s own player list is just a list of names. Server owners want it to show the server’s name, players’ ranks and how the server is running. The mod only runs on the server, so players don’t install anything, and one config file controls it all. I made it with NeofastFTL, with contributions from Aidan and MihailDenisov.",
    ],
    nl: [
      "De standaard spelerslijst van Minecraft is gewoon een lijst namen. Servereigenaars willen er de naam van de server in tonen, de rangen van spelers en hoe de server draait. De mod draait alleen op de server, dus spelers hoeven niets te installeren, en één configuratiebestand regelt alles. Ik maakte hem samen met NeofastFTL, met bijdragen van Aidan en MihailDenisov.",
    ],
  },
  built: {
    en: [
      "I built the part that keeps the list up to date with live values such as the player count and server performance, plus AFK detection, sorting by rank, and colour and gradient text. If the server uses LuckPerms or FTB Ranks, the list shows those ranks too.",
      "One codebase covers Minecraft 1.21 to 26.3 on both NeoForge and Fabric, the two mod loaders. That is 34 versions of the mod, and every change builds and tests all of them automatically.",
    ],
    nl: [
      "Ik bouwde het deel dat de lijst bijwerkt met live waarden zoals het aantal spelers en de prestaties van de server, plus AFK-detectie, sorteren op rang, en tekst in kleuren en kleurverlopen. Gebruikt de server LuckPerms of FTB Ranks, dan toont de lijst ook die rangen.",
      "Eén codebase ondersteunt Minecraft 1.21 tot 26.3 op zowel NeoForge als Fabric, de twee modloaders. Dat zijn 34 versies van de mod, en elke wijziging bouwt en test ze allemaal automatisch.",
    ],
  },
  stackRows: [
    { label: { en: "Language", nl: "Taal" }, value: "Java" },
    { label: { en: "Mod loaders", nl: "Modloaders" }, value: "NeoForge, Fabric" },
    { label: "Build", value: "Gradle, GitHub Actions" },
  ],
  challenges: [],
  gallery: [
    {
      src: "/projects/better-tablist/gradient-showcase.png",
      alt: {
        en: "Tab list with a gradient Aurora SMP title, a welcome line, a player with a health tag, and a footer with players online, ping, TPS and the server address.",
        nl: "Spelerslijst met een Aurora SMP-titel in kleurverloop, een welkomstregel, een speler met levens en een voettekst met spelers online, ping, TPS en het serveradres.",
      },
      caption: {
        en: "Gradient text, a welcome line and live server statistics.",
        nl: "Tekst in kleurverloop, een welkomstregel en live serverstatistieken.",
      },
    },
    {
      src: "/projects/better-tablist/performance-dashboard.png",
      alt: {
        en: "Tab list titled Server Monitor with the date and time, a player with ping, and a footer with TPS, MSPT, CPU, memory use and uptime.",
        nl: "Spelerslijst met de titel Server Monitor, datum en uur, een speler met ping en een voettekst met TPS, MSPT, CPU, geheugengebruik en uptime.",
      },
      caption: {
        en: "A performance dashboard for admins, updated live.",
        nl: "Een prestatiedashboard voor beheerders, live bijgewerkt.",
      },
    },
    {
      src: "/projects/better-tablist/survival-status.png",
      alt: {
        en: "Tab list with an Aurora SMP Survival header, a player with health, ping and game mode, and a footer naming the player’s dimension.",
        nl: "Spelerslijst met een Aurora SMP Survival-kop, een speler met levens, ping en spelmodus, en een voettekst met de wereld waarin de speler is.",
      },
      caption: {
        en: "Each player’s health, ping and game mode, and the world you are in.",
        nl: "De levens, ping en spelmodus van elke speler, en de wereld waarin je bent.",
      },
    },
    {
      src: "/projects/better-tablist/animated-minimal.png",
      alt: {
        en: "Minimal tab list with an Aurora SMP title, one player, and a footer with the player count and a Discord invite.",
        nl: "Minimalistische spelerslijst met een Aurora SMP-titel, één speler en een voettekst met het aantal spelers en een Discord-uitnodiging.",
      },
      caption: {
        en: "A minimal style with an animated title.",
        nl: "Een minimalistische stijl met een bewegende titel.",
      },
    },
    {
      src: "/projects/better-tablist/in-game.jpg",
      alt: {
        en: "Better TabList in game above a badlands river: a gradient header, player status names and a server status footer.",
        nl: "Better TabList in de game boven een rivier in een woestijnlandschap: een kop in kleurverloop, spelersnamen met status en een voettekst met de serverstatus.",
      },
      caption: {
        en: "In game on a survival server. Players join with an unmodified Minecraft.",
        nl: "In de game op een survivalserver. Spelers doen mee met een gewone Minecraft.",
      },
    },
  ],
};
