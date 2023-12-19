import db from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { uuid } from "uuidv4";

export const POST = async (event) => {
  const newAnounce = await event.request.json();

  const _db = await db();
  if (!_db) {
    throw Error("No database connection");
  }

  await _db.collection("anounces").insertOne({
    ...newAnounce,
    createdAt: new Date(),
    type: "its-open-mic",
    id: uuid(),
  });

  return json({ status: "ok" });
};

export const PUT = async (event) => {
  const newAnounce = await event.request.json();
  const _db = await db();
  if (!_db) {
    throw Error("No database connection");
  }

  await _db.collection("anounces").updateOne(
    {
      id: newAnounce.id,
    },
    {
      $set: newAnounce,
    },
  );

  return json({ status: "ok" });
};
