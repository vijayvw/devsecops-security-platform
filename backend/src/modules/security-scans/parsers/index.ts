import { ScanTool } from "@prisma/client";

import { GitleaksParser } from "./gitleaks";
import { SemgrepParser } from "./semgrep";
import { TrivyParser } from "./trivy";
import { CheckovParser } from "./checkov";
import { DependencyCheckParser } from "./dependency-check";

export interface ParsedFinding {
  severity: any;

  title: string;

  description: string;

  rule?: string;

  cve?: string;

  file?: string;

  line?: number;

  recommendation?: string;
}

export interface ScanParser {
  parse(report: unknown): ParsedFinding[];
}

export function getParser(tool: ScanTool): ScanParser {
  switch (tool) {
    case ScanTool.GITLEAKS:
      return new GitleaksParser();

    case ScanTool.SEMGREP:
      return new SemgrepParser();

    case ScanTool.TRIVY:
      return new TrivyParser();

    case ScanTool.CHECKOV:
      return new CheckovParser();

    case ScanTool.DEPENDENCY_CHECK:
      return new DependencyCheckParser();

    default:
      throw new Error(`Unsupported scan tool: ${tool}`);
  }
}