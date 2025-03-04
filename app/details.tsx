"use client";

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
    }
});

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const res = await fetch("/api/system");
      const data = await res.json();
      console.log(data);
      setData(data);
    };

    fetchData(); // Fetch initially

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>cpu temp: {data.cpuTemp}°C</h2>
      <h2>uptime: {data.uptime}</h2>
      <h2>cpu usage: {data.cpuUsage.map((value) => {return value.toFixed(1) + "%"}).join(" ")}</h2>
      <h2>mem: {data.memoryUsage.used} / {data.memoryUsage.total}GB</h2>
    </div>
  );
}
