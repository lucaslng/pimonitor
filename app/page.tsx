import { Suspense } from "react";
import styles from "./page.module.css";
import DetailsWrapper from "@/components/details_wrapper";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Raspberry Pi</h1>
        <Suspense fallback=<h2>Loading...</h2>>
          <DetailsWrapper />
        </Suspense>
      </main>
    </div>
  );
}
