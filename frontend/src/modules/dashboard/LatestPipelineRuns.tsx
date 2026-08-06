import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  pipelineRunsApi,
  type PipelineRun,
} from "../../api/pipeline-runs";

import StatusBadge from "../pipeline-runs/StatusBadge";

const statusIcons: Record<string, string> = {
  SUCCESS: "🟢",
  FAILED: "🔴",
  RUNNING: "🔵",
  PENDING: "🟡",
  CANCELLED: "⚫",
};

export default function LatestPipelineRuns() {
  const [runs, setRuns] = useState<PipelineRun[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await pipelineRunsApi.getAll();
        setRuns(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <div className="flex h-[800px] w-full flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 p-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Latest Pipeline Runs
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recent CI/CD executions
          </p>
        </div>

        <Link
          to="/pipeline-runs"
          className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          View All →
        </Link>

      </div>

      {/* Scrollable Content */}

      <div className="flex-1 overflow-y-auto">

        {runs.map((run) => (

          <div
            key={run.id}
            className="flex items-center justify-between border-b border-slate-800 px-6 py-4 transition hover:bg-slate-800/40 last:border-none"
          >

            <div className="min-w-0">

              <div className="truncate font-semibold text-white">
                {run.pipeline.name}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                🌿 {run.branch}
              </div>

            </div>

            <div className="ml-4 flex shrink-0 items-center gap-3">

              <span className="text-lg">
                {statusIcons[run.status]}
              </span>

              <StatusBadge status={run.status} />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}