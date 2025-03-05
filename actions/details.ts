"use server";

import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

const execAsync = promisify(exec);

export type DetailsType = {
  uptime: number;
  cpuTemp: number;
  cpuUsage: number[];
  memoryUsage: {
    total: number;
    used: number;
    free: number;
  };
};

function getCpuUsage(interval: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const start = os.cpus().map((cpu) => ({
      idle: cpu.times.idle,
      total: Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0),
    }));

    setTimeout(() => {
      const end = os.cpus().map((cpu) => ({
        idle: cpu.times.idle,
        total: Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0),
      }));

      if (!end || end.length !== start.length) {
        return reject(new Error("Failed to retrieve CPU usage data"));
      }

      const usage = start.map((s, i) => {
        if (!end[i]) return 0;
        const idleDiff = end[i].idle - s.idle;
        const totalDiff = end[i].total - s.total;
        return totalDiff > 0 ? 100 - (100 * idleDiff) / totalDiff : 0;
      });

      resolve(usage);
    }, interval);
  });
}

async function getCpuTemp() {
  const path = "/sys/class/thermal/thermal_zone0/temp";
  if (existsSync(path)) {
    const temp = (await execAsync("cat " + path)).stdout;
    return parseInt(temp) / 1000;
  }
  return 69.42069;
}

function bytesToGB(bytes: number) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

export async function getSystemDetails(interval = 1000): Promise<DetailsType> {
  // await new Promise(r => setTimeout(r, 3000));

  const uptime = os.uptime();

  const cpuUsage = await getCpuUsage(interval);

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  const cpuTemp = await getCpuTemp();

  return {
    uptime,
    cpuTemp,
    cpuUsage,
    memoryUsage: {
      total: parseFloat(bytesToGB(totalMem)),
      used: parseFloat(bytesToGB(usedMem)),
      free: parseFloat(bytesToGB(freeMem)),
    },
  };
}
