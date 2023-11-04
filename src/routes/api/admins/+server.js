import db from "$lib/db";

export async function GET(event) {
  const admins = await db
    .collection("admins")
    .find(
      {},
      {
        projection: {
          _id: 0,
        },
      }
    )
    .toArray();
  return new Response(JSON.stringify(admins), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
export async function POST(event) {
  const admin = await event.request.json();

  await db.collection("admins").insertOne(admin);
  return new Response(JSON.stringify(admin), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(event) {
  const admin = await event.request.json();

  await db.collection("admins").deleteOne({
    email: admin.email,
  });
  return new Response(JSON.stringify(admin), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
