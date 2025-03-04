import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function getCpuUsage(): string[] {
	const cpus = os.cpus();
	return cpus.map((cpu) => {
		const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
		const usage = 100 - (100 * cpu.times.idle) / total;
		return usage.toFixed(1);
	});
}

async function getCpuTemp() {
	const temp = (await execAsync("cat /sys/class/thermal/thermal_zone0/temp")).stdout;
	return parseInt(temp) / 1000;
}

function bytesToGB(bytes: number) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

export async function getSystemDetails() {
	const loadAvg = os.loadavg();
	const uptime = os.uptime();

  const cpuUsage = getCpuUsage();

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
 
  const cpuTemp = await getCpuTemp();
	
  return {
		loadAvg,
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