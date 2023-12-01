import db from "$lib/db";
import { upsertCity, upsertCountry } from "$lib/db/location";
import { uuid } from "uuidv4";

export async function POST(event) {
  const employee = await event.request.json();
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

  await db().collection("cabinets").insertOne({
    name: "New Cabinet",
    contacts: [],
    id: uuid(),
    companyId: companyId,
    createdAt: new Date().toISOString(),
    address: {},
  });
  return new Response(JSON.stringify(employee), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const cabinet = await event.request.json();
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

  const countryId = await upsertCountry(cabinet.address.country, event.params.lang);
  const cityId = await upsertCity(cabinet.address.city, countryId, event.params.lang);

  await db()
    .collection("cabinets")
    .updateOne(
      {
        companyId: companyId,
        id: cabinet.id,
      },
      {
        $set: {
          ...cabinet,
          address: {
            ...cabinet.address,
            country: countryId,
            city: cityId,
          },
        },
      },
    );
  return new Response(JSON.stringify(cabinet), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
