import type { PipelineRun } from "../../api/pipeline-runs";

interface Props {
  run: PipelineRun;
}

const statusStyles: Record<
  string,
  {
    dot: string;
    badge: string;
    icon: string;
  }
> = {
  SUCCESS: {
    dot: "bg-green-500",
    badge:
      "bg-green-500/20 text-green-700 border border-green-300",
    icon: "✅",
  },

  PASSED: {
    dot: "bg-green-500",
    badge:
      "bg-green-500/20 text-green-700 border border-green-300",
    icon: "✅",
  },

  RUNNING: {
    dot: "bg-blue-500 animate-pulse",
    badge:
      "bg-blue-500/20 text-blue-700 border border-blue-300",
    icon: "🔄",
  },

  FAILED: {
    dot: "bg-red-500",
    badge:
      "bg-red-500/20 text-red-700 border border-red-300",
    icon: "❌",
  },

  PENDING: {
    dot: "bg-yellow-500",
    badge:
      "bg-yellow-500/20 text-yellow-700 border border-yellow-300",
    icon: "⏳",
  },
};

export default function PipelineTimeline({
  run,
}: Props) {
  if (run.scans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">

        <div className="text-5xl">
          🚀
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          Pipeline Waiting
        </h3>

        <p className="mt-2 text-slate-500">
          Security stages will appear here once the
          pipeline starts.
        </p>

      </div>
    );
  }

  return (
    <div className="relative">

      {run.scans.map((scan, index) => {
        const style =
          statusStyles[scan.status] ??
          statusStyles.PENDING;

        return (
          <div
            key={scan.id}
            className="relative flex gap-6 pb-8 last:pb-0"
          >

            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div
                className={`z-10 flex h-12 w-12 items-center justify-center rounded-full text-xl text-white shadow-lg ${style.dot}`}
              >
                {style.icon}
              </div>

              {index !==
                run.scans.length - 1 && (
                <div className="h-full w-1 bg-slate-300" />
              )}

            </div>

            {/* Card */}

            <div className="flex-1 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    {scan.tool}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Security Scanner
                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${style.badge}`}
                >
                  {scan.status}
                </span>

              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">

                <Metric
                  label="Findings"
                  value={scan.findings.length}
                />

                <Metric
                  label="Started"
                  value="✓"
                />

                <Metric
                  label="Status"
                  value={scan.status}
                />

              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-lg font-bold">
        {value}
      </div>

    </div>
  );
}