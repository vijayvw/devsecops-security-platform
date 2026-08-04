import fs from "fs/promises";
import { ScanStatus, ScanTool } from "@prisma/client";

import { securityScanRepository } from "./repository";

import { getParser } from "./parsers";

export const securityScanEngine = {
  async importReport(
    pipelineRunId: string,
    tool: ScanTool,
    reportPath: string
  ) {
    const scan = await securityScanRepository.create({
      pipelineRunId,
      tool,
      status: ScanStatus.RUNNING,
      reportPath,
    });

    const raw = await fs.readFile(reportPath, "utf8");
    const report = JSON.parse(raw);

    const parser = getParser(tool);

    const findings = parser.parse(report);

    await securityScanRepository.createFindings(
      scan.id,
      findings
    );

    const status =
      findings.length > 0
        ? ScanStatus.FAILED
        : ScanStatus.PASSED;

    await securityScanRepository.updateStatus(
      scan.id,
      status,
      reportPath
    );

    return scan;
  },
};