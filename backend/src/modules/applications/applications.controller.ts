import { Request, Response } from "express";
import { applicationsService } from "./applications.service";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "./applications.validation";

export class ApplicationsController {
  async list(req: Request, res: Response) {
    const data = await applicationsService.getAll();
    res.json(data);
  }

  async archived(req: Request, res: Response) {
    const data = await applicationsService.getArchived();
    res.json(data);
  }

  async get(req: Request, res: Response) {
    const data = await applicationsService.getById(req.params.id);
    res.json(data);
  }

  async create(req: Request, res: Response) {
    const body = createApplicationSchema.parse(req.body);

    const app = await applicationsService.create(body);

    res.status(201).json(app);
  }

  async update(req: Request, res:Response) {
    const body = updateApplicationSchema.parse(req.body);

    const app = await applicationsService.update(
      req.params.id,
      body
    );

    res.json(app);
  }

  async restore(req: Request, res: Response) {
    const app = await applicationsService.restore(req.params.id);
    res.json(app);
  }

  async delete(req: Request, res: Response) {
    await applicationsService.delete(req.params.id);
    res.status(204).send();
  }
}

export const applicationsController =
  new ApplicationsController();