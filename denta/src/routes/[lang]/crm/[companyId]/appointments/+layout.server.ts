import db from "$lib/db";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const appointments = await db()
    .collection("appointments")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const clients = await db()
    .collection("clients")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const employees = await db()
    .collection("employees")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const cabinets = await db()
    .collection("cabinets")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const company = await db()
    .collection("companies")
    .findOne(
      {
        owner: session.user.email,
        id: event.params.companyId,
      },
      { projection: { _id: 0 } },
    );

  return {
    appointments,
    clients,
    employees,
    cabinets,
    company
  };
};
