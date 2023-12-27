import db from "$lib/db";
import { json } from "@sveltejs/kit";

export const DELETE = async (event) => {
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  await _db.collection("contracts-notifications").deleteOne({
    companyId: event.params.companyId,
    id: event.params.id,
  });

  return json({ status: "ok" });
};
