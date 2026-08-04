import { Router } from "express";

import { applicationsRoutes } from "../modules/applications";
import pipelineRoutes from "../modules/pipelines";
import pipelineRunRoutes from "../modules/pipeline-runs";
import { reportsRoutes } from "../modules/reports";
import infrastructureRoutes from "../modules/infrastructure/routes";
import { dashboardRoutes } from "../modules/dashboard";
import githubRoutes from "../modules/github";


const router = Router();

router.use("/dashboard", dashboardRoutes);
router.use("/applications", applicationsRoutes);
router.use("/pipelines", pipelineRoutes);
router.use("/pipeline-runs", pipelineRunRoutes);
router.use("/reports", reportsRoutes);
router.use("/infrastructure", infrastructureRoutes);
router.use( "/github", githubRoutes);

export default router;