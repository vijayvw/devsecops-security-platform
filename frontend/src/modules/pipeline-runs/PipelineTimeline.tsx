import type { PipelineRun } from "../../api/pipeline-runs";

interface Props {
  run: PipelineRun;
}

const statusColor: Record<string, string> = {
  PENDING: "bg-gray-400",
  RUNNING: "bg-blue-500 animate-pulse",
  PASSED: "bg-green-500",
  SUCCESS: "bg-green-500",
  FAILED: "bg-red-500",
};

export default function PipelineTimeline({
  run,
}: Props) {
  return (
    <div className="space-y-4">

      {run.scans.map((scan, index) => (
        <div
          key={scan.id}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">

            <div
              className={`h-4 w-4 rounded-full ${
                statusColor[scan.status] ??
                "bg-gray-400"
              }`}
            />

            {index !== run.scans.length - 1 && (
              <div className="h-12 w-px bg-gray-300" />
            )}

          </div>

          <div className="flex-1 rounded-lg border p-4">

            <div className="flex items-center justify-between">

              <h4 className="font-semibold">
                {scan.tool}
              </h4>

              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${
                  scan.status === "PASSED" ||
                  scan.status === "SUCCESS"
                    ? "bg-green-600"
                    : scan.status === "RUNNING"
                    ? "bg-blue-600"
                    : scan.status === "FAILED"
                    ? "bg-red-600"
                    : "bg-gray-500"
                }`}
              >
                {scan.status}
              </span>

            </div>

            <div className="mt-3 text-sm text-gray-500">
              Findings: {scan.findings.length}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}
