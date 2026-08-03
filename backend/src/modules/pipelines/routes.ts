import { Router } from "express";

import { validate } from "../../middleware/validate";

import { PipelineController } from "./controller";
import { createPipelineSchema } from "./validator";

const router = Router();

const controller = new PipelineController();

router.post(
  "/",
  validate(createPipelineSchema),
  controller.create,
);

router.get("/", controller.findAll);

router.get("/:id", controller.findById);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;