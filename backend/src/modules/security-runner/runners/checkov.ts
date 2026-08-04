import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { securityScanService } from "../../security-scans/service";

const execFileAsync = promisify(execFile);

export const checkovRunner = {
  async run(
    scanId: string,
    repositoryPath: string,
  ) {
    const checkovBinary =
      process.env.CHECKOV_BINARY ??
      "checkov";

    const { stdout } = await execFileAsync(
      checkovBinary,
      [
        "-d",
        repositoryPath,
        "-o",
        "json",
        "--skip-path",
        "node_modules",
        "--skip-path",
        "dist",
        "--skip-path",
        "build",
        "--skip-path",
        "reports",
      ],
    );

    const report = JSON.parse(stdout);

    return securityScanService.importReport(
      scanId,
      report,
    );
  },
};