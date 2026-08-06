import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
} from "lucide-react";

const pageTitles: Record<
  string,
  { title: string; subtitle: string }
> = {
  "/": {
    title: "Dashboard",
    subtitle: "Security Operations Center",
  },
  "/applications": {
    title: "Applications",
    subtitle: "Manage repositories and services",
  },
  "/pipelines": {
    title: "Pipelines",
    subtitle: "CI/CD Pipeline Management",
  },
  "/pipeline-runs": {
    title: "Pipeline Runs",
    subtitle: "Live CI/CD Execution History",
  },
  "/security-scans": {
    title: "Security Scans",
    subtitle: "Infrastructure & Code Scanning",
  },
  "/findings": {
    title: "Security Findings",
    subtitle: "Detected Vulnerabilities",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Platform Analytics",
  },
  "/infrastructure": {
    title: "Infrastructure",
    subtitle: "Clusters & Cloud Resources",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Platform Configuration",
  },
};

export default function Header() {
  const [time, setTime] = useState(new Date());

  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const page =
    pageTitles[location.pathname] ??
    pageTitles["/"];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

      <div className="flex h-24 items-center gap-8 px-8">

        {/* Left */}

        <div className="flex w-96 shrink-0 items-center gap-5">

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100">

            <Menu size={22} />

          </button>

          <div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {page.title}
            </h1>

            <p className="mt-1 text-base text-slate-500">
              {page.subtitle}
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="hidden flex-1 xl:flex">

          <div className="flex w-full max-w-5xl items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 shadow-sm transition-all duration-300 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md">

            <Search
              size={20}
              className="mr-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search applications, repositories, pipelines, scans..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

        </div>

        {/* Right */}

        <div className="ml-auto flex items-center gap-4">

          {/* Health */}

          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">

            <CheckCircle2
              size={18}
              className="text-green-600"
            />

            <span className="text-sm font-semibold text-green-700">
              Platform Healthy
            </span>

          </div>

          {/* Notification */}

          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100">

            <Bell size={20} />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />

          </button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-base font-bold text-white">

              V

            </div>

            <div>

              <div className="font-semibold text-slate-900">
                Vijay VW
              </div>

              <div className="text-xs text-slate-500">
                Platform Administrator
              </div>

            </div>

          </div>

          {/* Clock */}

          <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-center 2xl:block">

            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Local Time
            </div>

            <div className="mt-1 text-sm font-semibold text-slate-900">
              {time.toLocaleTimeString()}
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}