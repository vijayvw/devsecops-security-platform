import { reportsRepository } from "./repository";

export const reportsService = {
  async getSummary() {
    return reportsRepository.getSummary();
  },
};
