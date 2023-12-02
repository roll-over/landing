import db from "$lib/db";
import { uuid } from "uuidv4";

export async function POST(event) {
  const appointments = await event.request.json();
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

  await (await db()).collection("appointments").insertOne({
    name: "New User",
    contacts: [],
    id: uuid(),
    companyId: companyId,
    createdAt: new Date().toISOString(),
  });
  return new Response(JSON.stringify(appointments), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const appointment = await event.request.json();
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

  await (await db()).collection("appointments").updateOne(
    {
      companyId: companyId,
      id: appointment.id,
    },
    {
      $set: appointment,
    },
  );
  return new Response(JSON.stringify(appointment), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
