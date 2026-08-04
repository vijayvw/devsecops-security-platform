import fs from "fs/promises";
import os from "os";
import path from "path";

import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { securityScanService } from "../../security-scans/service";

const execFileAsync = promisify(execFile);

export const semgrepRunner = {
  async run(
    scanId: string,
    repositoryPath: string,
  ) {
    const reportPath = path.join(
      os.tmpdir(),
      `semgrep-${scanId}.json`,
    );
    const semgrepBinary =
  process.env.SEMGREP_BINARY ??
  "semgrep";

    try {
      try {
        await execFileAsync(
  semgrepBinary,
  [
    "scan",
    "--config",
    "auto",
    "--json",
    "--output",
    reportPath,
    repositoryPath,
  ],
);
      } catch (error: any) {
        // Semgrep exits with code 1 when findings are detected.
        // That's expected, so only rethrow other errors.
        if (error.code !== 1) {
          throw error;
        }
      }

      const report = JSON.parse(
        await fs.readFile(
          reportPath,
          "utf8",
        ),
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