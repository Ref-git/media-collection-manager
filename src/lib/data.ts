import { ObjectId, WithId } from "mongodb";
import dbClient from "./mongodb";
import type { MediaItem } from "./types";

type DocShape = Omit<MediaItem, "_id">;

function col() {
  return dbClient.db("media_collection").collection<DocShape>("items");
}

function toItem(doc: WithId<DocShape>): MediaItem {
  return { ...doc, _id: doc._id.toString() } as MediaItem;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  const docs = await col().find().sort({ _id: 1 }).toArray();
  return docs.map(toItem);
}

export async function createMediaItem(
  data: DocShape
): Promise<MediaItem> {
  const result = await col().insertOne({ ...data });
  return { ...data, _id: result.insertedId.toString() } as MediaItem;
}

export async function updateMediaItem(
  id: string,
  data: DocShape
): Promise<MediaItem | null> {
  const doc = await col().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: "after" }
  );
  if (!doc) return null;
  return toItem(doc);
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const result = await col().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
