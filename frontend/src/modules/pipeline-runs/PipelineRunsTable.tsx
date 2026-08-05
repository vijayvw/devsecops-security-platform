import { useEffect, useMemo, useState } from "react";

import {
  pipelineRunsApi,
  type PipelineRun,
} from "../../api/pipeline-runs";

import StatusBadge from "./StatusBadge";
import PipelineRunDrawer from "./PipelineRunDrawer";

const statusIcons: Record<string, string> = {
  SUCCESS: "🟢",
  FAILED: "🔴",
  RUNNING: "🔵",
  PENDING: "🟡",
  CANCELLED: "⚫",
};

export default function PipelineRunsTable() {
  const [runs, setRuns] =
    useState<PipelineRun[]>([]);

  const [selected, setSelected] =
    useState<PipelineRun | null>(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    async function loadRuns() {
      try {
        const data =
          await pipelineRunsApi.getAll();

        setRuns(data);

        if (selected) {
          const latest = data.find(
            (r) => r.id === selected.id
          );

          if (latest) {
            setSelected(latest);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadRuns();

    const timer = setInterval(
      loadRuns,
      1000
    );

    return () =>
      clearInterval(timer);
  }, [selected]);

  const filteredRuns = useMemo(() => {
    return runs.filter((run) => {
      const matchesSearch =
        run.pipeline.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        run.branch
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        run.commitSha
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        run.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    runs,
    search,
    statusFilter,
  ]);

  const stats = {
    total: runs.length,
    running: runs.filter(
      (r) => r.status === "RUNNING"
    ).length,
    success: runs.filter(
      (r) => r.status === "SUCCESS"
    ).length,
    failed: runs.filter(
      (r) => r.status === "FAILED"
    ).length,
    pending: runs.filter(
      (r) => r.status === "PENDING"
    ).length,
  };
    return (
    <>
      <div className="space-y-6">

        {/* Summary */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <SummaryCard
            title="Total Runs"
            value={stats.total}
            color="bg-slate-700"
            icon="📦"
          />

          <SummaryCard
            title="Running"
            value={stats.running}
            color="bg-blue-600"
            icon="🔵"
          />

          <SummaryCard
            title="Success"
            value={stats.success}
            color="bg-green-600"
            icon="🟢"
          />

          <SummaryCard
            title="Failed"
            value={stats.failed}
            color="bg-red-600"
            icon="🔴"
          />

          <SummaryCard
            title="Pending"
            value={stats.pending}
            color="bg-yellow-500"
            icon="🟡"
          />

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">

          {/* Header */}

          <div className="border-b border-slate-800 p-6">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Pipeline Executions
                </h2>

                <p className="mt-1 text-slate-400">
                  Live CI/CD execution history
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                  Live

                </div>

              </div>

            </div>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="🔍 Search pipeline, branch or commit..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500"
              />

              <div className="flex flex-wrap gap-2">

                {[
                  "ALL",
                  "RUNNING",
                  "SUCCESS",
                  "FAILED",
                  "PENDING",
                  "CANCELLED",
                ].map((status) => (

                  <button
                    key={status}
                    onClick={() =>
                      setStatusFilter(status)
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      statusFilter === status
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {status}
                  </button>

                ))}

              </div>

            </div>

          </div>

          {filteredRuns.length === 0 ? (

            <div className="p-16 text-center">

              <div className="text-6xl">
                🚀
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                No Pipeline Runs
              </h3>

              <p className="mt-2 text-slate-400">
                Pipeline executions will appear here.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-950">

                  <tr className="text-left text-sm uppercase tracking-wide text-slate-400">

                    <th className="px-6 py-4">
                      Pipeline
                    </th>

                    <th className="px-6 py-4">
                      Branch
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Commit
                    </th>

                    <th className="px-6 py-4">
                      Duration
                    </th>

                    <th className="px-6 py-4">
                      Started
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredRuns.map((run) => (

                    <tr
                      key={run.id}
                      onClick={() =>
                        setSelected(run)
                      }
                      className="cursor-pointer border-t border-slate-800 transition hover:bg-slate-800/70"
                    >

                      <td className="px-6 py-5">

                        <div>

                          <div className="font-semibold text-white">
                            {run.pipeline.name}
                          </div>

                          <div className="mt-1 text-xs text-slate-500">
                            {run.pipeline.application.name}
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                          🌿 {run.branch}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <span>
                            {statusIcons[run.status]}
                          </span>

                          <StatusBadge
                            status={run.status}
                          />

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <code className="rounded-lg bg-slate-800 px-3 py-2 text-blue-300">
                          {run.commitSha.slice(0,8)}
                        </code>

                      </td>

                      <td className="px-6 py-5 text-slate-300">

                        {run.duration != null
                          ? `${run.duration}s`
                          : "-"}

                      </td>

                      <td className="px-6 py-5 text-slate-400">

                        {new Date(
                          run.startedAt
                        ).toLocaleString()}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
            <PipelineRunDrawer
        pipelineRun={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

function SummaryCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-blue-500 hover:shadow-blue-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}