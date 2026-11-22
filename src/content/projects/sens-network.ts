import type { ProjectSource } from "../types";

/** Off the site for now: add it back to the list in `../projects.ts` to show it again. */
export const project: ProjectSource = {
  slug: "sens-network",
  placement: "index",
  category: "Infrastructure",
  title: "Sen’s Network",
  kind: "Website",
  summary: {
    en: "The website of my modded Minecraft servers. It shows which servers are online and charts how many people play.",
    nl: "De website van mijn modded Minecraft-servers. Ze toont welke servers online zijn en hoeveel mensen er spelen.",
  },
  intro: {
    en: "Sen’s Network is the website for the modded Minecraft servers I run. Players find the servers there, see whether they are online and read the news. I manage it all from an admin page.",
    nl: "Sen’s Network is de website van de modded Minecraft-servers die ik draai. Spelers vinden er de servers, zien of ze online zijn en lezen het nieuws. Ik beheer alles vanuit een beheerpagina.",
  },
  role: { en: "Solo developer", nl: "Enige developer" },
  year: "2025–26",
  status: "Live",
  stack: "Next.js · PostgreSQL",
  links: [
    { kind: "site", href: "https://sens-network.vercel.app" },
    { kind: "source", href: "https://github.com/sennecools/Minecraft-Network-Site" },
  ],
  cover: "/projects/sens-network/cover.png",
  coverAlt: {
    en: "Home page of Sen’s Network with a Join the Discord button and live counts of active servers and players online.",
    nl: "Startpagina van Sen’s Network met een knop naar de Discord en live tellers voor actieve servers en spelers online.",
  },
  context: {
    en: [
      "Players need one place to find the servers, see if they are up and read about updates and maintenance. I also wanted to see how many people play, and when.",
    ],
    nl: [
      "Spelers hebben één plek nodig om de servers te vinden, te zien of ze draaien en te lezen over updates en onderhoud. Zelf wilde ik ook zien hoeveel mensen spelen, en wanneer.",
    ],
  },
  built: {
    en: [
      "I built the public site, with a server list, a page per server with a player chart, news and a store page, and an admin area to manage servers and announcements.",
      "Every five minutes the site checks each server and stores how many players are online. That feeds the charts and the uptime figures, and a line on the chart shows the usual player count for each hour of the week.",
    ],
    nl: [
      "Ik bouwde de publieke site, met een serverlijst, een pagina per server met een spelersgrafiek, nieuws en een winkelpagina, en een beheergedeelte voor servers en aankondigingen.",
      "Elke vijf minuten controleert de site elke server en bewaart hoeveel spelers er online zijn. Dat voedt de grafieken en de uptimecijfers, en een lijn op de grafiek toont het gebruikelijke aantal spelers per uur van de week.",
    ],
  },
  stackRows: [
    { label: "Framework", value: "Next.js, React, TypeScript" },
    { label: { en: "Data", nl: "Database" }, value: "PostgreSQL" },
    { label: "Hosting", value: "Vercel" },
  ],
  challenges: [],
  gallery: [
    {
      src: "/projects/sens-network/servers.png",
      alt: {
        en: "Server list page with two modded Minecraft servers, their addresses, versions and status.",
        nl: "Serverlijst met twee modded Minecraft-servers, hun adressen, versies en status.",
      },
      caption: {
        en: "The server list, with status and version read from the live servers.",
        nl: "De serverlijst, met status en versie rechtstreeks van de servers.",
      },
    },
  ],
};
