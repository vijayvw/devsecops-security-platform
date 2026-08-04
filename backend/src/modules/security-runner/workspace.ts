import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const ROOT = path.join(process.cwd(), "workspace");

export async function createWorkspace() {
  await fs.mkdir(ROOT, { recursive: true });

  const id = crypto.randomUUID();

  const dir = path.join(ROOT, id);

  await fs.mkdir(dir);

  return {
    id,
    path: dir,
  };
}

export async function deleteWorkspace(dir: string) {
  await fs.rm(dir, {
    recursive: true,
    force: true,
  });
}
