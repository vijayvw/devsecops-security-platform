import { PipelineStatus } from "@prisma/client";
import { z } from "zod";

export const createPipelineRunSchema = z.object({
  pipelineId: z.string().uuid(),

  commitSha: z.string().min(7).max(40),

  branch: z.string().min(1),

  status: z.nativeEnum(PipelineStatus),
});

export type CreatePipelineRunInput =
  z.infer<typeof createPipelineRunSchema>;

export const updatePipelineRunSchema = z.object({
  status: z.nativeEnum(PipelineStatus).optional(),

  duration: z.number().int().positive().optional(),

  finishedAt: z.coerce.date().optional(),
});