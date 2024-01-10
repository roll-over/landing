import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  if (!["crm", "services"].includes(event.params.type)) {
    throw error(404, "Page not found");
  }
  const _db = await db();

  if (!_db) {
    throw error(500, "Database connection failed");
  }

  const articles =
    (await _db
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
            views: 1,
          },
          sort: {
            views: -1,
            createdAt: -1,
          },
        },
      )
      .toArray()) || [];

  return {
    articles: await Promise.all(
      articles.map(async (article) => {
        return {
          ...article,
          title: await t(article.title, article.lang || "ru", event.params.lang),
          description: await t(article.description, article.lang || "ru", event.params.lang),
        };
      }),
    ),
  };
};
