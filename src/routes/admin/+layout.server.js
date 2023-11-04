import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

const adminEmails = ["roll.over.projects@gmail.com"];

const isAdmin = async (user) => {
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
  console.log(admins, user?.email);
  return [adminEmails, ...admins.map((admin) => admin.email)].includes(
    user?.email
  );
};

export const load = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) {
    throw redirect(307, "/");
  }

  if (!(await isAdmin(session.user))) {
    throw redirect(307, "/");
  }
};
