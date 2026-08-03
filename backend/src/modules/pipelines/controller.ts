import { Request, Response } from "express";

import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";

import { PipelineService } from "./service";

export class PipelineController {
  private readonly service = new PipelineService();

  create = asyncHandler(async (req: Request, res: Response) => {
    const pipeline = await this.service.create(req.body);

    res.status(201).json(
      ApiResponse.success(
        "Pipeline created successfully",
        pipeline,
      ),
    );
  });

  findAll = asyncHandler(async (_req: Request, res: Response) => {
    const pipelines = await this.service.findAll();

    res.json(
      ApiResponse.success(
        "Pipelines retrieved successfully",
        pipelines,
      ),
    );
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline id");
    }

    const pipeline = await this.service.findById(id);

    res.json(
      ApiResponse.success(
        "Pipeline retrieved successfully",
        pipeline,
      ),
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline id");
    }

    const pipeline = await this.service.update(id, req.body);

    res.json(
      ApiResponse.success(
        "Pipeline updated successfully",
        pipeline,
      ),
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline id");
    }

    await this.service.delete(id);

    res.json(
      ApiResponse.success("Pipeline deleted successfully"),
    );
  });
}