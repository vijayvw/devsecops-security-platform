import api from "../client";

export interface Finding {
  id: string;

  severity: string;

  title: string;

  description: string;

  rule: string | null;

  cve: string | null;

  file: string | null;

  line: number | null;

  recommendation: string | null;

  fixed: boolean;

  createdAt: string;

  securityScan: {
    tool: string;
    status: string;
    startedAt: string;
    finishedAt: string | null;
  };
}

export const findingsApi = {
  async getAll() {
    const { data } = await api.get<Finding[]>("/findings");
    return data;
  },
};