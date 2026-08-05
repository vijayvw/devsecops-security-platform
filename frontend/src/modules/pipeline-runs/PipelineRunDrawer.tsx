import { useEffect, useMemo, useState } from "react";

import Drawer from "../../components/Drawer";

import {
  pipelineRunsApi,
  type PipelineRun,
} from "../../api/pipeline-runs";

import {
  securityRunnerApi,
} from "../../api/security-runner";

import type { SecurityScan } from "../../api/security-scans";

import SecurityScanDrawer from "../security-scans/SecurityScanDrawer";

import PipelineTimeline from "./PipelineTimeline";

import { formatDuration } from "../../utils/formatDuration";

interface Props {
  pipelineRun: PipelineRun | null;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  SUCCESS:
    "bg-green-500/20 border border-green-500/30 text-green-400",

  FAILED:
    "bg-red-500/20 border border-red-500/30 text-red-400",

  RUNNING:
    "bg-blue-500/20 border border-blue-500/30 text-blue-400",

  PENDING:
    "bg-yellow-500/20 border border-yellow-500/30 text-yellow-400",

  CANCELLED:
    "bg-slate-700 border border-slate-600 text-slate-300",
};

const statusIcons: Record<string, string> = {
  SUCCESS: "🟢",
  FAILED: "🔴",
  RUNNING: "🔵",
  PENDING: "🟡",
  CANCELLED: "⚫",
};

