import { Request, Response } from "express";
import { securityRunnerService } from "./service";

export const securityRunnerController = {
  async run(req: Request, res: Response) {
    const {
      pipelineRunId,
      repositoryUrl,
    } = req.body;

    const result =
      await securityRunnerService.run(
        pipelineRunId,
        repositoryUrl,
      );

    res.json(result);
  },
};
