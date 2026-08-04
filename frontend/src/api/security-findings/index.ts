import api from "../client";

export interface Finding {
  id: string;
  severity: string;
  title: string;
  description: string;
  file: string | null;
  rule: string | null;
}

export const securityFindingsApi = {
  async getAll() {
    const response = await api.get("/security-scans");

    const scans = response.data;

    return scans.flatMap((scan: any) => scan.findings ?? []);
  },
};