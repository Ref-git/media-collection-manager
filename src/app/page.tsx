import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { getMediaItems } from "@/lib/data";
import GalleryClient from "./GalleryClient";
import styles from "./page.module.css";

export default async function Home() {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);
  if (!session?.email) redirect("/login");
  const items = await getMediaItems();
  const audioCount = items.filter((i) => i.mediaType === "Audio").length;
  const videoCount = items.filter((i) => i.mediaType === "Video").length;
  const gameCount = items.filter((i) => i.mediaType === "Game").length;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Media Collection</h1>
        <p className={styles.subtitle}>
          {items.length} {items.length === 1 ? "item" : "items"}
          {items.length > 0 && (
            <>
              {" · "}
              {audioCount} audio · {videoCount} video · {gameCount} game
            </>
          )}
        </p>
      </header>
      <GalleryClient items={items} />
    </main>
  );
}
