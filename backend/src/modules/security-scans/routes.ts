import { Router } from "express";
import { securityScanController } from "./controller";

const router = Router();

// Create
router.post("/", securityScanController.create);

// List
router.get("/", securityScanController.list);

// Dashboard summary
router.get("/summary", securityScanController.summary);

// Import scanner report
router.post(
  "/:id/report",
  securityScanController.uploadReport
);

// Download parsed report
router.get(
  "/:id/report",
  securityScanController.downloadReport
);

// Single scan
router.get("/:id", securityScanController.get);

// Finish scan
router.patch("/:id", securityScanController.finish);

// Store findings
router.post(
  "/:id/findings",
  securityScanController.addFindings
);

// Delete scan
router.delete(
  "/:id",
  securityScanController.remove
);

export default router;