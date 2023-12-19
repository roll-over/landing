import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw error(404, "Page not found");
  }

  const anounces = await _db
    .collection("anounces")
    .find(
      {
        type: "its-open-mic",
      },
      {
        projection: {
          _id: 0,
        },
        sort: {
          date: -1,
        },
      },
    )
    .toArray();

  return {
    anounces,
  };
};
