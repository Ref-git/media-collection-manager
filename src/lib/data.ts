import { ObjectId, WithId } from "mongodb";
import dbClient from "./mongodb";
import type { MediaItem } from "./types";

type DocShape = Omit<MediaItem, "_id"> & { ownerId?: string };

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

export async function getMyMediaItems(ownerId: string): Promise<MediaItem[]> {
  const docs = await col().find({ ownerId }).sort({ _id: 1 }).toArray();
  return docs.map(toItem);
}

export async function getUnclaimedCount(): Promise<number> {
  return col().countDocuments({ ownerId: { $exists: false } });
}

export async function claimUnownedItems(ownerId: string): Promise<number> {
  const result = await col().updateMany(
    { ownerId: { $exists: false } },
    { $set: { ownerId } }
  );
  return result.modifiedCount;
}

export async function createMediaItem(
  data: Omit<MediaItem, "_id">,
  ownerId: string
): Promise<MediaItem> {
  const result = await col().insertOne({ ...data, ownerId });
  return { ...data, _id: result.insertedId.toString() } as MediaItem;
}

export async function updateMediaItem(
  id: string,
  data: Omit<MediaItem, "_id">,
  ownerId: string
): Promise<MediaItem | null> {
  const doc = await col().findOneAndUpdate(
    { _id: new ObjectId(id), ownerId },
    { $set: { ...data, ownerId } },
    { returnDocument: "after" }
  );
  if (!doc) return null;
  return toItem(doc);
}

export async function deleteMediaItem(
  id: string,
  ownerId: string
): Promise<boolean> {
  const result = await col().deleteOne({
    _id: new ObjectId(id),
    ownerId,
  });
  return result.deletedCount === 1;
}
