import styles from "./page.module.css";

export default async function Loading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Loading...</h1>
      </main>
    </div>
  );
}
