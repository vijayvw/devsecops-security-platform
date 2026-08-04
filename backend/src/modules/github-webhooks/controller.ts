import { Request, Response } from "express";

import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";

import { GitHubWebhookService } from "./service";

export class GitHubWebhookController {
  private readonly service =
    new GitHubWebhookService();

  handle = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const run =
        await this.service.handlePush(
          req.body,
        );

      res.json(
        ApiResponse.success(
          "Webhook processed successfully",
          run,
        ),
      );
    },
  );
}
