import type { Application } from "../../api/applications";
interface Props {
  application: Application;
  onClick: () => void;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-300",
  JavaScript: "bg-yellow-500/20 text-yellow-300",
  Python: "bg-green-500/20 text-green-300",
  Go: "bg-cyan-500/20 text-cyan-300",
  Java: "bg-orange-500/20 text-orange-300",
  Rust: "bg-orange-600/20 text-orange-400",
  Terraform: "bg-violet-500/20 text-violet-300",
  Unknown: "bg-slate-700 text-slate-300",
};

function languageIcon(language?: string) {
  switch (language?.toLowerCase()) {
    case "typescript":
      return "🔷";
    case "javascript":
      return "🟨";
    case "python":
      return "🐍";
    case "go":
      return "🐹";
    case "java":
      return "☕";
    case "terraform":
      return "🏗️";
    case "rust":
      return "🦀";
    default:
      return "📦";
  }
}

export default function ApplicationCard({
  application,
  onClick,
}: Props) {
  const language = application.language || "Unknown";

  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-6">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg">
              {languageIcon(language)}
            </div>

            <div>

              <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                {application.name}
              </h3>

              <div className="mt-2 flex items-center gap-2">

                <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">
                  🌿 {application.defaultBranch}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    application.isPrivate
                      ? "bg-red-500/20 text-red-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {application.isPrivate ? "🔒 Private" : "🌍 Public"}
                </span>

              </div>

            </div>

          </div>

          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
            ACTIVE
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        <p className="min-h-[48px] text-sm leading-6 text-slate-400">
          {application.description || "No description provided."}
        </p>

        {/* Repository */}

        <div className="rounded-xl bg-slate-800 p-4">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Repository
              </p>

              <p className="mt-2 font-medium text-white break-all">
                {application.repositoryOwner}/
                {application.repositoryName}
              </p>

            </div>

            <div className="text-2xl">
              📁
            </div>

          </div>

        </div>

        {/* Information */}

        <div className="grid grid-cols-2 gap-4">

          <InfoCard title="Language">

            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                languageColors[language] ??
                languageColors.Unknown
              }`}
            >
              {language}
            </span>

          </InfoCard>

          <InfoCard title="Security">

            <div className="flex items-center gap-2">

              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

              <div>
  <div className="text-2xl font-bold text-green-400">
    96%
  </div>
  <div className="text-xs text-slate-500">
    Security Score
  </div>
</div>

            </div>

          </InfoCard>

        </div>

        {/* Repository Details */}

        <div className="grid grid-cols-2 gap-4">

          <MiniInfo
            label="Last Scan"
            value="2 min ago"
          />

          <MiniInfo
            label="Visibility"
            value={application.isPrivate ? "Private" : "Public"}
          />

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-3 gap-3">

          <StatCard
            title="Pipelines"
            value="12"
          />

          <StatCard
            title="Scans"
            value="72"
          />

          <StatCard
            title="Findings"
            value="3"
          />

        </div>

      </div>

      <div className="grid grid-cols-3 gap-3">

  <button className="rounded-xl border border-slate-700 py-3 hover:bg-slate-800">
    🚀 Pipeline
  </button>

  <button className="rounded-xl border border-slate-700 py-3 hover:bg-slate-800">
    🛡 Scan
  </button>

  <button className="rounded-xl border border-slate-700 py-3 hover:bg-slate-800">
    📊 Reports
  </button>

</div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-4">

        <div>

          <p className="text-xs uppercase text-slate-500">
            Last Updated
          </p>

          <p className="text-sm text-slate-300">
            Today
          </p>

        </div>

        <div className="flex items-center gap-2 font-semibold text-blue-400 transition-transform group-hover:translate-x-1">
          View Details
          <span>→</span>
        </div>

      </div>

    </button>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">

      <p className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div className="mt-3">
        {children}
      </div>

    </div>
  );
}

function MiniInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 p-4">

      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-center">

      <p className="text-[11px] uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}