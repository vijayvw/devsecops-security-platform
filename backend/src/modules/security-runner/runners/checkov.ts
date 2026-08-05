import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { securityScanService } from "../../security-scans/service";

export const checkovRunner = {
  async run(
    scanId: string,
    repositoryPath: string,
  ) {
    const checkovBinary =
      process.env.CHECKOV_BINARY ?? "checkov";

    const reportPath = join(
      tmpdir(),
      `checkov-${scanId}.json`,
    );

    await new Promise<void>((resolve, reject) => {
      const child = spawn(
        checkovBinary,
        [
          "-d",
          repositoryPath,
          "-o",
          "json",
          "--output-file-path",
          reportPath,
          "--skip-path",
          "node_modules",
          "--skip-path",
          "dist",
          "--skip-path",
          "build",
          "--skip-path",
          "reports",
        ],
        {
          stdio: [
            "ignore",
            "ignore",
            "pipe",
          ],
        },
      );

      let stderr = "";

      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });

      child.on("error", reject);

      child.on("close", (code) => {
        // Checkov returns 1 when findings exist.
        if (code === 0 || code === 1) {
          resolve();
        } else {
          reject(
            new Error(
              `Checkov exited with code ${code}\n${stderr}`,
            ),
          );
        }
      });
    });

    // ============================

    let jsonFile = reportPath;

const stat = await fs.stat(reportPath);

if (stat.isDirectory()) {
  const files = await fs.readdir(reportPath);

  const reportFile = files.find((f) => f.endsWith(".json"));

  if (!reportFile) {
    throw new Error(
      `No JSON report found inside ${reportPath}`,
    );
  }

  jsonFile = join(reportPath, reportFile);
}

const report = JSON.parse(
  await fs.readFile(jsonFile, "utf8"),
);

// Cleanup
await fs.rm(reportPath, {
  recursive: true,
  force: true,
}).catch(() => {});

    return securityScanService.importReport(
      scanId,
      report,
    );
  },
};