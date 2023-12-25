import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
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

  if (companies.length >= 1) {
    throw redirect(302, `/${event.params.lang}/crm/${companies[0].id}/`);
  } else {
    throw redirect(302, `/${event.params.lang}/crm/info/`);
  }
};
