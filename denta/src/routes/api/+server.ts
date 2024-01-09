import db from "$lib/db";
import { env } from "$env/dynamic/private";

export async function POST(event) {
  if (event.cookies.get("ADMIN_SESSION") !== env.ADMIN_SESSION) {
    return new Response(JSON.stringify({}), {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    });
  }
  const infoCompanies = await event.request.json();

  infoCompanies.forEach(async (infoCompany) => {
    await (await db()).collection("info-companies").updateOne(
      {
        _id: infoCompany._id,
      },
      {
        $set: {
          ...infoCompany,
        },
      },
      {
        upsert: true,
      },
    );
  });

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
