import fs from "fs/promises";
import os from "os";
import path from "path";

import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { securityScanService } from "../../security-scans/service";

const execFileAsync = promisify(execFile);

export const gitleaksRunner = {
  async run(
    scanId: string,
    repositoryPath: string,
  ) {
    const reportPath = path.join(
      os.tmpdir(),
      `gitleaks-${scanId}.json`,
    );

    try {
      try {
        await execFileAsync("gitleaks", [
          "detect",
          "--source",
          repositoryPath,
          "--report-format",
          "json",
          "--report-path",
          reportPath,
        ]);
      } catch (error: any) {
        // Exit code 1 means leaks were found.
        if (error.code !== 1) {
          throw error;
        }
      }

      const report = JSON.parse(
        await fs.readFile(reportPath, "utf8"),
      );

      return await securityScanService.importReport(
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