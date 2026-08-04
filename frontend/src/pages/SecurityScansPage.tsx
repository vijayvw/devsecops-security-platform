import { useEffect, useState } from "react";

import {
  securityScansApi,
  type ScanSummary,
} from "../api/security-scans";

import {
  SecurityScansTable,
} from "../modules/security-scans";

import SecuritySummary from "../modules/security-scans/components/SecuritySummary";

export default function SecurityScansPage() {
  const [summary, setSummary] =
    useState<ScanSummary | null>(null);

  useEffect(() => {
    securityScansApi
      .getSummary()
      .then(setSummary)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Security Scans
        </h1>

        <p className="mt-2 text-gray-500">
          Review results from Trivy, Gitleaks,
          Semgrep, Checkov and Dependency Check.
        </p>
      </div>

      {summary && (
        <SecuritySummary summary={summary} />
      )}

      <SecurityScansTable />
    </div>
  );
}