import db from "$lib/db";
import type { PriceListItem, Service } from "$lib/types/crm";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const priceList = (await (await db())
    .collection("price-list")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray()) as PriceListItem[];

  const services = (await (await db())
    .collection("services")
    .find({}, { projection: { _id: 0 } })
    .toArray()) as Service[];

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
