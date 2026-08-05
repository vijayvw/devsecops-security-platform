import api from "../client";

export interface Finding {
  id: string;

  severity: string;

  title: string;

  description: string;

  file: string | null;

  rule: string | null;

  tool?: string | null;

  line?: number | null;

  recommendation?: string | null;

  cve?: string | null;

  fixed?: boolean | null;
}

export const securityFindingsApi = {
  async getAll() {
    const response = await api.get("/security-scans");

    const scans = response.data;

    return scans.flatMap((scan: any) =>
      (scan.findings ?? []).map((finding: any) => ({
        ...finding,
        tool: scan.tool,
      }))
    );
  },
};