export default function PipelineRunDrawer({
  pipelineRun,
  onClose,
}: Props) {
  const [selectedScan, setSelectedScan] =
    useState<SecurityScan | null>(null);

  const [runningScan, setRunningScan] =
    useState(false);

  const [run, setRun] =
    useState<PipelineRun | null>(pipelineRun);

  useEffect(() => {
    setRun(pipelineRun);
  }, [pipelineRun]);

  useEffect(() => {
    if (!run) return;

    const timer = setInterval(async () => {
      try {
        const latest =
          await pipelineRunsApi.getById(run.id);

        setRun(latest);

        if (
          latest.status === "SUCCESS" ||
          latest.status === "FAILED" ||
          latest.status === "CANCELLED"
        ) {
          clearInterval(timer);
        }
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [run?.id]);

  async function runSecurityScan() {
    if (!run) return;

    try {
      setRunningScan(true);

      await securityRunnerApi.run({
        pipelineRunId: run.id,
        repositoryPath:
          "/home/vijay/devsecops-security-platform",
        tools: [
          "GITLEAKS",
          "TRIVY",
          "SEMGREP",
          "CHECKOV",
        ],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setRunningScan(false);
    }
  }

  const progress = useMemo(() => {
    switch (run?.status) {
      case "SUCCESS":
        return 100;

      case "FAILED":
        return 100;

      case "RUNNING":
        return 70;

      case "PENDING":
        return 10;

      default:
        return 0;
    }
  }, [run]);

  const scanSummary = useMemo(() => {
    if (!run)
      return {
        total: 0,
        passed: 0,
        failed: 0,
        running: 0,
      };

    return {
      total: run.scans.length,

      passed: run.scans.filter(
        (s) =>
          s.status === "PASSED" ||
          s.status === "SUCCESS"
      ).length,

      failed: run.scans.filter(
        (s) =>
          s.status === "FAILED"
      ).length,

      running: run.scans.filter(
        (s) =>
          s.status === "RUNNING"
      ).length,
    };
  }, [run]);
    return (
    <>
      <Drawer
        open={run !== null}
        onClose={onClose}
        title="Pipeline Run Details"
      >
        {run && (
          <div className="space-y-8">

            {/* Header */}

            <div>

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
                      🚀
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {run.pipeline.name}
                      </h2>

                      <p className="mt-1 text-slate-500">
                        🌿 {run.branch}
                      </p>

                    </div>

                  </div>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusColors[run.status]
                  }`}
                >
                  {statusIcons[run.status]}{" "}
                  {run.status}
                </span>

              </div>

              {/* Progress */}

              <div className="mt-8">

                <div className="mb-2 flex justify-between text-sm">

                  <span className="font-medium">
                    Pipeline Progress
                  </span>

                  <span>
                    {progress}%
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className={`h-full transition-all duration-700 ${
                      run.status === "FAILED"
                        ? "bg-red-500"
                        : "bg-blue-600"
                    }`}
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* Overview */}

            <div className="grid gap-4 md:grid-cols-2">

              <InfoCard
                icon="🚦"
                label="Status"
                value={run.status}
              />

              <InfoCard
                icon="⏱"
                label="Duration"
                value={formatDuration(
                  run.duration
                )}
              />

              <InfoCard
                icon="🔀"
                label="Commit"
                value={run.commitSha.slice(
                  0,
                  8
                )}
              />

              <InfoCard
                icon="📅"
                label="Started"
                value={new Date(
                  run.startedAt
                ).toLocaleString()}
              />

            </div>

            {/* Timeline */}

            <div className="rounded-2xl border p-6">

              <h3 className="text-lg font-semibold">
                Pipeline Timeline
              </h3>

              <div className="mt-6">

                <PipelineTimeline
                  run={run}
                />

              </div>

            </div>

            {/* Scan Summary */}

            <div className="grid gap-4 md:grid-cols-4">

              <MiniCard
                title="Scans"
                value={scanSummary.total}
                color="bg-slate-700"
              />

              <MiniCard
                title="Passed"
                value={scanSummary.passed}
                color="bg-green-600"
              />

              <MiniCard
                title="Failed"
                value={scanSummary.failed}
                color="bg-red-600"
              />

              <MiniCard
                title="Running"
                value={scanSummary.running}
                color="bg-blue-600"
              />

            </div>

            {/* Security */}

            <div>

              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-xl font-semibold">
                  Security Scans
                </h3>

                <button
                  disabled={runningScan}
                  onClick={
                    runSecurityScan
                  }
                  className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:bg-slate-400"
                >
                  {runningScan
                    ? "Running..."
                    : "▶ Run Scan"}
                </button>

              </div>

              {run.scans.length === 0 ? (

                <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">

                  No security scans have
                  been executed yet.

                </div>

              ) : (

                <div className="space-y-3">

                  {run.scans.map(
                    (scan) => (

                      <button
                        key={scan.id}
                        onClick={() =>
                          setSelectedScan(
                            scan
                          )
                        }
                        className="w-full rounded-2xl border p-5 text-left transition hover:border-blue-400 hover:shadow-md"
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <h4 className="font-semibold">
                              {scan.tool}
                            </h4>

                            <p className="mt-1 text-sm text-slate-500">
                              Findings:{" "}
                              {
                                scan
                                  .findings
                                  .length
                              }
                            </p>

                          </div>

                          <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                              statusColors[
                                scan.status
                              ]
                            }`}
                          >
                            {
                              scan.status
                            }
                          </span>

                        </div>

                      </button>

                    )
                  )}

                </div>

              )}

            </div>

            {/* Live Logs */}

            <div className="overflow-hidden rounded-2xl border">

              <div className="border-b p-4">

                <h3 className="font-semibold">
                  Live Pipeline Logs
                </h3>

              </div>

              <div className="space-y-2 bg-slate-950 p-5 font-mono text-sm text-green-400">

                <div>
                  ✓ Checkout
                  repository
                </div>

                <div>
                  ✓ Setup build
                  environment
                </div>

                <div>
                  ✓ Install
                  dependencies
                </div>

                <div>
                  ✓ Build
                  completed
                </div>

                <div>
                  ✓ Unit tests
                  passed
                </div>

                {run.status ===
                "RUNNING" ? (
                  <div className="animate-pulse text-yellow-400">
                    ▶ Running
                    security scan...
                  </div>
                ) : run.status ===
                  "SUCCESS" ? (
                  <div>
                    ✓ Security scan
                    completed
                  </div>
                ) : (
                  <div className="text-slate-400">
                    Waiting for
                    execution...
                  </div>
                )}

              </div>

            </div>

            <div className="flex justify-end gap-3 border-t pt-6">

              <button
                onClick={onClose}
                className="rounded-xl border px-5 py-3 transition hover:bg-slate-100"
              >
                Close
              </button>

            </div>

          </div>
        )}
      </Drawer>
            <SecurityScanDrawer
        scan={selectedScan}
        onClose={() =>
          setSelectedScan(null)
        }
      />
    </>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="mb-3 flex items-center gap-2">

        <span className="text-xl">
          {icon}
        </span>

        <span className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </span>

      </div>

      <div className="break-all text-lg font-semibold text-slate-900">
        {value}
      </div>

    </div>
  );
}

function MiniCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-500">
          {title}
        </span>

        <span
          className={`h-4 w-4 rounded-full ${color}`}
        />

      </div>

      <div className="mt-4 text-3xl font-bold">
        {value}
      </div>

    </div>
  );
}