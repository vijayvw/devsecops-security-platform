import { Request, Response } from "express";
import { pipelinesService } from "./service";
import {
  createPipelineSchema,
  updatePipelineSchema,
} from "./validator";

export class PipelinesController {
  async list(req: Request, res: Response) {
    const data = await pipelinesService.getAll();
    res.json(data);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline id");
    }

    const data = await pipelinesService.getById(id);

    res.json(data);
  }

  async create(req: Request, res: Response) {
    const body = createPipelineSchema.parse(req.body);

    const pipeline =
      await pipelinesService.create(body);

    res.status(201).json(pipeline);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline id");
    }

    const body = updatePipelineSchema.parse(req.body);

    const pipeline =
      await pipelinesService.update(id, body);

    res.json(pipeline);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new Error("Invalid pipeline id");
    }

    await pipelinesService.delete(id);

    res.status(204).send();
  }
}

export const pipelinesController =
  new PipelinesController();