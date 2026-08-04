import { Request, Response } from "express";
import { githubService } from "./github.service";

export class GithubController {
  async getIntegration(
    req: Request,
    res: Response
  ) {
    const integration =
      await githubService.getIntegration();

    res.json(integration);
  }

  async connect(
    req: Request,
    res: Response
  ) {
    const { username, token } = req.body;

    const integration =
      await githubService.connect(
        username,
        token
      );

    res.json(integration);
  }

  async update(
    req: Request,
    res: Response
  ) {
    const { username, token } = req.body;

    const integration =
      await githubService.update(
        username,
        token
      );

    res.json(integration);
  }

  async disconnect(
    req: Request,
    res: Response
  ) {
    await githubService.disconnect();

    res.json({
      success: true,
    });
  }

  async testConnection(
    req: Request,
    res: Response
  ) {
    const user =
      await githubService.testConnection();

    res.json(user);
  }

  async repositories(
    req: Request,
    res: Response
  ) {
    const repos =
      await githubService.getRepositories();

    res.json(repos);
  }

  async branches(
    req: Request,
    res: Response
  ) {
    const { owner, repo } = req.params;

    const branches =
      await githubService.getBranches(
        owner,
        repo
      );

    res.json(branches);
  }

  async importRepository(
    req: Request,
    res: Response
  ) {
    const { repository, branch } = req.body;

    const application =
      await githubService.importRepository(
        repository,
        branch
      );

    res.status(201).json(application);
  }
}

export const githubController =
  new GithubController();