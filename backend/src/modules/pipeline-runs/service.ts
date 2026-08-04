import { AppError } from "../../errors/app-error";
import { PipelineStatus } from "@prisma/client";
import { securityRunnerService } from "../security-runner/service";

import { PipelineRunRepository } from "./repository";

import {
  CreatePipelineRunDto,
  UpdatePipelineRunDto,
} from "./types";

export class PipelineRunService {
  private readonly repository =
    new PipelineRunRepository();

  async create(data: CreatePipelineRunDto) {
  const pipeline =
    await this.repository.findPipeline(
      data.pipelineId,
    );

  if (!pipeline) {
    throw new AppError(
      "Pipeline not found",
      404,
    );
  }

  const run =
    await this.repository.create({
      ...data,
      status: PipelineStatus.RUNNING,
    });

  this.execute(
    run.id,
    pipeline.application.repositoryUrl,
  );

  return run;
}

  private async execute(
  id: string,
  repositoryUrl: string,
) {
  const started = Date.now();

  try {
    await securityRunnerService.run(
      id,
      repositoryUrl,
    );

    await this.repository.update(id, {
      status: PipelineStatus.SUCCESS,
      finishedAt: new Date(),
      duration: Math.round(
        (Date.now() - started) / 1000,
      ),
    });
  } catch (error) {
    console.error(error);

    await this.repository.update(id, {
      status: PipelineStatus.FAILED,
      finishedAt: new Date(),
      duration: Math.round(
        (Date.now() - started) / 1000,
      ),
    });
  }
}
  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const run =
      await this.repository.findById(id);

    if (!run) {
      throw new AppError(
        "Pipeline run not found",
        404,
      );
    }

    return run;
  }

  async update(
    id: string,
    data: UpdatePipelineRunDto,
  ) {
    await this.findById(id);

    return this.repository.update(
      id,
      data,
    );
  }
  
}
export const pipelineRunService =
  new PipelineRunService();