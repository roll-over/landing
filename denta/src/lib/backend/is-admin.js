import db from "$lib/db";

const adminEmails = ["roll.over.projects@gmail.com"];

export const isAdmin = async (user) => {
  const admins = await (await db())
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
  const allAdmins = [...adminEmails, ...admins.map((admin) => admin.email)];
  return allAdmins.includes(user?.email);
};
