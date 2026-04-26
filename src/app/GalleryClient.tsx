"use client";

import { useState } from "react";
import type { MediaItem } from "@/lib/types";
import MediaCard from "@/components/MediaCard";
import styles from "./page.module.css";

type Filter = "All" | MediaItem["mediaType"];
const FILTERS: Filter[] = ["All", "Audio", "Video", "Game"];

export default function GalleryClient({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? items : items.filter((i) => i.mediaType === filter);

  return (
    <>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className={styles.empty}>Nothing on the shelf yet.</p>
      ) : (
        <section className={styles.grid}>
          {visible.map((item) => (
            <MediaCard key={item._id} item={item} />
          ))}
        </section>
      )}
    </>
  );
}
