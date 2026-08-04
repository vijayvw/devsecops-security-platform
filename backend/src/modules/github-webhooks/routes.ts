import { Router } from "express";

import { GitHubWebhookController } from "./controller";

const router = Router();

const controller = new GitHubWebhookController();

router.post(
  "/webhook",
  controller.handle,
);

export default router;
