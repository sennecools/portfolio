import type { ProjectSource } from "../types";

export const project: ProjectSource = {
  slug: "diffrast",
  title: "diffrast",
  category: "Open source",
  kind: { en: "Python library", nl: "Python-bibliotheek" },
  summary: {
    en: "A Python library that renders 3D models and works out how to change them to match a picture. Runs on AMD and NVIDIA graphics cards.",
    nl: "Een Python-bibliotheek die 3D-modellen rendert en uitrekent hoe je ze moet aanpassen om op een afbeelding te lijken. Werkt op grafische kaarten van AMD en NVIDIA.",
  },
  intro: {
    en: "diffrast renders 3D models in PyTorch and works out, for every pixel, how the image would change if the model changed. That lets a program fit a model to pictures automatically: its shape, texture, pose or lighting.",
    nl: "diffrast rendert 3D-modellen in PyTorch en berekent voor elke pixel hoe het beeld zou veranderen als het model verandert. Zo kan een programma een model automatisch laten passen bij afbeeldingen: de vorm, textuur, houding of belichting.",
  },
  role: { en: "Author and maintainer", nl: "Auteur en onderhouder" },
  year: "2026",
  status: { en: "In development", nl: "In ontwikkeling" },
  stack: "Python · PyTorch",
  placement: "strand",
  links: [{ kind: "source", href: "https://github.com/sennecools/diffrast" }],
  cover: "/projects/diffrast/hero.jpg",
  coverCaption: { en: "A torus knot rendered by diffrast.", nl: "Een torusknoop, gerenderd door diffrast." },
  coverAlt: {
    en: "A polished torus knot rendered by diffrast, reflecting the bright panels of a dark studio.",
    nl: "Een glanzende torusknoop, gerenderd door diffrast, die de lichtpanelen van een donkere studio weerspiegelt.",
  },
  context: {
    en: [
      "Tools that turn photos into 3D models, or paint textures onto them, depend on this kind of renderer. The usual one, NVIDIA’s nvdiffrast, only runs on NVIDIA cards and may not be used commercially. diffrast does the same job under the MIT licence, also runs on AMD, and uses the same function names, so existing code can switch by changing one line.",
    ],
    nl: [
      "Tools die foto’s omzetten in 3D-modellen, of er texturen op schilderen, hebben zo’n renderer nodig. De gangbare, nvdiffrast van NVIDIA, werkt alleen op NVIDIA-kaarten en mag niet commercieel gebruikt worden. diffrast doet hetzelfde onder de MIT-licentie, werkt ook op AMD en gebruikt dezelfde functienamen, zodat bestaande code met één regel kan overstappen.",
    ],
  },
  built: {
    en: [
      "I built every step of the render: drawing the triangles, blending values across them, applying textures, smoothing the edges and rendering see-through layers. Each step works backwards too, so a program can learn from the result.",
      "Every step has a simple version that is easy to check and a fast version for the graphics card, and the tests make sure both give the same answers.",
    ],
    nl: [
      "Ik bouwde elke stap van het renderen: de driehoeken tekenen, waarden over die driehoeken verdelen, texturen toepassen, randen gladmaken en doorzichtige lagen renderen. Elke stap werkt ook achterwaarts, zodat een programma van het resultaat kan leren.",
      "Elke stap heeft een eenvoudige versie die makkelijk te controleren is en een snelle versie voor de grafische kaart, en de tests zorgen dat beide hetzelfde antwoord geven.",
    ],
  },
  stackRows: [
    { label: { en: "Language", nl: "Taal" }, value: "Python, PyTorch" },
    {
      label: { en: "Graphics card", nl: "Grafische kaart" },
      value: { en: "Triton, tested on an AMD RX 9070 XT", nl: "Triton, getest op een AMD RX 9070 XT" },
    },
    {
      label: { en: "Speed", nl: "Snelheid" },
      value: {
        en: "8 views of a 100,000-triangle model, rendered and differentiated in 13 ms",
        nl: "8 beelden van een model met 100.000 driehoeken, gerenderd en afgeleid in 13 ms",
      },
    },
  ],
  challenges: [
    {
      title: { en: "Learning From Edges", nl: "Leren van randen" },
      text: {
        en: "Whether a pixel shows the model or the background is a plain yes or no, so a normal render cannot say which way to move an outline. diffrast measures where each edge crosses between two pixels and blends them by that amount, which lets the outline move smoothly too.",
        nl: "Of een pixel het model of de achtergrond toont, is gewoon ja of nee, dus een gewone render kan niet zeggen in welke richting een omtrek moet bewegen. diffrast meet waar elke rand tussen twee pixels doorloopt en mengt ze in die verhouding, waardoor ook de omtrek vloeiend kan bewegen.",
      },
    },
  ],
  gallery: [
    {
      src: "/projects/diffrast/gbuffer.jpg",
      alt: {
        en: "A grid of eight renders of one torus knot: triangle ids, barycentrics, depth, texture coordinates, normals, mip level, the texture lookup and the final shaded image.",
        nl: "Een raster van acht renders van één torusknoop: driehoeknummers, barycentrische coördinaten, diepte, textuurcoördinaten, normalen, mipniveau, de textuur en het uiteindelijke beeld.",
      },
      caption: {
        en: "Everything diffrast computes for one image, step by step.",
        nl: "Alles wat diffrast voor één beeld berekent, stap voor stap.",
      },
    },
    {
      src: "/projects/diffrast/texture-fitting.webp",
      alt: {
        en: "Animation of a grey torus knot and a grey texture gradually taking on the colours and pattern of the target renders.",
        nl: "Animatie van een grijze torusknoop en een grijze textuur die geleidelijk de kleuren en het patroon van de doelbeelden krijgen.",
      },
      caption: {
        en: "A grey texture is adjusted until it matches the target.",
        nl: "Een grijze textuur wordt bijgesteld tot ze op het doel lijkt.",
      },
    },
    {
      src: "/projects/diffrast/shape-fitting.webp",
      alt: {
        en: "Animation of a white sphere deforming step by step into an orange chess pawn, next to the target and views from other angles.",
        nl: "Animatie van een witte bol die stap voor stap vervormt tot een oranje schaakpion, naast het doel en beelden vanuit andere hoeken.",
      },
      caption: {
        en: "A sphere reshaped into a chess pawn, from pictures alone.",
        nl: "Een bol omgevormd tot een schaakpion, enkel op basis van beelden.",
      },
    },
    {
      src: "/projects/diffrast/pose-fitting.webp",
      alt: {
        en: "Animation of 24 small dice rotating towards the pose of a target die, with the best guess outlined.",
        nl: "Animatie van 24 kleine dobbelstenen die naar de stand van een doeldobbelsteen draaien, met de beste gok omkaderd.",
      },
      caption: {
        en: "Finding how a die is turned, with 24 guesses at once.",
        nl: "Afleiden hoe een dobbelsteen gedraaid is, met 24 gokken tegelijk.",
      },
    },
  ],
};
