import { Request, Response } from "express";
import { infrastructureService } from "./service";

export const infrastructureController = {
  async overview(req: Request, res: Response) {
    const data = await infrastructureService.getOverview();

    res.json(data);
  },
};
