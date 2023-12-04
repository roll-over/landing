import db from "$lib/db";
import { upsertCity, upsertCountry } from "$lib/db/location";
import type { Company } from "$lib/types/crm";
import { uuid } from "uuidv4";

export async function POST(event) {
  const company = await event.request.json();
  const session = await event.locals.getSession();

  const countryId = await upsertCountry(company.mainAddress.country, event.params.lang);
  const cityId = await upsertCity(company.mainAddress.city, countryId, event.params.lang);
  const companyId = uuid();
  await (await db())
    .collection("companies")
    .insertOne({
      ...company,
      id: companyId,
      owner: session.user.email,
      createdAt: new Date().toISOString(),
      workingHours: {},
      contacts: [],
      mainAddress: {
        country: countryId,
        city: cityId,
      },
    } as Company);
  return new Response(JSON.stringify({ id: companyId }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const company = await event.request.json();
  const session = await event.locals.getSession();

  const companyId = event.params.companyId;
  const userCompanies = await (await db())
    .collection("companies")
    .find({ owner: session.user.email })
    .toArray();

  const isExist = userCompanies.find((company) => company.id === companyId);
  if (!isExist) {
    return new Response("Not found", { status: 404 });
  }
  const countryId = await upsertCountry(company.mainAddress.country, event.params.lang);
  const cityId = await upsertCity(company.mainAddress.city, countryId, event.params.lang);

  await (await db())
    .collection("companies")
    .updateOne(
      {
        owner: session.user.email,
        id: companyId,
      },
      {
        $set: {
          ...company,
          mainAddress: {
            country: countryId,
            city: cityId,
            street: company.mainAddress.street,
            house: company.mainAddress.house,
          },
        },
      },
    );
  return new Response(JSON.stringify(company), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(event) {
  const session = await event.locals.getSession();
  const companyId = event.params.companyId;
  const userCompanies = await (await db())
    .collection("companies")
    .find({ owner: session.user.email })
    .toArray();

  const isExist = userCompanies.find((company) => company.id === companyId);
  if (!isExist) {
    return new Response("Not found", { status: 404 });
  }

  await (await db()).collection("companies").deleteOne({
    owner: session.user.email,
    id: companyId,
  });
  return new Response("OK", {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
