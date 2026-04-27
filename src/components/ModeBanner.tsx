"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import styles from "./ModeBanner.module.css";

export default function ModeBanner({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const isEditing = pathname.startsWith("/admin");

  return (
    <nav className={styles.banner}>
      <Link href="/" className={styles.brand}>
        <img
          src="/shelf-mark.svg"
          width={28}
          height={28}
          alt=""
          aria-hidden
          className={styles.brandMark}
        />
        <span className={styles.brandName}>Shelf</span>
      </Link>

      {userEmail ? (
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
      ) : null}

      <div className={styles.userArea}>
        {userEmail ? (
          <>
            <span className={styles.userEmail}>{userEmail}</span>
            <form action={logoutAction}>
              <button type="submit" className={styles.btnLogout}>
                Sign out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className={styles.btnLogin}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
