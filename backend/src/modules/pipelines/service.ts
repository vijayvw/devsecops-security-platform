import { pipelinesRepository } from "./repository";
import {
  CreatePipelineDto,
  UpdatePipelineDto,
} from "./types";

export class PipelinesService {
  async getAll() {
    const pipelines =
      await pipelinesRepository.findAll();

    return pipelines.map((pipeline) => {
      const runs = pipeline.runs ?? [];

      const totalRuns = runs.length;

      const successfulRuns = runs.filter(
        (run) => run.status === "SUCCESS",
      ).length;

      const successRate =
        totalRuns === 0
          ? 0
          : Math.round(
              (successfulRuns / totalRuns) * 100,
            );

      return {
        ...pipeline,

        totalRuns,

        successRate,

        latestRun: runs[0] ?? null,
      };
    });
  }

  async getById(id: string) {
    const pipeline =
      await pipelinesRepository.findById(id);

    if (!pipeline) {
      throw new Error("Pipeline not found");
    }

    const runs = pipeline.runs ?? [];

    const totalRuns = runs.length;

    const successfulRuns = runs.filter(
      (run) => run.status === "SUCCESS",
    ).length;

    const successRate =
      totalRuns === 0
        ? 0
        : Math.round(
            (successfulRuns / totalRuns) * 100,
          );

    return {
      ...pipeline,

      totalRuns,

      successRate,

      latestRun: runs[0] ?? null,
    };
  }

  async create(data: CreatePipelineDto) {
    return pipelinesRepository.create(data);
  }

  async update(
    id: string,
    data: UpdatePipelineDto
  ) {
    await this.getById(id);

    return pipelinesRepository.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);

    return pipelinesRepository.delete(id);
  }
}

export const pipelinesService =
  new PipelinesService();