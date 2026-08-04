import { Request, Response } from "express";
import { reportsService } from "./service";

export const reportsController = {
  async summary(req: Request, res: Response) {
    const data =
      await reportsService.getSummary();

    res.json(data);
  },
};
