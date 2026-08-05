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

const statusColors: Record<string, string> = {
  SUCCESS:
    "bg-green-500/20 text-green-400 border border-green-500/30",
  FAILED:
    "bg-red-500/20 text-red-400 border border-red-500/30",
  RUNNING:
    "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  PENDING:
    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  CANCELLED:
    "bg-slate-700 text-slate-300 border border-slate-600",
};

function providerIcon(provider: string) {
  switch (provider) {
    case "GITHUB_ACTIONS":
      return "🐙";

    case "JENKINS":
      return "🧰";

    case "GITLAB_CI":
      return "🦊";

    default:
      return "⚙️";
  }
}

export default function PipelineDrawer({
  pipeline,
  onClose,
}: Props) {
  const [currentRun, setCurrentRun] =
    useState<PipelineRun | null>(null);

  const [running, setRunning] =
    useState(false);

  async function runPipeline() {
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
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!running || !currentRun) return;

    const timer = setInterval(async () => {
      try {
        const latest =
          await pipelineRunsApi.getById(
            currentRun.id
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
      } catch (err) {
        console.error(err);
        clearInterval(timer);
      }
    }, 2000);

    return () =>
      clearInterval(timer);
  }, [running, currentRun]);

  const latest =
    currentRun ?? pipeline?.latestRun;

  const status =
    latest?.status ?? "PENDING";

  const scans =
    currentRun?.scans ?? [];

  return (
    <Drawer
      open={pipeline !== null}
      onClose={onClose}
      title="Pipeline Details"
    >
      {pipeline && (
        <div className="space-y-8">

          {/* Header */}

          <div>

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg">
                    🚀
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {pipeline.name}
                    </h2>

                    <p className="mt-1 text-slate-500">
                      {pipeline.application.name}
                    </p>

                  </div>

                </div>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  statusColors[status]
                }`}
              >
                {status}
              </span>

            </div>

          </div>

          {/* Overview */}

          <div className="grid gap-4 md:grid-cols-2">

            <InfoCard
              label="Provider"
              value={`${providerIcon(
                pipeline.provider
              )} ${pipeline.provider.replaceAll(
                "_",
                " "
              )}`}
            />

            <InfoCard
              label="Application"
              value={pipeline.application.name}
            />

            <InfoCard
              label="Total Runs"
              value={String(
                pipeline.totalRuns ?? 0
              )}
            />

            <InfoCard
              label="Success Rate"
              value={`${
                pipeline.successRate ?? 0
              }%`}
              success
            />

            <InfoCard
              label="Branch"
              value={
                latest?.branch ?? "-"
              }
            />

            <InfoCard
              label="Commit"
              value={
                latest?.commitSha
                  ? latest.commitSha.slice(
                      0,
                      8
                    )
                  : "-"
              }
            />

            <InfoCard
              label="Duration"
              value={
                latest?.duration != null
                  ? `${latest.duration}s`
                  : "-"
              }
            />

            <InfoCard
              label="Last Status"
              value={status}
            />

          </div>

          {/* Pipeline Flow */}

<div className="rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white">

  <h3 className="mb-8 text-xl font-bold">
    Pipeline Execution Flow
  </h3>

  <div className="flex items-center justify-between overflow-x-auto">

    <PipelineStage
      icon="📥"
      title="Checkout"
      state="success"
    />

    <PipelineConnector />

    <PipelineStage
      icon="🏗️"
      title="Build"
      state="success"
    />

    <PipelineConnector />

    <PipelineStage
      icon="🧪"
      title="Tests"
      state="success"
    />

    <PipelineConnector />

    <PipelineStage
      icon="🛡️"
      title="Security"
      state={
        running
          ? "running"
          : status === "SUCCESS"
          ? "success"
          : "pending"
      }
    />

    <PipelineConnector />

    <PipelineStage
      icon="🚀"
      title="Deploy"
      state={
        status === "SUCCESS"
          ? "success"
          : "pending"
      }
    />

  </div>

</div>

          {/* Security Scans */}

          <div className="rounded-2xl border border-slate-200 p-6">

            <h3 className="text-lg font-semibold">
              Security Scans
            </h3>

            <div className="mt-5 space-y-3">

              {scans.length === 0 && (

                <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">

                  Waiting for pipeline
                  execution...

                </div>

              )}

              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >

                  <div>

                    <div className="font-semibold">
                      {scan.tool}
                    </div>

                    <div className="text-sm text-slate-500">
                      Security Scanner
                    </div>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      statusColors[
                        scan.status
                      ]
                    }`}
                  >
                    {scan.status}
                  </span>

                </div>
              ))}

            </div>

          </div>
                    {/* Live Logs */}

          <div className="rounded-2xl border border-slate-200">

            <div className="border-b p-5">

              <h3 className="text-lg font-semibold">
                Live Pipeline Logs
              </h3>

            </div>

            <div className="rounded-b-2xl bg-slate-950 p-5 font-mono text-sm text-green-400">

              <div>$ git checkout main</div>

              <div>✓ Repository cloned</div>

              <div className="mt-2">
                $ npm install
              </div>

              <div>✓ Dependencies installed</div>

              <div className="mt-2">
                $ npm run build
              </div>

              <div>✓ Build completed</div>

              <div className="mt-2">
                $ security scan
              </div>

              {running ? (
                <div className="animate-pulse text-yellow-400">
                  Scanning repository...
                </div>
              ) : status === "SUCCESS" ? (
                <div>
                  ✓ Scan completed
                </div>
              ) : (
                <div className="text-slate-400">
                  Waiting for execution...
                </div>
              )}

            </div>

          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t pt-6">

            <button
              onClick={onClose}
              className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-100"
            >
              Close
            </button>

            <button
              disabled={running}
              onClick={runPipeline}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
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

function InfoCard({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-5">

      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p
        className={`mt-3 break-all text-lg font-semibold ${
          success
            ? "text-green-600"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}

function PipelineConnector() {
  return (
    <div className="mx-2 h-1 w-14 rounded-full bg-slate-600" />
  );
}

function PipelineStage({
  icon,
  title,
  state,
}: {
  icon: string;
  title: string;
  state: "success" | "running" | "pending";
}) {
  const color =
    state === "success"
      ? "bg-green-500"
      : state === "running"
      ? "bg-blue-500 animate-pulse"
      : "bg-slate-600";

  const text =
    state === "success"
      ? "Completed"
      : state === "running"
      ? "Running"
      : "Waiting";

  return (
    <div className="flex min-w-[110px] flex-col items-center">

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${color}`}
      >
        {icon}
      </div>

      <div className="mt-3 text-center">

        <div className="font-semibold">
          {title}
        </div>

        <div className="text-xs text-slate-300">
          {text}
        </div>

      </div>

    </div>
  );
}