import { prisma } from "../../database";

export class ReportsRepository {
  async getSummary() {
    const [
      applications,
      pipelineRuns,
      securityScans,
      findings,
      severityCounts,
      toolCounts,
    ] = await Promise.all([
      prisma.application.count(),
      prisma.pipelineRun.count(),
      prisma.securityScan.count(),
      prisma.finding.count(),

      prisma.finding.groupBy({
        by: ["severity"],
        _count: {
          severity: true,
        },
      }),

      prisma.securityScan.groupBy({
        by: ["tool"],
        _count: {
          tool: true,
        },
      }),
    ]);

    return {
      applications,
      pipelineRuns,
      securityScans,
      findings,
      severityCounts,
      toolCounts,
    };
  }
}

export const reportsRepository =
  new ReportsRepository();
