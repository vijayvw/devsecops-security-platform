import si from "systeminformation";
import { getDockerMetrics } from "./docker";
import { getClusterMetrics } from "./kubernetes";

export const infrastructureService = {
  async getOverview() {
    const [
      cpuLoad,
      memory,
      filesystem,
      os,
    ] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.time(),
    ]);

    const disk =
      filesystem.length > 0
        ? Math.round(filesystem[0].use)
        : 0;

    const uptimeHours = Math.floor(
      os.uptime / 3600
    );

    const days = Math.floor(
      uptimeHours / 24
    );

    const hours = uptimeHours % 24;

    return {
      cluster: await getClusterMetrics(),

      docker: await getDockerMetrics(),

      host: {
        cpu: Math.round(cpuLoad.currentLoad),
        memory: Math.round(
          (memory.used / memory.total) * 100
        ),
        disk,
        uptime: `${days}d ${hours}h`,
      },
    };
  },
};