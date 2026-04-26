"use server";

import { createMediaItem, updateMediaItem, deleteMediaItem } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { MediaItem } from "@/lib/types";

export type FormState = { error?: string; success?: boolean };

export async function saveItemAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string)?.trim();
  const publisher = (formData.get("publisher") as string)?.trim();
  const releaseYearRaw = (formData.get("releaseYear") as string)?.trim();
  const mediaType = formData.get("mediaType") as MediaItem["mediaType"];
  const platform = (formData.get("platform") as string)?.trim();

  if (!title) return { error: "Title is required." };
  if (!publisher) return { error: "Publisher is required." };
  if (!["Audio", "Video", "Game"].includes(mediaType))
    return { error: "Invalid media type." };
  if (!platform) return { error: "Platform is required." };

  const releaseYear = releaseYearRaw ? parseInt(releaseYearRaw, 10) : undefined;
  if (releaseYearRaw && isNaN(releaseYear!))
    return { error: "Release year must be a valid number." };

  const data = {
    title,
    publisher,
    mediaType,
    platform,
    ...(releaseYear !== undefined && { releaseYear }),
  } as Omit<MediaItem, "_id">;

  try {
    if (id) {
      const updated = await updateMediaItem(id, data);
      if (!updated) return { error: "Item not found." };
    } else {
      await createMediaItem(data);
    }
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function deleteItemAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await deleteMediaItem(id);
  revalidatePath("/admin");
  revalidatePath("/");
}
