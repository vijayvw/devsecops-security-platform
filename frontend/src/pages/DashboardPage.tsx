import OverviewCards from "../modules/security-dashboard/OverviewCards";
import PipelineRunsTable from "../modules/pipeline-runs/PipelineRunsTable";
import SecurityFindingsTable from "../modules/security-findings/SecurityFindingsTable";
import ApplicationsGrid from "../modules/applications/ApplicationsGrid";

export default function DashboardPage() {
  return (
    <>
      <OverviewCards />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <PipelineRunsTable />
        <SecurityFindingsTable />
      </div>

      <div className="mt-10">
        <ApplicationsGrid />
      </div>
    </>
  );
}