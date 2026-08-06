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

<div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl">

  <div className="p-8">

    <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">

      {/* Left */}

      <div className="flex items-start gap-6">

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-5xl shadow-xl">
          ☸️
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            Infrastructure
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            Live monitoring of Kubernetes cluster, Docker runtime
            and operating system resources.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <span className="rounded-xl bg-blue-600/30 px-4 py-2 text-sm">
              Kubernetes
            </span>

            <span className="rounded-xl bg-cyan-600/30 px-4 py-2 text-sm">
              Docker
            </span>

            <span className="rounded-xl bg-emerald-600/30 px-4 py-2 text-sm">
              Linux Host
            </span>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="grid grid-cols-2 gap-5 xl:w-[380px]">

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

        <SummaryCard
          title="Nodes"
          value={String(data.cluster.nodes)}
          icon="🖥️"
          color="bg-violet-600"
        />

        <SummaryCard
          title="Pods"
          value={String(data.cluster.pods)}
          icon="📦"
          color="bg-orange-500"
        />

      </div>

    </div>

  </div>

</div>
           {/* Kubernetes */}

<section>

  <div className="mb-6">

    <h2 className="text-3xl font-bold">
      Kubernetes Cluster
    </h2>

    <p className="mt-2 text-slate-500">
      Live cluster overview and workload statistics.
    </p>

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

    {/* Header */}

    <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

      <div>

        <h3 className="text-2xl font-bold">
          Cluster Overview
        </h3>

        <p className="mt-2 text-slate-500">
          Current Kubernetes platform status.
        </p>

      </div>

      <span
        className={`rounded-full px-5 py-2 font-semibold ${
          String(data.cluster.status).toLowerCase() === "healthy"
            ? "bg-green-100 text-green-700"
            : String(data.cluster.status).toLowerCase() === "warning"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        ● {data.cluster.status}
      </span>

    </div>

    {/* Metrics */}

    <div className="grid gap-6 p-8 lg:grid-cols-3">

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

      <MetricCard
        title="Cluster Status"
        value={String(data.cluster.status)}
        icon="☸️"
      />

    </div>

    {/* Footer */}

    <div className="grid border-t border-slate-200 lg:grid-cols-4">

      <MiniMetric
        title="API Server"
        healthy
      />

      <MiniMetric
        title="Scheduler"
        healthy
      />

      <MiniMetric
        title="Controller"
        healthy
      />

      <MiniMetric
        title="etcd"
        healthy
      />

    </div>

  </div>

</section>

      {/* Docker */}

<section>

  <div className="mb-6">

    <h2 className="text-3xl font-bold">
      Docker Runtime
    </h2>

    <p className="mt-2 text-slate-500">
      Container runtime statistics and engine health.
    </p>

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

    {/* Header */}

    <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

      <div>

        <h3 className="text-2xl font-bold">
          Container Engine
        </h3>

        <p className="mt-2 text-slate-500">
          Docker runtime currently running on the host.
        </p>

      </div>

      <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
        ● Running
      </span>

    </div>

    {/* Metrics */}

    <div className="grid gap-6 p-8 lg:grid-cols-3">

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

    {/* Footer */}

    <div className="grid border-t border-slate-200 lg:grid-cols-3">

      <DockerStatus
        title="Runtime"
        value="Docker Engine"
        healthy
      />

      <DockerStatus
        title="Images"
        value="Available"
        healthy
      />

      <DockerStatus
        title="Network"
        value="Connected"
        healthy
      />

    </div>

  </div>

</section>

      {/* Host */}

<section>

  <div className="mb-6">

    <h2 className="text-3xl font-bold">
      Host Monitoring
    </h2>

    <p className="mt-2 text-slate-500">
      Real-time operating system resource utilization.
    </p>

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

    {/* Header */}

    <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

      <div>

        <h3 className="text-2xl font-bold">
          System Resources
        </h3>

        <p className="mt-2 text-slate-500">
          CPU, Memory and Disk usage collected from the host.
        </p>

      </div>

      <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
        ● Online
      </span>

    </div>

    {/* Resource Usage */}

    <div className="grid gap-8 p-8 lg:grid-cols-3">

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

    </div>

    {/* Bottom Statistics */}

    <div className="grid border-t border-slate-200 lg:grid-cols-4">

      <HostStat
        title="System Uptime"
        value={String(data.host.uptime)}
        icon="⏱️"
      />

      <HostStat
        title="CPU"
        value={`${data.host.cpu}%`}
        icon="🧠"
      />

      <HostStat
        title="Memory"
        value={`${data.host.memory}%`}
        icon="💾"
      />

      <HostStat
        title="Disk"
        value={`${data.host.disk}%`}
        icon="🗄️"
      />

    </div>

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
function MiniMetric({
  title,
  healthy,
}: {
  title: string;
  healthy: boolean;
}) {
  return (
    <div className="border-r border-slate-200 p-6 last:border-r-0">

      <div className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </div>

      <div className="mt-3 flex items-center gap-3">

        <span
          className={`h-3 w-3 rounded-full ${
            healthy
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span className="font-semibold">
          {healthy ? "Healthy" : "Down"}
        </span>

      </div>

    </div>
  );
}
function DockerStatus({
  title,
  value,
  healthy,
}: {
  title: string;
  value: string;
  healthy: boolean;
}) {
  return (
    <div className="border-r border-slate-200 p-6 last:border-r-0">

      <div className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </div>

      <div className="mt-3 flex items-center gap-3">

        <span
          className={`h-3 w-3 rounded-full ${
            healthy
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span className="font-semibold text-slate-900">
          {value}
        </span>

      </div>

    </div>
  );
}
function HostStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="border-r border-slate-200 p-6 last:border-r-0">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          {icon}
        </div>

        <div>

          <div className="text-xs uppercase tracking-widest text-slate-500">
            {title}
          </div>

          <div className="mt-2 text-lg font-bold text-slate-900">
            {value}
          </div>

        </div>

      </div>

    </div>
  );
}