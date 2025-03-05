import { Suspense } from "react";
import styles from "./page.module.css";
import Loading from "./loading";
import DetailsWrapper from "@/components/details_wrapper";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Raspberry Pi</h1>
        <Suspense fallback={<Loading />}>
          <DetailsWrapper />
        </Suspense>
      </main>
    </div>
  );
}
