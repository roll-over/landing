import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import Text1 from "./text1.md?raw";
import Text2 from "./text2.md?raw";
import Text3 from "./text3.md?raw";

export const load = async (event) => {
  const session = await event.locals.getSession();
  const _db = await db();

  if (!_db) {
    throw new Error("No db connection");
  }

  const companies = session
    ? await _db
        .collection("companies")
        .find(
          {
            owner: session.user.email,
          },
          { projection: { _id: 0 } },
        )
        .toArray()
    : [];

  return {
    companies: companies,
    texts: Promise.all(
      [Text1, Text2, Text3].map(async (_t) => {
        return await t(_t, "ru", event.params.lang);
      }),
    ),
  };
};
