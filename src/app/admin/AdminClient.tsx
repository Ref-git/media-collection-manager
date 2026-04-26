"use client";

import { useState } from "react";
import type { MediaItem } from "@/lib/types";
import { deleteItemAction } from "./actions";
import MediaForm from "./MediaForm";
import styles from "./admin.module.css";

const TYPE_BADGE: Record<MediaItem["mediaType"], string> = {
  Audio: styles.badgeAudio,
  Video: styles.badgeVideo,
  Game: styles.badgeGame,
};

export default function AdminClient({ items }: { items: MediaItem[] }) {
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  function openNew() {
    setEditingItem(null);
    setShowForm(true);
  }

  function openEdit(item: MediaItem) {
    setEditingItem(item);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingItem(null);
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Admin — Media Collection</h1>
          <p className={styles.pageSubtitle}>{items.length} items</p>
        </div>
        <div className={styles.headerActions}>
          <a href="/" className={styles.btnLink}>
            ← View Collection
          </a>
          <button className={styles.btnPrimary} onClick={openNew}>
            + New Item
          </button>
        </div>
      </header>

      {showForm && (
        <MediaForm
          key={editingItem?._id ?? "new"}
          item={editingItem ?? undefined}
          onSuccess={closeForm}
          onCancel={closeForm}
        />
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Type</th>
              <th>Platform</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>
                  No items yet. Create one above.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item._id} className={editingItem?._id === item._id ? styles.rowEditing : ""}>
                <td className={styles.cellTitle}>{item.title}</td>
                <td>{item.publisher}</td>
                <td>{item.releaseYear ?? "—"}</td>
                <td>
                  <span className={`${styles.badge} ${TYPE_BADGE[item.mediaType]}`}>
                    {item.mediaType}
                  </span>
                </td>
                <td>{item.platform}</td>
                <td className={styles.cellActions}>
                  <button
                    className={styles.btnEdit}
                    onClick={() => openEdit(item)}
                  >
                    Edit
                  </button>
                  <form
                    action={deleteItemAction}
                    onSubmit={(e) => {
                      if (!confirm(`Delete "${item.title}"?`)) e.preventDefault();
                    }}
                    style={{ display: "inline" }}
                  >
                    <input type="hidden" name="id" value={item._id} />
                    <button type="submit" className={styles.btnDelete}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
