import { AppError } from "../../errors/app-error";

import { PipelineRunRepository } from "./repository";

import {
  CreatePipelineRunDto,
  UpdatePipelineRunDto,
} from "./types";

export class PipelineRunService {
  private readonly repository = new PipelineRunRepository();

  async create(data: CreatePipelineRunDto) {
    const pipeline = await this.repository.findPipeline(
      data.pipelineId,
    );

    if (!pipeline) {
      throw new AppError("Pipeline not found", 404);
    }

    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const run = await this.repository.findById(id);

    if (!run) {
      throw new AppError("Pipeline run not found", 404);
    }

    return run;
  }

  async update(
    id: string,
    data: UpdatePipelineRunDto,
  ) {
    await this.findById(id);

    return this.repository.update(id, data);
  }
}