import { securityScanRepository } from "./repository";
import { ScanStatus } from "@prisma/client";
import { securityScanEngine } from "./engine";
import { getParser } from "./parsers";
import {
  CreateFindingDto,
  CreateSecurityScanDto,
  SecurityScanQuery,
} from "./types";

export const securityScanService = {
  async createScan(data: CreateSecurityScanDto) {
    return securityScanRepository.create(data);
  },

  async getScans(query: SecurityScanQuery) {
    return securityScanRepository.findAll(query);
  },

  async getScan(id: string) {
    return securityScanRepository.findById(id);
  },

  async finishScan(
    id: string,
    status: ScanStatus,
    reportPath?: string,
  ) {
    return securityScanRepository.updateStatus(
      id,
      status,
      reportPath,
    );
  },

  async addFindings(
    scanId: string,
    findings: CreateFindingDto[],
  ) {
    return securityScanRepository.createFindings(
      scanId,
      findings,
    );
  },

  async importReport(
    scanId: string,
    report: unknown,
  ) {
    const scan =
      await securityScanRepository.findById(scanId);

    if (!scan) {
      throw new Error("Security scan not found");
    }

    const parser = getParser(scan.tool);

    const findings = parser.parse(report);

    await securityScanRepository.createFindings(
      scan.id,
      findings,
    );

    const status =
      findings.length > 0
        ? ScanStatus.FAILED
        : ScanStatus.PASSED;

    await securityScanRepository.updateStatus(
      scan.id,
      status,
      scan.reportPath ?? undefined,
    );

    return securityScanRepository.findById(scan.id);
  },

  async getSummary() {
    return securityScanRepository.getSummary();
  },

  // ===================================================
  // NEW METHODS
  // ===================================================


  async getReport(id: string) {
    const scan =
      await securityScanRepository.findById(id);

    if (!scan) {
      throw new Error("Security scan not found");
    }

    return {
      id: scan.id,
      tool: scan.tool,
      status: scan.status,
      reportPath: scan.reportPath,
      findings: scan.findings,
      startedAt: scan.startedAt,
      finishedAt: scan.finishedAt,
    };
  },

  async deleteScan(id: string) {
    const scan =
      await securityScanRepository.findById(id);

    if (!scan) {
      throw new Error("Security scan not found");
    }

    return securityScanRepository.delete(id);
  },
};