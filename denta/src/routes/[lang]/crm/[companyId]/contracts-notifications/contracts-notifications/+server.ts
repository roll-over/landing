import { usersCompanyGuard } from "$lib/backend/guards/byCompany";
import { sendEmail } from "$lib/backend/providers/email";
import db from "$lib/db";
import { json } from "@sveltejs/kit";
import { uuid } from "uuidv4";

const newRegistrationText = (formData) => {
  return `
  <!DOCTYPE PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title></title>
    </head>
    <body>
        <h1>Добавлен новый контракт в femida-crm</h1>
        <p>Заголовок: ${formData.title}</p>
    </body>
    </html>
`;
};

const newSubject = (formData) => {
  return `Добавлен новый контракт в femida-crm`;
};

export const POST = async (event) => {
  await usersCompanyGuard(event);

  const formData = await event.request.json();

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  await _db.collection("contracts-notifications").insertOne({
    ...formData,
    companyId: event.params.companyId,
    id: uuid(),
  });

  sendEmail(newRegistrationText(formData), newSubject(formData), session.user.email);

  return json({ status: "ok" });
};

export const PUT = async (event) => {
  await usersCompanyGuard(event);

  const formData = await event.request.json();
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  await _db.collection("contracts-notifications").updateOne(
    {
      companyId: event.params.companyId,
      id: formData.id,
    },
    {
      $set: formData,
    },
  );

  return json({ status: "ok" });
};
