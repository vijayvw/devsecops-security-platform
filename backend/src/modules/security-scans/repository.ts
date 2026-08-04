import { PrismaClient, ScanStatus } from "@prisma/client";
import {
  CreateFindingDto,
  CreateSecurityScanDto,
  SecurityScanQuery,
} from "./types";

const prisma = new PrismaClient();

export const securityScanRepository = {
  async create(scan: CreateSecurityScanDto) {
    return prisma.securityScan.create({
      data: scan,
    });
  },

  async findAll(query: SecurityScanQuery) {
    return prisma.securityScan.findMany({
      where: {
        pipelineRunId: query.pipelineRunId,
        tool: query.tool,
        status: query.status,
      },
      include: {
        findings: true,
      },
      orderBy: {
        startedAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.securityScan.findUnique({
      where: { id },
      include: {
        findings: true,
      },
    });
  },

  async updateStatus(
    id: string,
    status: ScanStatus,
    reportPath?: string,
  ) {
    return prisma.securityScan.update({
      where: { id },
      data: {
        status,
        reportPath,
        finishedAt: new Date(),
      },
    });
  },

  async createFindings(
    scanId: string,
    findings: CreateFindingDto[],
  ) {
    if (findings.length === 0) {
      return;
    }

    return prisma.finding.createMany({
      data: findings.map((finding) => ({
        securityScanId: scanId,
        ...finding,
      })),
    });
  },

  async getSummary() {
    const scans = await prisma.securityScan.findMany({
      include: {
        findings: true,
      },
    });

    const allFindings = scans.flatMap(
      (scan) => scan.findings,
    );

    const toolSummary = {
      gitleaks: {
        passed: scans.filter(
          s =>
            s.tool === "GITLEAKS" &&
            s.status === "PASSED",
        ).length,
        failed: scans.filter(
          s =>
            s.tool === "GITLEAKS" &&
            s.status === "FAILED",
        ).length,
      },

      trivy: {
        passed: scans.filter(
          s =>
            s.tool === "TRIVY" &&
            s.status === "PASSED",
        ).length,
        failed: scans.filter(
          s =>
            s.tool === "TRIVY" &&
            s.status === "FAILED",
        ).length,
      },

      semgrep: {
        passed: scans.filter(
          s =>
            s.tool === "SEMGREP" &&
            s.status === "PASSED",
        ).length,
        failed: scans.filter(
          s =>
            s.tool === "SEMGREP" &&
            s.status === "FAILED",
        ).length,
      },
    };

    return {
      totalScans: scans.length,

      passed: scans.filter(
        s => s.status === "PASSED",
      ).length,

      failed: scans.filter(
        s => s.status === "FAILED",
      ).length,

      pending: scans.filter(
        s => s.status === "PENDING",
      ).length,

      running: scans.filter(
        s => s.status === "RUNNING",
      ).length,

      findings: {
        critical: allFindings.filter(
          f => f.severity === "CRITICAL",
        ).length,

        high: allFindings.filter(
          f => f.severity === "HIGH",
        ).length,

        medium: allFindings.filter(
          f => f.severity === "MEDIUM",
        ).length,

        low: allFindings.filter(
          f => f.severity === "LOW",
        ).length,
      },

      tools: toolSummary,
    };
  },

  // NEW METHOD
  async delete(id: string) {
    // Delete findings first because of the foreign key.
    await prisma.finding.deleteMany({
      where: {
        securityScanId: id,
      },
    });

    return prisma.securityScan.delete({
      where: {
        id,
      },
    });
  },
};