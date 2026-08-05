import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(
    new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">

      {/* Left */}

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
          DevSecOps Platform
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Security Operations Center
        </h1>

      </div>

      {/* Center */}

      <div className="hidden w-full max-w-xl px-10 xl:block">

        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">

          <span className="mr-3 text-lg">
            🔍
          </span>

          <input
            placeholder="Search applications, pipelines, scans..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

            <span className="text-sm font-semibold text-green-700">
              Platform Healthy
            </span>

          </div>

        </div>

        <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">

          <div className="text-xs uppercase tracking-wider text-slate-500">
            Local Time
          </div>

          <div className="mt-1 font-semibold">
            {time.toLocaleTimeString()}
          </div>

        </div>

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border bg-white transition hover:bg-slate-100">

          🔔

          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-2 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
            V
          </div>

          <div>

            <div className="font-semibold">
              Vijay
            </div>

            <div className="text-xs text-slate-500">
              Administrator
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}