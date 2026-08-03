import { Request, Response } from "express";

import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";

import { PipelineRunService } from "./service";

export class PipelineRunController {
  private readonly service = new PipelineRunService();

  create = asyncHandler(async (req: Request, res: Response) => {
    const run = await this.service.create(req.body);

    res.status(201).json(
      ApiResponse.success(
        "Pipeline run created successfully",
        run,
      ),
    );
  });

  findAll = asyncHandler(async (_req: Request, res: Response) => {
    const runs = await this.service.findAll();

    res.json(
      ApiResponse.success(
        "Pipeline runs retrieved successfully",
        runs,
      ),
    );
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline run id");
    }

    const run = await this.service.findById(id);

    res.json(
      ApiResponse.success(
        "Pipeline run retrieved successfully",
        run,
      ),
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline run id");
    }

    const run = await this.service.update(id, req.body);

    res.json(
      ApiResponse.success(
        "Pipeline run updated successfully",
        run,
      ),
    );
  });
}