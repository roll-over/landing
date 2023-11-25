import db from "$lib/db";

export async function DELETE(event) {
  const company = await event.request.json();
  const session = await event.locals.getSession();

  await db().collection("companies").deleteOne({
    id: company.id,
    owner: session.user.email,
  });
}
