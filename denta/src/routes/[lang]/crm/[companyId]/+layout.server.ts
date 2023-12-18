import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();
  const _db = await db();
  if (!_db) {
    throw new Error("No db connection");
  }

  const company = session
    ? (await _db.collection("companies").findOne(
        {
          owner: session.user.email,
          id: event.params.companyId,
        },
        { projection: { _id: 0 } },
      )) || null
    : null;

  if (!company) {
    throw redirect(302, `/${event.params.lang}/crm/`);
  }

  return {
    company: company,
  };
};
