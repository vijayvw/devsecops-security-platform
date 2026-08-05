import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

export async function cloneRepository(
  repositoryUrl: string,
  workspace: string,
) {
  console.log("Cloning...");
  console.log("Repository:", repositoryUrl);
  console.log("Workspace:", workspace);

  try {
    const result = await exec("git", [
      "clone",
      "--depth",
      "1",
      repositoryUrl,
      workspace,
    ]);

    console.log("=== CLONE SUCCESS ===");
    console.log("stdout:");
    console.log(result.stdout);
    console.log("stderr:");
    console.log(result.stderr);
  } catch (err: any) {
    console.log("=== CLONE FAILED ===");
    console.log(err);

    console.log("stdout:");
    console.log(err.stdout);

    console.log("stderr:");
    console.log(err.stderr);

    throw err;
  }

  return workspace;
}