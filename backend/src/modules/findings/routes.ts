import { Router } from "express";

import { findingsController } from "./controller";

export const findingsRoutes = Router();

findingsRoutes.get(
  "/",
  findingsController.getFindings,
);

findingsRoutes.get(
  "/:id",
  findingsController.getFinding,
);

findingsRoutes.patch(
  "/:id",
  findingsController.markFixed,
);