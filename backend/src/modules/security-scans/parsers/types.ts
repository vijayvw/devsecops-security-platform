import { Severity } from "@prisma/client";

export interface ParsedFinding {
  severity: Severity;
  title: string;
  description: string;
  rule?: string;
  cve?: string;
  file?: string;
}