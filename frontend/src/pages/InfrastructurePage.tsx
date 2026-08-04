import { useQuery } from "@tanstack/react-query";
import {
  getInfrastructureOverview,
} from "../api/infrastructure";

export default function InfrastructurePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["infrastructure"],
    queryFn: getInfrastructureOverview,
  });

  if (isLoading) {
    return (
      <div className="p-8">
        Loading infrastructure...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        No infrastructure data.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Infrastructure
      </h1>

      {/* Kubernetes */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          ☸ Kubernetes Cluster
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <Card
            title="Status"
            value={data.cluster.status}
          />

          <Card
            title="Nodes"
            value={data.cluster.nodes}
          />

          <Card
            title="Pods"
            value={data.cluster.pods}
          />

          <Card
            title="Deployments"
            value={data.cluster.deployments}
          />

          <Card
            title="Services"
            value={data.cluster.services}
          />

          <Card
            title="Namespaces"
            value={data.cluster.namespaces}
          />

        </div>
      </div>

      {/* Docker */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          🐳 Docker
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <Card
            title="Containers"
            value={data.docker.containers}
          />

          <Card
            title="Running"
            value={data.docker.running}
          />

          <Card
            title="Stopped"
            value={data.docker.stopped}
          />

        </div>
      </div>

      {/* Host */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          💻 Host
        </h2>

        <div className="grid grid-cols-4 gap-4">

          <Card
            title="CPU"
            value={`${data.host.cpu}%`}
          />

          <Card
            title="Memory"
            value={`${data.host.memory}%`}
          />

          <Card
            title="Disk"
            value={`${data.host.disk}%`}
          />

          <Card
            title="Uptime"
            value={data.host.uptime}
          />

        </div>
      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}