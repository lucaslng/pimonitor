"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [cpuTemp, setCpuTemp] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const res = await fetch("/api/system"); // Adjust the API route as needed
      const data = await res.json();
      console.log(data);
      setCpuTemp(data.cpuTemp);
    };

    fetchData(); // Fetch initially

    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Raspberry Pi</h1>
        <h2>{cpuTemp}</h2>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
