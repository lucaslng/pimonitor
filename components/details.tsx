"use client";

import { DetailsType, getSystemDetails } from "@/actions/details";
import { useState, useEffect } from "react";
import { convertUptime } from "../utils/convert_uptime";

export default function Details({
  initialDetails,
}: {
  initialDetails: DetailsType;
}) {
  const [details, setDetails] = useState(initialDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getSystemDetails();
        setDetails(details);
      } catch {
        clearInterval(interval);
      }
    };

    fetchData();

    const interval = setInterval(fetchData);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>cpu temp: {details.cpuTemp.toFixed(1)}°C</h2>
      <h2>
        uptime:{" "}
        {Object.entries(convertUptime(details.uptime))
          .map((value) => value[1].toString() + " " + value[0])
          .join(" ")}
      </h2>
      <h2>
        cpu usage:{" "}
        {(
          details.cpuUsage.reduce((sum, value) => sum + value, 0) /
          details.cpuUsage.length
        ).toFixed(1)}
        %
        <br />
        {details.cpuUsage
          .map((value) => {
            return value.toFixed(1) + "%";
          })
          .join(" ")}
      </h2>
      <h2>
        mem: {details.memoryUsage.used} / {details.memoryUsage.total}GB
      </h2>
    </div>
  );
}
