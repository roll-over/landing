import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  if (!["crm", "services"].includes(event.params.type)) {
    throw error(404, "Page not found");
  }

  const articles =
    (await (
      await db()
    )
      .collection("articles")
      .find(
        {
          type: event.params.type,
        },
        {
          projection: {
            _id: 0,
            publicId: 1,
            title: 1,
            description: 1,
            createdAt: 1,
          },
          sort: {
            createdAt: -1,
          },
        },
      )
      .toArray()) || [];

  return {
    articles,
  };
};
