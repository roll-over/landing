import db from "$lib/db";
import type { PriceListItem, Service } from "$lib/types/crm";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const appointments = await (
    await db()
  )
    .collection("appointments")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const clients = await (
    await db()
  )
    .collection("clients")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const employees = await (
    await db()
  )
    .collection("employees")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const cabinets = await (
    await db()
  )
    .collection("cabinets")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const company = await (await db()).collection("companies").findOne(
    {
      owner: session.user.email,
      id: event.params.companyId,
    },
    { projection: { _id: 0 } },
  );

  const priceList = (await (
    await db()
  )
    .collection("price-list")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray()) as PriceListItem[];

  const services = (await (
    await db()
  )
    .collection("services")
    .find({}, { projection: { _id: 0 } })
    .toArray()) as Service[];

  return {
    appointments,
    clients,
    employees,
    cabinets,
    company,
    priceList,
    services
  };
};
