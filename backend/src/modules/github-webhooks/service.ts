import { pipelinesRepository } from "../pipelines/repository";
import { PipelineRunService } from "../pipeline-runs/service";

export class GitHubWebhookService {
  private readonly pipelineRunService =
    new PipelineRunService();

  async handlePush(payload: any) {
    const repositoryUrl =
      payload.repository?.clone_url;

    if (!repositoryUrl) {
      throw new Error(
        "Repository URL missing",
      );
    }

    const pipeline =
      await pipelinesRepository.findByRepositoryUrl(
        repositoryUrl,
      );

    if (!pipeline) {
      throw new Error(
        "No pipeline configured for this repository",
      );
    }

    const branch =
      payload.ref?.replace(
        "refs/heads/",
        "",
      ) ?? "main";

    const commitSha =
      payload.after ??
      "unknown";

    return this.pipelineRunService.create({
      pipelineId: pipeline.id,
      branch,
      commitSha,
      status: "RUNNING",
    });
  }
}
