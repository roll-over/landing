import db from "$lib/db";
import { env } from "$env/dynamic/private";
import { error, json } from "@sveltejs/kit";

export async function POST(event) {
  if (event.cookies.get("ADMIN_SESSION") !== env.ADMIN_SESSION) {
    return new Response(JSON.stringify({}), {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const _db = await db();
  if (!_db) {
    throw error(500, "Database connection failed");
  }

  const infoCompanies = await event.request.json();

  infoCompanies.forEach(async (infoCompany) => {
    await _db.collection("articles").updateOne(
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

  return json({
    success: true,
  });
}
