import api from "../client";

export interface RunScanRequest {
  pipelineRunId: string;
  repositoryPath: string;
  tools: string[];
}

export const securityRunnerApi = {
  async run(data: RunScanRequest) {
    const response = await api.post(
      "/security-runner/run",
      data,
    );

    return response.data;
  },
};