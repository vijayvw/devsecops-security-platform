import OverviewCards from "../modules/security-dashboard/OverviewCards";
import PipelineRunsTable from "../modules/pipeline-runs/PipelineRunsTable";
import SecurityFindingsTable from "../modules/security-findings/SecurityFindingsTable";
import ApplicationsGrid from "../modules/applications/ApplicationsGrid";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
              DevSecOps Security Platform
            </p>

            <h1 className="mt-2 text-4xl font-bold text-white">
              Security Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Monitor pipeline executions, vulnerability scans,
              infrastructure security and repository health from a
              single dashboard.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-4 lg:block">
            <div className="text-xs uppercase tracking-wide text-green-400">
              Platform Status
            </div>

            <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-green-400">
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              Healthy
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}

<OverviewCards />

{/* Live Platform Status */}

<div className="grid gap-6 lg:grid-cols-4">

  <LiveStatusCard
  title="Clusters"
  value="3 Healthy"
  icon="☸️"
  color="bg-blue-600"
/>

<LiveStatusCard
  title="Running Pods"
  value="126"
  icon="📦"
  color="bg-cyan-600"
/>

<LiveStatusCard
  title="Critical CVEs"
  value="4"
  icon="🚨"
  color="bg-red-600"
/>

<LiveStatusCard
  title="Pipelines Today"
  value="41"
  icon="🚀"
  color="bg-green-600"
/>

</div>

{/* Middle */}

      <div className="grid gap-8 xl:grid-cols-2">
        <PipelineRunsTable />
        <SecurityFindingsTable />
      </div>

      {/* Bottom */}

      <ApplicationsGrid />
    </div>
  );
}

function LiveStatusCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/10">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </div>

          <div className="mt-3 text-2xl font-bold text-white">
            {value}
          </div>

        </div>

        <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg text-2xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}