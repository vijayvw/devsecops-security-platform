import Docker from "dockerode";

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

export async function getDockerMetrics() {
  try {
    const containers = await docker.listContainers({
      all: true,
    });

    const running = containers.filter(
      (c) => c.State === "running"
    ).length;

    const stopped = containers.length - running;

    return {
      containers: containers.length,
      running,
      stopped,
    };
  } catch (error) {
    console.error("Docker metrics:", error);

    return {
      containers: 0,
      running: 0,
      stopped: 0,
    };
  }
}
