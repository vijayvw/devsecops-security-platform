import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

export async function cloneRepository(
  repositoryUrl: string,
  workspace: string,
) {
  await exec("git", [
    "clone",
    "--depth",
    "1",
    repositoryUrl,
    workspace,
  ]);

  return workspace;
}
