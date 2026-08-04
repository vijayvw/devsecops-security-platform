import api from "./client";

export interface ReportsSummary {
  applications: number;
  pipelineRuns: number;
  securityScans: number;
  findings: number;

  severityCounts: {
    severity: string;
    _count: {
      severity: number;
    };
  }[];

  toolCounts: {
    tool: string;
    _count: {
      tool: number;
    };
  }[];
}

export async function getReportsSummary() {
  const { data } = await api.get<ReportsSummary>(
    "/reports/summary"
  );

  return data;
}
