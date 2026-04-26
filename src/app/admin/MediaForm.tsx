"use client";

import { useState, useEffect, useActionState } from "react";
import type { MediaItem } from "@/lib/types";
import { saveItemAction } from "./actions";
import styles from "./admin.module.css";

export default function MediaForm({
  item,
  onSuccess,
  onCancel,
}: {
  item?: MediaItem;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [mediaType, setMediaType] = useState<MediaItem["mediaType"]>(
    item?.mediaType ?? "Audio"
  );
  const [platform, setPlatform] = useState<string>(item?.platform ?? "CD");
  const [state, formAction, pending] = useActionState(saveItemAction, {});

  useEffect(() => {
    if (state.success) onSuccess();
  }, [state.success, onSuccess]);

  function handleMediaTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newType = e.target.value as MediaItem["mediaType"];
    setMediaType(newType);
    if (newType === "Audio") setPlatform("CD");
    else if (newType === "Video") setPlatform("DVD");
    else setPlatform("");
  }

  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle}>
        {item ? "Edit Item" : "New Item"}
      </h2>
      <form action={formAction} className={styles.form}>
        {item && <input type="hidden" name="id" value={item._id} />}

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={item?.title}
              placeholder="e.g. Kind of Blue"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="publisher">Publisher *</label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              required
              defaultValue={item?.publisher}
              placeholder="e.g. Columbia Records"
            />
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="releaseYear">Release Year</label>
            <input
              id="releaseYear"
              name="releaseYear"
              type="number"
              min={1900}
              max={new Date().getFullYear() + 5}
              defaultValue={item?.releaseYear}
              placeholder="e.g. 1982"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="mediaType">Media Type *</label>
            <select
              id="mediaType"
              name="mediaType"
              value={mediaType}
              onChange={handleMediaTypeChange}
            >
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
              <option value="Game">Game</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="platform">Platform *</label>
            {mediaType === "Audio" && (
              <>
                <input type="hidden" name="platform" value="CD" />
                <input id="platform" type="text" value="CD" disabled />
              </>
            )}
            {mediaType === "Video" && (
              <select
                id="platform"
                name="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="DVD">DVD</option>
                <option value="BluRay">Blu-ray</option>
              </select>
            )}
            {mediaType === "Game" && (
              <input
                id="platform"
                name="platform"
                type="text"
                required
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="e.g. PlayStation 5, PC, Nintendo Switch"
              />
            )}
          </div>
        </div>

        {state.error && (
          <p className={styles.errorMsg}>{state.error}</p>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={pending}>
            {pending ? "Saving…" : item ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onCancel}
            disabled={pending}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
