import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw error(500, "Database connection error");
  }

  const countries = (
    await _db
      .collection("countries")
      .find(
        {
          searchHidden: { $ne: true },
        },
        {
          projection: {
            _id: 0,
            id: 1,
            [event.params.lang]: 1,
          },
          sort: {
            priority: -1,
          },
        },
      )
      .toArray()
  ).map((country) => ({
    value: country.id,
    label: country[event.params.lang] || country.id,
  }));

  return {
    countries,
    lang: event.params.lang,
  };
};
