import { Request, Response, NextFunction } from "express";
import { Severity } from "@prisma/client";

import { findingsService } from "./service";

export const findingsController = {
  async getFindings(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const findings = await findingsService.getFindings({
        severity: req.query.severity as Severity,
        fixed: req.query.fixed
          ? req.query.fixed === "true"
          : undefined,
        tool: req.query.tool as string,
        search: req.query.search as string,
      });

      res.json(findings);
    } catch (error) {
      next(error);
    }
  },

  async getFinding(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const finding = await findingsService.getFinding(id);

      res.json(finding);
    } catch (error) {
      next(error);
    }
  },

  async markFixed(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const finding = await findingsService.markFixed(id);

      res.json(finding);
    } catch (error) {
      next(error);
    }
  },
};