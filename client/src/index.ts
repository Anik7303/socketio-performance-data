import os, { CpuInfo, NetworkInterfaceInfo } from "os";
import { CPUTimesData, PerformanceData } from "./interfaces/data";

function getMacAddress() {
  const nIs = os.networkInterfaces();

  const networkInterfaces = Object.values(nIs).reduce(
    (arr: NetworkInterfaceInfo[], curr) => [...arr, ...curr!],
    []
  );

  const macAddress = networkInterfaces.reduce(
    (mac: string, curr: NetworkInterfaceInfo) =>
      curr.internal ? mac : curr.mac,
    ""
  );
  return macAddress.toUpperCase();
}

function getCPUTimesData() {
  const cpus = os.cpus();
  const data: CPUTimesData = cpus.reduce(
    (prev: CPUTimesData, { times }: CpuInfo) => {
      const idle = times.idle;
      const total = idle + times.irq + times.nice + times.sys + times.user;
      return {
        idle: prev.idle + idle,
        total: prev.total + total,
      };
    },
    { idle: 0, total: 0 }
  );
  return data;
}

async function getCPULoad(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const startData = getCPUTimesData();
      setTimeout(() => {
        const endData = getCPUTimesData();
        const idleDelta = endData.idle - startData.idle;
        const totalDelta = endData.total - startData.total;
        const load = 100 - Math.floor((idleDelta / totalDelta) * 100);
        resolve(load);
      }, 100);
    } catch (err) {
      reject(err);
    }
  });
}

async function getPerformanceData(): Promise<PerformanceData> {
  const uptime = os.uptime();

  const cpus = os.cpus();
  const { model: cpuModel, speed: cpuSpeed } = cpus[0];
  const numOfCores = cpus.length;

  const macAddress = getMacAddress();

  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = Math.floor((usedMemory / totalMemory) * 10000) / 100.0;

  const cpuLoad = await getCPULoad();

  return {
    macAddress,
    uptime,
    cpuLoad,
    cpuModel,
    cpuSpeed,
    numOfCores,
    freeMemory,
    usedMemory,
    totalMemory,
    memoryUsage,
  };
}
