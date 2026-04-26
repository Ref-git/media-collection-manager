import { getMediaItems } from "@/lib/data";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const items = await getMediaItems();
  return <AdminClient items={items} />;
}
