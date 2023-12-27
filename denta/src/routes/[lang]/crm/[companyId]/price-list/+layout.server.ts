import { getAppParams } from "$lib/app_name";
import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!getAppParams().availabilities.priceList) {
    throw redirect(301, `/${event.params.lang}/crm/`);
  }

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const priceList = await _db
    .collection("price-list")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  const services = await _db
    .collection("services")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  return {
    priceList: priceList.map((item) => {
      return {
        ...item,
        name: services.find((service) => service.id === item.serviceId)?.name,
      };
    }),
    services,
  };
};
