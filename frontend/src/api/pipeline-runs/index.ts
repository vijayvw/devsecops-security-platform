import api from "../client";
import type { SecurityScan } from "../security-scans";

export interface Finding {
  id: string;
  severity: string;
  title: string;
}

export interface PipelineRun {
  id: string;
  pipelineId: string;

  commitSha: string;
  branch: string;
  status: string;

  duration: number | null;

  startedAt: string;
  finishedAt: string | null;
  createdAt: string;

  pipeline: {
    id: string;
    name: string;
    provider: string;

    application: {
      id: string;
      name: string;
    };
  };

  scans: SecurityScan[];
}

export interface CreatePipelineRunRequest {
  pipelineId: string;
  commitSha: string;
  branch: string;
}

export const pipelineRunsApi = {
  async getAll() {
    const response = await api.get("/pipeline-runs");
    return response.data.data as PipelineRun[];
  },

  async getById(id: string) {
    const response = await api.get(
      `/pipeline-runs/${id}`
    );

    return response.data.data as PipelineRun;
  },

  async create(
    payload: CreatePipelineRunRequest
  ) {
    const response = await api.post(
      "/pipeline-runs",
      {
        ...payload,
        status: "RUNNING",
      }
    );

    return response.data.data as PipelineRun;
  },
};