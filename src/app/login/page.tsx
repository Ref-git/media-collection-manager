"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import styles from "./auth.module.css";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in to Shelf</h1>

        <form action={action} className={styles.form}>
          {state?.error && (
            <p className={styles.error} role="alert">
              {state.error}
            </p>
          )}

          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            className={styles.btnPrimary}
            type="submit"
            disabled={pending}
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className={styles.switchLink}>
          No account?{" "}
          <Link href="/signup">Create one</Link>
        </p>
      </div>
    </main>
  );
}
