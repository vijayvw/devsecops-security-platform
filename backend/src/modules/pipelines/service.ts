import { AppError } from "../../errors/app-error";
import { PipelineRepository } from "./repository";
import {
  CreatePipelineDto,
  UpdatePipelineDto,
} from "./types";

export class PipelineService {
  private readonly repository = new PipelineRepository();

  async create(data: CreatePipelineDto) {
    const application =
      await this.repository.findApplication(
        data.applicationId,
      );

    if (!application) {
      throw new AppError(
        "Application not found",
        404,
      );
    }

    const existing =
      await this.repository.findByName(
        data.applicationId,
        data.name,
      );

    if (existing) {
      throw new AppError(
        "Pipeline already exists for this application",
        409,
      );
    }

    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const pipeline =
      await this.repository.findById(id);

    if (!pipeline) {
      throw new AppError(
        "Pipeline not found",
        404,
      );
    }

    return pipeline;
  }

  async update(
    id: string,
    data: UpdatePipelineDto,
  ) {
    await this.findById(id);

    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}