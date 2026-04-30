"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "@/app/actions/auth";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import styles from "../login/auth.module.css";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction, undefined);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create an account</h1>

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
              autoComplete="new-password"
              required
              minLength={8}
            />
          </label>

          <label className={styles.label}>
            Confirm password
            <input
              className={styles.input}
              type="password"
              name="confirm"
              autoComplete="new-password"
              required
            />
          </label>

          <button
            className={styles.btnPrimary}
            type="submit"
            disabled={pending}
          >
            {pending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <GoogleSignInButton />

        <p className={styles.switchLink}>
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
