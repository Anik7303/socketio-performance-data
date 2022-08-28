interface PerformanceData {
  macAddress: string;
  uptime: number;
  freeMemory: number;
  usedMemory: number;
  totalMemory: number;
  cpuModel: string;
  cpuSpeed: number;
  cpuLoad: number;
  numOfCores: number;
}

export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  performanceData: (data: PerformanceData) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
