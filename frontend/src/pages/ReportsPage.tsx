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

      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="mt-2 text-slate-500">
          Security overview of the platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Applications
          </p>

          <p className="mt-3 text-3xl font-bold">
            {data.applications}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Pipeline Runs
          </p>

          <p className="mt-3 text-3xl font-bold">
            {data.pipelineRuns}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Security Scans
          </p>

          <p className="mt-3 text-3xl font-bold">
            {data.securityScans}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Findings
          </p>

          <p className="mt-3 text-3xl font-bold text-red-600">
            {data.findings}
          </p>
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Findings by Severity
          </h2>

          <div className="space-y-3">

            {data.severityCounts.map((item) => (
              <div
                key={item.severity}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span>{item.severity}</span>

                <span className="font-bold">
                  {item._count.severity}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Findings by Tool
          </h2>

          <div className="space-y-3">

            {data.toolCounts.map((tool) => (
              <div
                key={tool.tool}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span>{tool.tool}</span>

                <span className="font-bold">
                  {tool._count.tool}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}