import api from "../client";

export interface Finding {
  id: string;
  severity: string;
  title: string;
  description: string;
  rule?: string;
  cve?: string;
  file?: string;
  line?: number;
  recommendation?: string;
  fixed: boolean;
  createdAt: string;

  securityScan: {
    id: string;
    tool: string;
    status: string;
    startedAt: string;
    finishedAt: string | null;
  };
}

export const findingsApi = {
  async getAll() {
    const response = await api.get<Finding[]>("/findings");
    return response.data;
  },
};
