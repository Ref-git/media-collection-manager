"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ModeBanner.module.css";

function ShelfMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="28"
      height="28"
      role="img"
      aria-hidden="true"
      className={styles.brandMark}
    >
      <path
        d="M18 14 L10 14 L10 50 L18 50"
        stroke="#C2410C"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M46 14 L54 14 L54 50 L46 50"
        stroke="#C2410C"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="32" r="5" fill="#C2410C" />
    </svg>
  );
}

export default function ModeBanner() {
  const pathname = usePathname();
  const isEditing = pathname.startsWith("/admin");

  return (
    <nav className={styles.banner}>
      <Link href="/" className={styles.brand}>
        <ShelfMark />
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
