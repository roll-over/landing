import db from "$lib/db";
import { uuid } from "uuidv4";

export async function POST(event) {
  const priceListItem = await event.request.json();
  const session = await event.locals.getSession();
  const companyId = event.params.companyId;

  const userCompanies = await db()
    .collection("companies")
    .find({ owner: session.user.email })
    .toArray();

  const isExist = userCompanies.find((company) => company.id === companyId);
  if (!isExist) {
    return new Response("Not found", { status: 404 });
  }

  const service = await db().collection("services").findOne({
    name: priceListItem.name,
  });

  const serviceId = service?.id || uuid();

  if (!service?.id) {
    await db().collection("services").insertOne({
      name: priceListItem.name,
      id: serviceId,
      description: "",
    });
  }

  await db().collection("price-list").insertOne({
    id: uuid(),
    companyId: companyId,
    price: priceListItem.price,
    serviceId: serviceId,
  });
  return new Response(JSON.stringify(priceListItem), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const priceListItem = await event.request.json();
  const session = await event.locals.getSession();
  const companyId = event.params.companyId;
  const userCompanies = await db()
    .collection("companies")
    .find({ owner: session.user.email })
    .toArray();

  const isExist = userCompanies.find((company) => company.id === companyId);
  if (!isExist) {
    return new Response("Not found", { status: 404 });
  }

  await db().collection("price-list").updateOne(
    {
      companyId: companyId,
      id: priceListItem.id,
    },
    {
      $set: priceListItem,
    },
  );
  return new Response(JSON.stringify(priceListItem), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
