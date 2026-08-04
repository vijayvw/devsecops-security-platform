import { useEffect, useMemo, useState } from "react";

import {
  pipelineRunsApi,
  type PipelineRun,
} from "../../api/pipeline-runs";

import StatusBadge from "./StatusBadge";
import PipelineRunDrawer from "./PipelineRunDrawer";

export default function PipelineRunsTable() {
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [selected, setSelected] =
    useState<PipelineRun | null>(null);

  const [search, setSearch] = useState("");
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
      } catch (error) {
        console.error(error);
      }
    }

    loadRuns();

    const interval = setInterval(
      loadRuns,
      1000
    );

    return () => clearInterval(interval);
  }, [selected]);

  const filteredRuns = useMemo(() => {
    return runs.filter((run) => {
      const matchesSearch =
        run.branch
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        run.commitSha
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        run.pipeline.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        run.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [runs, search, statusFilter]);

  return (
    <>
      <div className="rounded-xl border bg-white shadow">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Pipeline Runs
          </h2>

          <p className="mt-1 text-gray-500">
            Recent CI/CD executions
          </p>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-lg border p-2"
              placeholder="Search pipeline, branch or commit..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
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
                    setStatusFilter(
                      status
                    )
                  }
                  className={`rounded-full px-3 py-1 text-sm ${
                    statusFilter ===
                    status
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                Pipeline
              </th>

              <th className="p-4 text-left">
                Branch
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Commit
              </th>

              <th className="p-4 text-left">
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
                className="cursor-pointer border-t hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {run.pipeline.name}
                </td>

                <td className="p-4">
                  {run.branch}
                </td>

                <td className="p-4">
                  <StatusBadge
                    status={run.status}
                  />
                </td>

                <td className="p-4 font-mono">
                  {run.commitSha.slice(
                    0,
                    8
                  )}
                </td>

                <td className="p-4">
                  {new Date(
                    run.startedAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PipelineRunDrawer
        pipelineRun={selected}
        onClose={() =>
          setSelected(null)
        }
      />
    </>
  );
}