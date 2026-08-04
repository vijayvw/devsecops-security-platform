import { PipelineRunsTable } from "../modules/pipeline-runs";

export default function PipelineRunsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Pipeline Runs
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor every CI/CD execution.
        </p>
      </div>

      <PipelineRunsTable />
    </div>
  );
}