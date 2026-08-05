import { PrismaClient } from "@prisma/client";
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from "./types";

export class ApplicationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(data: CreateApplicationDto) {
    return this.prisma.application.create({
      data,
    });
  }

  findAll() {
    return this.prisma.application.findMany({
      where: {
        isArchived: false,
      },
      include: {
        pipelines: {
          include: {
            runs: {
              include: {
                scans: {
                  include: {
                    findings: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findArchived() {
    return this.prisma.application.findMany({
      where: {
        isArchived: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: string) {
    return this.prisma.application.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    id: string,
    data: UpdateApplicationDto,
  ) {
    return this.prisma.application.update({
      where: {
        id,
      },
      data,
    });
  }

  restore(id: string) {
    return this.prisma.application.update({
      where: {
        id,
      },
      data: {
        isArchived: false,
      },
    });
  }

  delete(id: string) {
    return this.prisma.application.update({
      where: {
        id,
      },
      data: {
        isArchived: true,
      },
    });
  }
}