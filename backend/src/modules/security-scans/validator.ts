import { ScanStatus, ScanTool, Severity } from "@prisma/client";
import { z } from "zod";

export const createSecurityScanSchema = z.object({
  pipelineRunId: z.string().uuid(),

  tool: z.nativeEnum(ScanTool),

  status: z.nativeEnum(ScanStatus),

  reportPath: z.string().optional(),
});

export const createFindingSchema = z.object({
  severity: z.nativeEnum(Severity),

  title: z.string().min(2),

  description: z.string().min(2),

  rule: z.string().optional(),

  cve: z.string().optional(),

  file: z.string().optional(),
});

export type CreateSecurityScanInput =
  z.infer<typeof createSecurityScanSchema>;

export type CreateFindingInput =
  z.infer<typeof createFindingSchema>;