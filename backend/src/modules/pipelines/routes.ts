import { Router } from "express";
import { pipelinesController } from "./controller";

const router = Router();

router.get("/", (req, res) =>
  pipelinesController.list(req, res)
);

router.get("/:id", (req, res) =>
  pipelinesController.get(req, res)
);

router.post("/", (req, res) =>
  pipelinesController.create(req, res)
);

router.put("/:id", (req, res) =>
  pipelinesController.update(req, res)
);

router.delete("/:id", (req, res) =>
  pipelinesController.delete(req, res)
);

export default router;