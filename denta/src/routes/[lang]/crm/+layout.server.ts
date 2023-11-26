import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const companies = await db()
    .collection("companies")
    .find(
      {
        owner: session.user.email,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  return {
    companies: companies,
  };
};
