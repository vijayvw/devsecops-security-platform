import { PipelineProvider } from "@prisma/client";

export interface CreatePipelineDto {
  applicationId: string;
  name: string;
  provider: "GITHUB_ACTIONS" | "JENKINS";
}

export interface UpdatePipelineDto
  extends Partial<CreatePipelineDto> {}