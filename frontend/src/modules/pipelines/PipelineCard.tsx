import type { Pipeline } from "../../api/pipelines";

interface Props {
  pipeline: Pipeline;
  onClick: () => void;
}

const providerColors: Record<string, string> = {
  GITHUB_ACTIONS:
    "bg-slate-900 text-white",
  JENKINS:
    "bg-red-100 text-red-700",
  GITLAB_CI:
    "bg-orange-100 text-orange-700",
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

export default function PipelineCard({
  pipeline,
  onClick,
}: Props) {
  const provider =
    pipeline.provider.replaceAll("_", " ");

  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
    >
      {/* Top Gradient */}

      <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600" />

      {/* Header */}

      <div className="p-7">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl text-white shadow-lg">

              🚀

            </div>

            <div>

              <h3 className="text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">

                {pipeline.name}

              </h3>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">

                  📦 {pipeline.application.name}

                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  🌿 main

                </span>

              </div>

            </div>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              providerColors[pipeline.provider] ??
              "bg-slate-100 text-slate-700"
            }`}
          >
            {providerIcon(pipeline.provider)} {provider}
          </span>

        </div>

        {/* Pipeline Flow */}

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">

          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">

            Pipeline Flow

          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">

            <span>Checkout</span>

            <span>→</span>

            <span>Build</span>

            <span>→</span>

            <span>Test</span>

            <span>→</span>

            <span>Security</span>

            <span>→</span>

            <span>Deploy</span>

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-7 grid grid-cols-2 gap-5">

          <MetricCard
            title="Success Rate"
            value="98%"
            color="text-green-600"
          />

          <MetricCard
            title="Last Run"
            value="2 min ago"
            color="text-blue-600"
          />

        </div>

        {/* Build Stats */}

        <div className="mt-6 grid grid-cols-3 gap-4">

          <SmallCard
            title="Builds"
            value="126"
          />

          <SmallCard
            title="Passed"
            value="123"
            color="text-green-600"
          />

          <SmallCard
            title="Failed"
            value="3"
            color="text-red-600"
          />

        </div>

        {/* Progress */}

        <div className="mt-7">

          <div className="mb-3 flex items-center justify-between text-sm">

            <span className="font-semibold text-slate-700">

              Latest Execution

            </span>

            <span className="font-bold text-green-600">

              SUCCESS

            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
              style={{
                width: "100%",
              }}
            />

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 px-7 py-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <span className="font-semibold text-green-700">

              Healthy

            </span>

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100"
            >
              ▶ Run
            </button>

            <span className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-blue-700">

              View Details →

            </span>

          </div>

        </div>

      </div>

    </button>
  );
}

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="text-xs uppercase tracking-widest text-slate-500">

        {title}

      </div>

      <div className={`mt-3 text-3xl font-black ${color}`}>

        {value}

      </div>

    </div>
  );
}

function SmallCard({
  title,
  value,
  color = "text-slate-900",
}: {
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">

      <div className="text-xs uppercase tracking-widest text-slate-500">

        {title}

      </div>

      <div className={`mt-3 text-2xl font-black ${color}`}>

        {value}

      </div>

    </div>
  );
}