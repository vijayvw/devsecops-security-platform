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
  <div className="space-y-10">

    {/* Executive Hero */}

    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl">

      <div className="p-8">

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          {/* Left */}

          <div>

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-5xl shadow-xl">

                📊

              </div>

              <div>

                <h1 className="text-4xl font-bold text-white">

                  Executive Reports

                </h1>

                <p className="mt-3 max-w-2xl text-lg text-slate-300">

                  Executive security analytics, DevSecOps posture,
                  compliance metrics and platform insights generated
                  from your live environment.

                </p>

              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">

                📈 Live Analytics

              </span>

              <span className="rounded-xl bg-green-600/30 px-4 py-2 text-sm text-green-200">

                🛡 Security

              </span>

              <span className="rounded-xl bg-violet-600/30 px-4 py-2 text-sm text-violet-200">

                📄 Compliance

              </span>

              <span className="rounded-xl bg-blue-600/30 px-4 py-2 text-sm text-blue-200">

                🚀 DevSecOps

              </span>

            </div>

          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-4 xl:w-[420px]">

            <SummaryCard
              title="Applications"
              value={data.applications}
              icon="📦"
              color="bg-blue-600"
            />

            <SummaryCard
              title="Pipeline Runs"
              value={data.pipelineRuns}
              icon="🚀"
              color="bg-cyan-600"
            />

            <SummaryCard
              title="Security Scans"
              value={data.securityScans}
              icon="🛡️"
              color="bg-green-600"
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

    </div>

    {/* Executive Overview */}

    <section>

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">

          Executive Overview

        </h2>

        <p className="mt-2 text-slate-500">

          High-level metrics across your DevSecOps platform.

        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-4">

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

        {/* Executive Analytics */}

    <section>

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Security Analytics
        </h2>

        <p className="mt-2 text-slate-500">
          Distribution of vulnerabilities and scanner activity across the platform.
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Findings by Severity */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold">
                Findings by Severity
              </h3>

              <p className="mt-2 text-slate-500">
                Vulnerability distribution by severity.
              </p>

            </div>

            <div className="rounded-2xl bg-red-50 px-5 py-3">

              <div className="text-xs uppercase tracking-widest text-slate-500">
                Total
              </div>

              <div className="mt-2 text-2xl font-bold text-red-600">
                {data.findings}
              </div>

            </div>

          </div>

          <div className="space-y-5">

            {data.severityCounts.map((item) => {

              const colors: Record<string, string> = {
                CRITICAL: "bg-red-600",
                HIGH: "bg-orange-500",
                MEDIUM: "bg-yellow-500",
                LOW: "bg-green-500",
                INFO: "bg-blue-500",
              };

              const icons: Record<string, string> = {
                CRITICAL: "🚨",
                HIGH: "🔴",
                MEDIUM: "🟠",
                LOW: "🟢",
                INFO: "🔵",
              };

              const total = Math.max(data.findings, 1);

              const percentage = Math.round(
                (item._count.severity / total) * 100
              );

              return (

                <div
                  key={item.severity}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-400 hover:shadow-md"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${
                          colors[item.severity] ?? "bg-slate-500"
                        }`}
                      >
                        {icons[item.severity]}
                      </div>

                      <div>

                        <div className="font-bold text-slate-900">
                          {item.severity}
                        </div>

                        <div className="text-sm text-slate-500">
                          Vulnerabilities
                        </div>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-3xl font-bold text-slate-900">
                        {item._count.severity}
                      </div>

                      <div className="text-sm text-slate-500">
                        {percentage}%
                      </div>

                    </div>

                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

                    <div
                      className={`h-full rounded-full ${
                        colors[item.severity] ?? "bg-slate-500"
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

        {/* Scanner Distribution */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">

            <h3 className="text-2xl font-bold">
              Scanner Distribution
            </h3>

            <p className="mt-2 text-slate-500">
              Findings generated by each security scanner.
            </p>

          </div>

          <div className="space-y-5">

            {data.toolCounts.map((tool) => {

              const icons: Record<string, string> = {
                TRIVY: "🛡️",
                GITLEAKS: "🔑",
                SEMGREP: "🔍",
                CHECKOV: "☸️",
                DEPENDENCY_CHECK: "📦",
              };

              const total =
                Math.max(data.findings, 1);

              const percentage = Math.round(
                (tool._count.tool / total) * 100
              );

              return (

                <div
                  key={tool.tool}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-400 hover:shadow-md"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl">

                        {icons[tool.tool] ?? "🛡️"}

                      </div>

                      <div>

                        <div className="font-bold text-slate-900">
                          {tool.tool}
                        </div>

                        <div className="text-sm text-slate-500">
                          Security Scanner
                        </div>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-3xl font-bold text-slate-900">
                        {tool._count.tool}
                      </div>

                      <div className="text-sm text-slate-500">
                        Findings
                      </div>

                    </div>

                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

                    <div
                      className="h-full rounded-full bg-blue-600"
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

      </div>

    </section>

        {/* Platform Health */}

    <section>

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Platform Health
        </h2>

        <p className="mt-2 text-slate-500">
          Overall health of your DevSecOps platform.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-4">

        <HealthCard
          title="Applications"
          value={data.applications}
          subtitle="Connected"
          icon="📦"
          color="bg-blue-600"
        />

        <HealthCard
          title="Pipeline Runs"
          value={data.pipelineRuns}
          subtitle="Executed"
          icon="🚀"
          color="bg-cyan-600"
        />

        <HealthCard
          title="Security Scans"
          value={data.securityScans}
          subtitle="Completed"
          icon="🛡️"
          color="bg-green-600"
        />

        <HealthCard
          title="Findings"
          value={data.findings}
          subtitle="Detected"
          icon="🚨"
          color="bg-red-600"
        />

      </div>

    </section>

    {/* Executive Actions */}

    <section>

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Executive Actions
        </h2>

        <p className="mt-2 text-slate-500">
          Generate reports and export platform analytics.
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <ActionCard
          icon="📄"
          title="Executive Report"
          description="Generate an executive security summary for management."
          button="Generate Report"
          color="from-blue-600 to-cyan-500"
        />

        <ActionCard
          icon="🛡️"
          title="Security Report"
          description="Download the latest vulnerability assessment."
          button="Export JSON"
          color="from-green-600 to-emerald-500"
        />

        <ActionCard
          icon="📊"
          title="Compliance Report"
          description="Generate compliance and audit documentation."
          button="Export CSV"
          color="from-violet-600 to-fuchsia-500"
        />

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
function HealthCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-widest text-slate-500">
            {title}
          </div>

          <div className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </div>

          <div className="mt-2 text-sm text-slate-500">
            {subtitle}
          </div>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

function ActionCard({
  title,
  description,
  button,
  icon,
  color,
}: {
  title: string;
  description: string;
  button: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-3xl text-white shadow-lg`}
      >
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {description}
      </p>

      <button className="mt-8 w-full rounded-2xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800">
        {button}
      </button>

    </div>
  );
}