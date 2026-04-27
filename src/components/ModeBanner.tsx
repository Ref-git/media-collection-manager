"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ModeBanner.module.css";

export default function ModeBanner() {
  const pathname = usePathname();
  const isEditing = pathname.startsWith("/admin");

  return (
    <nav className={styles.banner}>
      <Link href="/" className={styles.brand}>
        <img src="/shelf-mark.svg" width={28} height={28} alt="" aria-hidden className={styles.brandMark} />
        <span className={styles.brandName}>Shelf</span>
      </Link>
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
