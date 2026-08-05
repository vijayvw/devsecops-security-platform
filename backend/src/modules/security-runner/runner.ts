import fs from "fs/promises";
import path from "path";

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

  const workspace = await createWorkspace();

  console.log("Workspace:", workspace.path);

  try {
    console.log("STEP 1 - Cloning repository");

    await cloneRepository(
      repositoryUrl,
      workspace.path,
    );

    console.log("STEP 2 - Clone completed");

    console.log("================================");
    console.log("VERIFYING WORKSPACE");

    console.log("Workspace path:");
    console.log(workspace.path);

    const files = await fs.readdir(workspace.path);

    console.log("Workspace files:");
    console.log(files);

    const gitExists = await fs
      .access(path.join(workspace.path, ".git"))
      .then(() => true)
      .catch(() => false);

    console.log(".git exists:", gitExists);

    if (gitExists) {
      const gitFiles = await fs.readdir(
        path.join(workspace.path, ".git"),
      );

      console.log(".git contents:");
      console.log(gitFiles);
    }

    console.log("================================");

    console.log("STEP 3 - Executing security pipeline");

    await executePipeline(
      pipelineRunId,
      workspace.path,
    );

    console.log("STEP 4 - Pipeline finished");

    return {
      success: true,
    };
  } catch (err) {
    console.error("RUNNER FAILED");
    console.error(err);

    throw err;
  } finally {
    console.log("STEP 5 - Cleaning workspace");

    await deleteWorkspace(workspace.path);

    console.log("Workspace deleted");
  }
}