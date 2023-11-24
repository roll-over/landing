import db from "$lib/db";
import { useAdminGuard } from "$lib/guards/admin";
import type { NewMessage } from "./types";

export async function POST(event) {
  const result = await useAdminGuard(event);
  if (result) {
    return result;
  }

  const newMessage: NewMessage = await event.request.json();

  db.collection("supportChat").insertOne({
    projectId: newMessage.projectId,
    userId: newMessage.userId,
    ...newMessage.message,
    lang: "ru",
    author: "support",
    date: new Date(),
  });

  return new Response("OK");
}
