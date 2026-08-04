import api from "../client";

export type SecuritySummary = {
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

    checkov: {
      passed: number;
      failed: number;
    };
  };
};

export const securityApi = {
  async getSummary() {
    const res =
      await api.get<SecuritySummary>(
        "/security-scans/summary"
      );

    return res.data;
  },
};