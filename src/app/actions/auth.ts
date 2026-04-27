"use server";

import { redirect } from "next/navigation";
import { createUser, verifyCredentials, emailExists } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";

export type AuthState = { error?: string } | undefined;

export async function signupAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!email || !password) return { error: "Email and password are required." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords do not match." };
  if (await emailExists(email))
    return { error: "An account with that email already exists." };

  const userId = await createUser(email, password);
  await createSession(userId, email);
  redirect("/admin");
}

export async function loginAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email and password are required." };

  const user = await verifyCredentials(email, password);
  if (!user) return { error: "Invalid email or password." };

  await createSession(user.id, user.email);
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
