import db from "$lib/db";
import { uuid } from "uuidv4";

export async function POST(event) {
  const clients = await event.request.json();
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

  await db().collection("clients").insertOne({
    name: "New User",
    contacts: [],
    id: uuid(),
    companyId: companyId,
    createdAt: new Date().toISOString(),
  });
  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const client = await event.request.json();
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

  await db().collection("clients").updateOne(
    {
      companyId: companyId,
      id: client.id,
    },
    {
      $set: client,
    },
  );
  return new Response(JSON.stringify(client), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
