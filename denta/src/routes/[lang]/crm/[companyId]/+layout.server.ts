import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const company = await db()
    .collection("companies")
    .findOne(
      {
        owner: session.user.email,
        id: event.params.companyId,
      },
      { projection: { _id: 0 } },
    );

  if (!company) {
    throw redirect(301, "/ru/crm/");
  }

  console.log(company);

  return {
    company: company,
  };
};
