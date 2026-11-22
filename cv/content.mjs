// The text of the CV, per language. Run `npm run cv` after changing it.
// The phone number is left out on purpose: these PDFs are public on the site.

const contact = [
  { text: "sennecools2004@gmail.com", href: "mailto:sennecools2004@gmail.com" },
  { text: "sennerd.com", href: "https://sennerd.com" },
  { text: "github.com/sennecools", href: "https://github.com/sennecools" },
  { text: "in/senne-cools (LinkedIn)", href: "https://www.linkedin.com/in/senne-cools/" },
];

export const content = [
  {
    lang: "nl",
    name: "Senne Cools",
    role: "Student Toegepaste Informatica · Full-stack developer",
    labels: {
      contact: "Contact",
      availability: "Beschikbaar voor stage",
      skills: "Vaardigheden",
      languages: "Talen",
      experience: "Ervaring",
      projects: "Projecten",
      education: "Opleiding",
    },
    contact: [...contact, { text: "Heist-op-den-Berg" }],
    availability: "15 februari – 27 mei 2027, maandag tot donderdag ter plaatse, regio Mechelen.",
    intro:
      "Ik bouw webapps en de tools eromheen. Als enige developer bouwde ik het rekruteringssysteem en de website van een Belgisch rekrutatiebureau, die vandaag in gebruik zijn. Daarnaast schrijf ik servertools en mods voor de Minecraft-servers die ik draai. Nu zoek ik een stage in een team waar ik aan echte systemen werk.",
    experience: [
      {
        title: "Freelance developer — Beyond Talent",
        when: "2025 – 2026",
        where: "Rekrutatiebureau · enige developer",
        points: [
          "Bouwde het ATS waarin de recruiters werken: kandidaten, vacatures, klanten, een gedeelde agenda en notities (Next.js, TypeScript, PostgreSQL).",
          "Voerde de GDPR-bewaartermijnen in: het systeem berekent per dossier wanneer het vervalt en verwijdert vervallen gegevens automatisch.",
          "Bouwde de publieke website in het Nederlands en Engels, gekoppeld aan het ATS: vacatures verschijnen vanzelf en sollicitaties komen binnen als kandidaat.",
        ],
      },
      {
        title: "Data-assistent — Staffable",
        when: "2023 – 2024",
        points: ["Klantendata beheren en bijwerken in databases.", "Zorgvuldig omgaan met vertrouwelijke gegevens."],
      },
      {
        title: "Medewerker bediening — Restaurant Brochetto",
        when: "2023 – nu",
        where: "Heist-op-den-Berg",
        points: ["Samenwerken in een team tijdens drukke service-uren, klantvriendelijk en onder tijdsdruk."],
      },
    ],
    projects: [
      { title: "Better TabList", stack: "Java", text: "Minecraft-servermod, ~10.000 downloads. Eén codebase bouwt en test 34 versies automatisch." },
      { title: "packctl", stack: "Rust", text: "CLI die modpackservers veilig bijwerkt zonder eigen bestanden te wissen, met rollback." },
      { title: "diffrast", stack: "Python · PyTorch", text: "Differentieerbare 3D-renderer voor AMD en NVIDIA, met GPU-kernels in Triton." },
      { title: "Starlink Tracker", stack: "TypeScript · CesiumJS", text: "3D-wereldbol met 11.000+ satellieten, posities berekend in een Web Worker." },
      { title: "ToriBoard", stack: "React · SpacetimeDB", text: "Takenbord waarop teams elkaars wijzigingen live zien, ook offline." },
      { title: "Astrum", stack: "Rust · Vulkan", text: "Game-engine die volledige planeten genereert, van ruimte tot oppervlak." },
    ],
    skills: [
      { label: "Talen", value: "TypeScript, JavaScript, Rust, Java, Python, SQL" },
      { label: "Web", value: "React, Next.js, Node.js, Tailwind CSS" },
      { label: "Data", value: "PostgreSQL, Prisma" },
      { label: "Infra", value: "Linux, Docker, Proxmox, Nginx, Vercel, Cloudflare, GitHub Actions" },
    ],
    languages: ["Nederlands", "Engels"],
    education: [
      { title: "Bachelor Toegepaste Informatica — Odisee", when: "afstuderen 2027", points: [] },
    ],
  },
  {
    lang: "en",
    name: "Senne Cools",
    role: "Applied Computer Science student · Full-stack developer",
    labels: {
      contact: "Contact",
      availability: "Available for an internship",
      skills: "Skills",
      languages: "Languages",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
    },
    contact: [...contact, { text: "Heist-op-den-Berg, Belgium" }],
    availability: "15 February – 27 May 2027, Monday to Thursday on site, around Mechelen.",
    intro:
      "I build web apps and the tools around them. As the only developer, I built the applicant tracking system and website of a Belgian recruitment agency, both in use today. I also write server tools and mods for the Minecraft servers I run. Now I’m looking for an internship in a team where I work on real systems.",
    experience: [
      {
        title: "Freelance developer — Beyond Talent",
        when: "2025 – 2026",
        where: "Recruitment agency · sole developer",
        points: [
          "Built the ATS the recruiters work in: candidates, vacancies, clients, a shared agenda and notes (Next.js, TypeScript, PostgreSQL).",
          "Implemented GDPR retention: the system works out when each record expires and deletes expired data automatically.",
          "Built the public website in Dutch and English, connected to the ATS: vacancies appear on their own and applications arrive as candidates.",
        ],
      },
      {
        title: "Data assistant — Staffable",
        when: "2023 – 2024",
        points: ["Managed and updated client data in databases.", "Handled confidential data with care."],
      },
      {
        title: "Restaurant staff — Brochetto",
        when: "2023 – now",
        where: "Heist-op-den-Berg",
        points: ["Working in a team during busy service hours, friendly with guests and under time pressure."],
      },
    ],
    projects: [
      { title: "Better TabList", stack: "Java", text: "Minecraft server mod, ~10,000 downloads. One codebase builds and tests 34 versions automatically." },
      { title: "packctl", stack: "Rust", text: "CLI that updates modpack servers without wiping the owner’s files, with rollback." },
      { title: "diffrast", stack: "Python · PyTorch", text: "Differentiable 3D renderer for AMD and NVIDIA, with GPU kernels in Triton." },
      { title: "Starlink Tracker", stack: "TypeScript · CesiumJS", text: "3D globe with 11,000+ satellites, positions computed in a Web Worker." },
      { title: "ToriBoard", stack: "React · SpacetimeDB", text: "Task board where teams see each other’s changes live, even offline." },
      { title: "Astrum", stack: "Rust · Vulkan", text: "Game engine that generates whole planets, from orbit down to the ground." },
    ],
    skills: [
      { label: "Languages", value: "TypeScript, JavaScript, Rust, Java, Python, SQL" },
      { label: "Web", value: "React, Next.js, Node.js, Tailwind CSS" },
      { label: "Data", value: "PostgreSQL, Prisma" },
      { label: "Infra", value: "Linux, Docker, Proxmox, Nginx, Vercel, Cloudflare, GitHub Actions" },
    ],
    languages: ["Dutch", "English"],
    education: [
      { title: "Bachelor in Applied Computer Science — Odisee", when: "graduating 2027", points: [] },
    ],
  },
];
