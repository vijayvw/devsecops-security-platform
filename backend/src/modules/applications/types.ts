export interface CreateApplicationDto {
  name: string;
  repositoryUrl: string;
  defaultBranch: string;
  language: string;

  description?: string;

  repositoryOwner?: string | null;
  repositoryName?: string | null;

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

export interface UpdateApplicationDto {
  name?: string;
  repositoryUrl?: string;
  defaultBranch?: string;
  language?: string;

  description?: string;

  repositoryOwner?: string | null;
  repositoryName?: string | null;

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