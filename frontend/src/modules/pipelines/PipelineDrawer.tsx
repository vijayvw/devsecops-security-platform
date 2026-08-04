import { useEffect, useState } from "react";

import Drawer from "../../components/Drawer";

import type { Pipeline } from "../../api/pipelines";

import {
  pipelineRunsApi,
  type PipelineRun,
} from "../../api/pipeline-runs";

interface Props {
  pipeline: Pipeline | null;
  onClose: () => void;
}

export default function PipelineDrawer({
  pipeline,
  onClose,
}: Props) {
  const [currentRun, setCurrentRun] =
    useState<PipelineRun | null>(null);

  const [running, setRunning] =
    useState(false);

  const runPipeline = async () => {
    if (!pipeline) return;

    try {
      const run =
        await pipelineRunsApi.create({
          pipelineId: pipeline.id,
          branch: "main",
          commitSha: crypto
            .randomUUID()
            .replace(/-/g, ""),
        });

      setCurrentRun(run);
      setRunning(true);
    } catch (error) {
      console.error(error);
      alert("Failed to start pipeline.");
    }
  };

  useEffect(() => {
    if (!running || !currentRun) return;

    const timer = setInterval(async () => {
      try {
        const latest =
          await pipelineRunsApi.getById(
            currentRun.id,
          );

        setCurrentRun(latest);

        if (
          latest.status === "SUCCESS" ||
          latest.status === "FAILED" ||
          latest.status === "CANCELLED"
        ) {
          setRunning(false);
          clearInterval(timer);
        }
      } catch (error) {
        console.error(error);
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [running, currentRun]);

  const latestStatus =
    currentRun?.status ??
    pipeline?.latestRun?.status ??
    "-";

  const latestBranch =
    currentRun?.branch ??
    pipeline?.latestRun?.branch ??
    "-";

  const latestCommit =
    currentRun?.commitSha ??
    pipeline?.latestRun?.commitSha ??
    "-";

  const latestDuration =
    currentRun?.duration ??
    pipeline?.latestRun?.duration;

  const scans = currentRun?.scans ?? [];

  return (
    <Drawer
      open={pipeline !== null}
      onClose={onClose}
      title="Pipeline Details"
    >
      {pipeline && (
        <div className="space-y-6">

          <div>
            <h2 className="text-2xl font-bold">
              {pipeline.name}
            </h2>

            <p className="text-gray-500">
              {pipeline.application.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-gray-500">
                Provider
              </p>

              <p className="mt-2 font-semibold">
                {pipeline.provider}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-gray-500">
                Total Runs
              </p>

              <p className="mt-2 text-2xl font-bold">
                {pipeline.totalRuns ?? "-"}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-gray-500">
                Success Rate
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {pipeline.successRate ?? 0}%
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-gray-500">
                Latest Status
              </p>

              <p
                className={`mt-2 font-semibold ${
                  latestStatus === "SUCCESS"
                    ? "text-green-600"
                    : latestStatus === "FAILED"
                    ? "text-red-600"
                    : latestStatus === "RUNNING"
                    ? "text-blue-600"
                    : ""
                }`}
              >
                {latestStatus}
              </p>
            </div>

          </div>

          <div className="rounded-lg border p-4">

            <h3 className="font-semibold">
              Latest Commit
            </h3>

            <div className="mt-3 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Branch</span>
                <span>{latestBranch}</span>
              </div>

              <div className="flex justify-between">
                <span>Commit</span>

                <span>
                  {latestCommit !== "-"
                    ? latestCommit.slice(0, 8)
                    : "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Duration</span>

                <span>
                  {latestDuration != null
                    ? `${latestDuration}s`
                    : "-"}
                </span>
              </div>

            </div>

          </div>

          {currentRun && (
            <div className="rounded-lg border p-4">

              <h3 className="font-semibold mb-4">
                Security Scans
              </h3>

              <div className="space-y-3">

                {scans.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Waiting for scans...
                  </p>
                )}

                {scans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between rounded border px-3 py-2"
                  >
                    <div className="font-medium">
                      {scan.tool}
                    </div>

                    <div
                      className={`text-sm font-semibold ${
                        scan.status === "PASSED"
                          ? "text-green-600"
                          : scan.status === "FAILED"
                          ? "text-red-600"
                          : scan.status === "RUNNING"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {scan.status}
                    </div>
                  </div>
                ))}

              </div>

            </div>
          )}

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Close
            </button>

            <button
              disabled={running}
              onClick={runPipeline}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {running
                ? "Running..."
                : "▶ Run Pipeline"}
            </button>

          </div>

        </div>
      )}
    </Drawer>
  );
}