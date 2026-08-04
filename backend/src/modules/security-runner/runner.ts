import {
  createWorkspace,
  deleteWorkspace,
} from "./workspace";

import { cloneRepository } from "./clone";
import { executePipeline } from "./pipeline";

export async function runRepository(
  pipelineRunId: string,
  repositoryUrl: string,
) {
  console.log("================================");
  console.log("SECURITY RUNNER STARTED");
  console.log("Pipeline:", pipelineRunId);
  console.log("Repository:", repositoryUrl);

  const workspace =
    await createWorkspace();

  console.log("Workspace:", workspace.path);

  try {
    console.log("Cloning repository...");

    await cloneRepository(
      repositoryUrl,
      workspace.path,
    );

    console.log("Repository cloned.");

    console.log("Starting security pipeline...");

    await executePipeline(
      pipelineRunId,
      workspace.path,
    );

    console.log("Security pipeline finished.");

    return {
      success: true,
    };
  } finally {
    console.log("Deleting workspace...");

    await deleteWorkspace(
      workspace.path,
    );

    console.log("Workspace deleted.");
  }
}