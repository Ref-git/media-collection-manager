"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ModeBanner.module.css";

export default function ModeBanner() {
  const pathname = usePathname();
  const isEditing = pathname.startsWith("/admin");

  return (
    <nav className={styles.banner}>
      <span className={styles.title}>My Media Collection</span>
      <div className={styles.toggle}>
        <Link
          href="/"
          className={`${styles.segment} ${!isEditing ? styles.segmentActive : ""}`}
        >
          Viewing
        </Link>
        <Link
          href="/admin"
          className={`${styles.segment} ${isEditing ? styles.segmentActive : ""}`}
        >
          Editing
        </Link>
      </div>
    </nav>
  );
}
