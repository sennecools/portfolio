import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "packctl",
  title: "packctl",
  category: "Infrastructure",
  kind: { en: "Command-line tool", nl: "Commandlinetool" },
  summary: {
    en: "A command-line tool that updates a Minecraft modpack server without wiping the owner’s own mods, settings or world. Every update can be undone.",
    nl: "Een commandlinetool die een Minecraft-modpackserver bijwerkt zonder de eigen mods, instellingen of wereld van de eigenaar te wissen. Elke update kan ongedaan gemaakt worden.",
  },
  intro: {
    en: "packctl updates the modpack on a Minecraft server. It replaces only the files that belong to the modpack, keeps everything the server owner added, and can roll an update back.",
    nl: "packctl werkt de modpack op een Minecraft-server bij. Het vervangt alleen de bestanden die bij de modpack horen, houdt alles bij wat de eigenaar zelf toevoegde, en kan een update terugdraaien.",
  },
  role: { en: "Sole developer", nl: "Enige developer" },
  year: "2026",
  status: { en: "Pre-1.0 · v0.1.0 released, MIT", nl: "Pre-1.0 · v0.1.0 uitgebracht, MIT" },
  stack: "Rust",
  placement: "index",
  links: [
    { kind: "source", href: "https://github.com/sennecools/packctl" },
    { kind: "releases", href: "https://github.com/sennecools/packctl/releases" },
  ],
  context: {
    en: [
      "A modpack is a large bundle of mods and settings. Server owners add their own mods and tweaks on top, and installing a new version of the pack over that usually wipes them. I run modded servers myself, which is where the tool came from.",
    ],
    nl: [
      "Een modpack is een grote bundel mods en instellingen. Servereigenaars voegen er hun eigen mods en aanpassingen aan toe, en een nieuwe versie van de pack erover installeren wist die meestal. Ik draai zelf modded servers, en daar komt de tool vandaan.",
    ],
  },
  built: {
    en: [
      "Before it touches anything, packctl works out exactly which files an update will change. It backs those files up, installs the new version, and puts the owner’s own files back on top.",
      "It downloads packs from CurseForge and Modrinth, can stop and restart the server around an update, and can take over a server that was set up by hand.",
    ],
    nl: [
      "Voor het iets aanraakt, berekent packctl precies welke bestanden een update zal wijzigen. Het maakt daar een back-up van, installeert de nieuwe versie en zet de eigen bestanden van de eigenaar er weer bovenop.",
      "Het downloadt packs van CurseForge en Modrinth, kan de server rond een update stoppen en herstarten, en kan een server overnemen die met de hand werd opgezet.",
    ],
  },
  stackRows: [
    { label: { en: "Language", nl: "Taal" }, value: "Rust" },
    { label: { en: "Runs on", nl: "Draait op" }, value: { en: "Linux servers", nl: "Linux-servers" } },
    {
      label: "Download",
      value: { en: "Ready-to-run builds for x86_64 and ARM", nl: "Kant-en-klare builds voor x86_64 en ARM" },
    },
  ],
  challenges: [
    {
      title: { en: "Servers Set Up by Hand", nl: "Servers die met de hand werden opgezet" },
      text: {
        en: "A server installed by hand or by a hosting panel has no record of which files came from the pack, so old mods stayed behind after an update. packctl adopt compares the server with the pack version it runs and records which files are the owner’s, so the next update knows what to replace.",
        nl: "Een server die met de hand of via een hostingpaneel werd geïnstalleerd, houdt niet bij welke bestanden uit de pack komen, waardoor oude mods na een update bleven staan. packctl adopt vergelijkt de server met de packversie die erop draait en noteert welke bestanden van de eigenaar zijn, zodat de volgende update weet wat te vervangen.",
      },
    },
  ],
  gallery: [],
};
