import db from "$lib/db";
import { newReviewSchema } from "$lib/types/reviews";
import { uuid } from "uuidv4";

export const POST = async (event) => {
  const session = await event.locals.getSession();

  if (!session || !session.user) {
    return new Response(null, {
      status: 401,
    });
  }

  const _db = await db();
  if (!_db) {
    return new Response("DB not found", { status: 500 });
  }

  const newReview = await event.request.json();

  const parsedReview = newReviewSchema.parse(newReview);

  await _db.collection("reviews").insertOne({
    reviewId: uuid(),
    ...parsedReview,
    email: session.user.email,
    createdAt: new Date(),
  });

  return new Response(null, {
    status: 200,
  });
};
