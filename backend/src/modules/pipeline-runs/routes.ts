import { Router } from "express";

import { validate } from "../../middleware/validate";

import { PipelineRunController } from "./controller";
import {
  createPipelineRunSchema,
  updatePipelineRunSchema,
} from "./validator";

const router = Router();

const controller = new PipelineRunController();

router.post(
  "/",
  validate(createPipelineRunSchema),
  controller.create,
);

router.get("/", controller.findAll);

router.get("/:id", controller.findById);

router.patch(
  "/:id",
  validate(updatePipelineRunSchema),
  controller.update,
);

export default router;