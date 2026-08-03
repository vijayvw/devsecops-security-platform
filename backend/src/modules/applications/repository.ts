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

  update(id: string, data: UpdateApplicationDto) {
    return this.prisma.application.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.application.delete({
      where: {
        id,
      },
    });
  }
}