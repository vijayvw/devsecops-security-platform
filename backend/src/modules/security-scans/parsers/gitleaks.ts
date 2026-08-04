import { Severity } from "@prisma/client";
import { ParsedFinding, ScanParser } from "./index";

export class GitleaksParser implements ScanParser {
  parse(report: any): ParsedFinding[] {
    if (!Array.isArray(report)) {
      return [];
    }

    return report.map((finding: any) => ({
      severity: Severity.HIGH,
      title: finding.Description,
      description: `Secret detected: ${finding.Secret ?? ""}`,
      rule: finding.RuleID,
      file: finding.File,
    }));
  }
}