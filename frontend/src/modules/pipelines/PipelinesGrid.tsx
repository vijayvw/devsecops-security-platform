import { useEffect, useState } from "react";

import {
  pipelinesApi,
  type Pipeline,
} from "../../api/pipelines";

import PipelineCard from "./PipelineCard";
import PipelineDrawer from "./PipelineDrawer";

export default function PipelinesGrid() {
  const [pipelines, setPipelines] =
    useState<Pipeline[]>([]);

  const [selected, setSelected] =
    useState<Pipeline | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await pipelinesApi.getAll();

        setPipelines(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-sm">
        <div className="text-6xl">🚀</div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Loading Pipelines...
        </h2>

        <p className="mt-3 text-slate-500">
          Fetching CI/CD pipelines from your DevSecOps platform.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Statistics */}

      <div className="grid gap-6 lg:grid-cols-4">

        <StatCard
          title="Total Pipelines"
          value={pipelines.length.toString()}
          icon="🚀"
          color="from-blue-500 to-cyan-500"
        />

        <StatCard
          title="Running"
          value="3"
          icon="⚡"
          color="from-emerald-500 to-green-500"
        />

        <StatCard
          title="Successful"
          value="24"
          icon="✅"
          color="from-violet-500 to-indigo-500"
        />

        <StatCard
          title="Failed"
          value="2"
          icon="❌"
          color="from-red-500 to-orange-500"
        />

      </div>

      {/* Toolbar */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex flex-1 gap-4">

            <input
              placeholder="Search pipelines..."
              className="flex-1 rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-500"
            />

            <select className="rounded-2xl border border-slate-300 px-5 py-3 outline-none">

              <option>All Status</option>
              <option>Running</option>
              <option>Success</option>
              <option>Failed</option>

            </select>

          </div>

          <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]">

            + Create Pipeline

          </button>

        </div>

      </div>

      {/* Grid */}

      {pipelines.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-24 text-center">

          <div className="text-7xl">
            🚀
          </div>

          <h2 className="mt-8 text-3xl font-bold text-slate-900">
            No Pipelines Found
          </h2>

          <p className="mt-4 text-slate-500">
            Create your first CI/CD pipeline to automate builds,
            testing and deployments.
          </p>

        </div>

      ) : (

        <div className="grid gap-7 md:grid-cols-2 2xl:grid-cols-3">

          {pipelines.map((pipeline) => (

            <PipelineCard
              key={pipeline.id}
              pipeline={pipeline}
              onClick={() => setSelected(pipeline)}
            />

          ))}

        </div>

      )}

      <PipelineDrawer
        pipeline={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className={`h-2 bg-gradient-to-r ${color}`} />

      <div className="flex items-center justify-between p-6">

        <div>

          <div className="text-sm text-slate-500">
            {title}
          </div>

          <div className="mt-3 text-5xl font-black text-slate-900">
            {value}
          </div>

        </div>

        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-3xl text-white shadow-lg`}>

          {icon}

        </div>

      </div>

    </div>
  );
}