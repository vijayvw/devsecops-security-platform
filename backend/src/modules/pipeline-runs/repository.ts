import { prisma } from "../../database";
import {
  CreatePipelineRunDto,
  UpdatePipelineRunDto,
} from "./types";

export class PipelineRunRepository {
  create(data: CreatePipelineRunDto) {
    return prisma.pipelineRun.create({
      data,
      include: {
        pipeline: {
          include: {
            application: true,
          },
        },
      },
    });
  }

  findAll() {
    return prisma.pipelineRun.findMany({
      include: {
        pipeline: {
          include: {
            application: true,
          },
        },
      },
      orderBy: {
        startedAt: "desc",
      },
    });
  }

  findById(id: string) {
    return prisma.pipelineRun.findUnique({
      where: { id },
      include: {
        pipeline: {
          include: {
            application: true,
          },
        },
      },
    });
  }

  update(id: string, data: UpdatePipelineRunDto) {
    return prisma.pipelineRun.update({
      where: { id },
      data,
      include: {
        pipeline: {
          include: {
            application: true,
          },
        },
      },
    });
  }

  findPipeline(id: string) {
    return prisma.pipeline.findUnique({
      where: {
        id,
      },
    });
  }
}