import SecurityFindingsTable from "../modules/security-findings/SecurityFindingsTable";

export default function FindingsPage() {
  return (
    <div className="space-y-10">

      {/* Hero */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 shadow-2xl">

        <div className="relative p-8">

          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

            <div className="flex items-start gap-6">

              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 text-5xl shadow-xl">

                🚨

              </div>

              <div>

                <div className="inline-flex items-center rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">

                  Vulnerability Management

                </div>

                <h1 className="mt-5 text-4xl font-bold text-white">

                  Security Findings

                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">

                  Investigate vulnerabilities discovered by your
                  DevSecOps security scanners. Review severity,
                  affected files, remediation guidance and compliance
                  issues across your repositories.

                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    CVEs
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Secrets
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    SAST
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    Dependencies
                  </span>

                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                    IaC
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Findings */}

      <SecurityFindingsTable />

    </div>
  );
}