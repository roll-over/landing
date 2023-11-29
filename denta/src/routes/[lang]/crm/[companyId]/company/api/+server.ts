import db from "$lib/db";
import { makeTranscribationFromRuToEn } from "$lib/transcribation";
import type { Company } from "$lib/types/crm";
import { uuid } from "uuidv4";

export async function POST(event) {
  const company = await event.request.json();
  const session = await event.locals.getSession();

  const country = await db().collection("countries").findOne({
    id: company.mainAddress.country,
  });

  const countryId = country?.id || makeTranscribationFromRuToEn(company.mainAddress.country);
  if (!country) {
    await db()
      .collection("countries")
      .updateOne(
        {
          id: countryId,
        },
        {
          $set: {
            id: countryId,
            [event.params.lang]: company.mainAddress.country,
          },
        },
        {
          upsert: true,
        },
      );
  }

  const city = await db().collection("cities").findOne({
    id: company.mainAddress.city,
  });
  if (!city) {
    await db()
      .collection("cities")
      .insertOne({
        id: makeTranscribationFromRuToEn(company.mainAddress.city),
        [event.params.lang]: company.mainAddress.city,
        countryId: countryId,
      });
  }
  const companyId = uuid();
  await db()
    .collection("companies")
    .insertOne({
      ...company,
      id: companyId,
      owner: session.user.email,
      createdAt: new Date().toISOString(),
      workingHours: {},
      contacts: [],
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
  const userCompanies = await db()
    .collection("companies")
    .find({ owner: session.user.email })
    .toArray();

  const isExist = userCompanies.find((company) => company.id === companyId);
  if (!isExist) {
    return new Response("Not found", { status: 404 });
  }

  await db().collection("companies").updateOne(
    {
      owner: session.user.email,
      id: companyId,
    },
    {
      $set: company,
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
  const userCompanies = await db()
    .collection("companies")
    .find({ owner: session.user.email })
    .toArray();

  const isExist = userCompanies.find((company) => company.id === companyId);
  if (!isExist) {
    return new Response("Not found", { status: 404 });
  }

  await db().collection("companies").deleteOne({
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
