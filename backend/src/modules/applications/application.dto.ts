export interface CreateApplicationDto {
  name: string;
  description?: string;

  repositoryUrl: string;
  repositoryOwner?: string;
  repositoryName?: string;

  defaultBranch: string;
  language: string;

  isPrivate?: boolean;

  webhookEnabled?: boolean;
  webhookSecret?: string;

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
