import { Router } from "express";
import { applicationsController } from "./applications.controller";

const router = Router();

router.get("/", applicationsController.list);

router.get("/archived", applicationsController.archived);

router.get("/:id", applicationsController.get);

router.post("/", applicationsController.create);

router.patch("/:id", applicationsController.update);
router.put("/:id", applicationsController.update);

router.patch("/:id/restore", applicationsController.restore);

router.delete("/:id", applicationsController.delete);

export default router;