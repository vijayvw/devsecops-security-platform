import { PipelinesGrid } from "../modules/pipelines";

export default function PipelinesPage() {
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            🚀 DevSecOps Platform
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            CI/CD Pipelines
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-slate-500">
            Monitor, execute and manage CI/CD pipelines across all connected
            applications. Track build status, deployments, security scans and
            delivery progress from a single dashboard.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-[360px]">

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">

            <div className="text-sm text-slate-500">
              Successful
            </div>

            <div className="mt-2 text-4xl font-black text-emerald-600">
              24
            </div>

          </div>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">

            <div className="text-sm text-slate-500">
              Running
            </div>

            <div className="mt-2 text-4xl font-black text-blue-600">
              3
            </div>

          </div>

        </div>

      </div>

      {/* Pipelines */}

      <PipelinesGrid />

    </div>
  );
}