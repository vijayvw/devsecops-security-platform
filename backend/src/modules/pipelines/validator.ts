import { z } from "zod";

export const createPipelineSchema = z.object({
  applicationId: z.string().uuid(),

  name: z.string().min(2),

  provider: z.enum([
    "GITHUB_ACTIONS",
    "JENKINS",
  ]),
});

export const updatePipelineSchema =
  createPipelineSchema.partial();