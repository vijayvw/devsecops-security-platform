import { ScanStatus, ScanTool, Severity } from "@prisma/client";

export interface CreateSecurityScanDto {
  pipelineRunId: string;
  tool: ScanTool;
  status: ScanStatus;
  reportPath?: string;
}

export interface UpdateSecurityScanDto {
  status?: ScanStatus;
  reportPath?: string;
  finishedAt?: Date;
}

export interface SecurityScanQuery {
  pipelineRunId?: string;
  tool?: ScanTool;
  status?: ScanStatus;
}

export interface CreateFindingDto {
  severity: Severity;

  title: string;

  description: string;

  rule?: string;

  cve?: string;

  file?: string;

  line?: number;

  recommendation?: string;
}