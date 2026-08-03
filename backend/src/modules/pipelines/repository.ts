import { prisma } from "../../database";
import {
  CreatePipelineDto,
  UpdatePipelineDto,
} from "./types";

export class PipelineRepository {
  create(data: CreatePipelineDto) {
    return prisma.pipeline.create({
      data,
      include: {
        application: true,
      },
    });
  }

  findAll() {
    return prisma.pipeline.findMany({
      include: {
        application: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: string) {
    return prisma.pipeline.findUnique({
      where: {
        id,
      },
      include: {
        application: true,
      },
    });
  }

  update(id: string, data: UpdatePipelineDto) {
    return prisma.pipeline.update({
      where: {
        id,
      },
      data,
      include: {
        application: true,
      },
    });
  }

  delete(id: string) {
    return prisma.pipeline.delete({
      where: {
        id,
      },
    });
  }

  findApplication(applicationId: string) {
    return prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });
  }

  findByName(
    applicationId: string,
    name: string,
  ) {
    return prisma.pipeline.findFirst({
      where: {
        applicationId,
        name,
      },
    });
  }
}