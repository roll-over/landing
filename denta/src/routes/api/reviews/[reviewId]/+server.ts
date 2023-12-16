import db from "$lib/db";

export const DELETE = async (event) => {
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

  const { reviewId } = event.params;

  await _db.collection("reviews").deleteOne({
    reviewId,
    email: session.user.email,
  });

  return new Response(null, {
    status: 200,
  });
};
