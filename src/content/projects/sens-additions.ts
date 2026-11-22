import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "sens-additions",
  placement: "index",
  category: "Minecraft",
  title: "Sen’s Additions",
  kind: "Modpack",
  summary: {
    en: "A Minecraft modpack of more than 350 mods that still runs smoothly. About 1,900 downloads on Modrinth.",
    nl: "Een Minecraft-modpack van meer dan 350 mods die toch vlot draait. Ongeveer 1.900 downloads op Modrinth.",
  },
  intro: {
    en: "Sen’s Additions is a modpack that makes Minecraft bigger and better looking without changing what the game is: new landscapes and structures, thousands of building blocks, quests and voice chat, and an official server to play it on.",
    nl: "Sen’s Additions is een modpack die Minecraft groter en mooier maakt zonder te veranderen wat de game is: nieuwe landschappen en bouwwerken, duizenden bouwblokken, quests en voicechat, en een officiële server om op te spelen.",
  },
  role: { en: "Curator and maintainer", nl: "Samensteller en onderhouder" },
  year: "2024–25",
  status: "v1.0.0 · ~1,900 downloads",
  stack: "Fabric · 350+ mods",
  links: [{ kind: "modrinth", href: "https://modrinth.com/modpack/sens-additions" }],
  context: {
    en: [
      "Large modpacks tend to load slowly and stutter. I wanted one for my own server that adds a lot to explore and build with, but still runs well on an ordinary computer.",
    ],
    nl: [
      "Grote modpacks laden vaak traag en haperen. Ik wilde er een voor mijn eigen server die veel toevoegt om te ontdekken en mee te bouwen, maar toch goed draait op een gewone computer.",
    ],
  },
  built: {
    en: [
      "I picked and configured more than 350 mods so they work together, with performance mods such as Sodium, Lithium and ModernFix keeping the game smooth for players and on the server.",
    ],
    nl: [
      "Ik koos en configureerde meer dan 350 mods zodat ze samenwerken, met prestatiemods zoals Sodium, Lithium en ModernFix die de game vlot houden voor spelers en op de server.",
    ],
  },
  stackRows: [
    { label: { en: "Game", nl: "Game" }, value: "Minecraft 1.21.1" },
    { label: { en: "Mod loader", nl: "Modloader" }, value: "Fabric" },
    { label: { en: "Mods", nl: "Mods" }, value: "350+" },
  ],
  challenges: [],
  gallery: [],
};
