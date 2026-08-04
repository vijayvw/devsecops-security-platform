import { Request, Response } from "express";
import { ScanStatus } from "@prisma/client";
import { securityScanService } from "./service";
import {
  createSecurityScanSchema,
  createFindingSchema,
} from "./validator";

export const securityScanController = {
  async create(req: Request, res: Response) {
    const data = createSecurityScanSchema.parse(req.body);

    const scan = await securityScanService.createScan(data);

    res.status(201).json(scan);
  },

  async list(req: Request, res: Response) {
    const scans = await securityScanService.getScans({
      pipelineRunId: req.query.pipelineRunId as string | undefined,
      tool: req.query.tool as any,
      status: req.query.status as ScanStatus | undefined,
    });

    res.json(scans);
  },

  async get(req: Request, res:Response) {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const scan = await securityScanService.getScan(id);

    if (!scan) {
      return res.status(404).json({
        message: "Security scan not found",
      });
    }

    res.json(scan);
  },

  async finish(req: Request, res: Response) {
    const { status, reportPath } = req.body;

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const scan = await securityScanService.finishScan(
      id,
      status,
      reportPath
    );

    res.json(scan);
  },

  async addFindings(req: Request, res: Response) {
    const findings = createFindingSchema.array().parse(req.body);

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await securityScanService.addFindings(id, findings);

    res.status(201).json({
      message: "Findings stored successfully",
    });
  },

  async summary(req: Request, res: Response) {
    const summary = await securityScanService.getSummary();

    res.json(summary);
  },

  async uploadReport(req: Request, res: Response) {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const report = req.body;

    const scan = await securityScanService.importReport(
      id,
      report
    );

    res.json(scan);
  },

  // ----------------------------
  // NEW ENDPOINTS
  // ----------------------------

  async downloadReport(req: Request, res: Response) {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const report = await securityScanService.getReport(id);

    res.json(report);
  },

  async remove(req: Request, res: Response) {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await securityScanService.deleteScan(id);

    res.status(204).send();
  },
};