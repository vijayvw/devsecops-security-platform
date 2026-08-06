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
    <div className="space-y-10">

      {/* Hero */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl">

        <div className="relative p-8">

          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

            {/* Left */}

            <div className="flex items-start gap-6">

              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 text-5xl shadow-xl">

                🛡️

              </div>

              <div>

                <div className="inline-flex items-center rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">

                  Security Operations Center

                </div>

                <h1 className="mt-5 text-4xl font-bold text-white">

                  Security Scans

                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">

                  Monitor vulnerability scans, secret detection,
                  infrastructure analysis and software composition
                  analysis performed across your DevSecOps platform.

                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Trivy
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Semgrep
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Gitleaks
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Checkov
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Dependency Check
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Summary */}

      {summary && (
        <SecuritySummary summary={summary} />
      )}

      {/* Scan Table */}

      <SecurityScansTable />

    </div>
  );
}