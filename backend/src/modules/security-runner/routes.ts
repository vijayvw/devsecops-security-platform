import { Router } from "express";
import { securityRunnerController } from "./controller";

const router = Router();

router.post(
  "/run",
  securityRunnerController.run,
);

export default router;
