import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getInfrastructureOverview,
} from "../api/infrastructure";

export default function InfrastructurePage() {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["infrastructure"],
    queryFn: getInfrastructureOverview,
    refetchInterval: 5000,
  });

  const clusterHealth = useMemo(() => {
    if (!data) return 0;

    const status = String(
      data.cluster.status
    ).toLowerCase();

    if (status === "healthy") return 100;
    if (status === "warning") return 70;

    return 35;
  }, [data]);

  const hostAverage = useMemo(() => {
    if (!data) return 0;

    return Math.round(
      (
        Number(data.host.cpu) +
        Number(data.host.memory) +
        Number(data.host.disk)
      ) / 3
    );
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="text-6xl">
            ☁️
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            Loading Infrastructure
          </h2>

          <p className="mt-2 text-slate-500">
            Fetching latest cluster metrics...
          </p>

        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-3xl border border-dashed p-16 text-center">

          <div className="text-6xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Infrastructure Offline
          </h2>

          <p className="mt-2 text-slate-500">
            Unable to fetch infrastructure information.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
                ☁️
              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Infrastructure
                </h1>

                <p className="mt-2 text-slate-300">
                  Monitor Kubernetes, Docker and host resources in real time.
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <SummaryCard
              title="Cluster Health"
              value={`${clusterHealth}%`}
              icon="☸️"
              color="bg-blue-600"
            />

            <SummaryCard
              title="Host Usage"
              value={`${hostAverage}%`}
              icon="💻"
              color="bg-green-600"
            />

          </div>

        </div>

      </div>
            {/* Kubernetes */}

      <section>

        <div className="mb-5 flex items-center gap-3">

          <div className="text-3xl">
            ☸️
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Kubernetes Cluster
            </h2>

            <p className="text-slate-500">
              Live cluster overview
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <MetricCard
            title="Cluster Status"
            value={String(data.cluster.status)}
            icon="🟢"
          />

          <MetricCard
            title="Nodes"
            value={String(data.cluster.nodes)}
            icon="🖥️"
          />

          <MetricCard
            title="Pods"
            value={String(data.cluster.pods)}
            icon="📦"
          />

          <MetricCard
            title="Deployments"
            value={String(data.cluster.deployments)}
            icon="🚀"
          />

          <MetricCard
            title="Services"
            value={String(data.cluster.services)}
            icon="🌐"
          />

          <MetricCard
            title="Namespaces"
            value={String(data.cluster.namespaces)}
            icon="📁"
          />

        </div>

      </section>

      {/* Docker */}

      <section>

        <div className="mb-5 flex items-center gap-3">

          <div className="text-3xl">
            🐳
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Docker Runtime
            </h2>

            <p className="text-slate-500">
              Container engine statistics
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <MetricCard
            title="Containers"
            value={String(data.docker.containers)}
            icon="📦"
          />

          <MetricCard
            title="Running"
            value={String(data.docker.running)}
            icon="🟢"
          />

          <MetricCard
            title="Stopped"
            value={String(data.docker.stopped)}
            icon="🔴"
          />

        </div>

      </section>

      {/* Host */}

      <section>

        <div className="mb-5 flex items-center gap-3">

          <div className="text-3xl">
            💻
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Host Monitoring
            </h2>

            <p className="text-slate-500">
              Live operating system metrics
            </p>

          </div>

        </div>

        <div className="grid gap-6 xl:grid-cols-2">

          <ProgressCard
            title="CPU Usage"
            value={Number(data.host.cpu)}
            color="bg-blue-600"
          />

          <ProgressCard
            title="Memory Usage"
            value={Number(data.host.memory)}
            color="bg-green-600"
          />

          <ProgressCard
            title="Disk Usage"
            value={Number(data.host.disk)}
            color="bg-orange-500"
          />

          <MetricCard
            title="System Uptime"
            value={String(data.host.uptime)}
            icon="⏱️"
          />

        </div>

      </section>

    </div>
  );
}
function SummaryCard({
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
    <div className="rounded-2xl bg-slate-800 p-5">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="mt-3 text-3xl font-bold text-white">
            {value}
          </div>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </div>

          <div className="mt-4 text-3xl font-bold text-slate-900">
            {value}
          </div>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

function ProgressCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  const percentage = Math.max(
    0,
    Math.min(value, 100)
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <span className="font-semibold text-slate-700">
          {title}
        </span>

        <span className="text-2xl font-bold text-slate-900">
          {percentage}%
        </span>

      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-3 flex justify-between text-xs text-slate-500">

        <span>0%</span>

        <span>100%</span>

      </div>

    </div>
  );
}