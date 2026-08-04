import { Severity } from "@prisma/client";
import { ParsedFinding, ScanParser } from "./index";

export class CheckovParser implements ScanParser {
  parse(report: any): ParsedFinding[] {
    if (!Array.isArray(report)) {
      return [];
    }

    const findings: ParsedFinding[] = [];

    for (const framework of report) {
      const failedChecks =
        framework?.results?.failed_checks ?? [];

      for (const check of failedChecks) {
        findings.push({
          severity:
            this.mapSeverity(check.severity),

          title:
            check.check_name ??
            check.check_id,

          description:
            check.description ??
            check.guideline ??
            "Checkov policy violation",

          rule: check.check_id,

          file:
            check.repo_file_path ??
            check.file_path,

          line:
            check.file_line_range?.[0],

          recommendation:
            check.guideline,
        });
      }
    }

    return findings;
  }

  private mapSeverity(
    severity: string | null,
  ): Severity {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return Severity.CRITICAL;

      case "HIGH":
        return Severity.HIGH;

      case "MEDIUM":
        return Severity.MEDIUM;

      case "LOW":
        return Severity.LOW;

      default:
        return Severity.MEDIUM;
    }
  }
}