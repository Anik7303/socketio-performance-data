export interface PerformanceData {
  macAddress: string;
  uptime: number;
  cpuModel: string;
  cpuSpeed: number;
  cpuLoad: number;
  numOfCores: number;
  freeMemory: number;
  usedMemory: number;
  totalMemory: number;
  memoryUsage: number;
}

export interface CPUTimesData {
  idle: number;
  total: number;
}
