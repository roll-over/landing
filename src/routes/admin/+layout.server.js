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
  const allAdmins = [adminEmails, ...admins.map((admin) => admin.email)];
  console.log(allAdmins, user?.email, allAdmins.includes(user?.email));
  return allAdmins.includes(user?.email);
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
