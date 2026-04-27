import { getMyMediaItems, getUnclaimedCount } from "@/lib/data";
import { verifySession } from "@/lib/dal";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const { userId } = await verifySession();
  const [items, unclaimedCount] = await Promise.all([
    getMyMediaItems(userId),
    getUnclaimedCount(),
  ]);
  return <AdminClient items={items} unclaimedCount={unclaimedCount} />;
}
