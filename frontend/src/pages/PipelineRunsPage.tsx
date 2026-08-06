import { PipelineRunsTable } from "../modules/pipeline-runs";

export default function PipelineRunsPage() {
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
            ⚡ CI/CD Execution Center
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Pipeline Runs
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-slate-500">
            Track every pipeline execution across your DevSecOps platform.
            Monitor build status, security scans, deployment progress and
            execution history in real time.
          </p>

        </div>

      </div>

      {/* Content */}

      <PipelineRunsTable />

    </div>
  );
}