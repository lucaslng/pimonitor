"use client";

import { getSystemDetails } from "@/actions/details";
import { useState, useEffect } from "react";

export default function Details() {
  const [data, setData] = useState({
    loadAvg: [0],
    uptime: 0,
    cpuTemp: 0,
    cpuUsage: [0],
    memoryUsage: {
      total: 0,
      used: 0,
      free: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const details = await getSystemDetails();
      setData(details);
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>cpu temp: {data.cpuTemp}°C</h2>
      <h2>uptime: {data.uptime}</h2>
      <h2>
        cpu usage:{" "}
        {data.cpuUsage
          .map((value) => {
            return value.toFixed(1) + "%";
          })
          .join(" ")}
      </h2>
      <h2>
        mem: {data.memoryUsage.used} / {data.memoryUsage.total}GB
      </h2>
    </div>
  );
}
