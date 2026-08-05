import { Request, Response } from "express";

import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";

import { ApplicationService } from "./service";
import { applicationsService } from "./applications.service";


export class ApplicationController {
  private readonly service = new ApplicationService();

  create = asyncHandler(async (req: Request, res: Response) => {
  const application = await this.service.create(req.body);

  res.status(201).json(
    ApiResponse.success(
      "Application created successfully",
      application,
    ),
  );
});

  findAll = asyncHandler(async (_req: Request, res: Response) => {
    const applications = await this.service.findAll();

    res.json(
      ApiResponse.success(
        "Applications retrieved successfully",
        applications,
      ),
    );
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid application id");
    }

    const application = await this.service.findById(id);

    res.json(
      ApiResponse.success(
        "Application retrieved successfully",
        application,
      ),
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid application id");
    }

    const application = await this.service.update(
      id,
      req.body,
    );

    res.json(
      ApiResponse.success(
        "Application updated successfully",
        application,
      ),
    );
  });

  async archived(req: Request, res: Response) {
  const data = await applicationsService.getArchived();
  res.json(data);
}

restore = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("Invalid application id");
  }

  const app = await applicationsService.restore(id);

  res.json(
    ApiResponse.success(
      "Application restored successfully",
      app,
    ),
  );
});

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid application id");
    }

    await this.service.delete(id);

    res.json(
      ApiResponse.success(
        "Application deleted successfully",
      ),
    );
  });
}