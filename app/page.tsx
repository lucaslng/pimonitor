import Details from "./details";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic'

export default async function Home() {
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Raspberry Pi</h1>
        <Details></Details>
      </main>
    </div>
  );
}