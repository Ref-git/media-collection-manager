import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";

export const verifySession = cache(
  async (): Promise<{ userId: string; email: string }> => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      redirect("/login");
    }

    return { userId: session.userId, email: session.email };
  }
);
