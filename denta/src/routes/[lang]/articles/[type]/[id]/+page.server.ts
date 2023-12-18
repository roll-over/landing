


import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  if (!["crm", "services"].includes(event.params.type)) {
    throw error(404, "Page not found");
  }

  const article = await (await db()).collection("articles").findOne(
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
      },
      sort: {
        createdAt: -1,
      },
    },
  );

  if (!article) {
    throw error(404, "Page not found");
  }

  return {
    article: {
      ...article,
      title: await t(article.title, article.lang || "ru", event.params.lang),
      description: await t(article.description, article.lang || "ru", event.params.lang),
      source: await t(article.source, article.lang || "ru", event.params.lang),
    },
  };
};
