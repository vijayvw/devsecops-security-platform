import api from "./client";

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
}

export interface SecurityScan {
  id: string;
  pipelineRunId: string;

  tool: string;
  status: string;

  reportPath: string | null;

  startedAt: string;
  finishedAt: string | null;

  findings: Finding[];
}

export interface ScanSummary {
  totalScans: number;
  passed: number;
  failed: number;
  pending: number;
  running: number;

  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  tools: {
    gitleaks: {
      passed: number;
      failed: number;
    };

    trivy: {
      passed: number;
      failed: number;
    };

    semgrep: {
      passed: number;
      failed: number;
    };
  };
}

export const securityScansApi = {
  async getAll() {
    const { data } =
      await api.get<SecurityScan[]>("/security-scans");

    return data;
  },

  async getSummary() {
    const { data } =
      await api.get<ScanSummary>(
        "/security-scans/summary",
      );

    return data;
  },

  async getById(id: string) {
    const { data } =
      await api.get<SecurityScan>(
        `/security-scans/${id}`,
      );

    return data;
  },

  async rerun(id: string) {
    const { data } =
      await api.post(
        `/security-scans/${id}/rerun`,
      );

    return data;
  },

  async downloadReport(id: string) {
    const { data } =
      await api.get(
        `/security-scans/${id}/report`,
        {
          responseType: "blob",
        },
      );

    return data;
  },

  async delete(id: string) {
    await api.delete(
      `/security-scans/${id}`,
    );
  },
};