import { ScanTool } from "@prisma/client";
import { securityScanEngine } from "./engine";

export interface ImportSecurityReportsDto {
  pipelineRunId: string;
  reports: {
    tool: ScanTool;
    path: string;
  }[];
}

export const securityScanImporter = {
  async importReports(data: ImportSecurityReportsDto) {
    const results = [];

    for (const report of data.reports) {
      const result = await securityScanEngine.importReport(
        data.pipelineRunId,
        report.tool,
        report.path
      );

      results.push(result);
    }

    return results;
  },
};