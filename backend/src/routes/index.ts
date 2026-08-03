import { Router } from "express";

import applicationRoutes from "../modules/applications";
import pipelineRoutes from "../modules/pipelines";
import pipelineRunRoutes from "../modules/pipeline-runs";

const router = Router();

router.use("/applications", applicationRoutes);

router.use("/pipelines", pipelineRoutes);

router.use("/pipeline-runs", pipelineRunRoutes);

export default router;