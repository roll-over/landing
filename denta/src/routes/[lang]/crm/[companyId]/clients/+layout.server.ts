import db from "$lib/db";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const clients = await db()
    .collection("clients")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  return {
    clients,
  };
};
