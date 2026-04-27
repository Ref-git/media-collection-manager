import bcrypt from "bcryptjs";
import { ObjectId, WithId } from "mongodb";
import dbClient from "./mongodb";

type UserDoc = {
  email: string;
  passwordHash: string;
  createdAt: Date;
};

function col() {
  return dbClient.db("media_collection").collection<UserDoc>("users");
}

export async function createUser(
  email: string,
  password: string
): Promise<string> {
  const passwordHash = await bcrypt.hash(password, 12);
  const result = await col().insertOne({
    email: email.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date(),
  });
  return result.insertedId.toString();
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<{ id: string; email: string } | null> {
  const user: WithId<UserDoc> | null = await col().findOne({
    email: email.toLowerCase().trim(),
  });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return { id: user._id.toString(), email: user.email };
}

export async function emailExists(email: string): Promise<boolean> {
  const user = await col().findOne({ email: email.toLowerCase().trim() });
  return !!user;
}

export async function ensureIndexes(): Promise<void> {
  await col().createIndex({ email: 1 }, { unique: true });
}

export async function getUserById(
  id: string
): Promise<{ id: string; email: string } | null> {
  try {
    const user = await col().findOne({ _id: new ObjectId(id) });
    if (!user) return null;
    return { id: user._id.toString(), email: user.email };
  } catch {
    return null;
  }
}
