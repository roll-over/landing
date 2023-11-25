import db from "$lib/db";
import { uuid } from "uuidv4";

export async function POST(event) {
  const company = await event.request.json();
  const session = await event.locals.getSession();

  await db()
    .collection("companies")
    .insertOne({
      ...company,
      id: uuid(),
      owner: session.user.email,
      createdAt: new Date().toISOString(),
    });
  return new Response(JSON.stringify(company), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const company = await event.request.json();
  const session = await event.locals.getSession();
  console.log(company);

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
