import { getAppParams } from "$lib/app_name";
import db from "$lib/db";
import type { PriceListItem, Service } from "$lib/types/crm";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!getAppParams().availabilities.appointments) {
    throw redirect(301, `/${event.params.lang}/crm/`);
  }

  const session = await event.locals.getSession();

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const appointments = await _db
    .collection("appointments")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const clients = await _db
    .collection("clients")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const employees = await _db
    .collection("employees")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const cabinets = await _db
    .collection("cabinets")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const company = await _db.collection("companies").findOne(
    {
      owner: session.user.email,
      id: event.params.companyId,
    },
    { projection: { _id: 0 } },
  );

  const priceList = (await _db
    .collection("price-list")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray()) as PriceListItem[];

  const services = (await _db
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
    services,
  };
};
