import { Severity } from "@prisma/client";
import { ParsedFinding, ScanParser } from "./index";

export class TrivyParser implements ScanParser {
  parse(report: any): ParsedFinding[] {
    if (!report?.Results) {
      return [];
    }

    const findings: ParsedFinding[] = [];

    for (const result of report.Results) {
      if (!result.Vulnerabilities) {
        continue;
      }

      for (const vuln of result.Vulnerabilities) {
        findings.push({
          severity:
            Severity[
              vuln.Severity as keyof typeof Severity
            ] ?? Severity.INFO,

          title: vuln.Title,

          description: vuln.Description,

          rule: vuln.PkgName,

          cve: vuln.VulnerabilityID,

          file: result.Target,
        });
      }
    }

    return findings;
  }
}