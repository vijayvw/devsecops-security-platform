import { prisma } from "../../database/prisma";
import { Prisma } from "@prisma/client";

export class ApplicationsRepository {
  async findAll() {
  return prisma.application.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
  async findArchived() {
  return prisma.application.findMany({
    where: {
      isArchived: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}
  async restore(id: string) {
  return prisma.application.update({
    where: { id },
    data: {
      isArchived: false,
    },
  });
}

  async findById(id: string) {
    return prisma.application.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return prisma.application.findUnique({
      where: { name },
    });
  }

  async create(data: Prisma.ApplicationCreateInput) {
    return prisma.application.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ApplicationUpdateInput) {
    return prisma.application.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.application.update({
      where: { id },
      data: {
        isArchived: true,
      },
    });
  }
}

export const applicationsRepository = new ApplicationsRepository();
