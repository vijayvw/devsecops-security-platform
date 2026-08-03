import { PipelineStatus } from "@prisma/client";

export interface CreatePipelineRunDto {
  pipelineId: string;
  commitSha: string;
  branch: string;
  status: PipelineStatus;
}

export interface UpdatePipelineRunDto {
  status?: PipelineStatus;
  duration?: number;
  finishedAt?: Date;
}