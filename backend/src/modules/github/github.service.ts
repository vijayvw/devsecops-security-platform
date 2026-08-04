import { Octokit } from "@octokit/rest";
import { prisma } from "../../database/prisma";
import { githubRepository } from "./github.repository";

export class GithubService {
  async getIntegration() {
    return githubRepository.get();
  }

  async connect(username: string, token: string) {
    return githubRepository.save({
      username,
      token,
    });
  }

  async update(username: string, token: string) {
    return githubRepository.update({
      username,
      token,
    });
  }

  async disconnect() {
    return githubRepository.remove();
  }

  private async octokit() {
    const integration =
      await githubRepository.get();

    if (!integration) {
      throw new Error("GitHub not connected");
    }

    return new Octokit({
      auth: integration.token,
    });
  }

  async testConnection() {
    const octokit = await this.octokit();

    const { data } =
      await octokit.users.getAuthenticated();

    await prisma.githubIntegration.update({
      where: {
        id: (
          await githubRepository.get()
        )!.id,
      },
      data: {
        isConnected: true,
        lastChecked: new Date(),
      },
    });

    return data;
  }

  async getRepositories() {
    const octokit = await this.octokit();

    const { data } =
      await octokit.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 100,
      });

    return data;
  }

  async getBranches(
    owner: string,
    repo: string
  ) {
    const octokit = await this.octokit();

    const { data } =
      await octokit.repos.listBranches({
        owner,
        repo,
      });

    return data;
  }

  async importRepository(
    repository: string,
    branch: string
  ) {
    const [owner, repo] =
      repository.split("/");

    const application =
      await prisma.application.create({
        data: {
          name: repo,
          description: `${repo} imported from GitHub`,
          repositoryUrl: `https://github.com/${repository}`,
          repositoryOwner: owner,
          repositoryName: repo,
          defaultBranch: branch,
          language: "Unknown",
          isPrivate: false,
          webhookEnabled: false,
          scanOnPush: true,
          scanOnPullRequest: true,
          autoFixEnabled: false,
          scanSecrets: true,
          scanSast: true,
          scanDependencies: true,
          scanIac: true,
          scanContainers: true,
        },
      });

    await prisma.pipeline.create({
      data: {
        applicationId: application.id,
        name: `${repo} Pipeline`,
        provider: "GITHUB_ACTIONS",
      },
    });

    return application;
  }
}

export const githubService =
  new GithubService();