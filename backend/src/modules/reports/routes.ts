import { Router } from "express";
import { reportsController } from "./controller";

const router = Router();

router.get(
  "/summary",
  reportsController.summary
);

export default router;
