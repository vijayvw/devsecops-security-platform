import type { ScanSummary } from "../../../api/security-scans";

interface Props {
  summary: ScanSummary;
}

export default function SecuritySummary({
  summary,
}: Props) {
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        ((summary.passed + 1) /
          (summary.totalScans + 1)) *
          100
      )
    )
  );

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm uppercase tracking-widest text-blue-300">
              Security Overview
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Platform Security
            </h2>

            <p className="mt-3 max-w-2xl text-slate-300">
              Live overview of security scans,
              scanner health and detected
              vulnerabilities.
            </p>

          </div>

          <div className="w-full max-w-xs">

            <div className="text-sm uppercase tracking-wide text-slate-300">
              Security Score
            </div>

            <div className="mt-3 text-6xl font-black">
              {score}%
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-green-500 transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Scan Statistics */}

      <div className="grid gap-5 md:grid-cols-4">

        <Card
          title="Security Scans"
          value={summary.totalScans}
          icon="🛡️"
          color="bg-blue-600"
        />

        <Card
          title="Passed"
          value={summary.passed}
          icon="✅"
          color="bg-green-600"
        />

        <Card
          title="Failed"
          value={summary.failed}
          icon="❌"
          color="bg-red-600"
        />

        <Card
          title="Running"
          value={summary.running}
          icon="🚀"
          color="bg-yellow-500"
        />

      </div>

      {/* Findings */}

      <div className="grid gap-5 md:grid-cols-4">

        <Card
          title="Critical"
          value={summary.findings.critical}
          icon="🚨"
          color="bg-red-700"
        />

        <Card
          title="High"
          value={summary.findings.high}
          icon="⚠️"
          color="bg-orange-600"
        />

        <Card
          title="Medium"
          value={summary.findings.medium}
          icon="🟡"
          color="bg-yellow-500"
        />

        <Card
          title="Low"
          value={summary.findings.low}
          icon="🟢"
          color="bg-green-600"
        />

      </div>

      {/* Scanner Health */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Scanner Health
            </h2>

            <p className="mt-2 text-slate-400">
              Current health of integrated
              security scanners.
            </p>

          </div>

          <div className="rounded-full bg-green-500/10 px-4 py-2 text-green-400">

            ● Live

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <ToolCard
            title="🔑 Gitleaks"
            passed={summary.tools.gitleaks.passed}
            failed={summary.tools.gitleaks.failed}
          />

          <ToolCard
            title="🛡️ Trivy"
            passed={summary.tools.trivy.passed}
            failed={summary.tools.trivy.failed}
          />

          <ToolCard
            title="🔍 Semgrep"
            passed={summary.tools.semgrep.passed}
            failed={summary.tools.semgrep.failed}
          />

        </div>

      </div>

    </div>
  );
}

interface CardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

function Card({
  title,
  value,
  icon,
  color,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

interface ToolCardProps {
  title: string;
  passed: number;
  failed: number;
}

function ToolCard({
  title,
  passed,
  failed,
}: ToolCardProps) {
  const healthy = failed === 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-800 p-6 transition hover:border-blue-500">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-bold text-white">
          {title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            healthy
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {healthy ? "Healthy" : "Issues"}
        </span>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-green-500/10 p-4 text-center">

          <div className="text-xs uppercase text-green-400">
            Passed
          </div>

          <div className="mt-2 text-3xl font-bold text-green-400">
            {passed}
          </div>

        </div>

        <div className="rounded-xl bg-red-500/10 p-4 text-center">

          <div className="text-xs uppercase text-red-400">
            Failed
          </div>

          <div className="mt-2 text-3xl font-bold text-red-400">
            {failed}
          </div>

        </div>

      </div>

    </div>
  );
}