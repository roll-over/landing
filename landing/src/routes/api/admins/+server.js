import db from "$lib/db";
import { useAdminGuard } from "$lib/guards/admin";

export async function GET(event) {
  const result = await useAdminGuard(event);
  if (result) {
    return result;
  }

  const admins = await db()
    .collection("admins")
    .find(
      {},
      {
        projection: {
          _id: 0,
        },
      },
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
  const result = await useAdminGuard(event);
  if (result) {
    return result;
  }

  const admin = await event.request.json();

  await db().collection("admins").insertOne(admin);
  return new Response(JSON.stringify(admin), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(event) {
  const result = await useAdminGuard(event);
  if (result) {
    return result;
  }
  const admin = await event.request.json();

  await db().collection("admins").deleteOne({
    email: admin.email,
  });
  return new Response(JSON.stringify(admin), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
