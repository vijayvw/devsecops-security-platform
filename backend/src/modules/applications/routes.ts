import { Router } from "express";

import { validate } from "../../middleware/validate";

import { ApplicationController } from "./controller";
import { createApplicationSchema } from "./validator";

const router = Router();

const controller = new ApplicationController();

router.post(
  "/",
  validate(createApplicationSchema),
  controller.create,
);

router.get("/", controller.findAll);

router.get("/:id", controller.findById);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
