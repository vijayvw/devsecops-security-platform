export interface CreateApplicationDto {
  name: string;
  repositoryUrl: string;
  defaultBranch: string;
  language: string;
  description?: string;
}

export interface UpdateApplicationDto {
  name?: string;
  repositoryUrl?: string;
  defaultBranch?: string;
  language?: string;
  description?: string;
}
