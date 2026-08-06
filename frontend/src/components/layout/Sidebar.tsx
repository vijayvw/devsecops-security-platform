import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  GitBranch,
  PlayCircle,
  Shield,
  FileSearch,
  BarChart3,
  Cloud,
  Settings,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    heading: "GENERAL",
    links: [
      {
        to: "/",
        title: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        to: "/applications",
        title: "Applications",
        icon: Boxes,
      },
    ],
  },
  {
    heading: "DEVSECOPS",
    links: [
      {
        to: "/pipelines",
        title: "Pipelines",
        icon: GitBranch,
      },
      {
        to: "/pipeline-runs",
        title: "Pipeline Runs",
        icon: PlayCircle,
      },
      {
        to: "/security-scans",
        title: "Security Scans",
        icon: Shield,
      },
      {
        to: "/findings",
        title: "Findings",
        icon: FileSearch,
      },
    ],
  },
  {
    heading: "ANALYTICS",
    links: [
      {
        to: "/reports",
        title: "Reports",
        icon: BarChart3,
      },
      {
        to: "/infrastructure",
        title: "Infrastructure",
        icon: Cloud,
      },
    ],
  },
  {
    heading: "SYSTEM",
    links: [
      {
        to: "/settings",
        title: "Settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[420px] flex-col border-r border-slate-800 bg-[#060b17] text-white">

      {/* Brand */}

      <div className="border-b border-slate-800 px-8 py-8">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl">

            <ShieldCheck size={34} />

          </div>

          <div>

            <h1 className="text-[34px] font-bold tracking-tight">
              DevSecOps
            </h1>

            <p className="mt-1 text-base text-slate-400">
              Cloud Security Platform
            </p>

          </div>

        </div>

      </div>

      {/* Platform Status */}

      <div className="px-6 pt-8">

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <div className="text-xs uppercase tracking-[0.25em] text-green-400">
            Platform Status
          </div>

          <div className="mt-4 flex items-center gap-3">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <span className="text-[15px] font-medium text-green-300">
              All Systems Operational
            </span>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="mt-10 flex-1 overflow-y-auto px-5">

        {items.map((section) => (
          <div key={section.heading} className="mb-8">

            <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              {section.heading}
            </div>

            {section.links.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `mb-3 flex items-center gap-5 rounded-2xl px-5 py-4 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                    }`
                  }
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">

                    <Icon size={21} strokeWidth={2} />

                  </div>

                  <span className="text-[15px] font-medium tracking-wide">
                    {item.title}
                  </span>

                </NavLink>
              );
            })}

          </div>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <div className="rounded-2xl bg-slate-900 p-5 transition hover:bg-slate-800">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold">

              V

            </div>

            <div className="min-w-0">

              <div className="truncate text-base font-semibold">
                Vijay VW
              </div>

              <div className="truncate text-sm text-slate-400">
                Platform Administrator
              </div>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}