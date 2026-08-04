import fs from "fs/promises";
import path from "path";
import { simpleGit } from "simple-git";

export async function cloneRepository(
  repository: string,
  branch: string,
  runId: string,
) {
  const workspace = path.join(
    process.cwd(),
    "tmp",
    "scans",
    runId,
  );

  await fs.mkdir(workspace, {
    recursive: true,
  });

  const git = simpleGit();

  await git.clone(
    repository,
    workspace,
    [
      "--branch",
      branch,
      "--single-branch",
    ],
  );

  return workspace;
}
