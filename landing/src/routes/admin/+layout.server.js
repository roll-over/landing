import { isAdmin } from "$lib/backend/is-admin";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) {
    throw redirect(307, "/");
  }

  if (!(await isAdmin(session.user))) {
    throw redirect(307, "/");
  }
};
