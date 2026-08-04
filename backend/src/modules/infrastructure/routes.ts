import { Router } from "express";
import { infrastructureController } from "./controller";

const router = Router();

router.get(
  "/overview",
  infrastructureController.overview
);

export default router;
