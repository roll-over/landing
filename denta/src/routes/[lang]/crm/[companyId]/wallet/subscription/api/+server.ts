import db from "$lib/db";

export async function POST(event) {
  const subscribtions = await event.request.json();

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
  subscribtions.forEach(async (subscribtion) => {
    await (await db()).collection("subscription").updateOne(
      {
        companyId: companyId,
        referenceId: subscribtion.id,
      },
      {
        $set: {
          companyId: companyId,
          referenceId: subscribtion.id,
          type: subscribtion.type,
          count: subscribtion.count,
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
