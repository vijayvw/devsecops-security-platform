import { PipelineProvider } from "@prisma/client";
import { z } from "zod";

export const createPipelineSchema = z.object({
  applicationId: z.string().uuid(),

  name: z.string().min(2).max(100),

  provider: z.nativeEnum(PipelineProvider),
});

export type CreatePipelineInput = z.infer<
  typeof createPipelineSchema
>;
