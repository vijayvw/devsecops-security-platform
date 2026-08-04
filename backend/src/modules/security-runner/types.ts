export interface RunSecurityScanDto {
  pipelineRunId: string;
  repositoryPath: string;
  tools: string[];
}