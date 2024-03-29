import db from "$lib/db";
import { json, redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const anounce = await _db.collection("anounces").findOne(
    {
      id: event.params.id,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  if (!anounce) {
    throw redirect(302, `/admin/anounces/`);
  }

  return {
    anounce,
  };
};
