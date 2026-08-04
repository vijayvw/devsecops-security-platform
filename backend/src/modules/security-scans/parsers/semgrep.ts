import { Severity } from "@prisma/client";
import { ParsedFinding, ScanParser } from "./index";

export class SemgrepParser implements ScanParser {
  parse(report: any): ParsedFinding[] {
    if (!report?.results) {
      return [];
    }

    return report.results.map((finding: any) => ({
      severity: this.toSeverity(
        finding.extra?.severity,
      ),

      title:
        finding.check_id ??
        "Semgrep Finding",

      description:
        finding.extra?.message ??
        "No description",

      rule: finding.check_id,

      file: finding.path,

      line: finding.start?.line,
    }));
  }

  private toSeverity(
    severity?: string,
  ): Severity {
    switch (severity?.toUpperCase()) {
      case "ERROR":
        return Severity.CRITICAL;

      case "WARNING":
        return Severity.HIGH;

      case "INFO":
        return Severity.LOW;

      default:
        return Severity.INFO;
    }
  }
}