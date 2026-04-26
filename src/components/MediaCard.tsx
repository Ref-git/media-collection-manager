import type { MediaItem } from "@/lib/types";
import styles from "./MediaCard.module.css";

const TYPE_LABELS: Record<MediaItem["mediaType"], string> = {
  Audio: "Audio",
  Video: "Video",
  Game: "Game",
};

export default function MediaCard({ item }: { item: MediaItem }) {
  return (
    <article className={`${styles.card} ${styles[item.mediaType.toLowerCase()]}`}>
      <span className={styles.badge}>{TYPE_LABELS[item.mediaType]}</span>
      <h2 className={styles.title}>{item.title}</h2>
      <p className={styles.publisher}>{item.publisher}</p>
      <div className={styles.meta}>
        <span className={styles.platform}>{item.platform}</span>
        {item.releaseYear && (
          <span className={styles.year}>{item.releaseYear}</span>
        )}
      </div>
    </article>
  );
}
