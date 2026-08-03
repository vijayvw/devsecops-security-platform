import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string().min(2).max(100),

  repositoryUrl: z.string().url(),

  defaultBranch: z.string().default("main"),

  language: z.string(),

  description: z.string().optional(),
});

export type CreateApplicationInput =
  z.infer<typeof createApplicationSchema>;
