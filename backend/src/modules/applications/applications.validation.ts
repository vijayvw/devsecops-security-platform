import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),

  repositoryUrl: z.string().url(),

  repositoryOwner: z.string().nullable().optional(),
  repositoryName: z.string().nullable().optional(),

  defaultBranch: z.string(),

  language: z.string(),

  isPrivate: z.boolean().optional(),

  webhookEnabled: z.boolean().optional(),
  webhookSecret: z.string().nullable().optional(),

  scanOnPush: z.boolean().optional(),
  scanOnPullRequest: z.boolean().optional(),
  autoFixEnabled: z.boolean().optional(),

  scanSecrets: z.boolean().optional(),
  scanSast: z.boolean().optional(),
  scanDependencies: z.boolean().optional(),
  scanIac: z.boolean().optional(),
  scanContainers: z.boolean().optional(),

  isArchived: z.boolean().optional(),
});

export const updateApplicationSchema =
  createApplicationSchema.partial();