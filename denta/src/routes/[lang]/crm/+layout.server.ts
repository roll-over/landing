import db from "$lib/db";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const companies = session
    ? await db()
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
  };
};
