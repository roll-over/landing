import db from "$lib/db";
import { makeTranscribationFromRuToEn } from "$lib/transcribation";
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

  const country = await db().collection("countries").findOne({
    id: cabinet.address.country,
  });

  const countryId = country?.id || makeTranscribationFromRuToEn(cabinet.address.country);
  if (!country) {
    await db()
      .collection("countries")
      .insertOne({
        id: countryId,
        [event.params.lang]: cabinet.address.country,
      });
  }

  const city = await db().collection("cities").findOne({
    id: cabinet.address.city,
  });
  if (!city) {
    await db()
      .collection("cities")
      .insertOne({
        id: makeTranscribationFromRuToEn(cabinet.address.city),
        [event.params.lang]: cabinet.address.city,
        countryId: countryId,
      });
  }

  await db().collection("cabinets").updateOne(
    {
      companyId: companyId,
      id: cabinet.id,
    },
    {
      $set: cabinet,
    },
  );
  return new Response(JSON.stringify(cabinet), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
