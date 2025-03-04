"use client";

import { getSystemDetails } from "@/backend/system";

export const dynamic = "force-dynamic";

export default async function Details() {
  const details = await getSystemDetails();
  return (
    <div>
      <h2>{details.cpuUsage}</h2>
      <h2>{details.cpuTemp}</h2>
    </div>
  );
}
