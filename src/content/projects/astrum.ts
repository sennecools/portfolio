import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "astrum",
  placement: "strand",
  category: "Game dev",
  title: "Astrum",
  kind: "Game engine",
  summary: {
    en: "The engine for a space game I’m designing. It generates whole planets, and you can fly from orbit down to the ground.",
    nl: "De engine voor een ruimtegame die ik ontwerp. Ze genereert volledige planeten, en je kan vanuit de ruimte tot op de grond vliegen.",
  },
  intro: {
    en: "Astrum is the engine for a space game I’m designing. It generates whole planets, with continents, oceans, mountains and clouds, and lets you fly from space down to the surface.",
    nl: "Astrum is de engine voor een ruimtegame die ik ontwerp. Ze genereert volledige planeten, met continenten, oceanen, bergen en wolken, en laat je vanuit de ruimte naar het oppervlak vliegen.",
  },
  role: { en: "Design, direction and review", nl: "Ontwerp, sturing en review" },
  year: "2026",
  status: { en: "In development", nl: "In ontwikkeling" },
  stack: "Rust · Vulkan",
  links: [],
  cover: "/projects/astrum/cover.jpg",
  coverCaption: { en: "A generated coastline under a ringed gas giant.", nl: "Een gegenereerde kustlijn onder een gasreus met ringen." },
  coverAlt: {
    en: "Orange coastal terrain and a turquoise sea under a huge ringed gas giant, with clouds drifting across the sky.",
    nl: "Oranje kustlandschap en een turquoise zee onder een enorme gasreus met ringen, met wolken aan de hemel.",
  },
  context: {
    en: [
      "In the game you travel between planets and land on them. Planets that big can’t be modelled by hand, so Astrum generates them from a seed, and the same seed always gives the same planet.",
    ],
    nl: [
      "In de game reis je tussen planeten en land je erop. Planeten van die grootte kan je niet met de hand modelleren, dus Astrum genereert ze uit een seed, en dezelfde seed geeft altijd dezelfde planeet.",
    ],
  },
  built: {
    en: [
      "Astrum builds the planet around you as you move: the closer you get, the more detailed the terrain becomes, with oceans, clouds and an atmosphere on top and ringed gas giants in the sky.",
      "I also built Astrum Studio, an editor for exploring the planets, tuning how the terrain is generated and measuring performance.",
    ],
    nl: [
      "Astrum bouwt de planeet rond je op terwijl je beweegt: hoe dichter je komt, hoe gedetailleerder het terrein, met oceanen, wolken en een atmosfeer erbovenop en gasreuzen met ringen aan de hemel.",
      "Ik bouwde ook Astrum Studio, een editor om de planeten te verkennen, de terreingeneratie bij te stellen en de prestaties te meten.",
    ],
  },
  stackRows: [
    { label: { en: "Language", nl: "Taal" }, value: "Rust" },
    { label: { en: "Graphics", nl: "Graphics" }, value: "Vulkan" },
    { label: "Editor", value: "egui" },
  ],
  challenges: [
    {
      title: { en: "Same Seed, Same Planet", nl: "Zelfde seed, zelfde planeet" },
      text: {
        en: "Computers can round some maths functions slightly differently, so the same seed could grow a slightly different planet on another machine. Astrum uses its own versions of those functions that give exactly the same result everywhere, and tests check every generated planet against a stored copy.",
        nl: "Computers ronden sommige wiskundige functies net anders af, waardoor dezelfde seed op een andere machine een net andere planeet zou opleveren. Astrum gebruikt eigen versies van die functies die overal exact hetzelfde resultaat geven, en tests vergelijken elke gegenereerde planeet met een bewaarde kopie.",
      },
    },
  ],
  gallery: [
    {
      src: "/projects/astrum/planet-from-orbit.jpg",
      alt: {
        en: "An ocean planet seen from orbit, with pink and orange continents, carved mountain ranges and a soft blue atmosphere, above the banded top of a ringed gas giant.",
        nl: "Een oceaanplaneet vanuit de ruimte, met roze en oranje continenten, bergketens en een zachtblauwe atmosfeer, boven de gestreepte bovenkant van een gasreus met ringen.",
      },
      caption: {
        en: "A generated planet in orbit above its ringed gas giant.",
        nl: "Een gegenereerde planeet in een baan boven haar gasreus met ringen.",
      },
    },
    {
      src: "/projects/astrum/mesa.jpg",
      alt: {
        en: "A long desert mesa with red and cream rock layers, its cliff face eroded into gullies, with the ringed gas giant rising behind it.",
        nl: "Een lange tafelberg in de woestijn met rode en crèmekleurige rotslagen en uitgesleten kloven, met de gasreus met ringen erachter.",
      },
      caption: {
        en: "Layered cliffs in a desert, with the gas giant rising behind them.",
        nl: "Gelaagde kliffen in een woestijn, met de gasreus die erachter opkomt.",
      },
    },
    {
      src: "/projects/astrum/studio-editor.jpg",
      alt: {
        en: "The Astrum Studio editor: a list of celestial bodies on the left, a viewport over a snowy mountain range in the middle, and camera and terrain statistics on the right.",
        nl: "De editor Astrum Studio: links een lijst hemellichamen, in het midden een zicht op een besneeuwde bergketen, rechts camera- en terreingegevens.",
      },
      caption: {
        en: "Astrum Studio, the engine’s editor, 10 km above a mountain range.",
        nl: "Astrum Studio, de editor van de engine, 10 km boven een bergketen.",
      },
    },
  ],
};
