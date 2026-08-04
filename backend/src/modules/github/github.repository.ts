import { prisma } from "../../database/prisma";

export class GithubRepository {
  async get() {
    return prisma.githubIntegration.findFirst();
  }

  async save(data: {
    username: string;
    token: string;
  }) {
    const existing =
      await prisma.githubIntegration.findFirst();

    if (existing) {
      return prisma.githubIntegration.update({
        where: {
          id: existing.id,
        },
        data,
      });
    }

    return prisma.githubIntegration.create({
      data,
    });
  }

  async update(data: {
    username?: string;
    token?: string;
  }) {
    const existing =
      await prisma.githubIntegration.findFirst();

    if (!existing) {
      throw new Error("GitHub integration not found");
    }

    return prisma.githubIntegration.update({
      where: {
        id: existing.id,
      },
      data,
    });
  }

  async remove() {
    const existing =
      await prisma.githubIntegration.findFirst();

    if (!existing) {
      return;
    }

    await prisma.githubIntegration.delete({
      where: {
        id: existing.id,
      },
    });
  }

  async getToken() {
    const integration =
      await prisma.githubIntegration.findFirst();

    if (!integration) {
      throw new Error("GitHub is not connected");
    }

    return integration.token;
  }

  async getUsername() {
    const integration =
      await prisma.githubIntegration.findFirst();

    if (!integration) {
      throw new Error("GitHub is not connected");
    }

    return integration.username;
  }
}

export const githubRepository =
  new GithubRepository();