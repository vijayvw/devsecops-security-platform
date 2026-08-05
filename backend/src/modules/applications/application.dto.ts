export interface CreateApplicationDto {
  name: string;
  description?: string;

  repositoryUrl: string;
  repositoryOwner?: string | null;
  repositoryName?: string | null;

  defaultBranch: string;
  language: string;

  isPrivate?: boolean;

  webhookEnabled?: boolean;
  webhookSecret?: string | null;

  scanOnPush?: boolean;
  scanOnPullRequest?: boolean;

  autoFixEnabled?: boolean;

  scanSecrets?: boolean;
  scanSast?: boolean;
  scanDependencies?: boolean;
  scanIac?: boolean;
  scanContainers?: boolean;

  isArchived?: boolean;
}

export interface UpdateApplicationDto
  extends Partial<CreateApplicationDto> {}