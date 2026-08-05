import { prisma } from "../../database/prisma";

export class DashboardService {
  async summary() {
    const [
      applications,
      pipelines,
      pipelineRuns,
      securityScans,
      findings,
      passedScans,
      failedScans,
      critical,
      high,
      medium,
      low,
    ] = await Promise.all([
      prisma.application.count(),
      prisma.pipeline.count(),
      prisma.pipelineRun.count(),
      prisma.securityScan.count(),
      prisma.finding.count(),

      prisma.securityScan.count({
        where: {
          status: "PASSED",
        },
      }),

      prisma.securityScan.count({
        where: {
          status: "FAILED",
        },
      }),

      prisma.finding.count({
        where: {
          severity: "CRITICAL",
        },
      }),

      prisma.finding.count({
        where: {
          severity: "HIGH",
        },
      }),

      prisma.finding.count({
        where: {
          severity: "MEDIUM",
        },
      }),

      prisma.finding.count({
        where: {
          severity: "LOW",
        },
      }),
    ]);

    return {
      applications,
      pipelines,
      pipelineRuns,
      securityScans,
      findings,
      critical,
      high,
      medium,
      low,
      passedScans,
      failedScans,
    };
  }
}

export const dashboardService = new DashboardService();