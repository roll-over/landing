import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const companies = session
    ? await (await db())
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
    throw redirect(301, `/ru/crm/${companies[0].id}/`);
  }
};
