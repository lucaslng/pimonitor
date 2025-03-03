import styles from "./page.module.css";
import { getSystemDetails } from "./backend/system";

export default async function Home() {
  const data = await getSystemDetails();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Raspberry Pi</h1>
        <h2>{data.cpuTemp}</h2>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}