import { project as astrum } from "./projects/astrum";
import { project as betterTablist } from "./projects/better-tablist";
import { project as beyondTalent } from "./projects/beyond-talent";
import { project as beyondTalentAts } from "./projects/beyond-talent-ats";
import { project as diffrast } from "./projects/diffrast";
import { project as packctl } from "./projects/packctl";
import { project as sensAdditions } from "./projects/sens-additions";
import { project as simpleEconomy } from "./projects/simple-economy";
import { project as starlinkTracker } from "./projects/starlink-tracker";
import { project as taskboard } from "./projects/taskboard";
import type { ProjectSource } from "./types";

/**
 * Order matters: it is the order on the home page within each group,
 * and the order "Next project" walks through on the case-study pages.
 */
export const projects: ProjectSource[] = [
  beyondTalentAts,
  astrum,
  betterTablist,
  diffrast,
  starlinkTracker,
  packctl,
  beyondTalent,
  taskboard,
  simpleEconomy,
  sensAdditions,
];
