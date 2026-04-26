"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { MediaItem } from "@/lib/types";
import { saveItemAction } from "./actions";
import styles from "./admin.module.css";

type FormValues = {
  title: string;
  publisher: string;
  releaseYear: number;
  mediaType: MediaItem["mediaType"];
  platform: string;
};

export default function MediaForm({
  item,
  onSuccess,
  onCancel,
}: {
  item?: MediaItem;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [serverError, setServerError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: item?.title ?? "",
      publisher: item?.publisher ?? "",
      releaseYear: item?.releaseYear,
      mediaType: item?.mediaType ?? "Audio",
      platform: item?.platform ?? "CD",
    },
  });

  const mediaType = watch("mediaType");

  useEffect(() => {
    if (mediaType === "Audio") setValue("platform", "CD");
    else if (mediaType === "Video") setValue("platform", "DVD");
    else setValue("platform", "");
  }, [mediaType, setValue]);

  async function onSubmit(data: FormValues) {
    setServerError(undefined);
    const formData = new FormData();
    if (item) formData.set("id", item._id);
    formData.set("title", data.title);
    formData.set("publisher", data.publisher);
    if (data.releaseYear && !isNaN(data.releaseYear))
      formData.set("releaseYear", String(data.releaseYear));
    formData.set("mediaType", data.mediaType);
    formData.set("platform", data.platform);

    const result = await saveItemAction({}, formData);
    if (result.success) onSuccess();
    else setServerError(result.error);
  }

  const maxYear = new Date().getFullYear() + 5;

  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle}>{item ? "Edit Item" : "New Item"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Kind of Blue"
              {...register("title", { required: "Title is required." })}
            />
            {errors.title && (
              <span className={styles.fieldError}>{errors.title.message}</span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="publisher">Publisher *</label>
            <input
              id="publisher"
              type="text"
              placeholder="e.g. Columbia Records"
              {...register("publisher", { required: "Publisher is required." })}
            />
            {errors.publisher && (
              <span className={styles.fieldError}>
                {errors.publisher.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="releaseYear">Release Year</label>
            <input
              id="releaseYear"
              type="number"
              placeholder="e.g. 1982"
              {...register("releaseYear", {
                valueAsNumber: true,
                min: { value: 1900, message: "Year must be 1900 or later." },
                max: {
                  value: maxYear,
                  message: `Year cannot exceed ${maxYear}.`,
                },
              })}
            />
            {errors.releaseYear && (
              <span className={styles.fieldError}>
                {errors.releaseYear.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="mediaType">Media Type *</label>
            <select id="mediaType" {...register("mediaType")}>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
              <option value="Game">Game</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="platform">Platform *</label>
            {mediaType === "Audio" && (
              <select id="platform" {...register("platform")}>
                <option value="CD">CD</option>
                <option value="Digital">Digital</option>
              </select>
            )}
            {mediaType === "Video" && (
              <select id="platform" {...register("platform")}>
                <option value="DVD">DVD</option>
                <option value="BluRay">Blu-ray</option>
                <option value="Digital">Digital</option>
              </select>
            )}
            {mediaType === "Game" && (
              <input
                id="platform"
                type="text"
                placeholder="e.g. PlayStation 5, PC, Nintendo Switch"
                {...register("platform", {
                  required: "Platform is required.",
                })}
              />
            )}
            {errors.platform && (
              <span className={styles.fieldError}>
                {errors.platform.message}
              </span>
            )}
          </div>
        </div>

        {serverError && <p className={styles.errorMsg}>{serverError}</p>}

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving…" : item ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
