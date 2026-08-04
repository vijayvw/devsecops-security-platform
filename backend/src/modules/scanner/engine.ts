import { cloneRepository } from "./clone";

export class ScannerEngine {
  async run(
    runId: string,
    repository: string,
    branch: string,
  ) {
    const workspace =
      await cloneRepository(
        repository,
        branch,
        runId,
      );

    return {
      workspace,
    };
  }
}

export const scannerEngine =
  new ScannerEngine();
