import type { Pipeline } from "../../api/pipelines";

interface Props {
  pipeline: Pipeline;
  onClick: () => void;
}

const providerColors: Record<string, string> = {
  GITHUB_ACTIONS:
    "bg-slate-700/60 text-white",
  JENKINS:
    "bg-red-500/20 text-red-300",
  GITLAB_CI:
    "bg-orange-500/20 text-orange-300",
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
      className="group w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_20px_45px_rgba(59,130,246,0.20)]"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-6">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg">
              🚀
            </div>

            <div>

              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {pipeline.name}
              </h3>

              <div className="mt-2 flex gap-2">

                <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                  📦 {pipeline.application.name}
                </span>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                  🌿 main
                </span>

              </div>

            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              providerColors[pipeline.provider] ??
              "bg-slate-700 text-white"
            }`}
          >
            {providerIcon(pipeline.provider)} {provider}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        <div className="rounded-xl bg-slate-800/60 p-4">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Pipeline Flow
          </p>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-300">

            <span>Checkout</span>

            <span>→</span>

            <span>Build</span>

            <span>→</span>

            <span>Test</span>

            <span>→</span>

            <span>Scan</span>

            <span>→</span>

            <span>Deploy</span>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-xs uppercase text-slate-500">
              Success Rate
            </p>

            <div className="mt-3 flex items-center gap-2">

              <span className="text-2xl font-bold text-green-400">
                98%
              </span>

            </div>

          </div>

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-xs uppercase text-slate-500">
              Last Run
            </p>

            <p className="mt-3 font-semibold text-white">
              2 min ago
            </p>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-3">

          <div className="rounded-xl border border-slate-700 p-3 text-center">

            <div className="text-xs uppercase text-slate-500">
              Builds
            </div>

            <div className="mt-2 text-xl font-bold text-white">
              126
            </div>

          </div>

          <div className="rounded-xl border border-slate-700 p-3 text-center">

            <div className="text-xs uppercase text-slate-500">
              Success
            </div>

            <div className="mt-2 text-xl font-bold text-green-400">
              123
            </div>

          </div>

          <div className="rounded-xl border border-slate-700 p-3 text-center">

            <div className="text-xs uppercase text-slate-500">
              Failed
            </div>

            <div className="mt-2 text-xl font-bold text-red-400">
              3
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-4">

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

          <span className="text-sm text-green-400">
            Pipeline Healthy
          </span>

        </div>

        <div className="flex items-center gap-2 font-semibold text-blue-400 transition-transform group-hover:translate-x-1">

          View Details

          <span>→</span>

        </div>

      </div>

    </button>
  );
}