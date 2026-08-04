import { findingsRepository } from "./repository";
import { Severity } from "@prisma/client";

export interface FindingQuery {
  severity?: Severity;
  fixed?: boolean;
  tool?: string;
  search?: string;
}

export const findingsService = {
  async getFindings(query: FindingQuery) {
    return findingsRepository.findAll(query);
  },

  async getFinding(id: string) {
    const finding =
      await findingsRepository.findById(id);

    if (!finding) {
      throw new Error("Finding not found");
    }

    return finding;
  },

  async markFixed(id: string) {
    return findingsRepository.markFixed(id);
  },
};