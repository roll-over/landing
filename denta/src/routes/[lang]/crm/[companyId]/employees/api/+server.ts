import db from "$lib/db";
import { uuid } from "uuidv4";

export async function POST(event) {
  const employee = await event.request.json();
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

  await (await db()).collection("employees").insertOne({
    name: "New Doctor",
    contacts: [],
    id: uuid(),
    companyId: companyId,
    createdAt: new Date().toISOString(),
  });
  return new Response(JSON.stringify(employee), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(event) {
  const employee = await event.request.json();
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

  await (await db()).collection("employees").updateOne(
    {
      companyId: companyId,
      id: employee.id,
    },
    {
      $set: employee,
    },
  );
  return new Response(JSON.stringify(employee), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
