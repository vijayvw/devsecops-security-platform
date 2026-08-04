export interface ToolRunner {
  run(
    scanId: string,
    repositoryPath: string,
  ): Promise<void>;
}

export { gitleaksRunner } from "./gitleaks";
export { trivyRunner } from "./trivy";
export { semgrepRunner } from "./semgrep";
export { checkovRunner } from "./checkov";



