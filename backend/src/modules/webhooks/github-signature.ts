import crypto from "node:crypto";

import { env } from "../../config/env";

export function verifyGithubSignature(
  payload: string,
  signature: string | undefined,
) {
  if (!signature) {
    return false;
  }

  const expected =
    "sha256=" +
    crypto
      .createHmac(
        "sha256",
        env.GITHUB_WEBHOOK_SECRET,
      )
      .update(payload)
      .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature),
    );
  } catch {
    return false;
  }
}
