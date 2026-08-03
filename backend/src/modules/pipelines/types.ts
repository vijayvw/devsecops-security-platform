import { PipelineProvider } from "@prisma/client";

export interface CreatePipelineDto {
  applicationId: string;
  name: string;
  provider: PipelineProvider;
}

export interface UpdatePipelineDto {
  name?: string;
  provider?: PipelineProvider;
}
