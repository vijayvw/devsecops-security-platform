import { execFile } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { promisify } from "util";

import { securityScanService } from "../../security-scans/service";

const exec = promisify(execFile);

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
      console.log("================================");
      console.log("Running Gitleaks");
      console.log("Repository:", repositoryPath);

      await exec(
        "gitleaks",
        [
          "git",
          repositoryPath,
          "--report-format",
          "json",
          "--report-path",
          reportPath,
        ],
        {
          maxBuffer: 1024 * 1024 * 100,
        },
      );

      const report = JSON.parse(
        await fs.readFile(reportPath, "utf8"),
      );

      return await securityScanService.importReport(
        scanId,
        report,
      );
    } catch (err: any) {
      // Exit code 1 = leaks found (expected)
      if (err.code === 1) {
        const report = JSON.parse(
          await fs.readFile(reportPath, "utf8"),
        );

        return await securityScanService.importReport(
          scanId,
          report,
        );
      }

      throw err;
    } finally {
      await fs.rm(reportPath, {
        force: true,
      });
    }
  },
};