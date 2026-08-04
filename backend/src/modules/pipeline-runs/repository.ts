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

  scans: {
    include: {
      findings: true,
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

  scans: {
    include: {
      findings: true,
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

      scans: {
        include: {
          findings: true,
        },

        orderBy: {
          startedAt: "asc",
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

  scans: {
    include: {
      findings: true,
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
    include: {
      application: true,
    },
  });
}
}