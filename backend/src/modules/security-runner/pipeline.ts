import {
  ScanStatus,
  ScanTool,
} from "@prisma/client";

import { securityScanService } from "../security-scans/service";

import {
  gitleaksRunner,
  trivyRunner,
  semgrepRunner,
  checkovRunner,
} from "./runners";

type Runner = {
  tool: ScanTool;
  run: (
    scanId: string,
    repositoryPath: string,
  ) => Promise<void>;
};

const runners: Runner[] = [
  {
    tool: ScanTool.GITLEAKS,
    run: gitleaksRunner.run,
  },
  {
    tool: ScanTool.TRIVY,
    run: trivyRunner.run,
  },
  {
    tool: ScanTool.SEMGREP,
    run: semgrepRunner.run,
  },
  {
    tool: ScanTool.CHECKOV,
    run: checkovRunner.run,
  },
];

export async function executePipeline(
  pipelineRunId: string,
  repositoryPath: string,
) {
  for (const runner of runners) {
  console.log(`Creating ${runner.tool} scan`);

  const scan = await securityScanService.createScan({
    pipelineRunId,
    tool: runner.tool,
    status: ScanStatus.RUNNING,
    reportPath: null,
  });

  console.log(`Created ${runner.tool} scan: ${scan.id}`);

  try {
    console.log(`Running ${runner.tool}...`);

    await runner.run(
      scan.id,
      repositoryPath,
    );

    console.log(`${runner.tool} completed`);
  } catch (error) {
    console.error(`${runner.tool} failed`);
    console.error(error);

    await securityScanService.finishScan(
      scan.id,
      ScanStatus.FAILED,
    );
  }
}
}

