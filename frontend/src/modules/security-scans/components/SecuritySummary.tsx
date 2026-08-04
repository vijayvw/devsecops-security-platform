import type { ScanSummary } from "../../../api/security-scans";

interface Props {
  summary: ScanSummary;
}

export default function SecuritySummary({
  summary,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Overall Statistics */}

      <div className="grid gap-4 md:grid-cols-4">

        <Card
          title="Security Scans"
          value={summary.totalScans}
        />

        <Card
          title="Passed"
          value={summary.passed}
          color="green"
        />

        <Card
          title="Failed"
          value={summary.failed}
          color="red"
        />

        <Card
          title="Running"
          value={summary.running}
          color="yellow"
        />

      </div>

      {/* Findings */}

      <div className="grid gap-4 md:grid-cols-4">

        <Card
          title="Critical"
          value={summary.findings.critical}
          color="red"
        />

        <Card
          title="High"
          value={summary.findings.high}
          color="orange"
        />

        <Card
          title="Medium"
          value={summary.findings.medium}
          color="yellow"
        />

        <Card
          title="Low"
          value={summary.findings.low}
          color="green"
        />

      </div>

      {/* Scanner Health */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Scanner Health
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current status of integrated security scanners.
            </p>
          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <ToolCard
            title="Gitleaks"
            passed={summary.tools.gitleaks.passed}
            failed={summary.tools.gitleaks.failed}
          />

          <ToolCard
            title="Trivy"
            passed={summary.tools.trivy.passed}
            failed={summary.tools.trivy.failed}
          />

          <ToolCard
            title="Semgrep"
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
  color?: string;
}

function Card({
  title,
  value,
  color,
}: CardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2
        className={`mt-2 text-3xl font-bold ${
          color === "green"
            ? "text-green-600"
            : color === "red"
            ? "text-red-600"
            : color === "orange"
            ? "text-orange-500"
            : color === "yellow"
            ? "text-yellow-500"
            : ""
        }`}
      >
        {value}
      </h2>

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
    <div className="rounded-xl border p-5 transition hover:shadow-md">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            healthy
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {healthy ? "Healthy" : "Issues"}
        </span>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div className="rounded-lg bg-green-50 p-3 text-center">

          <p className="text-xs uppercase text-green-600">
            Passed
          </p>

          <p className="mt-1 text-2xl font-bold text-green-700">
            {passed}
          </p>

        </div>

        <div className="rounded-lg bg-red-50 p-3 text-center">

          <p className="text-xs uppercase text-red-600">
            Failed
          </p>

          <p className="mt-1 text-2xl font-bold text-red-700">
            {failed}
          </p>

        </div>

      </div>

    </div>
  );
}