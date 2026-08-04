import fs from "fs/promises";
import os from "os";
import path from "path";

import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { securityScanService } from "../../security-scans/service";

const execFileAsync = promisify(execFile);

export const trivyRunner = {
  async run(
    scanId: string,
    repositoryPath: string,
  ) {
    const reportPath = path.join(
      os.tmpdir(),
      `trivy-${scanId}.json`,
    );

    try {
      await execFileAsync("trivy", [
        "fs",
        "--format",
        "json",
        "--output",
        reportPath,
        repositoryPath,
      ]);

      const report = JSON.parse(
        await fs.readFile(reportPath, "utf8"),
      );

      return securityScanService.importReport(
        scanId,
        report,
      );
    } finally {
      await fs.rm(reportPath, {
        force: true,
      });
    }
  },
};