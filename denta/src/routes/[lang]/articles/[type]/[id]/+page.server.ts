import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  if (!["crm", "services"].includes(event.params.type)) {
    throw error(404, "Page not found");
  }

  const _db = await db();
  const session = await event.locals.getSession();

  if (!_db) {
    throw error(500, "Database connection failed");
  }

  const article = await _db.collection("articles").findOne(
    {
      type: event.params.type,
      publicId: event.params.id,
    },
    {
      projection: {
        _id: 0,
        publicId: 1,
        title: 1,
        source: 1,
        faqs: 1,
        description: 1,
        createdAt: 1,
        lang: 1,
        views: 1,
      },
      sort: {
        createdAt: -1,
      },
    },
  );

  if (!article) {
    throw error(404, "Page not found");
  }

  await _db.collection("views").insertOne({
    type: "article",
    publicId: article.publicId,
    createdAt: new Date(),
    email: session?.user?.email,
  });

  const views = await _db.collection("views").countDocuments({
    type: "article",
    publicId: article.publicId,
  });

  await _db.collection("articles").updateOne(
    {
      type: event.params.type,
      publicId: event.params.id,
    },
    {
      $set: {
        views,
      },
    },
  );

  return {
    article: {
      ...article,
      title: await t(article.title, article.lang || "ru", event.params.lang),
      description: await t(article.description, article.lang || "ru", event.params.lang),
      source: await t(article.source, article.lang || "ru", event.params.lang),
    },
  };
};
