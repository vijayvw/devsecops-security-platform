import { Router } from "express";

import { webhookController } from "./controller";

const router = Router();

router.post(
  "/github",
  webhookController.github.bind(
    webhookController,
  ),
);

export default router;
