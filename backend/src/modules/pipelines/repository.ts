import { prisma } from "../../database/prisma";
import {
  CreatePipelineDto,
  UpdatePipelineDto,
} from "./types";

export class PipelinesRepository {
  async findAll() {
    return prisma.pipeline.findMany({
      include: {
        application: true,

        runs: {
          orderBy: {
            startedAt: "desc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.pipeline.findUnique({
      where: {
        id,
      },

      include: {
        application: true,

        runs: {
          orderBy: {
            startedAt: "desc",
          },
        },
      },
    });
  }

  async create(data: CreatePipelineDto) {
    return prisma.pipeline.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdatePipelineDto,
  ) {
    return prisma.pipeline.update({
      where: {
        id,
      },
      data,
    });
  }
  
  async findByRepositoryUrl(
  repositoryUrl: string,
) {
  return prisma.pipeline.findFirst({
    where: {
      application: {
        repositoryUrl,
      },
    },

    include: {
      application: true,
    },
  });
}

  async delete(id: string) {
    return prisma.pipeline.delete({
      where: {
        id,
      },
    });
  }
}

  

export const pipelinesRepository =
  new PipelinesRepository();