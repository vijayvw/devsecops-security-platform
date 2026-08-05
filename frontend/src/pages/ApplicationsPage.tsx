import { ApplicationsGrid } from "../modules/applications";

export default function ApplicationsPage() {
  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            📦 Applications
          </h1>

          <p className="mt-2 text-slate-500">
            Manage repositories connected to your DevSecOps platform.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Connected
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              6
            </p>
          </div>

          <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
            + Import Repository
          </button>

        </div>

      </div>

      <ApplicationsGrid />

    </div>
  );
}