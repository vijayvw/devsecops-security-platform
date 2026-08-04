import api from "../client";

export interface Pipeline {
  id: string;
  name: string;
  provider: string;

  application: {
    id: string;
    name: string;
  };

  latestRun?: {
    id: string;
    status: string;
    duration: number | null;
    branch: string;
    commitSha: string;
    startedAt?: string;
    finishedAt?: string | null;
  };

  totalRuns?: number;
  successRate?: number;
}

export const pipelinesApi = {
  async getAll() {
    const { data } = await api.get("/pipelines");
    return data as Pipeline[];
  },
};