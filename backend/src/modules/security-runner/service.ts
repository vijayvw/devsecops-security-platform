import { runRepository } from "./runner";

export const securityRunnerService = {
  async run(
    pipelineRunId: string,
    repositoryUrl: string,
  ) {
    return runRepository(
      pipelineRunId,
      repositoryUrl,
    );
  },
};