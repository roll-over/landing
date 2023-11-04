import { redirect } from "@sveltejs/kit";

const adminEmails = ["roll.over.projects@gmail.com"];

const isAdmin = async (user) => {
  const admins = await fetch("/api/admins", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
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
