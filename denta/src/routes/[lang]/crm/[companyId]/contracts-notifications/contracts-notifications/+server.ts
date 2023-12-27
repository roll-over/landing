import db from "$lib/db";
import { json } from "@sveltejs/kit";
import { uuid } from "uuidv4";

export const POST = async (event) => {
  const formData = await event.request.json();

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  await _db.collection("contracts-notifications").insertOne({
    ...formData,
    companyId: event.params.companyId,
    id: uuid(),
  });

  return json({ status: "ok" });
};

export const PUT = async (event) => {
  const formData = await event.request.json();
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  await _db.collection("contracts-notifications").updateOne(
    {
      companyId: event.params.companyId,
      id: formData.id,
    },
    {
      $set: formData,
    },
  );

  return json({ status: "ok" });
};
