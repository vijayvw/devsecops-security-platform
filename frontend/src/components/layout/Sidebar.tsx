import { NavLink } from "react-router-dom";

const items = [
  {
    to: "/",
    title: "Dashboard",
    icon: "📊",
  },
  {
    to: "/applications",
    title: "Applications",
    icon: "📦",
  },
  {
    to: "/pipelines",
    title: "Pipelines",
    icon: "🚀",
  },
  {
    to: "/pipeline-runs",
    title: "Pipeline Runs",
    icon: "🏃",
  },
  {
    to: "/security-scans",
    title: "Security Scans",
    icon: "🔍",
  },
  {
    to: "/findings",
    title: "Findings",
    icon: "🛡️",
  },
  {
    to: "/reports",
    title: "Reports",
    icon: "📈",
  },
  {
    to: "/infrastructure",
    title: "Infrastructure",
    icon: "☁️",
  },
  {
    to: "/settings",
    title: "Settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">

      {/* Brand */}

      <div className="border-b border-slate-800 p-7">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl shadow-lg">

            ☸️

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight">
              DevSecOps
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Security Platform
            </p>

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="px-5 pt-6">

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

          <div className="text-xs uppercase tracking-wider text-green-400">
            Platform Status
          </div>

          <div className="mt-3 flex items-center gap-3">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <span className="font-semibold text-green-300">
              Healthy
            </span>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="mt-8 flex-1 px-4">

        {items.map((item) => (

          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group mb-2 flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">

              {item.icon}

            </div>

            <span className="font-medium">

              {item.title}

            </span>

          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <div className="rounded-2xl bg-slate-900 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">

              V

            </div>

            <div>

              <div className="font-semibold">
                Vijay VW
              </div>

              <div className="text-sm text-slate-400">
                Platform Administrator
              </div>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}