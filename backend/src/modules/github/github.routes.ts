import { Router } from "express";
import { githubController } from "./github.controller";

const router = Router();

router.get(
  "/integration",
  githubController.getIntegration
);

router.post(
  "/connect",
  githubController.connect
);

router.patch(
  "/connect",
  githubController.update
);

router.delete(
  "/connect",
  githubController.disconnect
);

router.get(
  "/test",
  githubController.testConnection
);

router.get(
  "/repositories",
  githubController.repositories
);

router.get(
  "/branches/:owner/:repo",
  githubController.branches
);

router.post(
  "/import",
  githubController.importRepository
);

export default router;