import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();

try {
  kc.loadFromDefault();
} catch {
  console.warn("Kubernetes config not found.");
}

const core = kc.makeApiClient(k8s.CoreV1Api);
const apps = kc.makeApiClient(k8s.AppsV1Api);

export async function getClusterMetrics() {
  try {
    const [
      nodes,
      pods,
      services,
      namespaces,
      deployments,
    ] = await Promise.all([
      core.listNode(),
      core.listPodForAllNamespaces(),
      core.listServiceForAllNamespaces(),
      core.listNamespace(),
      apps.listDeploymentForAllNamespaces(),
    ]);

    const readyNodes =
      nodes.body.items.filter((node) =>
        node.status?.conditions?.some(
          (condition) =>
            condition.type === "Ready" &&
            condition.status === "True"
        )
      ).length;

    return {
      status:
        readyNodes === nodes.body.items.length
          ? "Healthy"
          : "Degraded",

      nodes: nodes.body.items.length,

      pods: pods.body.items.length,

      deployments:
        deployments.body.items.length,

      services:
        services.body.items.length,

      namespaces:
        namespaces.body.items.length,
    };
  } catch (error) {
    console.error("Kubernetes:", error);

    return {
      status: "Unavailable",
      nodes: 0,
      pods: 0,
      deployments: 0,
      services: 0,
      namespaces: 0,
    };
  }
}
