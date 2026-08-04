import api from "./client";

export interface InfrastructureOverview {
  cluster: {
    status: string;
    nodes: number;
    pods: number;
    deployments: number;
    services: number;
    namespaces: number;
  };

  docker: {
    containers: number;
    running: number;
    stopped: number;
  };

  host: {
    cpu: number;
    memory: number;
    disk: number;
    uptime: string;
  };
}

export async function getInfrastructureOverview() {
  const { data } =
    await api.get<InfrastructureOverview>(
      "/infrastructure/overview"
    );

  return data;
}
