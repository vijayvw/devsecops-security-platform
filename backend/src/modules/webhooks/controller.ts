import { Request, Response } from "express";

import { env } from "../../config/env";

import { verifyGithubSignature } from "./github-signature";
import { webhookService } from "./service";

export class WebhookController {
  async github(
    req: Request & { rawBody?: string },
    res: Response,
  ) {
    if (env.NODE_ENV === "production") {
      const signature =
        req.header("X-Hub-Signature-256");

      const valid =
        verifyGithubSignature(
          req.rawBody ?? "",
          signature,
        );

      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Invalid webhook signature.",
        });
      }
    }

    const result =
      await webhookService.github(req.body);

    return res.json(result);
  }
}

export const webhookController =
  new WebhookController();