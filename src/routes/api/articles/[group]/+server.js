import db from "$lib/db";
import { collections } from "$lib/collections";

export async function GET(event) {
  const collection = event.params.group;

  const allCollections = Object.keys(collections);
  if (!allCollections.includes(collection)) {
    return new Response("Not found", { status: 404 });
  }
  const enities = await db
    .collection(collection)
    .find(
      {},
      {
        projection: {
          _id: 0,
        },
      }
    )
    .toArray();

  return new Response(JSON.stringify(enities), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
export async function POST(event) {
  const collection = event.params.group;

  const allCollections = Object.keys(collections);
  if (!allCollections.includes(collection)) {
    return new Response("Not found", { status: 404 });
  }

  const artice = await event.request.json();
  const isExist = await db.collection(collection).findOne({
    id: artice.id,
  });
  if (isExist) {
    return new Response("Already exist", { status: 400 });
  }

  await db.collection(collection).insertOne(artice);
  return new Response(JSON.stringify(artice), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(event) {
  const collection = event.params.group;

  const allCollections = Object.keys(collections);
  if (!allCollections.includes(collection)) {
    return new Response("Not found", { status: 404 });
  }

  const artice = await event.request.json();

  await db.collection(collection).deleteOne({
    id: artice.id,
  });
  return new Response(JSON.stringify(artice), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
export async function PUT(event) {
  const collection = event.params.group;

  const allCollections = Object.keys(collections);
  if (!allCollections.includes(collection)) {
    return new Response("Not found", { status: 404 });
  }

  const artice = await event.request.json();

  await db.collection(collection).updateOne(
    {
      id: artice.id,
    },
    {
      $set: artice.article,
    }
  );
  return new Response(JSON.stringify(artice), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
