import { getMediaItems } from "@/lib/data";
import MediaCard from "@/components/MediaCard";
import styles from "./page.module.css";

export default async function Home() {
  const items = await getMediaItems();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Media Collection</h1>
        <p className={styles.count}>{items.length} items</p>
      </header>
      <section className={styles.grid}>
        {items.map((item) => (
          <MediaCard key={item._id} item={item} />
        ))}
      </section>
    </main>
  );
}
