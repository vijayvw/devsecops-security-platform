import { useEffect, useState } from "react";

import Drawer from "../../components/Drawer";

import {
  pipelineRunsApi,
  type PipelineRun,
} from "../../api/pipeline-runs";

import type { SecurityScan } from "../../api/security-scans";

import { formatDuration } from "../../utils/formatDuration";
import { securityRunnerApi } from "../../api/security-runner";

import SecurityScanDrawer from "../security-scans/SecurityScanDrawer";
import PipelineTimeline from "./PipelineTimeline";

interface Props {
  pipelineRun: PipelineRun | null;
  onClose: () => void;
}

export default function PipelineRunDrawer({
  pipelineRun,
  onClose,
}: Props) {
  const [selectedScan, setSelectedScan] =
    useState<SecurityScan | null>(null);

  const [running, setRunning] =
    useState(false);

  const [run, setRun] =
    useState<PipelineRun | null>(pipelineRun);

  useEffect(() => {
    setRun(pipelineRun);
  }, [pipelineRun]);

  useEffect(() => {
    if (!run) return;

    const interval = setInterval(async () => {
      try {
        const latest =
          await pipelineRunsApi.getById(run.id);

        setRun(latest);

        if (
          latest.status === "SUCCESS" ||
          latest.status === "FAILED"
        ) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [run?.id]);

  async function runSecurityScan() {
    if (!run) return;

    try {
      setRunning(true);

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

      alert("Security scan started.");
    } catch (error) {
      console.error(error);
      alert("Failed to run security scan");
    } finally {
      setRunning(false);
    }
  }

  return (
    <>
      <Drawer
        open={run !== null}
        onClose={onClose}
        title="Pipeline Run Details"
      >
        {run && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">
                {run.pipeline.name}
              </h2>

              <p className="text-gray-500">
                Branch: {run.branch}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Status
                </p>

                <p className="mt-2 font-semibold">
                  {run.status}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Duration
                </p>

                <p className="mt-2 font-semibold">
                  {formatDuration(
                    run.duration
                  )}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Commit
                </p>

                <p className="mt-2 font-mono break-all">
                  {run.commitSha}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Started
                </p>

                <p className="mt-2">
                  {new Date(
                    run.startedAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="rounded-lg border p-5">
              <h3 className="mb-4 text-lg font-semibold">
                Pipeline Timeline
              </h3>

              <PipelineTimeline run={run} />
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Security Scans
                </h3>

                <button
                  onClick={runSecurityScan}
                  disabled={running}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {running
                    ? "Running..."
                    : "▶ Run Scan"}
                </button>
              </div>

              {run.scans.length === 0 ? (
                <p className="text-gray-500">
                  No security scans found.
                </p>
              ) : (
                <div className="space-y-3">
                  {run.scans.map((scan) => (
                    <button
                      key={scan.id}
                      onClick={() =>
                        setSelectedScan(scan)
                      }
                      className="w-full rounded-lg border p-4 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          {scan.tool}
                        </h4>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            scan.status ===
                              "PASSED" ||
                            scan.status ===
                              "SUCCESS"
                              ? "bg-green-100 text-green-700"
                              : scan.status ===
                                "FAILED"
                              ? "bg-red-100 text-red-700"
                              : scan.status ===
                                "RUNNING"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {scan.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        Findings:{" "}
                        {scan.findings.length}
                      </p>

                      <p className="mt-3 text-sm font-medium text-blue-600">
                        View scan details →
                      </p>
                    </button>
                  ))}
                </div>
              )}
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