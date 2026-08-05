import { useQuery } from "@tanstack/react-query";
import { getReportsSummary } from "../api/reports";

export default function ReportsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["reports-summary"],
    queryFn: getReportsSummary,
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading reports...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border bg-white p-8">
        No report data available.
      </div>
    );
  }

  return (
  <div className="space-y-8">

    {/* Hero */}

    <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl shadow-lg">
              📊
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Security Reports
              </h1>

              <p className="mt-2 text-slate-300">
                Executive overview of your DevSecOps platform security posture.
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <SummaryCard
            title="Applications"
            value={data.applications}
            icon="📦"
            color="bg-blue-600"
          />

          <SummaryCard
            title="Findings"
            value={data.findings}
            icon="🚨"
            color="bg-red-600"
          />

        </div>

      </div>

    </div>

    {/* Overview */}

    <section>

      <div className="mb-5">

        <h2 className="text-2xl font-bold">
          Platform Overview
        </h2>

        <p className="text-slate-500">
          Live statistics collected across the platform.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Applications"
          value={String(data.applications)}
          icon="📦"
        />

        <MetricCard
          title="Pipeline Runs"
          value={String(data.pipelineRuns)}
          icon="🚀"
        />

        <MetricCard
          title="Security Scans"
          value={String(data.securityScans)}
          icon="🛡️"
        />

        <MetricCard
          title="Findings"
          value={String(data.findings)}
          icon="🚨"
          highlight
        />

      </div>

    </section>

    {/* Analytics */}

    <section>

      <div className="grid gap-6 xl:grid-cols-2">

              {/* Findings by Severity */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm h-fit">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              Findings by Severity
            </h2>

            <p className="mt-1 text-slate-500">
              Distribution of vulnerabilities across severity levels.
            </p>

          </div>

          <div className="space-y-4">

            {data.severityCounts.map((item) => {

              const colors: Record<string, string> = {
                CRITICAL: "bg-red-600",
                HIGH: "bg-orange-500",
                MEDIUM: "bg-yellow-500",
                LOW: "bg-green-500",
                INFO: "bg-blue-500",
              };

              const total = Math.max(data.findings, 1);

              const percentage = Math.round(
                (item._count.severity / total) * 100
              );

              return (

                <div key={item.severity}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="font-semibold">
                      {item.severity}
                    </span>

                    <span className="text-sm font-bold">
                      {item._count.severity}
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                    <div
                      className={`h-full rounded-full ${
                        colors[item.severity] ??
                        "bg-slate-500"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

              );
            })}

          </div>

        </div>

        {/* Findings by Tool */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              Findings by Tool
            </h2>

            <p className="mt-1 text-slate-500">
              Security scanner contribution across the platform.
            </p>

          </div>

          <div className="space-y-4">

            {data.toolCounts.map((tool) => {

              const icons: Record<string, string> = {
                TRIVY: "🛡️",
                GITLEAKS: "🔑",
                SEMGREP: "🔍",
                CHECKOV: "☸️",
                DEPENDENCY_CHECK: "📦",
              };

              return (

                <div
                  key={tool.tool}
                  className="flex items-center justify-between rounded-2xl border p-4 transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">

                      {icons[tool.tool] ?? "🛡️"}

                    </div>

                    <div>

                      <div className="font-semibold">
                        {tool.tool}
                      </div>

                      <div className="text-sm text-slate-500">
                        Security Scanner
                      </div>

                    </div>

                  </div>

                  <div className="text-3xl font-bold">

                    {tool._count.tool}

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  </div>
);

}

function SummaryCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-800 p-5">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="mt-3 text-3xl font-bold text-white">
            {value}
          </div>

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

function MetricCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        highlight
          ? "border-red-300"
          : ""
      }`}
    >

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </div>

          <div
            className={`mt-4 text-3xl font-bold ${
              highlight
                ? "text-red-600"
                : "text-slate-900"
            }`}
          >
            {value}
          </div>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
            highlight
              ? "bg-red-100"
              : "bg-slate-100"
          }`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}