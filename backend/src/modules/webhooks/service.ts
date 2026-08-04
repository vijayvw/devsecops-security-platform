import { pipelinesRepository } from "../pipelines/repository";
import { pipelineRunService } from "../pipeline-runs/service";

export class WebhookService {
  async github(payload: any) {
    console.log("GitHub Webhook Received");

    const repositoryUrl =
      payload.repository?.clone_url;

    if (!repositoryUrl) {
      return {
        success: false,
        message: "Repository URL not found.",
      };
    }

    const pipelines =
      await pipelinesRepository.findAll();

    const pipeline = pipelines.find(
      (p) =>
        p.application.repositoryUrl ===
        repositoryUrl,
    );

    if (!pipeline) {
      return {
        success: false,
        message:
          "No pipeline configured for repository.",
      };
    }

    const branch =
      payload.ref?.replace(
        "refs/heads/",
        "",
      ) ?? "main";

    const commitSha =
      payload.after ?? "unknown";

    const run =
      await pipelineRunService.create({
        pipelineId: pipeline.id,
        branch,
        commitSha,
      });

    return {
      success: true,
      runId: run.id,
      pipeline: pipeline.name,
    };
  }
}

export const webhookService =
  new WebhookService();