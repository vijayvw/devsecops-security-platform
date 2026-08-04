import { PrismaClient, Severity } from "@prisma/client";

const prisma = new PrismaClient();

export interface FindingQuery {
  severity?: Severity;
  fixed?: boolean;
  tool?: string;
  search?: string;
}

export const findingsRepository = {
  async findAll(query: FindingQuery) {
    return prisma.finding.findMany({
      where: {
        severity: query.severity,
        fixed: query.fixed,

        OR: query.search
          ? [
              {
                title: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
              {
                file: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            ]
          : undefined,
      },

      include: {
        securityScan: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.finding.findUnique({
      where: {
        id,
      },

      include: {
        securityScan: true,
      },
    });
  },

  async markFixed(id: string) {
    return prisma.finding.update({
      where: {
        id,
      },

      data: {
        fixed: true,
      },
    });
  },
};